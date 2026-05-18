"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Bot, X, Send, Store, BrainCircuit, UserCircle, MessageSquare } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  options?: { label: string; action: string; icon?: React.ReactNode }[];
}

export default function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  if (pathname.startsWith('/admin')) return null;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const waNumber = "5492974779978";

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "¡Hola! Soy el asistente virtual de BALUMTech 🤖. ¿En qué puedo ayudarte hoy?",
          sender: "bot",
          options: [
            { label: "Ver productos de la Tienda", action: "tienda", icon: <Store size={14} /> },
            { label: "Soluciones de IA", action: "ia", icon: <BrainCircuit size={14} /> },
            { label: "Hablar con un humano (WhatsApp)", action: "whatsapp", icon: <UserCircle size={14} /> }
          ]
        }
      ]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleAction = (action: string, label: string) => {
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), text: label, sender: "user" }]);

    // Bot response logic
    setTimeout(() => {
      let botResponse: Message = { id: Date.now() + 1, text: "", sender: "bot" };
      
      switch (action) {
        case "tienda":
          botResponse.text = "¡Excelente! Te redirijo a nuestra tienda virtual. Ahí podrás ver todos nuestros equipos, agregarlos a tu carrito y armar tu pedido.";
          botResponse.options = [{ label: "Ir a la Tienda ➔", action: "go_tienda" }];
          break;
        case "ia":
          botResponse.text = "Nuestras soluciones de Inteligencia Artificial incluyen desde automatización de reportes hasta Chatbots para empresas. ¿Querés ver nuestro catálogo de IA?";
          botResponse.options = [{ label: "Sí, ver catálogo IA", action: "go_tienda" }, { label: "No, volver al inicio", action: "menu" }];
          break;
        case "whatsapp":
          botResponse.text = "Te estoy abriendo un chat directo con nuestro equipo por WhatsApp para una atención personalizada. ¡Allá nos vemos!";
          window.open(`https://wa.me/${waNumber}?text=Hola,%20necesito%20hablar%20con%20un%20asesor%20de%20BALUMTech.`, "_blank");
          break;
        case "go_tienda":
          window.location.href = "/tienda";
          break;
        case "menu":
          botResponse.text = "¿En qué más te puedo ayudar?";
          botResponse.options = [
            { label: "Ver productos de la Tienda", action: "tienda", icon: <Store size={14} /> },
            { label: "Soluciones de IA", action: "ia", icon: <BrainCircuit size={14} /> },
            { label: "Hablar con un humano (WhatsApp)", action: "whatsapp", icon: <UserCircle size={14} /> }
          ];
          break;
        default:
          botResponse.text = "No entendí ese comando. ¿Puedo ayudarte con otra cosa?";
          botResponse.options = [{ label: "Volver al menú", action: "menu" }];
      }
      
      if (botResponse.text !== "") {
        setMessages(prev => [...prev, botResponse]);
      }
    }, 600);
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText;
    setInputText("");
    setMessages(prev => [...prev, { id: Date.now(), text, sender: "user" }]);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Por ahora solo puedo responder a las opciones del menú. Para consultas específicas, te recomiendo hablar por WhatsApp con nuestro equipo.",
        sender: "bot",
        options: [
          { label: "Hablar por WhatsApp", action: "whatsapp", icon: <UserCircle size={14} /> },
          { label: "Volver al menú", action: "menu" }
        ]
      }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[100] bg-blue-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] transition-all flex items-center justify-center group animate-bounce-slow"
          aria-label="Abrir asistente virtual"
        >
          <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <Bot size={28} className="relative z-10" />
          
          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 w-3.5 h-3.5 rounded-full border-2 border-[var(--bg-base)]"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[100] w-[350px] sm:w-[380px] h-[550px] max-h-[85vh] bg-[#0a0f1d]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn transform origin-bottom-right">
          
          {/* Header */}
          <div className="p-4 bg-blue-900/40 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.6)]">
                  <Bot size={20} className="text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0f1d]"></span>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Asistente BALUM</h3>
                <p className="text-green-400 text-xs font-medium">En línea</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white bg-white/5 p-1.5 rounded-lg transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            <div className="text-center text-xs text-zinc-500 mb-4">Hoy</div>
            
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.sender === "user" 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-white/10 text-zinc-200 rounded-bl-none border border-white/5"
                  }`}
                >
                  {msg.text}
                </div>
                
                {/* Options Buttons */}
                {msg.options && (
                  <div className="mt-3 flex flex-col gap-2 w-full max-w-[85%]">
                    {msg.options.map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => handleAction(opt.action, opt.label)}
                        className="bg-white/5 hover:bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:text-white text-xs font-medium py-2 px-3 rounded-xl transition-all flex items-center gap-2 text-left"
                      >
                        {opt.icon && <span className="text-blue-400">{opt.icon}</span>}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-black/40 border-t border-white/10">
            <form onSubmit={handleSendText} className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Escribe un mensaje..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button 
                type="submit" 
                disabled={!inputText.trim()}
                className="absolute right-1 w-9 h-9 flex items-center justify-center bg-blue-600 disabled:bg-zinc-700 text-white rounded-full transition-colors disabled:opacity-50"
              >
                <Send size={14} className={inputText.trim() ? "ml-0.5" : ""} />
              </button>
            </form>
            <div className="text-center mt-2">
              <span className="text-[10px] text-zinc-500 flex items-center justify-center gap-1">
                <MessageSquare size={10} /> Powered by BALUMTech
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
