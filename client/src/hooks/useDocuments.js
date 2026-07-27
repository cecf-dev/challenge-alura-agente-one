import { useState, useCallback } from "react";
import { getDocuments, deleteDocument, rescanFolder } from "../services/api";

export function useDocuments() {
  const [documents, setDocuments] = useState([]);
  const [scanning, setScanning] = useState(false);

  const fetchDocuments = useCallback(async () => {
    try {
      const data = await getDocuments();
      setDocuments(data.documents || []);
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  }, []);

  const rescan = useCallback(async () => {
    setScanning(true);
    try {
      const result = await rescanFolder();
      await fetchDocuments();
      return result;
    } finally {
      setScanning(false);
    }
  }, [fetchDocuments]);

  const remove = useCallback(async (filename) => {
    await deleteDocument(filename);
    await fetchDocuments();
  }, [fetchDocuments]);

  return { documents, scanning, fetchDocuments, rescan, remove };
}
