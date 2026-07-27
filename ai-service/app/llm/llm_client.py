import os
from dotenv import load_dotenv
from groq import Groq


load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
LLM_MODEL = os.getenv("LLM_MODEL", "llama-3.3-70b-versatile")

_client = None


def get_client() -> Groq:
    global _client
    if _client is None:
        _client = Groq(api_key=GROQ_API_KEY)
    return _client


def generate_answer(question: str, context_docs: list[dict]) -> dict:
    client = get_client()

    context_parts = []
    sources = []
    for i, doc in enumerate(context_docs):
        context_parts.append(f"[Fuente {i + 1}: {doc['source']}]\n{doc['text']}")
        if doc["source"] not in [s["name"] for s in sources]:
            sources.append({"name": doc["source"], "score": doc.get("score", 0)})

    context = "\n\n".join(context_parts)

    system_prompt = """Eres el asistente de MangaTech AI, una plataforma SaaS de traducción,
edición y distribución digital de manga y manhwa. Responde preguntas de los colaboradores
USANDO EXCLUSIVAMENTE la información proporcionada en el contexto. Si la respuesta no se
encuentra en el contexto, indica que no tienes información suficiente. Responde en español
de forma clara y profesional."""

    user_prompt = f"""Contexto de documentos internos de MangaTech AI:

{context}

---

Pregunta del colaborador: {question}

Responde basándote estrictamente en el contexto proporcionado:"""

    response = client.chat.completions.create(
        model=LLM_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.3,
        max_tokens=1024,
    )

    return {
        "answer": response.choices[0].message.content,
        "sources": sources,
    }
