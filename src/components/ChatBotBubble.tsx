import { useState } from "react";
import emailjs from "@emailjs/browser";

// Remplace ces valeurs par tes propres identifiants EmailJS
const EMAILJS_SERVICE_ID = "service_glut91o";
const EMAILJS_TEMPLATE_ID = "template_p9egm75";
const EMAILJS_USER_ID = "ihcCJGO-yPzvfaY2G";

function sendEmail(question: string) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      title: "Question du chatbot",
      name: "Utilisateur",
      message: question,
      email: "studiconnect.marketing@gmail.com",
      time: new Date().toLocaleString(),
    },
    EMAILJS_USER_ID
  );
}

export default function ChatBotBubble() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    try {
      await sendEmail(question);
      setSent(true);
    } catch (e: any) {
      setError("Erreur lors de l'envoi. Veuillez réessayer.");
      // Log détaillé pour debug
      console.error("Erreur EmailJS:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bulle flottante */}
      <button
        className="w-14 h-14 rounded-full bg-blue-600 shadow-lg flex items-center justify-center text-white text-2xl hover:bg-blue-700 transition"
        onClick={() => setOpen((o) => !o)}
        aria-label="Ouvrir le chatbot"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2m12-8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>
      </button>
      {/* Fenêtre de chat */}
      {open && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-xl shadow-2xl border p-4 animate-fadein-smooth">
          <div className="flex items-center mb-2">
            <span className="font-bold text-blue-700 text-lg mr-2">Bot</span>
            <span className="text-xs text-gray-400">(1 question max)</span>
            <button className="ml-auto text-gray-400 hover:text-gray-600" onClick={() => setOpen(false)}>&#10005;</button>
          </div>
          {!sent ? (
            <>
              <div className="mb-2 text-sm text-gray-600">Pose ta question, elle sera transmise à notre équipe.</div>
              <textarea
                className="w-full border rounded p-2 text-sm mb-2 focus:outline-none focus:ring"
                rows={3}
                maxLength={300}
                value={question}
                onChange={e => setQuestion(e.target.value)}
                disabled={loading || sent}
                placeholder="Écris ta question ici..."
              />
              {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
              <button
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                onClick={handleSend}
                disabled={loading || sent || !question.trim()}
              >
                {loading ? "Envoi..." : "Envoyer"}
              </button>
            </>
          ) : (
            <div className="text-green-600 text-center font-medium py-6">
              Merci ! Ta question a bien été transmise.<br />Nous te répondrons par email.
            </div>
          )}
        </div>
      )}
    </div>
  );
} 