
import React from 'react';
import { LayoutDashboard, GitGraph, Eye, BookOpen, Scale, MessageSquareText, PhoneCall } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <div className="w-20 lg:w-72 bg-slate-900 text-white min-h-screen flex flex-col shadow-xl fixed left-0 top-0 z-50">
      {/* Header / Logo Area */}
      <div className="p-4 flex items-center justify-center lg:justify-start border-b border-slate-800 h-24 bg-slate-950 transition-all duration-300">
        <div className="bg-gradient-to-br from-slate-200 to-slate-400 p-2 rounded-xl shadow-lg shadow-slate-900/50 flex-shrink-0 border-2 border-white/10">
            <Scale className="w-8 h-8 text-slate-900" strokeWidth={2} />
        </div>
        <div className="ml-3 hidden lg:block overflow-hidden">
          <h1 className="text-base font-bold leading-tight text-slate-100 tracking-tight whitespace-nowrap">สำนักงานผู้ตรวจการแผ่นดิน</h1>
          <h2 className="text-[10px] text-red-500 tracking-widest mt-1 font-bold uppercase">AI Watch Unit</h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-2 px-3">
        <button
          onClick={() => setView(ViewState.DASHBOARD)}
          className={`w-full flex items-center px-4 py-4 rounded-xl transition-all duration-200 group ${
            currentView === ViewState.DASHBOARD
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <LayoutDashboard className={`w-6 h-6 ${currentView === ViewState.DASHBOARD ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
          <span className="ml-4 font-medium hidden lg:block">ภาพรวม (Dashboard)</span>
        </button>

        <button
          onClick={() => setView(ViewState.MONITOR)}
          className={`w-full flex items-center px-4 py-4 rounded-xl transition-all duration-200 group ${
            currentView === ViewState.MONITOR
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Eye className={`w-6 h-6 ${currentView === ViewState.MONITOR ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
          <span className="ml-4 font-medium hidden lg:block">ตรวจสอบ (AI Monitor)</span>
        </button>

        <button
          onClick={() => setView(ViewState.RAG)}
          className={`w-full flex items-center px-4 py-4 rounded-xl transition-all duration-200 group ${
            currentView === ViewState.RAG
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <MessageSquareText className={`w-6 h-6 ${currentView === ViewState.RAG ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
          <span className="ml-4 font-medium hidden lg:block">ปรึกษา AI (RAG Chat)</span>
        </button>

        <button
          onClick={() => setView(ViewState.WORKFLOW)}
          className={`w-full flex items-center px-4 py-4 rounded-xl transition-all duration-200 group ${
            currentView === ViewState.WORKFLOW
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <GitGraph className={`w-6 h-6 ${currentView === ViewState.WORKFLOW ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
          <span className="ml-4 font-medium hidden lg:block">การเปลี่ยนแปลง (As-Is/To-Be)</span>
        </button>
      </nav>

      {/* Footer */}
      <div className="p-4 bg-slate-950/50 backdrop-blur-sm border-t border-slate-800">
        <div className="mb-3 hidden lg:flex items-center bg-red-900/30 p-2 rounded-lg border border-red-900/50">
            <PhoneCall className="w-4 h-4 text-red-400 mr-2" />
            <span className="text-xs font-bold text-red-200">สายด่วน 1676</span>
        </div>
        <div className="flex items-center justify-center lg:justify-start text-slate-500 text-xs">
            <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="hidden lg:block truncate">อ้างอิง: รายงานประจำปี 2567</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
