import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CalendarDaysIcon,
  TicketIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const AttendeeOverview: React.FC = () => {
  // Mock data
  const stats = [
    {
      name: 'Events Attended',
      value: '12',
      change: '+3 this month',
      icon: CalendarDaysIcon,
      color: 'from-nexora-pink to-nexora-blue'
    },
    {
      name: 'Upcoming Events',
      value: '4',
      change: '2 this week',
      icon: TicketIcon,
      color: 'from-nexora-blue to-nexora-purple'
    },
    {
      name: 'Average Rating',
      value: '4.8',
      change: 'Great feedback!',
      icon: StarIcon,
      color: 'from-yellow-500 to-orange-400'
    },
    {
      name: 'Engagement Score',
      value: '94%',
      change: 'Very active!',
      icon: TrophyIcon,
      color: 'from-green-500 to-emerald-400'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Innovation Summit 2024',
      date: '2024-02-20',
      time: '09:00 AM',
      venue: 'Convention Center',
      attendees: 456,
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'Conference',
      price: 'Free'
    },
    {
      id: 2,
      title: 'Digital Marketing Workshop',
      date: '2024-02-25',
      time: '02:00 PM',
      venue: 'Creative Hub',
      attendees: 89,
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'Workshop',
      price: '$49'
    },
    {
      id: 3,
      title: 'Startup Networking Night',
      date: '2024-03-05',
      time: '06:00 PM',
      venue: 'Rooftop Lounge',
      attendees: 234,
      image: 'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'Networking',
      price: '$25'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'attended',
      event: 'AI & Machine Learning Bootcamp',
      date: '2024-02-15',
      rating: 5
    },
    {
      id: 2,
      type: 'registered',
      event: 'Tech Innovation Summit 2024',
      date: '2024-02-12',
      rating: null
    },
    {
      id: 3,
      type: 'feedback',
      event: 'Digital Marketing Masterclass',
      date: '2024-02-10',
      rating: 4
    },
    {
      id: 4,
      type: 'attended',
      event: 'Product Design Workshop',
      date: '2024-02-08',
      rating: 5
    }
  ];

  const quickActions = [
    {
      title: 'Browse Events',
      description: 'Discover new events to attend',
      icon: CalendarDaysIcon,
      link: '/attendee/dashboard/browse',
      color: 'from-nexora-pink to-nexora-blue'
    },
    {
      title: 'My Tickets',
      description: 'View your registered events',
      icon: TicketIcon,
      link: '/attendee/dashboard/events',
      color: 'from-nexora-blue to-nexora-purple'
    },
    {
      title: 'Join Live Event',
      description: 'Participate in real-time',
      icon: ChatBubbleLeftRightIcon,
      link: '/attendee/dashboard/live',
      color: 'from-nexora-purple to-nexora-pink'
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
          Welcome back! 🎉
        </h1>
        <p className="text-gray-300">
          Here's your event activity and upcoming experiences.
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
            className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6 hover:border-nexora-blue/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm mb-2">{stat.name}</p>
              <p className="text-nexora-blue text-xs font-medium">{stat.change}</p>
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
                    className="flex items-center p-4 bg-nexora-purple/10 border border-nexora-purple/20 rounded-xl hover:border-nexora-blue/40 hover:bg-nexora-purple/20 transition-all duration-300"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white group-hover:text-nexora-blue transition-colors">
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

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
              <Link 
                to="/attendee/dashboard/events"
                className="text-nexora-pink hover:text-nexora-blue font-medium text-sm transition-colors"
              >
                View All Tickets
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-nexora-purple/10 border border-nexora-purple/20 rounded-xl hover:border-nexora-blue/40 hover:bg-nexora-purple/20 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-gray-300 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-nexora-blue transition-colors">
                        {event.title}
                      </h4>
                      <span className="px-2 py-1 bg-nexora-blue/20 text-nexora-blue border border-nexora-blue/30 rounded-full text-xs font-medium">
                        {event.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {event.date} • {event.time}
                      </span>
                      <span className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {event.venue}
                      </span>
                      <span className="flex items-center">
                        <UsersIcon className="w-4 h-4 mr-1" />
                        {event.attendees}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-nexora-pink font-semibold">{event.price}</span>
                      <button className="px-3 py-1 bg-gradient-to-r from-nexora-pink to-nexora-blue rounded-lg text-white text-sm hover:shadow-lg transition-all duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-nexora-purple/10 border border-nexora-purple/20 rounded-xl hover:border-nexora-blue/40 hover:bg-nexora-purple/20 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.type === 'attended' ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                  activity.type === 'registered' ? 'bg-gradient-to-r from-nexora-blue to-nexora-pink' :
                  'bg-gradient-to-r from-yellow-500 to-orange-400'
                }`}>
                  {activity.type === 'attended' ? <CalendarDaysIcon className="w-5 h-5 text-white" /> :
                   activity.type === 'registered' ? <TicketIcon className="w-5 h-5 text-white" /> :
                   <StarIcon className="w-5 h-5 text-white" />}
                </div>
                
                <div>
                  <p className="text-white font-medium">
                    {activity.type === 'attended' ? 'Attended' : 
                     activity.type === 'registered' ? 'Registered for' : 
                     'Left feedback for'} <span className="text-nexora-blue">{activity.event}</span>
                  </p>
                  <p className="text-gray-400 text-sm">{activity.date}</p>
                </div>
              </div>
              
              {activity.rating && (
                <div className="flex items-center space-x-1">
                  {[...Array(activity.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AttendeeOverview;