import { Bot, FileText, MessageSquare } from "lucide-react";

export default function WelcomeScreen() {
  const suggestions = [
    "¿Cuál es la misión de MangaTech AI?",
    "¿Qué formatos de manga soporta la plataforma?",
    "¿Cómo funciona el proceso de traducción?",
    "¿Cuáles son los planes de suscripción?",
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-brand-600/20 flex items-center justify-center mb-4">
        <Bot size={32} className="text-brand-400" />
      </div>
      <h2 className="text-xl font-bold mb-2">Bienvenido a MangaTech AI</h2>
      <p className="text-dark-200 max-w-md text-sm mb-8">
        Soy tu asistente corporativo. Puedo responder preguntas sobre los
        documentos operativos de MangaTech AI. Sube documentos para comenzar.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
        {suggestions.map((s, i) => (
          <div
            key={i}
            className="flex items-start gap-2 bg-dark-500 border border-dark-400 rounded-xl p-3 text-left"
          >
            <MessageSquare size={14} className="text-brand-400 mt-0.5 flex-shrink-0" />
            <span className="text-xs text-dark-100">{s}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs text-dark-300">
        <FileText size={12} /> PDF, Word, Excel, CSV, Markdown, JSON, HTML
      </div>
    </div>
  );
}
