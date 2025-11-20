
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Scale, HelpCircle, ChevronRight, MapPin, ShieldCheck, Type, EyeOff, Info } from 'lucide-react';
import { ChatMessage } from '../types';
import { askLegalAI } from '../services/geminiService';

// Pre-questions based on Ombudsman Annual Report 2024 Highlights
const PRE_QUESTIONS = [
  "หนี้ กยศ. ปรับโครงสร้างหนี้อย่างไร? (ผลงานปี 67)",
  "อยากติดตั้งโซลาร์รูฟท็อปแต่ติดขัดขั้นตอน?",
  "คัดสำเนาโฉนดที่ดินต่างสำนักงานได้ไหม?",
  "ขอใบส่งตัวรักษาพยาบาลบัตรทอง ล่าช้า?",
  "สายด่วนผู้ตรวจการแผ่นดิน โทรเบอร์อะไร?",
  "เจ้าหน้าที่รัฐทุจริต แจ้งที่ไหน?",
  "ถนนหน้าบ้านพัง อบต. ไม่ซ่อม?",
  "ตำรวจไม่รับแจ้งความ ทำอย่างไร?",
  "ขอปกปิดชื่อผู้ร้องเรียนได้หรือไม่?",
  "Ombudsman Care คืออะไร?",
  "ขั้นตอนการร้องเรียนออนไลน์?",
  "คดีอยู่ในชั้นศาลแล้ว ร้องเรียนได้ไหม?",
  "ถูกเรียกเก็บเงินใต้โต๊ะ?",
  "ร้านเหล้าเสียงดังรบกวน?"
];

const RAGChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'ai',
      content: 'สวัสดีครับ ผมคือ **AI Intake Officer** \n\nผมพร้อมให้ข้อมูลผลงานเด่นปี 2567 (หนี้ กยศ., โซลาร์เซลล์, ที่ดิน) และช่วยคัดกรองเรื่องร้องเรียนตามหลัก **Tripartite Analysis** \n\n🔒 ท่านสามารถเลือก **"ปกปิดตัวตน"** ได้หากกังวลเรื่องความปลอดภัยครับ',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const { text: responseText, groundingMetadata } = await askLegalAI(userMsg.content);
      
      const aiMsg: ChatMessage = {
        role: 'ai',
        content: responseText,
        timestamp: new Date(),
        groundingMetadata: groundingMetadata
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        role: 'ai',
        content: "ขออภัย ระบบขัดข้องชั่วคราว กรุณาลองใหม่ภายหลัง",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePreQuestionClick = (question: string) => {
      handleSend(question);
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sarabun">
      {/* Left Side: Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full h-full bg-white shadow-xl border-x border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 text-white p-4 flex items-center justify-between shadow-md z-10">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-full shadow-inner">
                    <Scale className="w-5 h-5 text-red-700" />
                </div>
                <div>
                    <h2 className="font-bold text-lg leading-none">Ombudsman AI Intake</h2>
                    <span className="text-xs text-red-200">ระบบรับเรื่องร้องเรียนอัจฉริยะ (Based on 2024 Report)</span>
                </div>
            </div>
            
            {/* Service Equity Tools */}
            <div className="flex items-center gap-2">
                 <button 
                    onClick={() => setTextSize(textSize === 'normal' ? 'large' : 'normal')}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-xs flex items-center gap-1"
                    title="ปรับขนาดตัวอักษร (Accessibility)"
                 >
                    <Type className="w-4 h-4" />
                    <span>{textSize === 'normal' ? 'ก' : 'ก++'}</span>
                 </button>
                 <div className="flex items-center gap-2 text-xs bg-red-800/50 px-3 py-1.5 rounded-full border border-red-600/50 backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    <span>AI Beta</span>
                </div>
            </div>
        </div>

        {/* Confidentiality Banner */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-start gap-3 text-xs text-slate-600">
            <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
                <p className="font-bold text-slate-800 flex items-center gap-1">
                    นโยบายความลับและการคุ้มครอง (Confidentiality Policy)
                    <EyeOff className="w-3 h-3 text-slate-400" />
                </p>
                <p>ข้อมูลของท่านจะถูกเก็บเป็นความลับ ผู้ร้องเรียนจะได้รับความคุ้มครองจากการถูกกลั่นแกล้ง (Retribution Protection)</p>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`flex ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fadeIn`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-red-600 ml-3' : 'bg-slate-700 mr-3'}`}>
                    {msg.role === 'user' ? <User className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
                    </div>
                    <div className={`p-4 rounded-2xl shadow-sm whitespace-pre-wrap leading-relaxed ${textSize === 'large' ? 'text-lg' : 'text-sm'} ${
                    msg.role === 'user' 
                        ? 'bg-red-50 border border-red-100 text-slate-800 rounded-tr-none' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}>
                    {msg.content}
                    <div className={`text-[10px] mt-2 opacity-60 text-right`}>
                        {msg.timestamp.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    </div>
                </div>

                {/* Grounding Chips (Maps) */}
                {msg.groundingMetadata?.groundingChunks && (
                    <div className={`mt-2 flex flex-wrap gap-2 ${msg.role === 'user' ? 'justify-end pr-14' : 'justify-start pl-14'}`}>
                        {msg.groundingMetadata.groundingChunks.map((chunk: any, i: number) => {
                            if (chunk.web?.uri) {
                                return (
                                    <a 
                                        key={i} 
                                        href="https://www.test_enhanceombudsman.go.th/"
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex items-center px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md hover:border-red-300 transition-all group"
                                    >
                                        <div className="bg-red-100 p-1.5 rounded-md mr-2 group-hover:bg-red-200">
                                            <MapPin className="w-4 h-4 text-red-700" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-700 group-hover:text-red-900 line-clamp-1">{chunk.web.title}</p>
                                            <p className="text-[10px] text-slate-400">ตำแหน่งจำลอง (Simulated)</p>
                                        </div>
                                        <ChevronRight className="w-3 h-3 ml-2 text-slate-300 group-hover:text-red-400" />
                                    </a>
                                );
                            }
                            return null;
                        })}
                    </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-pulse">
               <div className="flex max-w-[70%] flex-row">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 mr-3 flex items-center justify-center">
                   <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2">
                  <span className="text-sm text-slate-500">กำลังวิเคราะห์ (Tripartite Analysis)...</span>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></span>
                </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="พิมพ์เรื่องร้องเรียน หรือสอบถามผลงาน (เช่น หนี้ กยศ., โซลาร์เซลล์)"
              className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-inner"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className={`absolute right-2 p-2.5 rounded-full transition-all ${
                isLoading || !input.trim() 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg transform hover:scale-105'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 flex justify-center items-center text-xs text-slate-400 gap-1">
             <Scale className="w-3 h-3" />
             <span>ตอบคำถามโดยอิงจากรายงานประจำปี 2567 และกฎหมายที่เกี่ยวข้อง</span>
          </div>
        </div>
      </div>

      {/* Right Side: Pre-Questions */}
      <div className="hidden lg:flex w-80 bg-white border-l border-slate-200 flex-col shadow-lg z-0">
        <div className="p-5 bg-slate-50 border-b border-slate-200">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-red-600" />
                คำถามยอดนิยม (Hot Issues)
            </h3>
            <p className="text-xs text-slate-500 mt-1">ประเด็นเด่นปี 2567</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {PRE_QUESTIONS.map((q, idx) => (
                <button 
                    key={idx}
                    onClick={() => handlePreQuestionClick(q)}
                    disabled={isLoading}
                    className="w-full text-left text-sm p-3 rounded-lg bg-white border border-slate-200 hover:border-red-300 hover:bg-red-50 hover:shadow-sm transition-all duration-200 group flex justify-between items-center"
                >
                    <span className="text-slate-700 group-hover:text-red-900 line-clamp-2">{q}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            ))}
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-200">
             <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 text-slate-700 font-bold text-xs mb-1">
                    <Info className="w-4 h-4" />
                    <span>Ombudsman Care</span>
                </div>
                <p className="text-[10px] text-slate-600">
                    โครงการเชิงรุกเพื่อประชาชนในพื้นที่ห่างไกล สอบถามเส้นทางรถโมบายเคลื่อนที่ได้ที่นี่
                </p>
             </div>
        </div>
      </div>
    </div>
  );
};

export default RAGChat;
