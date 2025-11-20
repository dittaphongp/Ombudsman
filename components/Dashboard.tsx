
import React, { useMemo } from 'react';
import { SocialComment } from '../types';
import { getSectionInfo } from '../services/dataService';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { AlertTriangle, ThumbsDown, Activity, Scale, FileText, Phone, Smartphone, Globe, Mail } from 'lucide-react';

interface DashboardProps {
  data: SocialComment[];
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const stats = useMemo(() => {
    const total = data.length;
    const negative = data.filter(c => c.sentiment === 'negative').length;
    
    // Group by Constitution Section
    const sections = data.reduce((acc, curr) => {
      const key = curr.constitutionSection;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Sort sections
    const sortedSections = Object.entries(sections).sort((a, b) => (b[1] as number) - (a[1] as number));
    
    return {
      total,
      negative,
      sections: sortedSections,
      topSection: sortedSections[0]?.[0] || 'N/A'
    };
  }, [data]);

  const chartData = stats.sections.map(([key, value]) => ({
    name: getSectionInfo(key).label.split(' ')[0], // Just Get "ม.53" etc
    fullName: getSectionInfo(key).label,
    count: value
  }));

  const sentimentData = [
    { name: 'Positive', value: data.filter(c => c.sentiment === 'positive').length },
    { name: 'Neutral', value: data.filter(c => c.sentiment === 'neutral').length },
    { name: 'Negative', value: data.filter(c => c.sentiment === 'negative').length },
  ];

  // Data from 2024 Annual Report (Page 103)
  const channelData = [
    { name: 'ไปรษณีย์/ยื่นเอง', value: 66.36, icon: <Mail /> }, // 49.49 + 16.87
    { name: 'เว็บไซต์ (Web)', value: 23.30, icon: <Globe /> },
    { name: 'แอปพลิเคชัน', value: 7.94, icon: <Smartphone /> },
    { name: 'สายด่วน 1676', value: 1.02, icon: <Phone /> },
    { name: 'อื่นๆ/เครือข่าย', value: 1.38, icon: <Activity /> },
  ];

  // Red, Gray, Slate scheme
  const COLORS = ['#22c55e', '#94a3b8', '#dc2626'];
  const CHANNEL_COLORS = ['#1e293b', '#334155', '#475569', '#ef4444', '#64748b'];
  const BAR_COLOR = '#dc2626'; // Red-600

  return (
    <div className="p-6 lg:p-10 bg-slate-100 min-h-screen">
      <div className="mb-8 border-b pb-4 border-slate-300">
        <div className="flex items-center gap-2 mb-2">
            <span className="bg-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-slate-300">Report 2024</span>
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-red-200">ITA Score 84.86</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">แดชบอร์ด "หน้าที่ของรัฐ" (Constitution Watch)</h2>
        <p className="text-slate-600 mt-2">ติดตามการปฏิบัติหน้าที่ตาม รธน. หมวด 5 และสถิติเรื่องร้องเรียน (ปีงบประมาณ 2567)</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute right-0 top-0 h-full w-1 bg-slate-500"></div>
          <div className="p-4 rounded-full bg-slate-100 text-slate-600">
            <FileText className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-slate-500 font-medium">เรื่องร้องเรียนรวม</p>
            <h3 className="text-2xl font-bold text-slate-800">5,316<span className="text-xs text-slate-400 ml-1">(รายงานปี 67)</span></h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute right-0 top-0 h-full w-1 bg-red-600"></div>
          <div className="p-4 rounded-full bg-red-50 text-red-600">
            <ThumbsDown className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-slate-500 font-medium">ความไม่พึงพอใจ (AI)</p>
            <h3 className="text-2xl font-bold text-slate-800">{stats.negative.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute right-0 top-0 h-full w-1 bg-red-400"></div>
          <div className="p-4 rounded-full bg-red-50 text-red-500">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-slate-500 font-medium">ประเด็นสูงสุด</p>
            <h3 className="text-lg font-bold text-slate-800 line-clamp-1">
                {getSectionInfo(stats.topSection).label.split(' ')[1] || getSectionInfo(stats.topSection).label}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute right-0 top-0 h-full w-1 bg-green-600"></div>
          <div className="p-4 rounded-full bg-green-50 text-green-600">
            <Activity className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-slate-500 font-medium">คะแนน ITA 2567</p>
            <h3 className="text-2xl font-bold text-green-600">84.86<span className="text-sm text-slate-400 ml-1">คะแนน</span></h3>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-[450px]">
          <div className="mb-6 border-b border-slate-100 pb-4">
             <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-red-600" />
                ประเด็นตามรายมาตรา (AI Analysis)
             </h3>
             <p className="text-xs text-slate-400 mt-1">จำแนกโดย NLP Model จากข้อความร้องเรียน (Top Issues)</p>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#f1f5f9" />
              <XAxis type="number" />
              <YAxis dataKey="fullName" type="category" width={150} tick={{fontSize: 10, fill: '#64748b'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                cursor={{fill: '#f8fafc'}}
              />
              <Bar dataKey="count" fill={BAR_COLOR} radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-[450px]">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-red-600" />
                ช่องทางการร้องเรียน (2567)
            </h3>
            <p className="text-xs text-slate-400 mt-1">สถิติจากรายงานประจำปี (Omnichannel)</p>
          </div>
          <div className="flex h-full items-center justify-center">
             <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                    <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="none"
                    >
                        {channelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHANNEL_COLORS[index % CHANNEL_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value: number) => `${value}%`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} 
                    />
                    <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right"
                        wrapperStyle={{ fontSize: '12px' }}
                    />
                </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Efficiency Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
         <div className="mb-4 border-b border-slate-100 pb-4 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-bold text-slate-900">ประสิทธิภาพการรับเรื่อง (Intake Efficiency)</h3>
                <p className="text-xs text-slate-400 mt-1">เปรียบเทียบระยะเวลาวินิจฉัย (Human vs AI Assisted)</p>
            </div>
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                AI ลดเวลา 95%
            </div>
         </div>
         <div className="flex items-end justify-around h-48 px-10 pb-6">
              <div className="flex flex-col items-center gap-2 group justify-end w-1/3">
                  <div className="w-full max-w-[100px] bg-slate-300 h-32 rounded-t-lg relative group-hover:bg-slate-400 transition-all flex items-end justify-center pb-2">
                     <span className="text-slate-600 font-bold text-sm">45 นาที</span>
                  </div>
                  <div className="text-slate-500 text-xs font-semibold text-center">Human (As-Is)</div>
              </div>
              <div className="flex flex-col items-center gap-2 group justify-end w-1/3">
                  <div className="w-full max-w-[100px] bg-red-600 h-6 rounded-t-lg relative group-hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-end justify-center pb-1">
                     <span className="text-white font-bold text-xs absolute -top-6 text-red-600">2 นาที</span>
                  </div>
                  <div className="text-red-600 text-xs font-bold text-center">AI Assisted (To-Be)</div>
              </div>
         </div>
      </div>

    </div>
  );
};

export default Dashboard;
