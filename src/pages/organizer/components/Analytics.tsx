import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

const Analytics: React.FC = () => {
  const overviewStats = [
    {
      title: 'Total Events',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: CalendarDaysIcon,
      color: 'from-nexora-blue to-nexora-pink'
    },
    {
      title: 'Total Revenue',
      value: '$127,420',
      change: '+18%',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'from-green-500 to-emerald-400'
    },
    {
      title: 'Total Attendees',
      value: '4,832',
      change: '+25%',
      changeType: 'positive',
      icon: UsersIcon,
      color: 'from-nexora-pink to-nexora-purple'
    },
    {
      title: 'Avg. Engagement',
      value: '92.4%',
      change: '+5%',
      changeType: 'positive',
      icon: HeartIcon,
      color: 'from-orange-500 to-red-400'
    }
  ];

  const eventPerformance = [
    {
      name: 'Tech Innovation Summit 2024',
      registrations: 456,
      attendance: 423,
      revenue: '$12,450',
      engagement: '94%',
      rating: 4.8
    },
    {
      name: 'Digital Marketing Masterclass',
      registrations: 234,
      attendance: 221,
      revenue: '$8,920',
      engagement: '91%',
      rating: 4.6
    },
    {
      name: 'Startup Pitch Night',
      registrations: 189,
      attendance: 167,
      revenue: '$5,670',
      engagement: '88%',
      rating: 4.4
    },
    {
      name: 'AI & Future of Work',
      registrations: 312,
      attendance: 289,
      revenue: '$9,360',
      engagement: '96%',
      rating: 4.9
    }
  ];

  const audienceInsights = [
    { category: 'Age 18-25', percentage: 28, count: 1352 },
    { category: 'Age 26-35', percentage: 45, count: 2174 },
    { category: 'Age 36-45', percentage: 22, count: 1063 },
    { category: 'Age 45+', percentage: 5, count: 243 }
  ];

  const engagementMetrics = [
    { metric: 'Poll Participation', value: '78%', icon: ChartBarIcon },
    { metric: 'Q&A Submissions', value: '156', icon: EyeIcon },
    { metric: 'Social Shares', value: '1,247', icon: ShareIcon },
    { metric: 'Feedback Rating', value: '4.7/5', icon: HeartIcon }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-300">
          Track your event performance and audience engagement
        </p>
      </motion.div>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {overviewStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6 hover:border-nexora-pink/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`text-sm font-medium flex items-center ${
                stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
              }`}>
                <TrendingUpIcon className="w-4 h-4 mr-1" />
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Event Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <ChartBarIcon className="w-6 h-6 mr-2 text-nexora-pink" />
            Event Performance
          </h3>

          <div className="space-y-4">
            {eventPerformance.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-nexora-purple/10 border border-nexora-purple/20 rounded-xl p-4 hover:border-nexora-pink/40 hover:bg-nexora-purple/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-white text-lg">{event.name}</h4>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-white ml-1">{event.rating}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-400">Registrations vs Attendance</p>
                    <p className="text-white font-medium">{event.registrations} → {event.attendance}</p>
                    <div className="w-full bg-nexora-purple/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-nexora-blue to-nexora-pink h-2 rounded-full"
                        style={{ width: `${(event.attendance / event.registrations) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Revenue & Engagement</p>
                    <p className="text-white font-medium">{event.revenue}</p>
                    <p className="text-green-400 text-xs">{event.engagement} engagement</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Audience Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Demographics */}
          <div className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <UsersIcon className="w-6 h-6 mr-2 text-nexora-pink" />
              Audience Demographics
            </h3>
            
            <div className="space-y-4">
              {audienceInsights.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{item.category}</span>
                      <div className="text-right">
                        <span className="text-white font-semibold">{item.percentage}%</span>
                        <span className="text-gray-400 text-sm ml-2">({item.count})</span>
                      </div>
                    </div>
                    <div className="w-full bg-nexora-purple/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-nexora-blue to-nexora-pink h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <HeartIcon className="w-6 h-6 mr-2 text-nexora-pink" />
              Engagement Metrics
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {engagementMetrics.map((metric, index) => (
                <motion.div
                  key={metric.metric}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="bg-nexora-purple/10 border border-nexora-purple/20 rounded-xl p-4 text-center hover:border-nexora-pink/40 hover:bg-nexora-purple/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-nexora-blue to-nexora-pink rounded-lg flex items-center justify-center mx-auto mb-3">
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                  <p className="text-gray-400 text-sm">{metric.metric}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Revenue Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <TrendingUpIcon className="w-6 h-6 mr-2 text-nexora-pink" />
          Revenue Trend (Last 6 Months)
        </h3>
        
        <div className="h-64 flex items-end justify-between space-x-2">
          {['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map((month, index) => {
            const heights = [40, 65, 45, 80, 90, 100];
            const revenues = ['$8.2K', '$12.5K', '$9.8K', '$18.3K', '$21.7K', '$24.1K'];
            
            return (
              <motion.div
                key={month}
                initial={{ height: 0 }}
                animate={{ height: `${heights[index]}%` }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                className="flex-1 bg-gradient-to-t from-nexora-blue to-nexora-pink rounded-t-lg relative group cursor-pointer"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-nexora-dark border border-nexora-purple/30 rounded-lg px-2 py-1">
                    <p className="text-white text-sm font-semibold">{revenues[index]}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="flex justify-between mt-4 text-gray-400 text-sm">
          {['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map(month => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;