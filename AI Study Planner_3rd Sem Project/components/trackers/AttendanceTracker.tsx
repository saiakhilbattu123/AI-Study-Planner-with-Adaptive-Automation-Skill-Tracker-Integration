
import React from 'react';
import type { SubjectAttendance } from '../../types';
import { Check, X, Minus } from 'lucide-react';
import { mockAttendance } from '../../data/mockData';

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const StatusIcon = ({ status }: { status: 'present' | 'absent' | 'none' }) => {
  switch (status) {
    case 'present':
      return <div className="w-5 h-5 flex items-center justify-center bg-green-100 rounded-full"><Check className="w-3 h-3 text-green-600" /></div>;
    case 'absent':
      return <div className="w-5 h-5 flex items-center justify-center bg-red-100 rounded-full"><X className="w-3 h-3 text-red-600" /></div>;
    default:
      return <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full"><Minus className="w-3 h-3 text-gray-400" /></div>;
  }
};

const AttendanceTracker: React.FC = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-bold text-lg text-brand-charcoal">Detailed Attendance</h4>
      <div className="space-y-1 text-xs text-center text-brand-gray font-semibold grid grid-cols-[2fr_repeat(7,1fr)] gap-1">
        <div className="text-left">Subject</div>
        {dayLabels.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="space-y-3">
        {mockAttendance.map((subject, index) => (
          <div key={index} className="grid grid-cols-[2fr_repeat(7,1fr)] items-center gap-1 p-2 rounded-lg bg-brand-beige">
            <p className="text-sm font-semibold text-brand-charcoal truncate pr-2">{subject.name}</p>
            {subject.days.map((status, dayIndex) => (
              <div key={dayIndex} className="flex justify-center">
                <StatusIcon status={status} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceTracker;