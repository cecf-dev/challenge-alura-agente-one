import os
import json
import csv
import io
from pathlib import Path

import PyPDF2
from docx import Document as DocxDocument
import openpyxl
import pandas as pd
from bs4 import BeautifulSoup
import markdown


SUPPORTED_EXTENSIONS = {
    ".pdf", ".docx", ".doc", ".xlsx", ".xls",
    ".csv", ".md", ".json", ".html", ".htm",
}


def process_file(file_path: str) -> list[dict]:
    """Process a file and return a list of text chunks with metadata."""
    path = Path(file_path)
    ext = path.suffix.lower()
    filename = path.name

    if ext not in SUPPORTED_EXTENSIONS:
        raise ValueError(f"Unsupported format: {ext}")

    processors = {
        ".pdf": _process_pdf,
        ".docx": _process_docx,
        ".doc": _process_docx,
        ".xlsx": _process_excel,
        ".xls": _process_excel,
        ".csv": _process_csv,
        ".md": _process_markdown,
        ".json": _process_json,
        ".html": _process_html,
        ".htm": _process_html,
    }

    raw_text = processors[ext](file_path)

    return [{"text": raw_text, "metadata": {"source": filename, "format": ext.lstrip(".")}}]


def _process_pdf(file_path: str) -> str:
    reader = PyPDF2.PdfReader(file_path)
    pages = []
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        if text:
            pages.append(f"[Página {i + 1}]\n{text}")
    return "\n\n".join(pages)


def _process_docx(file_path: str) -> str:
    doc = DocxDocument(file_path)
    paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
    return "\n\n".join(paragraphs)


def _process_excel(file_path: str) -> str:
    df = pd.read_excel(file_path, sheet_name=None)
    parts = []
    for sheet_name, sheet_df in df.items():
        parts.append(f"--- Hoja: {sheet_name} ---")
        parts.append(sheet_df.to_string(index=False))
    return "\n\n".join(parts)


def _process_csv(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8", errors="replace") as f:
        reader = csv.reader(f)
        rows = list(reader)
    if not rows:
        return ""
    header = rows[0]
    lines = [", ".join(header)]
    for row in rows[1:]:
        lines.append(", ".join(row))
    return "\n".join(lines)


def _process_markdown(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8", errors="replace") as f:
        md_text = f.read()
    return md_text


def _process_json(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8", errors="replace") as f:
        data = json.load(f)
    return json.dumps(data, indent=2, ensure_ascii=False)


def _process_html(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8", errors="replace") as f:
        raw = f.read()
    soup = BeautifulSoup(raw, "html.parser")
    for tag in soup(["script", "style"]):
        tag.decompose()
    return soup.get_text(separator="\n", strip=True)
