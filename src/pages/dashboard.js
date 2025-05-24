import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import { fetchNeighbors } from '../utils/api';

export default function DashboardPage() {
  const router = useRouter();
  const [neighbors, setNeighbors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchNeighbors();
      setNeighbors(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('Failed to load Neighborhood data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);
  
  const handleRefresh = async () => {
    return loadData();
  };

  const handleNavigate = (page) => {
    router.push(`/${page}`);
  };
  
  return (
    <>
      <Head>
        <title>Dashboard | Neighborhood SF Trip Challenge</title>
        <meta name="description" content="Adventure Time themed dashboard showing SF trip challenge statistics and progress" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout 
        activeTab="dashboard" 
        onRefresh={handleRefresh}
        onNavigate={handleNavigate}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-accent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading adventure data...</p>
          </div>
        ) : error ? (
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 140, 0, 0.1))', border: '2px solid var(--color-danger)' }}>
            <div className="card-body text-center">
              <p className="text-danger font-semibold mb-4">{error}</p>
              <button 
                onClick={handleRefresh}
                className="button-primary"
              >
                Try Again, Dude!
              </button>
            </div>
          </div>
        ) : (
          <Dashboard neighbors={neighbors} setActiveTab={handleNavigate} />
        )}
      </Layout>
    </>
  );
} 