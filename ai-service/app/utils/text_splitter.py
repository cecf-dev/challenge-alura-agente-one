import tiktoken


def split_text(text: str, chunk_size: int = 500, chunk_overlap: int = 100) -> list[str]:
    """Split text into chunks using tiktoken for accurate token counting."""
    if not text or not text.strip():
        return []

    enc = tiktoken.get_encoding("cl100k_base")
    tokens = enc.encode(text)

    chunks = []
    start = 0

    while start < len(tokens):
        end = start + chunk_size
        chunk_tokens = tokens[start:end]
        chunk_text = enc.decode(chunk_tokens)
        chunks.append(chunk_text.strip())
        start = end - chunk_overlap
        if start + chunk_overlap >= len(tokens):
            break

    return [c for c in chunks if c]
