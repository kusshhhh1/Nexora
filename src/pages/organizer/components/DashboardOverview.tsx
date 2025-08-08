import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CalendarDaysIcon,
  UsersIcon,
  ChartBarIcon,
  TrophyIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const DashboardOverview: React.FC = () => {
  const stats = [
    {
      name: 'Active Events',
      value: '12',
      change: '+4.75%',
      changeType: 'positive',
      icon: CalendarDaysIcon,
      color: 'from-nexora-blue to-nexora-pink'
    },
    {
      name: 'Total Attendees',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: UsersIcon,
      color: 'from-nexora-pink to-nexora-purple'
    },
    {
      name: 'Revenue',
      value: '$89,420',
      change: '+8.2%',
      changeType: 'positive',
      icon: ChartBarIcon,
      color: 'from-nexora-purple to-nexora-blue'
    },
    {
      name: 'Engagement Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrophyIcon,
      color: 'from-orange-500 to-yellow-400'
    }
  ];

  const recentEvents = [
    {
      id: 1,
      name: 'Tech Innovation Summit 2024',
      date: '2024-02-15',
      attendees: 456,
      status: 'active',
      revenue: '$12,450'
    },
    {
      id: 2,
      name: 'Digital Marketing Masterclass',
      date: '2024-02-10',
      attendees: 234,
      status: 'completed',
      revenue: '$8,920'
    },
    {
      id: 3,
      name: 'Startup Pitch Night',
      date: '2024-02-08',
      attendees: 189,
      status: 'completed',
      revenue: '$5,670'
    },
    {
      id: 4,
      name: 'AI & Future of Work',
      date: '2024-02-20',
      attendees: 312,
      status: 'upcoming',
      revenue: '$9,360'
    }
  ];

  const quickActions = [
    {
      title: 'Create New Event',
      description: 'Set up your next amazing event',
      icon: PlusIcon,
      link: '/organizer/dashboard/create',
      color: 'from-nexora-blue to-nexora-pink'
    },
    {
      title: 'View Analytics',
      description: 'Check your event performance',
      icon: ChartBarIcon,
      link: '/organizer/dashboard/analytics',
      color: 'from-nexora-pink to-nexora-purple'
    },
    {
      title: 'Manage Attendees',
      description: 'Check registrations and check-ins',
      icon: UsersIcon,
      link: '/organizer/dashboard/attendees',
      color: 'from-nexora-purple to-nexora-blue'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-300">
          Here's what's happening with your events today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6 hover:border-nexora-pink/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
              } flex items-center`}>
                <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <Link
                  key={action.title}
                  to={action.link}
                  className="block group"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center p-4 bg-nexora-purple/10 border border-nexora-purple/20 rounded-xl hover:border-nexora-pink/40 hover:bg-nexora-purple/20 transition-all duration-300"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white group-hover:text-nexora-pink transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-gray-400 text-sm">{action.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Recent Events</h3>
              <Link 
                to="/organizer/dashboard/events"
                className="text-nexora-pink hover:text-nexora-blue font-medium text-sm transition-colors"
              >
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-nexora-purple/10 border border-nexora-purple/20 rounded-xl hover:border-nexora-pink/40 hover:bg-nexora-purple/20 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-nexora-blue to-nexora-pink rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CalendarDaysIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white group-hover:text-nexora-pink transition-colors">
                        {event.name}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                        <span className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {event.date}
                        </span>
                        <span className="flex items-center">
                          <UsersIcon className="w-4 h-4 mr-1" />
                          {event.attendees}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold text-white">{event.revenue}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === 'active'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : event.status === 'upcoming'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    
                    <button className="p-2 text-gray-400 hover:text-nexora-pink hover:bg-nexora-purple/20 rounded-lg transition-all duration-300">
                      <EyeIcon className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOverview;