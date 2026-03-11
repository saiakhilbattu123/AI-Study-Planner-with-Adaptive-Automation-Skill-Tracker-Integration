
import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockCieData } from '../../data/mockData';
import type { SubjectCie } from '../../types';

// Helper function to convert total marks (out of 100) to a grade point (out of 10)
const getGradePoint = (totalMarks: number): number => {
  if (totalMarks >= 90) return 10;
  if (totalMarks >= 80) return 9;
  if (totalMarks >= 70) return 8;
  if (totalMarks >= 60) return 7;
  if (totalMarks >= 50) return 6;
  if (totalMarks >= 40) return 5;
  return 0; // Fail
};


const SubjectCard: React.FC<{ 
    subject: SubjectCie; 
    semMark: number;
    onSemMarkChange: (mark: number) => void;
}> = ({ subject, semMark, onSemMarkChange }) => {
    // FIX: Explicitly type the accumulator 'sum' as a number to prevent TypeScript from inferring it as 'unknown'.
    const totalCie = Object.values(subject.marks).reduce((sum: number, mark) => sum + Number(mark), 0);

    return (
        <div className="p-4 bg-brand-beige rounded-lg space-y-3">
            <div className="flex justify-between items-start">
                <div>
                    <h6 className="font-bold text-brand-charcoal">{subject.name}</h6>
                    <p className="text-xs text-brand-gray">Credits: {subject.credits}</p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-sm">{totalCie} / 40</p>
                    <p className="text-xs text-brand-gray">Total CIE</p>
                </div>
            </div>

            {/* Marks Breakdown */}
            <details>
                <summary className="text-xs font-semibold text-brand-red cursor-pointer">View CIE Breakdown</summary>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mt-2 pl-2">
                    {Object.entries(subject.marks).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                            <span className="text-brand-gray">{key}:</span>
                            <span className="font-semibold">{value}</span>
                        </div>
                    ))}
                </div>
            </details>
            
            {/* SGPA Calculator */}
            <div className="pt-2 border-t border-brand-red/20">
              <label htmlFor={`sem-marks-${subject.name}`} className="flex justify-between text-sm font-medium text-brand-gray mb-1">
                <span>Expected SEE Marks</span>
                <span className="font-bold text-brand-charcoal">{semMark} / 60</span>
              </label>
              <input
                id={`sem-marks-${subject.name}`}
                type="range"
                min="0"
                max="60"
                value={semMark}
                onChange={(e) => onSemMarkChange(Number(e.target.value))}
                className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-brand-red"
              />
            </div>
        </div>
    );
};


const CIETracker: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>(mockCieData[0].semester);
  const [semMarks, setSemMarks] = useState<{ [subjectName: string]: number }>({});
  
  const currentSemesterData = useMemo(() => 
    mockCieData.find(data => data.semester === selectedSemester) || mockCieData[0],
    [selectedSemester]
  );
  
  // Initialize or reset semester marks when the selected semester changes
  useEffect(() => {
    const initialMarks: { [subjectName: string]: number } = {};
    if (currentSemesterData) {
        currentSemesterData.subjects.forEach(subject => {
            initialMarks[subject.name] = 45; // Default expected marks
        });
    }
    setSemMarks(initialMarks);
  }, [currentSemesterData]);


  const handleSemesterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(event.target.value);
  };

  const handleSubjectSemMarkChange = (subjectName: string, mark: number) => {
    setSemMarks(prev => ({
        ...prev,
        [subjectName]: mark,
    }));
  };

  // Calculate the final projected SGPA
  const projectedSgpa = useMemo(() => {
    if (!currentSemesterData || Object.keys(semMarks).length === 0) return '0.00';

    let totalWeightedGradePoints = 0;
    let totalCredits = 0;

    currentSemesterData.subjects.forEach(subject => {
        // FIX: Explicitly type the accumulator 'sum' as a number to prevent TypeScript from inferring it as 'unknown'.
        const cieMarks = Object.values(subject.marks).reduce((sum: number, mark) => sum + Number(mark), 0);
        const seeMarks = semMarks[subject.name] || 0;
        const totalMarks = cieMarks + seeMarks;
        const gradePoint = getGradePoint(totalMarks);

        totalWeightedGradePoints += gradePoint * subject.credits;
        totalCredits += subject.credits;
    });

    if (totalCredits === 0) return '0.00';

    const sgpa = totalWeightedGradePoints / totalCredits;
    return sgpa.toFixed(2);
  }, [currentSemesterData, semMarks]);


  // Generate performance data for the graph (SGPA trend)
  const performanceData = mockCieData
    .filter(data => data.actualSGPA)
    .map(data => ({
      name: `Sem ${data.semester.charAt(0)}`,
      sgpa: data.actualSGPA,
    }))
    .reverse();

  return (
    <div className="space-y-6">
      <h4 className="font-bold text-lg text-brand-charcoal">CIE Marks & SGPA Projection</h4>
      
      {/* Semester Selector */}
      <div>
        <label htmlFor="semester" className="text-sm font-medium text-brand-gray">Select Semester to View</label>
        <select 
          id="semester" 
          className="w-full mt-1 p-2 bg-brand-beige border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-red"
          value={selectedSemester}
          onChange={handleSemesterChange}
        >
          {mockCieData.map(data => (
            <option key={data.semester} value={data.semester}>
              {data.semester}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Cards for marks and projection */}
      <div className="space-y-4">
        {currentSemesterData?.subjects.map(subject => (
            <SubjectCard 
                key={subject.name}
                subject={subject}
                semMark={semMarks[subject.name] || 0}
                onSemMarkChange={(mark) => handleSubjectSemMarkChange(subject.name, mark)}
            />
        ))}
      </div>
      
       {/* Final Projected SGPA */}
      <div className="sticky bottom-0 p-4 bg-red-100/80 border-t-2 border-brand-red rounded-t-xl backdrop-blur-sm text-center">
        <span className="font-semibold text-lg text-brand-charcoal">
            Projected SGPA: <strong className="text-brand-red text-2xl tracking-tight">{projectedSgpa}</strong>
        </span>
      </div>

      {/* Performance Graph */}
      <div>
        <h5 className="font-semibold mb-2 text-brand-charcoal">SGPA Performance Trend</h5>
        <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
                <LineChart data={performanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="sgpa" name="SGPA" stroke="#C0392B" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CIETracker;
