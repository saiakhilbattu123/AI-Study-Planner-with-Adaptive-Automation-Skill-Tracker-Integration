import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Pencil, Check, Plus, X } from 'lucide-react';
import { HackerRankIcon, LeetCodeIcon, GfgIcon } from '../icons';
import { skillData, mockDesiredSkills } from '../../data/mockData';

const SkillTracker: React.FC = () => {
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [targetCGPA, setTargetCGPA] = useState('9.00');
  const [isEditingTargetCGPA, setIsEditingTargetCGPA] = useState(false);
  const [goals, setGoals] = useState<string[]>(mockDesiredSkills);
  const [newGoal, setNewGoal] = useState('');


  useEffect(() => {
    // Delay chart rendering to prevent animation glitches on view change.
    // This waits for the sidebar animation to complete before drawing the chart.
    const timer = setTimeout(() => {
      setIsChartVisible(true);
    }, 350); // A little longer than the sidebar's 300ms transition.

    return () => clearTimeout(timer);
  }, []);

  const handleSaveTargetCGPA = () => {
    const newTarget = parseFloat(targetCGPA);
    if (!isNaN(newTarget) && newTarget >= 0 && newTarget <= 10) {
      setTargetCGPA(newTarget.toFixed(2));
    } else {
      // If input is invalid, reset to a default valid state.
      setTargetCGPA('9.00'); 
    }
    setIsEditingTargetCGPA(false);
  };

  const handleTargetCGPAKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveTargetCGPA();
    }
  };

  const handleAddNewGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim() && !goals.includes(newGoal.trim())) {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal('');
    }
  };

  const handleRemoveGoal = (indexToRemove: number) => {
    setGoals(goals.filter((_, index) => index !== indexToRemove));
  };


  return (
    <div className="space-y-6">
      <h4 className="font-bold text-lg text-brand-charcoal">Academic Goals & Progress</h4>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="p-2 bg-brand-beige rounded-lg">
            <p className="text-brand-gray">Current CGPA</p>
            <p className="font-bold text-lg">8.75</p>
        </div>
        <div className="p-2 bg-brand-beige rounded-lg">
            <p className="text-brand-gray flex items-center justify-center space-x-1">
                <span>Target CGPA</span> 
                {isEditingTargetCGPA ? (
                    <Check 
                        className="w-3 h-3 cursor-pointer text-green-600 hover:text-green-800"
                        onClick={handleSaveTargetCGPA}
                        aria-label="Save Target CGPA"
                    />
                ) : (
                    <Pencil 
                        className="w-3 h-3 cursor-pointer hover:text-brand-red"
                        onClick={() => setIsEditingTargetCGPA(true)}
                        aria-label="Edit Target CGPA"
                    />
                )}
            </p>
            {isEditingTargetCGPA ? (
                <input
                    type="number"
                    value={targetCGPA}
                    onChange={(e) => setTargetCGPA(e.target.value)}
                    onBlur={handleSaveTargetCGPA}
                    onKeyDown={handleTargetCGPAKeyDown}
                    className="font-bold text-lg text-brand-red bg-white/50 w-full text-center outline-none ring-1 ring-brand-red/50 rounded-sm"
                    step="0.01"
                    min="0"
                    max="10"
                    autoFocus
                />
            ) : (
                <p 
                    className="font-bold text-lg text-brand-red cursor-pointer"
                    onClick={() => setIsEditingTargetCGPA(true)}
                >
                    {targetCGPA}
                </p>
            )}
        </div>
        <div className="p-2 bg-brand-beige rounded-lg">
            <p className="text-brand-gray">Last SGPA</p>
            <p className="font-bold text-lg">8.92</p>
        </div>
      </div>

      {/* My Learning Goals */}
      <div className="space-y-2">
        <h5 className="font-semibold text-brand-charcoal">My Learning Goals</h5>
        <form onSubmit={handleAddNewGoal} className="flex gap-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="e.g., Learn Cloud Computing"
            className="flex-1 w-full px-3 py-2 text-sm bg-brand-beige border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-red/50"
          />
          <button
            type="submit"
            aria-label="Add new goal"
            className="p-2 text-white bg-brand-red rounded-lg disabled:bg-red-300 hover:bg-red-700 transition-colors"
            disabled={!newGoal.trim()}
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>
        <div className="flex flex-wrap gap-2 pt-2">
          {goals.map((goal, index) => (
            <span key={index} className="flex items-center text-xs bg-red-100 text-brand-red px-2.5 py-1 rounded-full font-medium">
              {goal}
              <button 
                onClick={() => handleRemoveGoal(index)} 
                aria-label={`Remove ${goal}`}
                className="ml-1.5 p-0.5 rounded-full hover:bg-red-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Coding Profiles */}
      <div className="space-y-2">
        <h5 className="font-semibold text-brand-charcoal">Coding Profiles</h5>
        <div className="flex justify-around p-3 bg-brand-beige rounded-lg">
            <a href="#" className="flex flex-col items-center text-brand-gray hover:text-brand-charcoal transition-colors"><HackerRankIcon className="h-8 w-8" /><span className="text-xs mt-1">500+</span></a>
            <a href="#" className="flex flex-col items-center text-brand-gray hover:text-brand-charcoal transition-colors"><LeetCodeIcon className="h-8 w-8" /><span className="text-xs mt-1">200+</span></a>
            <a href="#" className="flex flex-col items-center text-brand-gray hover:text-brand-charcoal transition-colors"><GfgIcon className="h-8 w-8" /><span className="text-xs mt-1">Top 5%</span></a>
        </div>
      </div>

      {/* Skill Proficiency */}
      <div>
        <h5 className="font-semibold text-brand-charcoal mb-2">Current Skill Proficiency</h5>
        <div style={{ width: '100%', height: 250 }}>
          {isChartVisible ? (
            <ResponsiveContainer>
              <BarChart
                data={skillData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#666666' }} />
                <YAxis 
                  type="category" 
                  dataKey="subject" 
                  width={80} 
                  tick={{ fontSize: 10, fill: '#333333' }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                  cursor={{ fill: '#F7F3E8' }}
                  contentStyle={{
                    backgroundColor: '#FDFBF5',
                    borderRadius: '8px',
                    borderColor: '#e0e0e0'
                  }}
                />
                <Bar dataKey="A" name="Proficiency" fill="#C0392B" barSize={15} radius={[0, 10, 10, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full bg-brand-beige/50 rounded-lg animate-pulse" />
          )}
        </div>
      </div>

    </div>
  );
};

export default SkillTracker;