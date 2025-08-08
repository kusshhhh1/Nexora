import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BellIcon,
  PaperAirplaneIcon,
  UsersIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'urgent';
  title: string;
  message: string;
  timestamp: string;
  recipients: number;
  eventName?: string;
}

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'send' | 'history'>('send');
  const [notificationForm, setNotificationForm] = useState({
    type: 'info' as 'info' | 'success' | 'warning' | 'urgent',
    title: '',
    message: '',
    target: 'all' as 'all' | 'event-specific',
    eventId: '',
    scheduledTime: ''
  });

  const events = [
    'Tech Innovation Summit 2024',
    'Digital Marketing Masterclass',
    'Startup Pitch Night',
    'AI & Future of Work'
  ];

  const notificationHistory: Notification[] = [
    {
      id: '1',
      type: 'info',
      title: 'Event Reminder',
      message: 'Tech Innovation Summit 2024 starts in 2 hours. Don\'t forget to join us!',
      timestamp: '2024-02-15 08:00',
      recipients: 456,
      eventName: 'Tech Innovation Summit 2024'
    },
    {
      id: '2',
      type: 'success',
      title: 'Welcome Message',
      message: 'Thank you for registering! Here\'s your event guide and schedule.',
      timestamp: '2024-02-14 14:30',
      recipients: 89,
      eventName: 'Digital Marketing Masterclass'
    },
    {
      id: '3',
      type: 'urgent',
      title: 'Venue Change',
      message: 'Important update: Event venue has been changed to Conference Hall B.',
      timestamp: '2024-02-13 16:45',
      recipients: 234,
      eventName: 'Startup Pitch Night'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Weather Alert',
      message: 'Due to weather conditions, please allow extra travel time to the venue.',
      timestamp: '2024-02-12 09:15',
      recipients: 312,
      eventName: 'AI & Future of Work'
    }
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNotificationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendNotification = () => {
    if (notificationForm.title && notificationForm.message) {
      console.log('Sending notification:', notificationForm);
      toast.success('Notification sent successfully!');
      
      setNotificationForm({
        type: 'info',
        title: '',
        message: '',
        target: 'all',
        eventId: '',
        scheduledTime: ''
      });
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircleIcon;
      case 'warning':
        return ExclamationTriangleIcon;
      case 'urgent':
        return ExclamationTriangleIcon;
      default:
        return InformationCircleIcon;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'from-green-500 to-emerald-400';
      case 'warning':
        return 'from-yellow-500 to-orange-400';
      case 'urgent':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-nexora-blue to-nexora-pink';
    }
  };

  const getNotificationBorder = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-500/30';
      case 'warning':
        return 'border-yellow-500/30';
      case 'urgent':
        return 'border-red-500/30';
      default:
        return 'border-nexora-purple/20';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
        <p className="text-gray-300">
          Send instant messages and updates to your event attendees
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex space-x-1 bg-nexora-purple/20 rounded-2xl p-1"
      >
        <button
          onClick={() => setActiveTab('send')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
            activeTab === 'send'
              ? 'bg-gradient-to-r from-nexora-blue to-nexora-pink text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-nexora-purple/30'
          }`}
        >
          <PaperAirplaneIcon className="w-5 h-5" />
          <span>Send Notification</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
            activeTab === 'history'
              ? 'bg-gradient-to-r from-nexora-blue to-nexora-pink text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-nexora-purple/30'
          }`}
        >
          <BellIcon className="w-5 h-5" />
          <span>Notification History</span>
        </button>
      </motion.div>

      {activeTab === 'send' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Create Notification</h3>

          <div className="space-y-6">
            {/* Notification Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Notification Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: 'info', label: 'Information', color: 'from-nexora-blue to-nexora-pink', icon: InformationCircleIcon },
                  { value: 'success', label: 'Success', color: 'from-green-500 to-emerald-400', icon: CheckCircleIcon },
                  { value: 'warning', label: 'Warning', color: 'from-yellow-500 to-orange-400', icon: ExclamationTriangleIcon },
                  { value: 'urgent', label: 'Urgent', color: 'from-red-500 to-pink-500', icon: ExclamationTriangleIcon }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setNotificationForm({ ...notificationForm, type: type.value as 'info' | 'success' | 'warning' | 'urgent' })}
                    className={`p-4 border rounded-xl transition-all duration-300 ${
                      notificationForm.type === type.value
                        ? 'border-nexora-pink/60 bg-nexora-purple/20'
                        : 'border-nexora-purple/20 hover:border-nexora-purple/40'
                    }`}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <type.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-white text-sm font-medium">{type.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Notification Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={notificationForm.title}
                onChange={handleFormChange}
                className="w-full px-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
                placeholder="Enter notification title"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={notificationForm.message}
                onChange={handleFormChange}
                rows={4}
                className="w-full px-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Enter your message..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Target Audience */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Send To
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="target"
                      value="all"
                      checked={notificationForm.target === 'all'}
                      onChange={handleFormChange}
                      className="w-4 h-4 text-nexora-pink bg-nexora-purple/20 border-nexora-purple/30 focus:ring-nexora-pink"
                    />
                    <span className="ml-3 text-white flex items-center">
                      <UsersIcon className="w-5 h-5 mr-2" />
                      All Attendees
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="target"
                      value="event-specific"
                      checked={notificationForm.target === 'event-specific'}
                      onChange={handleFormChange}
                      className="w-4 h-4 text-nexora-pink bg-nexora-purple/20 border-nexora-purple/30 focus:ring-nexora-pink"
                    />
                    <span className="ml-3 text-white flex items-center">
                      <CalendarDaysIcon className="w-5 h-5 mr-2" />
                      Specific Event
                    </span>
                  </label>
                </div>

                {notificationForm.target === 'event-specific' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <select
                      name="eventId"
                      value={notificationForm.eventId}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select an event</option>
                      {events.map((event, index) => (
                        <option key={index} value={event}>{event}</option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </div>

              {/* Scheduled Time */}
              <div>
                <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-300 mb-2">
                  Schedule (Optional)
                </label>
                <input
                  type="datetime-local"
                  id="scheduledTime"
                  name="scheduledTime"
                  value={notificationForm.scheduledTime}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
                />
                <p className="text-gray-400 text-xs mt-2">Leave empty to send immediately</p>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-nexora-purple/10 border border-nexora-purple/20 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-4">Preview</h4>
              <div className={`border rounded-lg p-4 ${getNotificationBorder(notificationForm.type)}`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${getNotificationColor(notificationForm.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {React.createElement(getNotificationIcon(notificationForm.type), { className: "w-5 h-5 text-white" })}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-semibold">
                      {notificationForm.title || 'Notification Title'}
                    </h5>
                    <p className="text-gray-300 mt-1">
                      {notificationForm.message || 'Your notification message will appear here...'}
                    </p>
                    <p className="text-gray-400 text-xs mt-2">Just now</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Send Button */}
            <div className="flex justify-end">
              <motion.button
                onClick={sendNotification}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-nexora-blue to-nexora-pink rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-nexora-pink/25 transition-all duration-300"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
                <span>
                  {notificationForm.scheduledTime ? 'Schedule Notification' : 'Send Now'}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'history' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {notificationHistory.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className={`bg-nexora-dark/60 backdrop-blur-sm border rounded-2xl p-6 ${getNotificationBorder(notification.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getNotificationColor(notification.type)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {React.createElement(getNotificationIcon(notification.type), { className: "w-6 h-6 text-white" })}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{notification.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        notification.type === 'urgent' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        notification.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        notification.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {notification.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-3">{notification.message}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <span className="flex items-center">
                        <CalendarDaysIcon className="w-4 h-4 mr-1" />
                        {notification.timestamp}
                      </span>
                      <span className="flex items-center">
                        <UsersIcon className="w-4 h-4 mr-1" />
                        {notification.recipients} recipients
                      </span>
                      {notification.eventName && (
                        <span className="flex items-center">
                          <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1" />
                          {notification.eventName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm font-medium">
                    Delivered
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {notificationHistory.length === 0 && (
            <div className="text-center py-12 bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl">
              <BellIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 text-lg font-medium">No notifications sent yet</p>
              <p className="text-gray-400">Start engaging with your attendees by sending your first notification</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Notifications;