import { BookOpen, FileText, Trash2 } from "lucide-react";

export default function Header({ onOpenDocs, onClear }) {
  return (
    <header className="bg-dark-600 border-b border-dark-400 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center">
            <BookOpen size={18} />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight">MangaTech AI</h1>
            <p className="text-xs text-dark-200">Asistente Corporativo RAG</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDocs}
            className="flex items-center gap-1.5 text-sm text-dark-100 hover:text-white
                       bg-dark-500 hover:bg-dark-400 px-3 py-1.5 rounded-lg transition-colors"
          >
            <FileText size={14} /> Documentos
          </button>
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-sm text-dark-100 hover:text-red-400
                       bg-dark-500 hover:bg-dark-400 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Trash2 size={14} /> Limpiar
          </button>
        </div>
      </div>
    </header>
  );
}
