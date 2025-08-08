import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  HomeIcon,
  PlusCircleIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import DashboardOverview from './components/DashboardOverview';
import CreateEvent from './components/CreateEvent';
import ManageAttendees from './components/ManageAttendees';
import LivePolls from './components/LivePolls';
import Analytics from './components/Analytics';
import Notifications from './components/Notifications';
import logo from '../../assets/logo.png';

const OrganizerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/organizer/dashboard', icon: HomeIcon },
    { name: 'Create Event', href: '/organizer/dashboard/create', icon: PlusCircleIcon },
    { name: 'Manage Attendees', href: '/organizer/dashboard/attendees', icon: UsersIcon },
    { name: 'Live Polls & Q&A', href: '/organizer/dashboard/polls', icon: ChatBubbleLeftRightIcon },
    { name: 'Analytics', href: '/organizer/dashboard/analytics', icon: ChartBarIcon },
    { name: 'Notifications', href: '/organizer/dashboard/notifications', icon: BellIcon },
  ];

  return (
    <div className="min-h-screen text-white relative">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="flex">
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-black/90 backdrop-blur-md border-r border-nexora-purple/20 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out lg:translate-x-0`}
        >
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Nexora" className="w-10 h-10 rounded-lg" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-nexora-blue to-nexora-pink bg-clip-text text-transparent">
                  Nexora
                </h1>
                <p className="text-xs text-gray-400">Organizer Portal</p>
              </div>
            </div>
          </div>

          <nav className="px-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href === '/organizer/dashboard' && location.pathname === '/organizer/dashboard');
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-nexora-blue/20 to-nexora-pink/20 border border-nexora-pink/30 text-white'
                        : 'text-gray-300 hover:bg-nexora-purple/20 hover:text-white'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-nexora-purple/20">
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Account
              </div>
              <div className="space-y-2">
                <button className="group flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-nexora-purple/20 hover:text-white transition-all duration-200">
                  <Cog6ToothIcon className="mr-3 h-5 w-5 flex-shrink-0" />
                  Settings
                </button>
                <button 
                  onClick={logout}
                  className="group flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 flex-shrink-0" />
                  Sign Out
                </button>
              </div>
            </div>
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-nexora-purple/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-nexora-blue to-nexora-pink rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 lg:ml-64">
          <div className="lg:hidden bg-black/90 backdrop-blur-md border-b border-nexora-purple/20 px-4 py-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <main className="p-6">
            <Routes>
              <Route index element={<DashboardOverview />} />
              <Route path="create" element={<CreateEvent />} />
              <Route path="attendees" element={<ManageAttendees />} />
              <Route path="polls" element={<LivePolls />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="notifications" element={<Notifications />} />
            </Routes>
          </main>
        </div>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default OrganizerDashboard;