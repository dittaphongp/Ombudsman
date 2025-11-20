
import React from 'react';
import { ArrowRight, User, Cpu, FileText, CheckCircle, AlertTriangle, FileClock, Bot } from 'lucide-react';

const WorkflowComparison: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 bg-slate-100 min-h-screen">
      <div className="mb-10 text-center">
        <span className="bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-300 uppercase tracking-wider">Transformation</span>
        <h2 className="text-3xl font-bold text-slate-900 mt-3">การพลิกโฉมกระบวนการทำงาน (Process Transformation)</h2>
        <p className="text-slate-500 mt-2">เปรียบเทียบระบบปัจจุบัน (As-Is) กับระบบอนาคต (To-Be) ด้วยเทคโนโลยี AI/Data Science</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* AS-IS */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-rose-500 p-6 text-white text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="relative z-10 flex flex-col items-center">
                <div className="bg-white/20 p-3 rounded-full mb-3 backdrop-blur-sm border border-white/30 shadow-sm">
                    <FileClock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">ระบบปัจจุบัน (As-Is)</h3>
                <p className="opacity-90 text-sm mt-1 font-medium">Manual Process & Reactive</p>
             </div>
          </div>
          
          <div className="p-6 space-y-6 relative">
            <div className="absolute right-0 top-1/2 -mr-4 hidden lg:block z-10">
                <div className="bg-white rounded-full p-2 shadow-lg border border-slate-100">
                    <ArrowRight className="w-8 h-8 text-slate-300" />
                </div>
            </div>

            {[
                { step: 1, title: "รับเรื่องร้องเรียน", desc: "ประชาชนส่งเรื่องผ่าน Website/เอกสาร (รอเรื่อง)", tag: "Manual", status: "danger" },
                { step: 2, title: "พิจารณาอำนาจหน้าที่", desc: "จนท. ใช้ประสบการณ์ตัดสินใจรายบุคคล", tag: "Human", status: "danger" },
                { step: 3, title: "จำแนกงาน S/M/L", desc: "อิงจากกรณีเก่า ไม่มีเกณฑ์วัดที่ชัดเจน", tag: "Human", status: "danger" },
                { step: 4, title: "มอบหมายงาน", desc: "เอกสารเวียน ไม่มีการจัดลำดับความสำคัญ", tag: "Paper", status: "danger" },
                { step: 5, title: "สืบสวนหาข้อมูล", desc: "ค้นหาเองจาก eMENSCR, NRIIS (ใช้เวลานาน)", tag: "Manual", status: "danger" },
                { step: 6, title: "วิเคราะห์กฎหมาย", desc: "ค้นคว้าเอง อาจมีความคลาดเคลื่อน", tag: "Human", status: "danger" },
                { step: 7, title: "ออกคำวินิจฉัย", desc: "ร่างหนังสือเอง ใช้เวลาตรวจสอบนาน", tag: "Manual", status: "danger" },
                { step: 8, title: "ส่งคำสั่งและติดตาม", desc: "ไม่มีระบบติดตามผลลัพธ์ที่ชัดเจน", tag: "No Tracking", status: "danger" },
            ].map((item) => (
                <div key={item.step} className="flex group relative">
                    {/* Connector Line */}
                    {item.step !== 8 && <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-100 -mb-6"></div>}
                    
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center font-bold text-lg group-hover:bg-red-500 group-hover:text-white transition-all shadow-sm z-10">
                        {item.step}
                    </div>
                    <div className="ml-4 flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100 group-hover:shadow-md group-hover:border-red-200 transition-all">
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-slate-800">{item.title}</h4>
                            <span className="bg-red-100 text-red-600 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wide">{item.tag}</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                        <div className="mt-2 flex items-center text-xs text-red-500 font-medium bg-red-50 px-2 py-1 rounded w-fit">
                            <AlertTriangle className="w-3 h-3 mr-1" /> จุดอ่อน: ล่าช้า, ผิดพลาดได้ง่าย
                        </div>
                    </div>
                </div>
            ))}
          </div>
        </div>

        {/* TO-BE */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
          <div className="bg-gradient-to-r from-slate-700 to-slate-900 p-6 text-white text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4">
                 <Cpu className="w-24 h-24 text-white" />
             </div>
             <div className="relative z-10 flex flex-col items-center">
                <div className="bg-white/20 p-3 rounded-full mb-3 backdrop-blur-sm border border-white/30 shadow-sm">
                    <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">ระบบอนาคต (To-Be)</h3>
                <p className="opacity-90 text-sm mt-1 font-medium">AI-Powered & Proactive</p>
             </div>
          </div>

          <div className="p-6 space-y-6">
            {[
                { step: 1, title: "รับเรื่อง + Social Listening", desc: "AI ตรวจจับความเดือดร้อนออนไลน์ (ไม่ต้องรอร้องขอ)", tag: "AI Monitor", status: "success" },
                { step: 2, title: "AI พิจารณาอำนาจหน้าที่", desc: "NLP วิเคราะห์เทียบฐานข้อมูลกฎหมายทันที", tag: "RAG AI", status: "success" },
                { step: 3, title: "AI จำแนก + ประเมิน", desc: "Machine Learning จัดเกรดความเร่งด่วน", tag: "ML", status: "success" },
                { step: 4, title: "Smart Assignment", desc: "Dashboard กระจายงานอัตโนมัติ", tag: "Auto", status: "success" },
                { step: 5, title: "AI Auto-Research", desc: "ดึงข้อมูลจากฐานข้อมูลภาครัฐอัตโนมัติ", tag: "Big Data", status: "success" },
                { step: 6, title: "AI Legal Analysis", desc: "วิเคราะห์ข้อกฎหมายและหน่วยงานที่รับผิดชอบ", tag: "Legal AI", status: "success" },
                { step: 7, title: "AI-Assisted วินิจฉัย", desc: "GenAI ร่างคำวินิจฉัยเบื้องต้นให้ จนท. ตรวจสอบ", tag: "GenAI", status: "success" },
                { step: 8, title: "Auto Tracking", desc: "ติดตามผลอัตโนมัติ + แจ้งเตือนเมื่อล่าช้า", tag: "Automation", status: "success" },
                { step: 9, title: "Public Dashboard", desc: "เปิดเผยข้อมูลโปร่งใสสู่ประชาชน", tag: "Transparency", status: "success" },
            ].map((item) => (
                <div key={item.step} className="flex group relative">
                    {/* Connector Line */}
                    {item.step !== 9 && <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-100 -mb-6"></div>}
                    
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 text-slate-700 border border-slate-300 flex items-center justify-center font-bold text-lg group-hover:bg-slate-800 group-hover:text-white transition-all shadow-sm z-10">
                        {item.step}
                    </div>
                    <div className="ml-4 flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100 group-hover:shadow-md group-hover:border-red-200 transition-all relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-slate-800">{item.title}</h4>
                                <span className="bg-green-600 text-white text-[10px] px-2 py-1 rounded font-bold uppercase shadow-sm tracking-wide">{item.tag}</span>
                            </div>
                            <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                            <div className="mt-2 flex items-center text-xs text-green-700 font-medium bg-green-50 px-2 py-1 rounded w-fit">
                                <CheckCircle className="w-3 h-3 mr-1" /> ข้อดี: รวดเร็ว, แม่นยำ, เชิงรุก
                            </div>
                        </div>
                    </div>
                </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorkflowComparison;
