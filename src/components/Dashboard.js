import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { TrendingUp, Award, Users, Clock, Star, Calendar, ArrowUpRight, Timer, CheckCircle2 } from 'lucide-react';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard = ({ neighbors }) => {
  const router = useRouter();
  
  // Calculate statistics
  const totalParticipants = neighbors.length;
  
  // Calculate proper totals from individual time sources
  const totalHackatimeHours = neighbors.reduce((acc, n) => acc + (n.totalTimeHackatimeHours || 0), 0);
  const totalStopwatchHours = neighbors.reduce((acc, n) => acc + (n.totalTimeStopwatchHours || 0), 0);
  const totalHoursAll = totalHackatimeHours + totalStopwatchHours;
  
  // Use combined hours for eligibility and averages
  const eligibleParticipants = neighbors.filter(n => {
    const combinedHours = (n.totalTimeHackatimeHours || 0) + (n.totalTimeStopwatchHours || 0);
    return combinedHours >= 100;
  }).length;
  
  const averageHours = totalHoursAll / totalParticipants;
  const percentComplete = Math.round((eligibleParticipants / totalParticipants) * 100);
  
  // Distribution data for doughnut chart
  const hourRanges = [
    { range: '0-25', count: 0, color: '#4cc9f0' },
    { range: '25-50', count: 0, color: '#4361ee' },
    { range: '50-75', count: 0, color: '#7209b7' },
    { range: '75-100', count: 0, color: '#f72585' },
    { range: '100+', count: 0, color: '#3a0ca3' },
  ];
  
  neighbors.forEach(n => {
    const hours = (n.totalTimeHackatimeHours || 0) + (n.totalTimeStopwatchHours || 0);
    if (hours >= 100) hourRanges[4].count++;
    else if (hours >= 75) hourRanges[3].count++;
    else if (hours >= 50) hourRanges[2].count++;
    else if (hours >= 25) hourRanges[1].count++;
    else hourRanges[0].count++;
  });
  
  // Doughnut chart data
  const doughnutData = {
    labels: hourRanges.map(r => `${r.range} hrs`),
    datasets: [
      {
        data: hourRanges.map(r => r.count),
        backgroundColor: hourRanges.map(r => r.color),
        borderWidth: 0,
        borderRadius: 4,
        hoverOffset: 5,
      },
    ],
  };

  const doughnutOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = Math.round((value / totalParticipants) * 100);
            return `${label}: ${value} participants (${percentage}%)`;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };
  
  // Bar chart data - top 10 participants
  const top10 = [...neighbors]
    .sort((a, b) => {
      const aCombined = (a.totalTimeHackatimeHours || 0) + (a.totalTimeStopwatchHours || 0);
      const bCombined = (b.totalTimeHackatimeHours || 0) + (b.totalTimeStopwatchHours || 0);
      return bCombined - aCombined;
    })
    .slice(0, 10);
  
  const barData = {
    labels: top10.map(n => {
      // Truncate long names
      const name = n.fullName || 'Unknown';
      return name.length > 10 ? name.substring(0, 10) + '...' : name;
    }),
    datasets: [
      {
        label: 'Hackatime Hours',
        data: top10.map(n => n.totalTimeHackatimeHours),
        backgroundColor: 'rgba(67, 97, 238, 0.8)',
        borderRadius: 4,
      },
      {
        label: 'Stopwatch Hours',
        data: top10.map(n => n.totalTimeStopwatchHours),
        backgroundColor: 'rgba(247, 37, 133, 0.8)',
        borderRadius: 4,
      },
    ],
  };
  
  const barOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
          }
        }
      },
      title: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const handleViewParticipants = () => {
    router.push('/participants');
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 animate-bounce">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Adventure Dashboard!
          </span>
        </h2>
        <div className="badge badge-primary flex items-center gap-1 animate-pulse">
          <Calendar size={14} />
          <span>Last Updated: Today</span>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card stat-card hover:scale-105 transition-transform">
          <div className="stat-icon stat-primary">
            <Users size={24} strokeWidth={2} />
          </div>
          <div className="stat-value">{totalParticipants}</div>
          <div className="stat-label">Adventure Party</div>
          <div className="stat-indicator">
            <div className="stat-indicator-bar" style={{ width: '100%' }}></div>
          </div>
        </div>
        
        <div className="card stat-card hover:scale-105 transition-transform cursor-pointer" onClick={handleViewParticipants}>
          <div className="stat-icon stat-success">
            <Award size={24} strokeWidth={2} />
          </div>
          <div className="stat-value">{eligibleParticipants}</div>
          <div className="stat-label">SF Trip Heroes</div>
          <div className="stat-indicator">
            <div className="stat-indicator-bar" style={{ width: `${percentComplete}%` }}></div>
          </div>
          <p className="text-xs text-right text-gray-500">{percentComplete}% of adventurers</p>
        </div>
        
        <div className="card stat-card hover:scale-105 transition-transform">
          <div className="stat-icon stat-secondary">
            <Clock size={24} strokeWidth={2} />
          </div>
          <div className="stat-value">{averageHours.toFixed(1)}</div>
          <div className="stat-label">Average Quest Time</div>
          <div className="stat-indicator">
            <div className="stat-indicator-bar" style={{ width: `${Math.min(averageHours, 100)}%` }}></div>
          </div>
          <p className="text-xs text-right text-gray-500">{Math.round(averageHours)}% to SF goal</p>
        </div>
        
        <div className="card stat-card hover:scale-105 transition-transform">
          <div className="stat-icon stat-warning">
            <TrendingUp size={24} strokeWidth={2} />
          </div>
          <div className="stat-value">{Math.round(totalHoursAll)}</div>
          <div className="stat-label">Total Adventure Hours</div>
          <div className="flex items-center gap-1 text-success text-sm" style={{marginTop: '0.5rem'}}>
            {/* <ArrowUpRight size={16} /> */}
            {/* <span>+2.4% from last week</span> */}
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3 className="text-lg font-bold">Adventure Progress</h3>
            <div className="chart-legend">
              <div className="chart-legend-item">
                <div className="chart-legend-color" style={{backgroundColor: '#3a0ca3'}}></div>
                <span>100+ hrs</span>
              </div>
              <div className="chart-legend-item">
                <div className="chart-legend-color" style={{backgroundColor: '#f72585'}}></div>
                <span>75-100 hrs</span>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{marginTop: '1rem'}}>
              <div className="flex items-center justify-between p-3" style={{backgroundColor: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)'}}>
                <div className="flex items-center gap-2">
                  <Timer size={16} className="text-primary" />
                  <span className="text-sm font-medium">Hackatime</span>
                </div>
                <span className="text-sm font-bold">{Math.round(totalHackatimeHours)} hrs</span>
              </div>
              <div className="flex items-center justify-between p-3" style={{backgroundColor: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)'}}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span className="text-sm font-medium">Stopwatch</span>
                </div>
                <span className="text-sm font-bold">{Math.round(totalStopwatchHours)} hrs</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3 className="text-lg font-bold">Adventure Leaderboard</h3>
            <div className="badge badge-success flex items-center gap-1">
              <Star size={14} />
              <span>Top Heroes</span>
            </div>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
          <div className="card-footer flex justify-end">
            <button 
              className="button button-outline text-sm flex items-center gap-1 hover:scale-105 transition-transform"
              onClick={handleViewParticipants}
            >
              <Users size={14} />
              <span>View All Adventurers</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Summary Section */}
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h3 className="text-lg font-bold">Adventure Summary</h3>
          <div className="badge badge-primary">SF Quest Challenge</div>
        </div>
        
        <div className="card-body grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Heroes Ready for SF</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{eligibleParticipants}</span>
              <span className="text-sm text-success">+{Math.round(percentComplete)}%</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${percentComplete}%` }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Average Quest Progress</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{averageHours.toFixed(1)} hrs</span>
              <span className="text-sm text-primary">{Math.round(averageHours)}%</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${Math.min(averageHours, 100)}%` }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Adventure Time</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{Math.round(totalHoursAll)} hrs</span>
              <span className="text-sm text-accent">~{Math.round(totalHoursAll / 100)} SF trips</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 