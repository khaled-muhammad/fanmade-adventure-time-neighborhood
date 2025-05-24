import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import UserCard from '../../components/UserCard';
import { 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  Github, 
  MapPin, 
  Award, 
  Timer,
  Calendar,
  TrendingUp,
  Star,
  Target,
  Zap,
  Clock8,
  CheckCircle2,
  Share2,
  Download
} from 'lucide-react';
import { fetchNeighbors } from '../../utils/api';

export default function UserDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadUserData = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const data = await fetchNeighbors();
      const foundUser = data.find(u => 
        u.id === id || 
        u.username === id || 
        u.fullName === id ||
        encodeURIComponent(u.fullName) === id
      );
      
      if (foundUser) {
        setUser(foundUser);
        setError(null);
      } else {
        setError('User not found in the adventure party!');
      }
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      setError('Failed to load user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadUserData();
  }, [id]);
  
  const handleRefresh = async () => {
    return loadUserData();
  };

  const handleNavigate = (page) => {
    router.push(`/${page}`);
  };

  const handleBack = () => {
    router.push('/participants');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${user?.fullName || user?.username}'s Adventure Progress`,
        text: `Check out ${user?.fullName || user?.username}'s progress in the SF Trip Challenge!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };
  
  if (loading) {
    return (
      <>
        <Head>
          <title>Loading User | Neighborhood SF Trip Challenge</title>
          <meta name="description" content="Loading user details for the Adventure Time SF trip challenge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Layout onRefresh={handleRefresh} onNavigate={handleNavigate}>
          <div className="min-h-screen flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-6 border-primary border-t-accent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-20 h-20 border-6 border-transparent border-b-secondary rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Adventure Profile...</h2>
              <p className="text-gray-600 font-medium">Gathering magical data from the land of Ooo</p>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  if (error || !user) {
    return (
      <>
        <Head>
          <title>User Not Found | Neighborhood SF Trip Challenge</title>
          <meta name="description" content="User not found in the Adventure Time SF trip challenge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Layout onRefresh={handleRefresh} onNavigate={handleNavigate}>
          <div className="min-h-screen flex items-center justify-center py-20">
            <div className="card max-w-md w-full" style={{ 
              background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 140, 0, 0.1))', 
              border: '3px solid var(--color-danger)',
              borderRadius: 'var(--radius-2xl)'
            }}>
              <div className="card-body text-center py-12">
                <div className="text-8xl mb-6 animate-bounce">😵</div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Oh my Glob!</h2>
                <p className="text-danger font-semibold mb-8 text-lg">{error}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={handleBack}
                    className="button-outline flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    Back to Party
                  </button>
                  <button 
                    onClick={handleRefresh}
                    className="button-primary flex items-center justify-center gap-2"
                  >
                    <Zap size={18} />
                    Try Again, Dude!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  const isEligible = user.totalCheckedTime >= 100;
  const progressPercentage = Math.min(Math.round((user.totalCheckedTime / 100) * 100), 100);
  const hoursRemaining = Math.max(0, 100 - user.totalCheckedTime);
  
  return (
    <>
      <Head>
        <title>{user.fullName || user.username || 'User'} | SF Trip Challenge</title>
        <meta name="description" content={`Adventure details for ${user.fullName || user.username} in the SF trip challenge - ${user.totalCheckedTime} hours logged!`} />
        <meta property="og:title" content={`${user.fullName || user.username}'s Adventure Progress`} />
        <meta property="og:description" content={`${user.totalCheckedTime} hours logged in the SF Trip Challenge!`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout onRefresh={handleRefresh} onNavigate={handleNavigate}>
        {/* Back Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="button-outline flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <ArrowLeft size={18} />
            Back to Adventure Party
          </button>
          <button 
            onClick={handleShare}
            className="control-button-enhanced flex items-center gap-2"
            title="Share this adventure profile"
          >
            <Share2 size={16} />
            Share Profile
          </button>
        </div>

        {/* Hero Section with User Profile */}
        <div className="relative mb-10">
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(135, 206, 235, 0.1), rgba(255, 215, 0, 0.05))',
            border: '3px solid transparent',
            backgroundClip: 'padding-box',
            borderRadius: 'var(--radius-2xl)',
            position: 'relative'
          }}>
            {/* Animated border */}
            <div style={{
              position: 'absolute',
              inset: '-3px',
              background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary), var(--color-accent), var(--color-primary))',
              borderRadius: 'var(--radius-2xl)',
              zIndex: -1,
              backgroundSize: '400% 400%',
              animation: 'gradientShift 4s ease infinite'
            }}></div>
            
            <div className="card-body p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0 relative">
                  <div className="relative">
                    <img 
                      src={user.pfp || '/default-avatar.png'} 
                      alt={`${user.fullName || user.username}'s avatar`}
                      className="w-32 h-32 rounded-full border-6 border-white shadow-2xl object-cover"
                    />
                    {isEligible && (
                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-success to-grass-green rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-bounce">
                        <Award size={20} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 animate-fadeIn">
                    {user.fullName || user.username || 'Anonymous Adventurer'}
                  </h1>
                  
                  <div className="flex flex-col lg:flex-row items-center gap-6 mb-6">
                    {user.githubUsername && (
                      <a 
                        href={`https://github.com/${user.githubUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-primary hover:text-accent transition-all duration-200 hover:scale-105 bg-white/50 px-4 py-2 rounded-xl shadow-md"
                        style={{padding: '5px'}}
                      >
                        <Github size={20} />
                        <span className="font-semibold">{user.githubUsername}</span>
                        <ExternalLink size={16} />
                      </a>
                    )}
                    
                    {user.airport && (
                      <div className="flex items-center gap-3 text-gray-700 bg-white/50 px-4 py-2 rounded-xl shadow-md" style={{padding: '5px'}}>
                        <MapPin size={20} className="text-warning" />
                        <span className="font-semibold">{user.airport}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <div className={`badge ${isEligible ? 'badge-success' : 'badge-warning'} text-base px-6 py-3 animate-wiggle`}>
                      <Award size={16} />
                      {isEligible ? 'SF Trip Eligible!' : `${hoursRemaining.toFixed(1)} hrs to go`}
                    </div>
                    
                    {user.githubUsername && (
                      <div className="badge badge-primary text-base px-6 py-3">
                        <Github size={16} />
                        GitHub Connected
                      </div>
                    )}
                    
                    {user.airport && (
                      <div className="badge badge-secondary text-base px-6 py-3">
                        <MapPin size={16} />
                        Ready to Fly
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="card hover:scale-105 transition-transform duration-300">
            <div className="card-body text-center p-8">
              <CheckCircle2 size={32} className="text-black" />
              <h3 className="font-bold text-xl mb-3 text-gray-900">Total Checked Time</h3>
              <p className="text-4xl font-bold text-primary mb-2">
                {user.totalCheckedTime?.toFixed(1) || '0.0'}
                <span className="text-lg text-gray-600 ml-2">hrs</span>
              </p>
              <p className="text-sm text-gray-600">
                Primary metric for SF eligibility
              </p>
            </div>
          </div>

          <div className="card hover:scale-105 transition-transform duration-300">
            <div className="card-body text-center p-8">
              <Timer size={32} className="text-black" />
              <h3 className="font-bold text-xl mb-3 text-gray-900">Hackatime</h3>
              <p className="text-4xl font-bold text-accent mb-2">
                {user.totalTimeHackatimeHours?.toFixed(1) || '0.0'}
                <span className="text-lg text-gray-600 ml-2">hrs</span>
              </p>
              <p className="text-sm text-gray-600">
                Automatic coding time tracking
              </p>
            </div>
          </div>

          <div className="card hover:scale-105 transition-transform duration-300">
            <div className="card-body text-center p-8">
              <Clock size={32} className="text-black" />
              <h3 className="font-bold text-xl mb-3 text-gray-900">Stopwatch</h3>
              <p className="text-4xl font-bold text-success mb-2">
                {user.totalTimeStopwatchHours?.toFixed(1) || '0.0'}
                <span className="text-lg text-gray-600 ml-2">hrs</span>
              </p>
              <p className="text-sm text-gray-600">
                Manual time tracking
              </p>
            </div>
          </div>

          <div className="card hover:scale-105 transition-transform duration-300">
            <div className="card-body text-center p-8">
              <Clock8 size={32} className="text-black" />
              <h3 className="font-bold text-xl mb-3 text-gray-900">Combined</h3>
              <p className="text-4xl font-bold text-secondary mb-2">
                {user.totalTimeCombinedHours?.toFixed(1) || '0.0'}
                <span className="text-lg text-gray-600 ml-2">hrs</span>
              </p>
              <p className="text-sm text-gray-600">
                Total coding time
              </p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="card mb-10" style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95))',
          borderRadius: 'var(--radius-2xl)'
        }}>
          <div className="card-body p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Target size={24} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Journey to San Francisco</h3>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold text-gray-800">Progress to 100 hours</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-primary">
                    {Math.min(100, user.totalCheckedTime?.toFixed(1) || 0)}
                  </span>
                  <span className="text-lg text-gray-600">/ 100 hrs</span>
                  <span className="badge badge-primary ml-2">{progressPercentage}%</span>
                </div>
              </div>
              
              <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-primary via-accent to-success rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-gradient-shift"></div>
                </div>
                {progressPercentage > 5 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-sm drop-shadow-lg">
                      {progressPercentage}% Complete
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {isEligible ? (
              <div className="bg-gradient-to-r from-success/15 via-grass-green/10 to-success/15 border-2 border-success/30 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-success to-grass-green rounded-full flex items-center justify-center animate-bounce">
                    <Award size={32} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-success mb-2">Mathematical! SF Trip Eligible!</h4>
                    <p className="text-lg text-gray-700">
                      This legendary adventurer has completed their quest and earned the epic journey to San Francisco! 
                      Pack your bags for some serious adventure time! 🎒✈️
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-warning/15 via-accent/10 to-warning/15 border-2 border-warning/30 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-warning to-accent rounded-full flex items-center justify-center animate-wiggle">
                    <Clock size={32} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-warning mb-2">Adventure in Progress!</h4>
                    <p className="text-lg text-gray-700">
                      Only <span className="font-bold text-warning">{hoursRemaining.toFixed(1)} more hours</span> of coding 
                      needed to unlock the magical SF trip! Keep pushing forward, brave adventurer! 🚀
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Time Breakdown */}
          <div className="card">
            <div className="card-header p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <TrendingUp size={24} className="text-primary" />
                <h3 className="text-2xl font-bold text-gray-900">Time Breakdown</h3>
              </div>
            </div>
            <div className="card-body p-6 space-y-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Timer size={20} className="text-primary" />
                  <span className="font-semibold text-gray-800">Hackatime</span>
                </div>
                <span className="text-xl font-bold text-primary">
                  {user.totalTimeHackatimeHours?.toFixed(1) || '0.0'}h
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-success" />
                  <span className="font-semibold text-gray-800">Stopwatch</span>
                </div>
                <span className="text-xl font-bold text-success">
                  {user.totalTimeStopwatchHours?.toFixed(1) || '0.0'}h
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Clock8 size={20} className="text-secondary" />
                  <span className="font-semibold text-gray-800">Combined Total</span>
                </div>
                <span className="text-xl font-bold text-secondary">
                  {user.totalTimeCombinedHours?.toFixed(1) || '0.0'}h
                </span>
              </div>
            </div>
          </div>

          {/* Adventure Profile Card */}
          <div className="card">
            <div className="card-header p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Star size={24} className="text-accent" />
                <h3 className="text-2xl font-bold text-gray-900">Adventure Profile</h3>
              </div>
            </div>
            <div className="card-body p-6">
              <UserCard user={user} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button 
            onClick={handleRefresh}
            className="button-primary flex items-center justify-center gap-2 px-8 py-4 text-lg"
          >
            <Zap size={20} />
            Refresh Adventure Data
          </button>
          
          {user.githubUsername && (
            <a 
              href={`https://github.com/${user.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button-outline flex items-center justify-center gap-2 px-8 py-4 text-lg"
            >
              <Github size={20} />
              Visit GitHub Profile
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </Layout>
    </>
  );
} 