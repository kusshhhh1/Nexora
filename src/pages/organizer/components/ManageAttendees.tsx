import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  QrCodeIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  CalendarDaysIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

interface Attendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  event: string;
  registrationDate: string;
  checkedIn: boolean;
  ticketType: 'free' | 'paid';
  paymentStatus: 'completed' | 'pending' | 'failed';
  qrCode: string;
}

const ManageAttendees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEvent, setFilterEvent] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);

  const events = [
    'Tech Innovation Summit 2024',
    'Digital Marketing Masterclass',
    'Startup Pitch Night',
    'AI & Future of Work'
  ];

  const attendees: Attendee[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      event: 'Tech Innovation Summit 2024',
      registrationDate: '2024-02-10',
      checkedIn: true,
      ticketType: 'paid',
      paymentStatus: 'completed',
      qrCode: 'QR123456789'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 (555) 987-6543',
      event: 'Digital Marketing Masterclass',
      registrationDate: '2024-02-08',
      checkedIn: false,
      ticketType: 'free',
      paymentStatus: 'completed',
      qrCode: 'QR987654321'
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@example.com',
      phone: '+1 (555) 456-7890',
      event: 'Tech Innovation Summit 2024',
      registrationDate: '2024-02-12',
      checkedIn: false,
      ticketType: 'paid',
      paymentStatus: 'pending',
      qrCode: 'QR456789123'
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      email: 'emily@example.com',
      phone: '+1 (555) 321-6547',
      event: 'Startup Pitch Night',
      registrationDate: '2024-02-05',
      checkedIn: true,
      ticketType: 'paid',
      paymentStatus: 'completed',
      qrCode: 'QR789123456'
    }
  ];

  const filteredAttendees = attendees.filter(attendee => {
    const matchesSearch = attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attendee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = filterEvent === 'all' || attendee.event === filterEvent;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'checked-in' && attendee.checkedIn) ||
                         (filterStatus === 'pending' && !attendee.checkedIn);
    
    return matchesSearch && matchesEvent && matchesStatus;
  });

  const toggleCheckIn = (attendeeId: string) => {
    // In a real app, this would update the backend
    console.log(`Toggle check-in for attendee ${attendeeId}`);
  };

  const showQRCode = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Manage Attendees</h1>
        <p className="text-gray-300">
          View registrations, check-in status, and manage attendee information
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"
      >
        {[
          { label: 'Total Registrations', value: '2,847', icon: UserIcon, color: 'from-nexora-blue to-nexora-pink' },
          { label: 'Checked In', value: '1,923', icon: CheckCircleIcon, color: 'from-green-500 to-emerald-400' },
          { label: 'Pending Check-in', value: '924', icon: XCircleIcon, color: 'from-orange-500 to-yellow-400' },
          { label: 'Revenue', value: '$89,420', icon: CalendarDaysIcon, color: 'from-nexora-pink to-nexora-purple' }
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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search attendees by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Event Filter */}
          <div className="relative">
            <select
              value={filterEvent}
              onChange={(e) => setFilterEvent(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
            >
              <option value="all">All Events</option>
              {events.map(event => (
                <option key={event} value={event}>{event}</option>
              ))}
            </select>
            <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
            >
              <option value="all">All Status</option>
              <option value="checked-in">Checked In</option>
              <option value="pending">Pending Check-in</option>
            </select>
            <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Attendees Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-nexora-purple/20 border-b border-nexora-purple/20">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Attendee</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Event</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Registration</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Payment</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nexora-purple/20">
              {filteredAttendees.map((attendee, index) => (
                <motion.tr
                  key={attendee.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-nexora-purple/10 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-nexora-blue to-nexora-pink rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">
                          {attendee.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-white">{attendee.name}</p>
                        <div className="flex items-center text-sm text-gray-400 mt-1">
                          <EnvelopeIcon className="w-4 h-4 mr-1" />
                          {attendee.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <PhoneIcon className="w-4 h-4 mr-1" />
                          {attendee.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{attendee.event}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                      attendee.ticketType === 'paid'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {attendee.ticketType === 'paid' ? 'Paid' : 'Free'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white">{attendee.registrationDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      attendee.checkedIn
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    }`}>
                      {attendee.checkedIn ? (
                        <>
                          <CheckCircleIcon className="w-4 h-4 mr-1" />
                          Checked In
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="w-4 h-4 mr-1" />
                          Pending
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      attendee.paymentStatus === 'completed'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : attendee.paymentStatus === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {attendee.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => showQRCode(attendee)}
                        className="p-2 text-nexora-blue hover:text-nexora-pink hover:bg-nexora-purple/20 rounded-lg transition-all duration-300"
                        title="Show QR Code"
                      >
                        <QrCodeIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleCheckIn(attendee.id)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          attendee.checkedIn
                            ? 'text-orange-400 hover:bg-orange-500/20'
                            : 'text-green-400 hover:bg-green-500/20'
                        }`}
                        title={attendee.checkedIn ? 'Mark as Not Checked In' : 'Mark as Checked In'}
                      >
                        {attendee.checkedIn ? <XCircleIcon className="w-5 h-5" /> : <CheckCircleIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAttendees.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 text-lg font-medium">No attendees found</p>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </motion.div>

      {/* QR Code Modal */}
      {selectedAttendee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-nexora-dark/95 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">QR Code Ticket</h3>
              <div className="bg-white p-6 rounded-xl mb-4">
                {/* QR Code would be generated here */}
                <div className="w-48 h-48 bg-gray-200 mx-auto flex items-center justify-center">
                  <QrCodeIcon className="w-24 h-24 text-gray-600" />
                </div>
              </div>
              <div className="text-left space-y-2 mb-6">
                <p className="text-white"><span className="text-gray-400">Name:</span> {selectedAttendee.name}</p>
                <p className="text-white"><span className="text-gray-400">Event:</span> {selectedAttendee.event}</p>
                <p className="text-white"><span className="text-gray-400">ID:</span> {selectedAttendee.qrCode}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedAttendee(null)}
                  className="flex-1 px-4 py-2 border border-nexora-purple/30 text-gray-300 rounded-lg hover:bg-nexora-purple/20 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-nexora-blue to-nexora-pink rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-300">
                  Download
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageAttendees;