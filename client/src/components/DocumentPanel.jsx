import { useEffect } from "react";
import { X, FileText, Trash2, RefreshCw, FolderSearch } from "lucide-react";

export default function DocumentPanel({
  documents,
  scanning,
  onClose,
  onRescan,
  onDelete,
  onRefresh,
}) {
  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-dark-700 rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col border border-dark-400">
        <div className="flex items-center justify-between p-4 border-b border-dark-400">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText size={20} /> Documentos Corporativos
          </h2>
          <button onClick={onClose} className="text-dark-200 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-xs text-dark-200 mb-3">
            Coloca tus documentos en la carpeta <code className="bg-dark-500 px-1 rounded">ai-service/documents/</code> y presiona re-escanear.
          </p>
          <button
            onClick={onRescan}
            disabled={scanning}
            className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700
                       disabled:opacity-50 text-white text-sm font-medium px-4 py-3 rounded-xl transition-colors"
          >
            {scanning ? (
              <>
                <RefreshCw size={16} className="animate-spin" /> Indexando documentos...
              </>
            ) : (
              <>
                <FolderSearch size={16} /> Re-escanear carpeta
              </>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {documents.length === 0 ? (
            <p className="text-center text-dark-200 text-sm py-4">
              No hay documentos indexados
            </p>
          ) : (
            <div className="space-y-2">
              {documents.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-dark-500 rounded-lg px-3 py-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{doc.source}</p>
                    <p className="text-xs text-dark-200">
                      {doc.format.toUpperCase()} · {doc.chunks} chunks
                    </p>
                  </div>
                  <button
                    onClick={() => onDelete(doc.source)}
                    className="text-dark-200 hover:text-red-400 ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
