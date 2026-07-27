const API_BASE = "/api";

export async function sendMessage(message, sessionId) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Error al enviar mensaje");
  }
  return res.json();
}

export async function uploadFiles(files) {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }
  const res = await fetch(`${API_BASE}/documents/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Error al subir archivos");
  return res.json();
}

export async function getDocuments() {
  const res = await fetch(`${API_BASE}/documents`);
  if (!res.ok) throw new Error("Error al obtener documentos");
  return res.json();
}

export async function deleteDocument(filename) {
  const res = await fetch(`${API_BASE}/documents/${filename}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar documento");
  return res.json();
}

export async function rescanFolder() {
  const res = await fetch(`${API_BASE}/documents/rescan`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Error al re-escanear carpeta");
  return res.json();
}
