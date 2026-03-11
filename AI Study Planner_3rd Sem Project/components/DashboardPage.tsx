import React, { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import MainContent from './MainContent';
import NotificationPanel from './NotificationPanel';
import type { Student, Notification, ActiveView } from '../types';
import { mockStudent, mockNotifications } from '../data/mockData';

const DashboardPage: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('Dashboard');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  return (
    <div className="flex h-screen bg-transparent overflow-hidden">
      <LeftSidebar 
        student={mockStudent} 
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <main className="flex-1 overflow-y-auto p-6 relative">
        <NotificationPanel 
            notifications={notifications}
            setNotifications={setNotifications}
        />
        <div className="h-full">
            <MainContent activeView={activeView} />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;