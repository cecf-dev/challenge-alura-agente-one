import chromadb
from chromadb.config import Settings
from app.config import CHROMA_HOST, CHROMA_PORT, CHROMA_PERSIST_DIR


_client = None
_collection = None

COLLECTION_NAME = "mangatech_docs"


def get_collection():
    global _client, _collection
    if _collection is None:
        _client = chromadb.PersistentClient(path=CHROMA_PERSIST_DIR)
        _collection = _client.get_or_create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"},
        )
    return _collection


def add_documents(texts: list[str], metadatas: list[dict], ids: list[str]):
    collection = get_collection()
    batch_size = 100
    for i in range(0, len(texts), batch_size):
        batch_texts = texts[i : i + batch_size]
        batch_metas = metadatas[i : i + batch_size]
        batch_ids = ids[i : i + batch_size]
        collection.add(documents=batch_texts, metadatas=batch_metas, ids=batch_ids)
    return {"added": len(texts)}


def query_documents(question: str, n_results: int = 5) -> list[dict]:
    collection = get_collection()
    results = collection.query(query_texts=[question], n_results=n_results)

    docs = []
    if results and results["documents"]:
        for i, doc in enumerate(results["documents"][0]):
            meta = results["metadatas"][0][i] if results["metadatas"] else {}
            distance = results["distances"][0][i] if results["distances"] else 0
            docs.append({
                "text": doc,
                "source": meta.get("source", "unknown"),
                "format": meta.get("format", "unknown"),
                "score": round(1 - distance, 4),
            })
    return docs


def delete_documents_by_source(filename: str) -> int:
    collection = get_collection()
    results = collection.get(where={"source": filename})
    if results and results["ids"]:
        collection.delete(ids=results["ids"])
        return len(results["ids"])
    return 0


def list_documents() -> list[dict]:
    collection = get_collection()
    all_data = collection.get()
    sources = {}
    if all_data and all_data["metadatas"]:
        for meta in all_data["metadatas"]:
            src = meta.get("source", "unknown")
            if src not in sources:
                sources[src] = {"source": src, "format": meta.get("format", ""), "chunks": 0}
            sources[src]["chunks"] += 1
    return list(sources.values())
