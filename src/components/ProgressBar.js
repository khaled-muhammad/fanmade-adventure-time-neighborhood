import React from 'react';

const ProgressBar = ({ current, goal, label, showPercentage = true }) => {
  const percentage = Math.min(Math.round((current / goal) * 100), 100);
  
  return (
    <div style={{marginBottom: '1rem'}}>
      {label && (
        <div className="flex justify-between" style={{marginBottom: '0.25rem'}}>
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && <span className="text-sm font-medium text-primary">{percentage}%</span>}
        </div>
      )}
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between" style={{marginTop: '0.25rem'}}>
        <span className="text-xs text-gray-500">{current.toFixed(1)} hours</span>
        <span className="text-xs text-gray-500">{goal} hours</span>
      </div>
    </div>
  );
};

export default ProgressBar; 