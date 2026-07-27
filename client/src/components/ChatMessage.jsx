import ReactMarkdown from "react-markdown";
import { Bot, User, FileText } from "lucide-react";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
          <Bot size={16} />
        </div>
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-brand-600 text-white"
            : "bg-dark-500 text-dark-50"
        }`}
      >
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>

        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 pt-2 border-t border-dark-400">
            <p className="text-xs text-dark-100 mb-1 flex items-center gap-1">
              <FileText size={12} /> Fuentes:
            </p>
            <div className="flex flex-wrap gap-1">
              {message.sources.map((src, i) => (
                <span
                  key={i}
                  className="text-xs bg-dark-600 text-dark-100 px-2 py-0.5 rounded-full"
                >
                  {src.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-400 flex items-center justify-center">
          <User size={16} />
        </div>
      )}
    </div>
  );
}
