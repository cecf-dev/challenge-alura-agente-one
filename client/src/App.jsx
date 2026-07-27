import { useState } from "react";
import { useChat } from "./hooks/useChat";
import { useDocuments } from "./hooks/useDocuments";
import { sendMessage } from "./services/api";
import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import DocumentPanel from "./components/DocumentPanel";
import WelcomeScreen from "./components/WelcomeScreen";

export default function App() {
  const [docsOpen, setDocsOpen] = useState(false);
  const { messages, loading, error, sendMessage: sendChat, clearMessages } = useChat();
  const { documents, scanning, fetchDocuments, rescan, remove } = useDocuments();

  const handleSend = (text) => {
    sendChat(text, (msg) => sendMessage(msg));
  };

  return (
    <div className="h-screen flex flex-col bg-dark-700">
      <Header onOpenDocs={() => setDocsOpen(true)} onClear={clearMessages} />

      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
                <div className="bg-dark-500 rounded-2xl px-4 py-3 text-sm text-dark-200">
                  Pensando...
                </div>
              </div>
            )}
            {error && (
              <div className="text-center text-red-400 text-sm py-2">{error}</div>
            )}
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} loading={loading} />

      {docsOpen && (
        <DocumentPanel
          documents={documents}
          scanning={scanning}
          onClose={() => setDocsOpen(false)}
          onRescan={rescan}
          onDelete={remove}
          onRefresh={fetchDocuments}
        />
      )}
    </div>
  );
}
