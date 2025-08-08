import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  QrCodeIcon,
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  TicketIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface MyEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: string;
  ticketType: 'free' | 'paid';
  qrCode: string;
  image: string;
  organizer: string;
  category: string;
}

type TabType = 'upcoming' | 'past' | 'all';

const MyEvents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);

  // Mock user events data
  const myEvents: MyEvent[] = [
    {
      id: 1,
      title: 'Tech Innovation Summit 2024',
      date: '2024-02-20',
      time: '09:00 AM',
      venue: 'Silicon Valley Convention Center',
      status: 'upcoming',
      price: 'Free',
      ticketType: 'free',
      qrCode: 'TIS2024-QR123456',
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=400',
      organizer: 'Tech Innovators Inc.',
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Digital Marketing Masterclass',
      date: '2024-02-25',
      time: '02:00 PM',
      venue: 'Creative Hub Downtown',
      status: 'upcoming',
      price: '$49',
      ticketType: 'paid',
      qrCode: 'DMM2024-QR789012',
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400',
      organizer: 'Marketing Pros',
      category: 'Business'
    },
    {
      id: 3,
      title: 'AI & Machine Learning Bootcamp',
      date: '2024-02-15',
      time: '10:00 AM',
      venue: 'University Tech Center',
      status: 'completed',
      price: '$89',
      ticketType: 'paid',
      qrCode: 'AIML2024-QR345678',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      organizer: 'AI Learning Institute',
      category: 'Education'
    },
    {
      id: 4,
      title: 'Startup Networking Night',
      date: '2024-03-05',
      time: '06:00 PM',
      venue: 'Rooftop Lounge',
      status: 'upcoming',
      price: '$25',
      ticketType: 'paid',
      qrCode: 'SNN2024-QR901234',
      image: 'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=400',
      organizer: 'Startup Community',
      category: 'Networking'
    },
    {
      id: 5,
      title: 'Product Design Workshop',
      date: '2024-02-08',
      time: '01:00 PM',
      venue: 'Design Studio',
      status: 'completed',
      price: '$79',
      ticketType: 'paid',
      qrCode: 'PDW2024-QR567890',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      organizer: 'Creative Design Co.',
      category: 'Education'
    }
  ];

  const filteredEvents = myEvents.filter(event => {
    if (activeTab === 'upcoming') return event.status === 'upcoming';
    if (activeTab === 'past') return event.status === 'completed' || event.status === 'cancelled';
    return true; // all events
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return ClockIcon;
      case 'completed':
        return CheckCircleIcon;
      case 'cancelled':
        return XCircleIcon;
      default:
        return ClockIcon;
    }
  };

  const showQRCode = (event: MyEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">My Events</h1>
        <p className="text-gray-300">
          View your registered events and manage your tickets
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { 
            label: 'Total Events', 
            value: myEvents.length, 
            icon: TicketIcon, 
            color: 'from-nexora-pink to-nexora-blue' 
          },
          { 
            label: 'Upcoming', 
            value: myEvents.filter(e => e.status === 'upcoming').length, 
            icon: ClockIcon, 
            color: 'from-nexora-blue to-nexora-purple' 
          },
          { 
            label: 'Completed', 
            value: myEvents.filter(e => e.status === 'completed').length, 
            icon: CheckCircleIcon, 
            color: 'from-green-500 to-emerald-400' 
          },
          { 
            label: 'Total Spent', 
            value: '$243', 
            icon: TicketIcon, 
            color: 'from-yellow-500 to-orange-400' 
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex space-x-1 bg-nexora-purple/20 rounded-2xl p-1"
      >
        {[
          { key: 'upcoming', label: 'Upcoming Events' },
          { key: 'past', label: 'Past Events' },
          { key: 'all', label: 'All Events' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as TabType)}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-nexora-pink to-nexora-blue text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-nexora-purple/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Events List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl overflow-hidden hover:border-nexora-blue/40 hover:shadow-lg hover:shadow-nexora-blue/25 transition-all duration-300"
          >
            {/* Event Image */}
            <div className="relative h-32 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                  {React.createElement(getStatusIcon(event.status), { className: "w-4 h-4 mr-1" })}
                  {event.status}
                </span>
              </div>

              {/* Price */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  event.ticketType === 'paid' 
                    ? 'bg-nexora-pink/20 text-nexora-pink border border-nexora-pink/30' 
                    : 'bg-green-500/20 text-green-400 border border-green-500/30'
                }`}>
                  {event.price}
                </span>
              </div>
            </div>

            {/* Event Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-nexora-blue text-sm">{event.category} • {event.organizer}</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-400">
                  <CalendarDaysIcon className="w-4 h-4 mr-2" />
                  {event.date}
                  <ClockIcon className="w-4 h-4 ml-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  {event.venue}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <TicketIcon className="w-4 h-4 mr-2" />
                  Ticket ID: {event.qrCode}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => showQRCode(event)}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-gradient-to-r from-nexora-pink to-nexora-blue rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-nexora-blue/25 transition-all duration-300"
                >
                  <QrCodeIcon className="w-5 h-5" />
                  <span>Show QR</span>
                </button>
                
                <button className="flex items-center justify-center p-2 border border-nexora-purple/30 text-gray-300 rounded-lg hover:bg-nexora-purple/20 hover:text-white transition-all duration-300">
                  <EyeIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center py-12 bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl"
        >
          <TicketIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 text-lg font-medium">No events found</p>
          <p className="text-gray-400">
            {activeTab === 'upcoming' && "You don't have any upcoming events"}
            {activeTab === 'past' && "You haven't attended any events yet"}
            {activeTab === 'all' && "You haven't registered for any events yet"}
          </p>
        </motion.div>
      )}

      {/* QR Code Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-nexora-dark/95 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Event Ticket</h3>
              <p className="text-gray-300 mb-6">{selectedEvent.title}</p>
              
              <div className="bg-white p-6 rounded-xl mb-6">
                {/* QR Code would be generated here */}
                <div className="w-48 h-48 bg-gray-200 mx-auto flex items-center justify-center">
                  <QrCodeIcon className="w-24 h-24 text-gray-600" />
                </div>
              </div>
              
              <div className="text-left space-y-2 mb-6 bg-nexora-purple/10 rounded-xl p-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Event:</span>
                  <span className="text-white font-medium">{selectedEvent.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white">{selectedEvent.date} • {selectedEvent.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Venue:</span>
                  <span className="text-white">{selectedEvent.venue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ticket ID:</span>
                  <span className="text-nexora-blue font-mono text-sm">{selectedEvent.qrCode}</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="flex-1 px-4 py-2 border border-nexora-purple/30 text-gray-300 rounded-lg hover:bg-nexora-purple/20 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-nexora-pink to-nexora-blue rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-300">
                  Save Ticket
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyEvents;