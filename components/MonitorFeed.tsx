import React, { useState } from 'react';
import { SocialComment } from '../types';
import { getSectionInfo } from '../services/dataService';
import { analyzeSentiment } from '../services/geminiService';
import { AlertCircle, Search, Filter, ExternalLink, Scale, BrainCircuit, Tag, ThumbsUp, ThumbsDown, Meh, Sparkles, Loader2, CheckCircle2, EyeOff } from 'lucide-react';

interface MonitorFeedProps {
  data: SocialComment[];
}

const MonitorFeed: React.FC<MonitorFeedProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSection, setFilterSection] = useState<string>('all');
  const [verifiedSentiments, setVerifiedSentiments] = useState<Record<string, 'positive' | 'negative' | 'neutral'>>({});
  const [analyzingItems, setAnalyzingItems] = useState<Record<string, boolean>>({});

  // Regex for common Thai profanity/rude words to blur
  const PROFANITY_REGEX = /(แดก|ขี้เกียจ|ขี้เกียด|ทุเรด|ทุเรศ|ชิบหาย|ฉิบหาย|ค-ย|ควย|เหี้ย|สัส|สัตว์|มึง|กู|เลว|ชั่ว|บ้า|โง่|นรก|ระยำ|สันดาน|หน้าด้าน)/gi;

  const renderMaskedText = (text: string) => {
    const parts = text.split(PROFANITY_REGEX);
    return (
        <span>
            {parts.map((part, index) => {
                if (part.match(PROFANITY_REGEX)) {
                    return (
                         <span key={index} className="filter blur-[4px] bg-slate-300 text-slate-300 rounded-sm select-none mx-0.5 px-0.5 transition-all duration-300 hover:blur-none hover:bg-red-100 hover:text-red-600 cursor-pointer relative group" title="เนื้อหาไม่เหมาะสม (แตะเพื่อแสดง)">
                            {part}
                         </span>
                    );
                }
                return <span key={index}>{part}</span>;
            })}
        </span>
    );
  };

  const filteredData = data.filter(item => {
    const matchesSearch = item.commentText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = filterSection === 'all' || item.constitutionSection === filterSection;
    return matchesSearch && matchesSection;
  });

  const handleAnalyze = async (id: string, text: string) => {
    if (analyzingItems[id]) return;
    
    setAnalyzingItems(prev => ({ ...prev, [id]: true }));
    try {
        const result = await analyzeSentiment(text);
        setVerifiedSentiments(prev => ({ ...prev, [id]: result }));
    } catch (e) {
        console.error(e);
    } finally {
        setAnalyzingItems(prev => ({ ...prev, [id]: false }));
    }
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
        case 'corruption': return { bg: 'bg-rose-100', text: 'text-rose-700', label: 'ทุจริต' };
        case 'infrastructure': return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'โครงสร้างพื้นฐาน' };
        case 'inefficiency': return { bg: 'bg-orange-100', text: 'text-orange-700', label: 'ประสิทธิภาพ' };
        case 'law_enforcement': return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'กฎหมาย' };
        default: return { bg: 'bg-slate-200', text: 'text-slate-600', label: 'ทั่วไป' };
    }
  };

  const getSentimentConfig = (sentiment: string) => {
      switch(sentiment) {
          case 'positive': 
            return { 
                icon: <ThumbsUp className="w-3.5 h-3.5" />, 
                style: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200',
                label: 'Positive'
            };
          case 'negative': 
            return { 
                icon: <ThumbsDown className="w-3.5 h-3.5" />, 
                style: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200',
                label: 'Negative'
            };
          default: 
            return { 
                icon: <Meh className="w-3.5 h-3.5" />, 
                style: 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200',
                label: 'Neutral'
            };
      }
  };

  return (
    <div className="p-6 lg:p-10 bg-slate-100 min-h-screen">
      <div className="mb-6 flex flex-col border-b pb-4 border-slate-300">
        <div className="flex items-center gap-2 mb-2 text-red-600">
            <BrainCircuit className="w-6 h-6" />
            <span className="text-sm font-bold uppercase tracking-wider">AI & NLP Analysis</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">ตรวจสอบเชิงรุก (Active Monitor)</h2>
        <p className="text-slate-600 mt-2">ระบบเชื่อมโยงข้อมูล Social Listening เข้ากับ "หมวด 5 หน้าที่ของรัฐ"</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ค้นหาข้อความ, ชื่อผู้ร้องเรียน, ประเด็นปัญหา..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative min-w-[280px] w-full md:w-auto">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <select 
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer text-slate-700 font-medium"
                value={filterSection}
                onChange={(e) => setFilterSection(e.target.value)}
            >
                <option value="all">ทุกมาตรา (All Sections)</option>
                <option value="S51">ม.51 สิทธิติดตามรัฐ</option>
                <option value="S53">ม.53 การบริหารราชการ/กฎหมาย</option>
                <option value="S54">ม.54 การศึกษา</option>
                <option value="S55">ม.55 สาธารณสุข</option>
                <option value="S56">ม.56 สาธารณูปโภค</option>
                <option value="S59">ม.59 เปิดเผยข้อมูล</option>
                <option value="S60">ม.60 คลื่นความถี่</option>
                <option value="S61">ม.61 คุ้มครองผู้บริโภค</option>
                <option value="S63">ม.63 การปราบปรามทุจริต</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredData.map((item) => {
            const sectionInfo = getSectionInfo(item.constitutionSection);
            const categoryStyle = getCategoryStyle(item.category);
            
            // Determine sentiment source (AI Verified > Initial Data)
            const currentSentiment = verifiedSentiments[item.id] || item.sentiment;
            const isVerified = !!verifiedSentiments[item.id];
            const isAnalyzing = analyzingItems[item.id];
            const sentimentConfig = getSentimentConfig(currentSentiment);
            const hasProfanity = PROFANITY_REGEX.test(item.commentText);
            
            return (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-red-300 transition-all duration-200 group">
                <div className="flex items-start justify-between">
                    <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 p-[2px]">
                             <img src={item.authorAvatar} alt={item.authorName} className="w-full h-full rounded-full bg-white object-cover" />
                        </div>
                        <div className="ml-4">
                            <h4 className="font-bold text-slate-900 text-lg">{item.authorName}</h4>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                <span>{new Date(item.timestamp).toLocaleDateString('th-TH', {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</span>
                                <span>•</span>
                                <span className="font-medium text-slate-600">{item.reactionsCount} การตอบสนอง</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Tags & Sentiment */}
                    <div className="flex flex-col items-end gap-2">
                         <div className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                            <Scale className="w-4 h-4 text-red-600" />
                            <span className="text-xs font-bold">{sectionInfo.label}</span>
                         </div>

                         <div className="flex gap-2 items-center">
                             <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${categoryStyle.bg} ${categoryStyle.text}`}>
                                <Tag className="w-3 h-3" />
                                {categoryStyle.label}
                             </span>
                             
                             {/* Interactive AI Sentiment Badge */}
                             <button 
                                onClick={() => handleAnalyze(item.id, item.commentText)}
                                disabled={isAnalyzing || isVerified}
                                className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide border transition-all duration-200 ${sentimentConfig.style} ${isVerified ? 'ring-2 ring-offset-1 ring-red-100' : ''}`}
                                title={isVerified ? "Verified by Gemini AI" : "Click to verify sentiment with Gemini"}
                             >
                                {isAnalyzing ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : isVerified ? (
                                    <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                ) : (
                                    sentimentConfig.icon
                                )}
                                <span>{sentimentConfig.label}</span>
                             </button>
                         </div>
                    </div>
                </div>

                <div className="mt-5 pl-16 pr-4">
                    <div className="text-slate-700 leading-relaxed text-base bg-slate-50 p-4 rounded-lg border-l-4 border-red-300 italic">
                        "{renderMaskedText(item.commentText)}"
                    </div>
                </div>

                <div className="mt-4 pl-16 pt-2 flex items-center justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-slate-600">หน้าที่รัฐ (State Duty):</p>
                                <p className="text-xs text-slate-500">{sectionInfo.desc}</p>
                            </div>
                        </div>
                        {hasProfanity && (
                             <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                                <EyeOff className="w-3 h-3" />
                                <span className="text-[10px] font-bold">พบคำหยาบ (Blurred)</span>
                             </div>
                        )}
                    </div>
                    <div className="flex gap-2">
                        {isVerified && (
                            <span className="flex items-center text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
                                AI Verified
                            </span>
                        )}
                        <a href={item.postUrl} target="_blank" rel="noreferrer" className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium transition-colors bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100">
                            ดูต้นฉบับ <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                    </div>
                </div>
            </div>
        )})}
        
        {filteredData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Search className="w-12 h-12 mb-4 opacity-20" />
                <p>ไม่พบข้อมูลที่ค้นหา</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default MonitorFeed;