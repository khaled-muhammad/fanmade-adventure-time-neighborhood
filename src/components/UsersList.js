import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, X, Filter, ArrowDownAZ, ArrowUpZA, Users, CheckCircle2, Target, Github, Plane, Clock, Rocket, Timer, BarChart3, User, TrendingUp, TrendingDown } from 'lucide-react';
import UserCard from './UserCard';

const UsersList = ({ neighbors }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('totalCheckedTime');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [filters, setFilters] = useState({
    eligible: false,
    hasGithub: false,
    hasAirport: false,
  });
  
  const totalCount = neighbors.length;
  const eligibleCount = neighbors.filter(user => user.totalCheckedTime >= 100).length;
  
  // Filter and sort users
  const filteredUsers = neighbors.filter(user => {
    // Search term filter
    const searchLower = searchTerm.toLowerCase();
    const fullNameMatch = user.fullName?.toLowerCase().includes(searchLower);
    const githubMatch = user.githubUsername?.toLowerCase().includes(searchLower);
    const slackMatch = user.slackFullName?.[0]?.toLowerCase().includes(searchLower);
    const airportMatch = user.airport?.toLowerCase().includes(searchLower);
    
    const textMatch = !searchTerm || fullNameMatch || githubMatch || slackMatch || airportMatch;
    
    // Other filters
    const eligibleMatch = !filters.eligible || user.totalCheckedTime >= 100;
    const githubMatch2 = !filters.hasGithub || user.githubUsername;
    const airportMatch2 = !filters.hasAirport || user.airport;
    
    return textMatch && eligibleMatch && githubMatch2 && airportMatch2;
  });
  
  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];
    
    // Handle nullish values
    if (valueA === undefined || valueA === null) valueA = 0;
    if (valueB === undefined || valueB === null) valueB = 0;
    
    // Handle string values
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    // Handle numeric values
    return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
  });
  
  // Toggle sort order
  const handleSortChange = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setShowSortOptions(false);
  };
  
  // Update filter
  const handleFilterChange = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({ eligible: false, hasGithub: false, hasAirport: false });
    setSearchTerm('');
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown containers
      const isOutsideDropdown = !event.target.closest('.dropdown-container');
      if (isOutsideDropdown) {
        setShowFilters(false);
        setShowSortOptions(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  const handleDropdownClick = (e, setter) => {
    // Prevent the click from bubbling up to document
    e.preventDefault();
    e.stopPropagation();
    
    // Toggle the dropdown state
    setter(prev => {
      const newState = !prev;
      console.log('Dropdown state changing to:', newState); // Debug log
      return newState;
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Neighborhood Participants</h2>
        <div className="badge badge-primary">{totalCount} Total</div>
      </div>
      
      <div className="relative filter-area-container" style={{ overflow: 'visible', zIndex: 1 }}>
        {/* Main Filter Card with Enhanced Styling */}
        <div className="filter-card-enhanced">
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
          
          {/* Content Container */}
          <div className="relative z-10 p-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row gap-6 items-stretch filter-area-container">
              {/* Enhanced Search Input */}
              <div className="relative flex-grow group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="✨ Search by name, GitHub, Slack, or airport..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input-enhanced"
                  />
                  {searchTerm && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Enhanced Control Buttons */}
              <div className="flex gap-3 filter-area-container">
                {/* Filter Button */}
                <div className="relative dropdown-container">
                  <button 
                    onClick={(e) => handleDropdownClick(e, setShowFilters)}
                    className="control-button-enhanced group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    <div className="relative z-10 flex items-center gap-3">
                      <Filter size={18} className="group-hover:rotate-12 transition-transform duration-200" />
                      <span className="font-medium">Filters</span>
                      {Object.values(filters).some(v => v) && (
                        <div className="filter-count-badge">
                          {Object.values(filters).filter(Boolean).length}
                        </div>
                      )}
                    </div>
                  </button>
                  
                  {/* Enhanced Filter Dropdown */}
                  {showFilters && (
                    <div className="dropdown-enhanced animate-fadeIn">
                      <div className="dropdown-header-enhanced">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Filter size={16} className="text-primary" />
                          Filter Options
                        </h3>
                        <button 
                          onClick={clearFilters}
                          className="clear-button-enhanced"
                        >
                          Clear all
                        </button>
                      </div>
                      
                      <div className="p-4 space-y-4">
                        {/* Filter Options */}
                        <label className="filter-option-enhanced group cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.eligible}
                            onChange={() => handleFilterChange('eligible')}
                            className="checkbox-enhanced"
                          />
                          <div className="flex items-center gap-3">
                            <div className="filter-icon eligible">
                              <Target size={20} />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">SF Trip Eligible</div>
                              <div className="text-xs text-gray-500">100+ hours tracked</div>
                            </div>
                          </div>
                        </label>
                        
                        <label className="filter-option-enhanced group cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.hasGithub}
                            onChange={() => handleFilterChange('hasGithub')}
                            className="checkbox-enhanced"
                          />
                          <div className="flex items-center gap-3">
                            <div className="filter-icon github">
                              <Github size={20} />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Has GitHub</div>
                              <div className="text-xs text-gray-500">Connected account</div>
                            </div>
                          </div>
                        </label>
                        
                        <label className="filter-option-enhanced group cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.hasAirport}
                            onChange={() => handleFilterChange('hasAirport')}
                            className="checkbox-enhanced"
                          />
                          <div className="flex items-center gap-3">
                            <div className="filter-icon airport">
                              <Plane size={20} />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Has Airport Code</div>
                              <div className="text-xs text-gray-500">Travel information</div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Sort Button */}
                <div className="relative dropdown-container">
                  <button 
                    className="control-button-enhanced group"
                    onClick={(e) => handleDropdownClick(e, setShowSortOptions)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    <div className="relative z-10 flex items-center gap-3">
                      {sortOrder === 'asc' ? 
                        <ArrowUpZA size={18} className="group-hover:translate-y-[-2px] transition-transform duration-200" /> : 
                        <ArrowDownAZ size={18} className="group-hover:translate-y-[2px] transition-transform duration-200" />
                      }
                      <span className="font-medium">Sort</span>
                    </div>
                  </button>
                  
                  {/* Enhanced Sort Dropdown */}
                  {showSortOptions && (
                    <div className="dropdown-enhanced animate-fadeIn w-56">
                      <div className="dropdown-header-enhanced">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          {sortOrder === 'asc' ? <ArrowUpZA size={16} className="text-primary" /> : <ArrowDownAZ size={16} className="text-primary" />}
                          Sort Options
                        </h3>
                      </div>
                      
                      <div className="p-2">
                        {[
                          { key: 'totalCheckedTime', label: 'Checked Time', icon: <Clock size={18} /> },
                          { key: 'totalTimeHackatimeHours', label: 'Hackatime', icon: <Rocket size={18} /> },
                          { key: 'totalTimeStopwatchHours', label: 'Stopwatch', icon: <Timer size={18} /> },
                          { key: 'totalTimeCombinedHours', label: 'Combined Hours', icon: <BarChart3 size={18} /> },
                          { key: 'fullName', label: 'Name', icon: <User size={18} /> }
                        ].map((option) => (
                          <div
                            key={option.key}
                            className="sort-option-enhanced"
                            onClick={() => handleSortChange(option.key)}
                          >
                            <div className="flex items-center gap-3">
                              {option.icon}
                              <span className="font-medium">{option.label}</span>
                            </div>
                            {sortBy === option.key && (
                              <CheckCircle2 size={18} className="text-primary animate-pulse" />
                            )}
                          </div>
                        ))}
                        
                        <div className="border-t border-gray-100 my-2"></div>
                        
                        <div 
                          className="sort-option-enhanced"
                          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        >
                          <div className="flex items-center gap-3">
                            {sortOrder === 'asc' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                            <span className="font-medium">{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
                          </div>
                          {sortOrder === 'asc' ? (
                            <ArrowUpZA size={18} className="text-primary" />
                          ) : (
                            <ArrowDownAZ size={18} className="text-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Enhanced Active Filters */}
            {Object.values(filters).some(v => v) && (
              <div className="mt-6 pt-4 border-t border-gray-100/50">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-medium text-gray-600">Active Filters:</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {filters.eligible && (
                    <div className="active-filter-badge eligible group">
                      <Target size={16} className="mr-2" />
                      <span>SF Trip Eligible</span>
                      <X 
                        size={16} 
                        className="ml-2 cursor-pointer group-hover:rotate-90 transition-transform duration-200" 
                        onClick={() => handleFilterChange('eligible')} 
                      />
                    </div>
                  )}
                  {filters.hasGithub && (
                    <div className="active-filter-badge github group">
                      <Github size={16} className="mr-2" />
                      <span>Has GitHub</span>
                      <X 
                        size={16} 
                        className="ml-2 cursor-pointer group-hover:rotate-90 transition-transform duration-200" 
                        onClick={() => handleFilterChange('hasGithub')} 
                      />
                    </div>
                  )}
                  {filters.hasAirport && (
                    <div className="active-filter-badge airport group">
                      <Plane size={16} className="mr-2" />
                      <span>Has Airport</span>
                      <X 
                        size={16} 
                        className="ml-2 cursor-pointer group-hover:rotate-90 transition-transform duration-200" 
                        onClick={() => handleFilterChange('hasAirport')} 
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Enhanced Results Summary */}
            <div className="mt-6 pt-4 border-t border-gray-100/50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="results-summary-text">
                  <span className="text-gray-600">Showing </span>
                  <span className="results-count-highlight">{sortedUsers.length}</span>
                  <span className="text-gray-600"> of </span>
                  <span className="results-count-highlight">{totalCount}</span>
                  <span className="text-gray-600"> participants</span>
                  {Object.values(filters).some(v => v) && (
                    <span className="ml-2 inline-flex items-center gap-1 text-primary font-medium">
                      <Filter size={14} />
                      (filtered)
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="status-summary-badge success" style={{marginRight: '10px'}}>
                    <div className="status-dot success"></div>
                    <span className="font-medium">{eligibleCount}</span>
                    <span className="text-xs opacity-90">eligible</span>
                  </div>
                  <div className="status-summary-badge warning">
                    <div className="status-dot warning"></div>
                    <span className="font-medium">{totalCount - eligibleCount}</span>
                    <span className="text-xs opacity-90">in progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedUsers.length > 0 ? (
          sortedUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <div className="col-span-full text-center py-16 card border border-gray-200">
            <div className="flex flex-col items-center">
              <Users size={40} className="text-gray-300 mb-2" />
              <p className="text-lg font-medium text-gray-700 mb-2">No participants found</p>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
              <button 
                onClick={clearFilters}
                className="button button-primary"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList; 