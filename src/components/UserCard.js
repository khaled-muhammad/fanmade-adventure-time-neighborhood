import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaGithub, FaSlack } from 'react-icons/fa';
import { Plane, Timer, Clock, ExternalLink, Award, Map, CheckCircle2, Clock8 } from 'lucide-react';
import ProgressBar from './ProgressBar';

const UserCard = ({ user }) => {
  const router = useRouter();
  const {
    id,
    username,
    pfp,
    fullName,
    githubUsername,
    totalCheckedTime,
    totalTimeHackatimeHours,
    totalTimeStopwatchHours,
    totalTimeCombinedHours,
    airport,
    slackFullName,
  } = user;

  const isEligible = totalCheckedTime >= 100;
  const percentComplete = Math.min(Math.round((totalCheckedTime / 100) * 100), 100);
  
  // Create user URL using ID or username
  const userUrl = `/user/${id || username || encodeURIComponent(fullName)}`;
  
  const handleCardClick = (e) => {
    // Don't navigate if clicking on external links
    if (e.target.closest('a[href^="http"]')) {
      return;
    }
    router.push(userUrl);
  };
  
  return (
    <div className="card user-card cursor-pointer transition-all duration-200 hover:scale-105" onClick={handleCardClick}>
      <div className="user-card-header">
        <div className="user-avatar">
          <Image
            src={pfp || '/default-avatar.png'}
            alt={fullName || 'Participant'}
            fill
            className="avatar"
          />
          {isEligible && (
            <div className="user-avatar-badge">
              <Award size={12} />
            </div>
          )}
        </div>
        
        <div className="user-info">
          <h3 className="user-name">{fullName || username || 'Anonymous'}</h3>
          
          <div className="user-tags">
            {githubUsername && (
              <a 
                href={`https://github.com/${githubUsername}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="user-tag"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub />
                <span className="truncate">{githubUsername}</span>
              </a>
            )}
            
            {slackFullName && slackFullName[0] && (
              <div className="user-tag">
                <FaSlack style={{color: '#4A154B'}} />
                <span className="truncate">{slackFullName[0]}</span>
              </div>
            )}
            
            {airport && (
              <div className="user-tag">
                <Plane className="text-accent" size={12} />
                <span>{airport}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Highlighted total checked time section */}
      <div className="user-checked-time">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-primary" />
          <div>
            <div className="user-checked-time-label">Checked Time</div>
            <div className="user-checked-time-value">
              {totalCheckedTime.toFixed(1)}
              <span className="user-checked-time-unit">hrs</span>
            </div>
          </div>
        </div>
        <div className={`user-checked-status ${isEligible ? 'eligible' : 'ineligible'}`}>
          {isEligible ? 'Eligible' : `${100 - Math.floor(totalCheckedTime)} hrs to go`}
        </div>
      </div>
      
      <div className="user-card-body">
        <div className="user-progress">
          <div className="user-progress-header">
            <span className="user-progress-title">Progress to SF Trip</span>
            <span className="user-progress-percentage">{percentComplete}%</span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{totalCheckedTime.toFixed(1)} hours</span>
            <span>100 hours goal</span>
          </div>
        </div>
        
        <div className="user-stats grid grid-cols-3 gap-2 mt-3">
          <div className="user-stat flex flex-col items-center text-center p-2">
            <div className="user-stat-header mb-1">
              <Timer size={16} className="text-primary" />
              <span className="text-xs font-medium ml-1">Hackatime</span>
            </div>
            <div className="user-stat-value text-base font-bold">{totalTimeHackatimeHours.toFixed(1)}h</div>
          </div>
          
          <div className="user-stat flex flex-col items-center text-center p-2">
            <div className="user-stat-header mb-1">
              <Clock size={16} className="text-accent" />
              <span className="text-xs font-medium ml-1">Stopwatch</span>
            </div>
            <div className="user-stat-value text-base font-bold">{totalTimeStopwatchHours.toFixed(1)}h</div>
          </div>
          
          <div className="user-stat flex flex-col items-center text-center p-2">
            <div className="user-stat-header mb-1">
              <Clock8 size={16} className="text-secondary" />
              <span className="text-xs font-medium ml-1">Combined</span>
            </div>
            <div className="user-stat-value text-base font-bold">{totalTimeCombinedHours.toFixed(1)}h</div>
          </div>
        </div>
        
        <div className="user-card-footer">
          <div className="user-details-link">
            <span>View Adventure Details</span>
            <ExternalLink size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard; 