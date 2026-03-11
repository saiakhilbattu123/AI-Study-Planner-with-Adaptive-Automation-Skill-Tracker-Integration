
import React from 'react';
import type { ActiveView } from '../types';
// FIX: Replaced BarChart3 with Trophy for consistency with LeftSidebar and to match the 'Goal Tracker' view.
import { LayoutDashboard, ListChecks, Target, FlaskConical, Trophy } from 'lucide-react';

interface RightSidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const navItems: { name: ActiveView; icon: React.ReactNode }[] = [
  { name: 'Dashboard', icon: <LayoutDashboard className="w-6 h-6" /> },
  { name: 'Attendance', icon: <ListChecks className="w-6 h-6" /> },
  { name: 'CIE Tracker', icon: <Target className="w-6 h-6" /> },
  { name: 'Lab Uploads', icon: <FlaskConical className="w-6 h-6" /> },
  // FIX: Changed 'Skill Tracker' to 'Goal Tracker' to match the ActiveView type definition and fix the type error.
  { name: 'Goal Tracker', icon: <Trophy className="w-6 h-6" /> },
];

const RightSidebar: React.FC<RightSidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <div className="bg-brand-card rounded-xl shadow-sm flex flex-col h-full p-4">
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveView(item.name)}
            className={`w-full flex items-center space-x-4 p-3 rounded-lg font-semibold transition-all duration-200 ease-in-out ${
              activeView === item.name
                ? 'bg-brand-red text-white shadow-md'
                : 'text-brand-gray hover:bg-brand-beige hover:text-brand-charcoal'
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default RightSidebar;