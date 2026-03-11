import React, { useState, useRef, useEffect } from 'react';
import type { Student, ActiveView } from '../types';
import { LayoutDashboard, ListChecks, Target, FlaskConical, Trophy } from 'lucide-react';

const navItems: { name: ActiveView; icon: React.ReactNode }[] = [
  { name: 'Dashboard', icon: <LayoutDashboard className="w-6 h-6" /> },
  { name: 'Attendance', icon: <ListChecks className="w-6 h-6" /> },
  { name: 'CIE Tracker', icon: <Target className="w-6 h-6" /> },
  { name: 'Lab Uploads', icon: <FlaskConical className="w-6 h-6" /> },
  { name: 'Goal Tracker', icon: <Trophy className="w-6 h-6" /> },
];

interface LeftSidebarProps {
  student: Student;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ student, activeView, setActiveView }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const timerRef = useRef<number | null>(null);

    // Clean up the timer on component unmount to prevent memory leaks.
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const handleMouseEnter = () => {
        // Cancel any pending collapse timer.
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        // Expand the sidebar immediately.
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        // Set a short delay before collapsing. This improves usability by
        // preventing accidental collapses if the user's mouse briefly moves away.
        timerRef.current = window.setTimeout(() => {
            setIsExpanded(false);
        }, 200);
    };
    
    const handleNavClick = (view: ActiveView) => {
        setActiveView(view);
        // Programmatically collapse the sidebar for a smooth transition,
        // ensuring the main content area has stabilized before new components render.
        setIsExpanded(false);
        // Clear any pending timers to prevent unexpected behavior.
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }


    return (
    <aside 
        className={`relative z-20 flex flex-col h-screen bg-brand-card shadow-lg text-brand-charcoal transition-all duration-300 ease-in-out ${isExpanded ? 'w-72' : 'w-20'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
      {/* Student Profile */}
      <div className="flex items-center p-4 border-b border-gray-200/70 h-20">
          <img src={student.profilePicUrl} alt="Profile" className="w-12 h-12 rounded-full flex-shrink-0" />
          {/* Synchronized transition duration for a smoother visual effect. */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'ml-3 opacity-100' : 'w-0 opacity-0'}`}>
              <h2 className="font-bold text-sm truncate whitespace-nowrap">{student.name}</h2>
              <p className="text-xs text-brand-gray truncate whitespace-nowrap">{student.studentId}</p>
          </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavClick(item.name)}
            title={item.name}
            className={`w-full flex items-center p-3 rounded-lg font-semibold transition-colors duration-200 ease-in-out group ${
              activeView === item.name
                ? 'bg-brand-red text-white shadow-md'
                : 'text-brand-gray hover:bg-brand-beige'
            } ${!isExpanded && 'justify-center'}`}
          >
            <div className={`${activeView !== item.name && 'group-hover:text-brand-red'}`}>{item.icon}</div>
            {/* Synchronized transition duration */}
            <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isExpanded ? 'ml-4 opacity-100' : 'w-0 opacity-0'}`}>
                {item.name}
            </span>
          </button>
        ))}
      </nav>
      
    </aside>
  );
};

export default LeftSidebar;