
import React from 'react';
import { Upload, History } from 'lucide-react';
import { upcomingLabs, pastLabs } from '../../data/mockData';

const LabUploads: React.FC = () => {
  return (
    <div className="space-y-6">
      <h4 className="font-bold text-lg text-brand-charcoal">Upcoming Lab Submissions</h4>
      <div className="space-y-3">
        {upcomingLabs.map((lab) => (
          <div key={lab.id} className="p-3 bg-brand-beige rounded-lg flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">{lab.name}</p>
              <p className="text-xs text-red-600">{lab.deadline}</p>
            </div>
            <button className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-white bg-brand-red rounded-lg hover:bg-red-700 transition-colors">
              <Upload className="w-3 h-3" />
              <span>Upload</span>
            </button>
          </div>
        ))}
      </div>
      
      <details className="pt-4 border-t">
        <summary className="font-semibold text-brand-charcoal cursor-pointer flex items-center space-x-2">
            <History className="w-4 h-4 text-brand-gray"/>
            <span>Past Submissions</span>
        </summary>
        <div className="mt-3 space-y-3">
          {pastLabs.map((lab) => (
             <div key={lab.id} className="p-3 bg-gray-100 rounded-lg">
                <p className="font-semibold text-sm text-gray-700">{lab.name}</p>
                <p className="text-xs text-gray-500">{lab.deadline}</p>
             </div>
          ))}
        </div>
      </details>
    </div>
  );
};

export default LabUploads;