
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MonitorFeed from './components/MonitorFeed';
import WorkflowComparison from './components/WorkflowComparison';
import RAGChat from './components/RAGChat';
import { getSocialData } from './services/dataService';
import { SocialComment, ViewState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.DASHBOARD);
  const [data, setData] = useState<SocialComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate Data Fetching
    const loadData = () => {
        const processedData = getSocialData();
        setData(processedData);
        setLoading(false);
    };
    loadData();
  }, []);

  const renderContent = () => {
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
            </div>
        );
    }

    switch (view) {
      case ViewState.DASHBOARD:
        return <Dashboard data={data} />;
      case ViewState.MONITOR:
        return <MonitorFeed data={data} />;
      case ViewState.RAG:
        return <RAGChat />;
      case ViewState.WORKFLOW:
        return <WorkflowComparison />;
      default:
        return <Dashboard data={data} />;
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen font-sans">
      <Sidebar currentView={view} setView={setView} />
      <main className="flex-1 ml-20 lg:ml-64 transition-all duration-300 flex flex-col">
        {/* Disclaimer Banner */}
        <div className="bg-red-950 overflow-hidden py-2 shadow-md z-40 border-b border-red-900">
          <div className="animate-marquee whitespace-nowrap inline-block w-full">
             <span className="text-white font-medium text-sm px-4">
               📢 ข้อมูลประกอบการจำลอง Application นำมาจาก Comment ที่มีอยู่จริงแต่มีการจำลองชื่อผู้พูด
             </span>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
