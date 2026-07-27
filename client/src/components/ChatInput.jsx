import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-dark-400 bg-dark-600 p-4"
    >
      <div className="flex items-end gap-3 max-w-4xl mx-auto">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu pregunta sobre MangaTech AI..."
          rows={1}
          className="flex-1 bg-dark-500 border border-dark-300 rounded-xl px-4 py-3 text-white
                     placeholder:text-dark-200 resize-none focus:outline-none focus:ring-2
                     focus:ring-brand-500 focus:border-transparent text-sm"
          style={{ minHeight: "44px", maxHeight: "120px" }}
        />
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-600 hover:bg-brand-700
                     disabled:opacity-50 disabled:cursor-not-allowed flex items-center
                     justify-center transition-colors"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </div>
    </form>
  );
}
