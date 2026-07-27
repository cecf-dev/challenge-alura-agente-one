import os
import uuid
import logging
from pathlib import Path

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.config import DOCUMENTS_DIR
from app.processors.document_processor import process_file, SUPPORTED_EXTENSIONS
from app.utils.text_splitter import split_text
from app.vectorstore.chroma_client import (
    add_documents,
    query_documents,
    delete_documents_by_source,
    list_documents,
)
from app.llm.llm_client import generate_answer

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="MangaTech AI Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs(DOCUMENTS_DIR, exist_ok=True)


def ingest_folder():
    """Scan documents/ and ingest all supported files."""
    docs_path = Path(DOCUMENTS_DIR)
    files = [
        f for f in docs_path.iterdir()
        if f.is_file() and f.suffix.lower() in SUPPORTED_EXTENSIONS
    ]
    if not files:
        logger.info("No documents found in '%s/'", DOCUMENTS_DIR)
        return []

    results = []
    for file_path in files:
        try:
            processed = process_file(str(file_path))
            all_chunks, all_metadatas, all_ids = [], [], []
            for doc in processed:
                chunks = split_text(doc["text"])
                for chunk in chunks:
                    all_chunks.append(chunk)
                    all_metadatas.append(doc["metadata"])
                    all_ids.append(str(uuid.uuid4()))

            add_documents(all_chunks, all_metadatas, all_ids)
            results.append({"file": file_path.name, "status": "ok", "chunks": len(all_chunks)})
            logger.info("Indexed %s (%d chunks)", file_path.name, len(all_chunks))
        except Exception as e:
            results.append({"file": file_path.name, "status": "error", "detail": str(e)})
            logger.error("Error indexing %s: %s", file_path.name, e)

    return results


@app.on_event("startup")
def startup_event():
    logger.info("--- Auto-ingesting documents from '%s/' ---", DOCUMENTS_DIR)
    results = ingest_folder()
    ok = sum(1 for r in results if r["status"] == "ok")
    logger.info("--- Startup ingestion done: %d files indexed ---", ok)


class QueryRequest(BaseModel):
    question: str
    session_id: str = "default"


@app.get("/health")
async def health():
    return {"status": "ok", "service": "AI Service"}


@app.post("/ingest")
async def ingest_files(files: list[UploadFile] = File(...)):
    results = []
    for upload_file in files:
        ext = Path(upload_file.filename).suffix.lower()
        if ext not in SUPPORTED_EXTENSIONS:
            results.append({"file": upload_file.filename, "status": "error", "detail": f"Formato no soportado: {ext}"})
            continue

        save_path = os.path.join(DOCUMENTS_DIR, upload_file.filename)
        content = await upload_file.read()
        with open(save_path, "wb") as f:
            f.write(content)

        try:
            processed = process_file(save_path)
            all_chunks, all_metadatas, all_ids = [], [], []
            for doc in processed:
                chunks = split_text(doc["text"])
                for chunk in chunks:
                    all_chunks.append(chunk)
                    all_metadatas.append(doc["metadata"])
                    all_ids.append(str(uuid.uuid4()))

            add_documents(all_chunks, all_metadatas, all_ids)
            results.append({"file": upload_file.filename, "status": "ok", "chunks": len(all_chunks)})
        except Exception as e:
            results.append({"file": upload_file.filename, "status": "error", "detail": str(e)})

    return {"results": results}


@app.post("/ingest-local")
def ingest_local():
    """Re-scan documents/ folder and index everything."""
    return {"results": ingest_folder()}


@app.post("/query")
async def query(req: QueryRequest):
    context_docs = query_documents(req.question, n_results=5)

    if not context_docs:
        return {"answer": "No hay documentos indexados. Por favor, sube documentos primero.", "sources": []}

    response = generate_answer(req.question, context_docs)
    return {
        "answer": response["answer"],
        "sources": response["sources"],
        "session_id": req.session_id,
    }


@app.get("/documents")
async def get_documents():
    docs = list_documents()
    return {"documents": docs}


@app.delete("/documents/{filename}")
async def delete_document(filename: str):
    deleted = delete_documents_by_source(filename)
    file_path = os.path.join(DOCUMENTS_DIR, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
    return {"deleted_chunks": deleted, "filename": filename}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
