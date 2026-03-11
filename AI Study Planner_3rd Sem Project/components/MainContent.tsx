


import React from 'react';
import AIChat from './AIChat';
import { CheckCircle2, Clock } from 'lucide-react';
import type { ActiveView } from '../types';
import AttendanceTracker from './trackers/AttendanceTracker';
import CIETracker from './trackers/CIETracker';
import LabUploads from './trackers/LabUploads';
import SkillTracker from './trackers/SkillTracker';

interface MainContentProps {
  activeView: ActiveView;
}

const DashboardView: React.FC = () => (
    <div className="flex flex-col h-full space-y-6">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-brand-card rounded-xl shadow-sm flex flex-col">
          <h3 className="font-bold text-brand-charcoal mb-2">Class Attendance (Today)</h3>
          <div className="flex items-center space-x-2 mt-auto">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
            <span className="text-xl font-semibold">4/5 Classes Attended</span>
          </div>
        </div>
        <div className="p-4 bg-brand-card rounded-xl shadow-sm flex flex-col">
          <h3 className="font-bold text-brand-charcoal mb-2">Biometric Status</h3>
          <div className="flex items-center space-x-4 mt-auto">
            <div className="flex items-center space-x-1 text-sm">
                <Clock className="w-4 h-4 text-brand-gray" />
                <span>In Time: <strong>09:15 AM</strong></span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
                 <Clock className="w-4 h-4 text-brand-gray" />
                <span>Out Time: <strong>--</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Box */}
      <div className="animated-chat-bg flex-1 rounded-xl shadow-sm flex flex-col min-h-0">
        <AIChat />
      </div>
    </div>
);

const TrackerView: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-brand-card rounded-xl shadow-sm h-full p-6 overflow-y-auto">
        {children}
    </div>
);


const MainContent: React.FC<MainContentProps> = ({ activeView }) => {
  switch (activeView) {
    case 'Attendance':
      return <TrackerView><AttendanceTracker /></TrackerView>;
    case 'CIE Tracker':
      return <TrackerView><CIETracker /></TrackerView>;
    case 'Lab Uploads':
      return <TrackerView><LabUploads /></TrackerView>;
    case 'Goal Tracker':
      return <TrackerView><SkillTracker /></TrackerView>;
    case 'Dashboard':
    default:
      return <DashboardView />;
  }
};

export default MainContent;