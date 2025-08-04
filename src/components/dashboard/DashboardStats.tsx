import React from 'react';
import { TrendingUp, Users, FileText, Shield } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 dark:border-gray-800/20 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-green-500 text-sm font-medium">{change}</span>
    </div>
    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{value}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
  </div>
);

const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '12,345',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Revenue',
      value: '$89,432',
      change: '+8%',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Documents',
      value: '1,234',
      change: '+5%',
      icon: FileText,
      color: 'bg-purple-500'
    },
    {
      title: 'Security Score',
      value: '98%',
      change: '+2%',
      icon: Shield,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;