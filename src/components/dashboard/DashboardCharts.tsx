import React from 'react';
import { Activity, BarChart3 } from 'lucide-react';

const DashboardCharts: React.FC = () => {
  const activityData = [
    { time: '9:00 AM', value: 45 },
    { time: '10:00 AM', value: 52 },
    { time: '11:00 AM', value: 38 },
    { time: '12:00 PM', value: 65 },
    { time: '1:00 PM', value: 42 },
    { time: '2:00 PM', value: 58 },
    { time: '3:00 PM', value: 48 },
  ];

  const recentActivities = [
    { action: 'New user registered', time: '2 minutes ago', type: 'success' },
    { action: 'Payment processed', time: '5 minutes ago', type: 'info' },
    { action: 'System backup completed', time: '1 hour ago', type: 'success' },
    { action: 'Security alert resolved', time: '2 hours ago', type: 'warning' },
    { action: 'Data export completed', time: '3 hours ago', type: 'info' },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Activity Chart */}
      <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 dark:border-gray-800/20">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Activity Overview</h3>
        </div>
        
        <div className="space-y-4">
          {activityData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.time}</span>
              <div className="flex-1 mx-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-white">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 dark:border-gray-800/20">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activities</h3>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)} mt-2`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-white">{activity.action}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;