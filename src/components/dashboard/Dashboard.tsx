import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardStats from './DashboardStats';
import DashboardCharts from './DashboardCharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userStats, setUserStats] = useState<any>(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserStats(data.stats);
        }
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
        // Don't show error to user for stats, just log it
      }
    };

    fetchUserStats();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 flex h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <Header onMenuToggle={toggleSidebar} />
          
          <main className="flex-1 overflow-y-auto p-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Here's what's happening with your account today.
                {userStats && (
                  <span className="ml-2">
                    Member since {formatDate(userStats.user_joined)}
                  </span>
                )}
              </p>
            </div>

            {/* Stats Cards */}
            <DashboardStats />

            {/* Charts and Activities */}
            <DashboardCharts />

            {/* Additional Info Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 dark:border-gray-800/20">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-colors">
                    Create New Project
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 transition-colors">
                    Invite Team Member
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 transition-colors">
                    View Analytics
                  </button>
                </div>
              </div>

              <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 dark:border-gray-800/20">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Account Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Email:</span>
                    <span className="text-gray-800 dark:text-white font-medium">{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">User ID:</span>
                    <span className="text-gray-800 dark:text-white font-medium">#{user?.id}</span>
                  </div>
                  {userStats && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total Users:</span>
                      <span className="text-gray-800 dark:text-white font-medium">{userStats.total_users}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 dark:border-gray-800/20">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">API Status</span>
                    <span className="text-green-500 font-medium ml-auto">Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">Database</span>
                    <span className="text-green-500 font-medium ml-auto">Connected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">Storage</span>
                    <span className="text-yellow-500 font-medium ml-auto">85% Used</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;