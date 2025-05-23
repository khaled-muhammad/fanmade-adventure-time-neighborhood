import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import UsersList from '../components/UsersList';
import { fetchNeighbors } from '../utils/api';

export default function Home() {
  const [neighbors, setNeighbors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
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
  
  return (
    <>
      <Head>
        <title>Neighborhood | SF Trip Challenge</title>
        <meta name="description" content="Track your progress toward 100 hours for the San Francisco trip" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout activeTab={activeTab} setActiveTab={setActiveTab} onRefresh={handleRefresh}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading Neighborhood data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center">
            <p>{error}</p>
            <button 
              onClick={handleRefresh}
              className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md transition"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && <Dashboard neighbors={neighbors} setActiveTab={setActiveTab} />}
            {activeTab === 'participants' && <UsersList neighbors={neighbors} />}
          </>
        )}
      </Layout>
    </>
  );
} 