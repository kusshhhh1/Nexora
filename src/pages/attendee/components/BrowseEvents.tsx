import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UsersIcon,
  ClockIcon,
  TagIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  price: string;
  isPaid: boolean;
  attendees: number;
  capacity: number;
  image: string;
  organizer: string;
  tags: string[];
  rating: number;
  isLiked?: boolean;
}

const BrowseEvents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [likedEvents, setLikedEvents] = useState<number[]>([]);

  const categories = [
    'All Categories',
    'Technology',
    'Business',
    'Education',
    'Entertainment',
    'Health',
    'Sports',
    'Arts',
    'Music',
    'Networking'
  ];

  // Mock events data
  const events: Event[] = [
    {
      id: 1,
      title: 'Tech Innovation Summit 2024',
      description: 'Join industry leaders discussing the future of technology, AI, and digital transformation. Network with professionals and discover cutting-edge innovations.',
      date: '2024-02-20',
      time: '09:00 AM',
      venue: 'Silicon Valley Convention Center',
      category: 'Technology',
      price: 'Free',
      isPaid: false,
      attendees: 342,
      capacity: 500,
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600',
      organizer: 'Tech Innovators Inc.',
      tags: ['AI', 'Innovation', 'Networking'],
      rating: 4.8
    },
    {
      id: 2,
      title: 'Digital Marketing Masterclass',
      description: 'Learn advanced digital marketing strategies from industry experts. Covers SEO, social media, content marketing, and analytics.',
      date: '2024-02-25',
      time: '02:00 PM',
      venue: 'Creative Hub Downtown',
      category: 'Business',
      price: '$49',
      isPaid: true,
      attendees: 67,
      capacity: 100,
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600',
      organizer: 'Marketing Pros',
      tags: ['Marketing', 'SEO', 'Social Media'],
      rating: 4.6
    },
    {
      id: 3,
      title: 'Startup Networking Night',
      description: 'Connect with fellow entrepreneurs, investors, and startup enthusiasts. Pitch your ideas and find potential co-founders.',
      date: '2024-03-05',
      time: '06:00 PM',
      venue: 'Rooftop Lounge',
      category: 'Networking',
      price: '$25',
      isPaid: true,
      attendees: 189,
      capacity: 250,
      image: 'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=600',
      organizer: 'Startup Community',
      tags: ['Startup', 'Networking', 'Investment'],
      rating: 4.4
    },
    {
      id: 4,
      title: 'AI & Machine Learning Workshop',
      description: 'Hands-on workshop covering machine learning fundamentals, neural networks, and practical AI applications.',
      date: '2024-03-10',
      time: '10:00 AM',
      venue: 'University Tech Center',
      category: 'Education',
      price: '$89',
      isPaid: true,
      attendees: 45,
      capacity: 60,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      organizer: 'AI Learning Institute',
      tags: ['AI', 'Machine Learning', 'Workshop'],
      rating: 4.9
    },
    {
      id: 5,
      title: 'Design Thinking Bootcamp',
      description: 'Intensive bootcamp covering design thinking methodology, user experience design, and rapid prototyping techniques.',
      date: '2024-03-15',
      time: '09:00 AM',
      venue: 'Design Studio',
      category: 'Education',
      price: '$129',
      isPaid: true,
      attendees: 78,
      capacity: 120,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      organizer: 'Creative Design Co.',
      tags: ['Design', 'UX', 'Prototyping'],
      rating: 4.7
    },
    {
      id: 6,
      title: 'Music Festival 2024',
      description: 'Annual music festival featuring local and international artists across multiple genres. Food trucks and art installations included.',
      date: '2024-04-01',
      time: '12:00 PM',
      venue: 'Central Park Amphitheater',
      category: 'Music',
      price: '$75',
      isPaid: true,
      attendees: 1243,
      capacity: 2000,
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
      organizer: 'Music Events Co.',
      tags: ['Music', 'Festival', 'Entertainment'],
      rating: 4.5
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           selectedCategory.toLowerCase() === 'all categories' || 
                           event.category.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesPrice = priceFilter === 'all' ||
                        (priceFilter === 'free' && !event.isPaid) ||
                        (priceFilter === 'paid' && event.isPaid);
    
    const matchesDate = dateFilter === 'all' ||
                       (dateFilter === 'this-week' && isThisWeek(event.date)) ||
                       (dateFilter === 'this-month' && isThisMonth(event.date));
    
    return matchesSearch && matchesCategory && matchesPrice && matchesDate;
  });

  const isThisWeek = (date: string) => {
    const eventDate = new Date(date);
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return eventDate >= now && eventDate <= weekFromNow;
  };

  const isThisMonth = (date: string) => {
    const eventDate = new Date(date);
    const now = new Date();
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  };

  const toggleLike = (eventId: number) => {
    setLikedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const registerForEvent = (event: Event) => {
    toast.success(`Successfully registered for ${event.title}!`);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Browse Events</h1>
        <p className="text-gray-300">
          Discover amazing events happening in your area and beyond
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6"
      >
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events, topics, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-blue focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-nexora-blue focus:border-transparent transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
              <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Price Filter */}
            <div className="relative">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-nexora-blue focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Prices</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
              <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Date Filter */}
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-nexora-blue focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Dates</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
              </select>
              <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <p className="text-gray-300">
          Found <span className="text-nexora-blue font-semibold">{filteredEvents.length}</span> events
        </p>
      </motion.div>

      {/* Events Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl overflow-hidden hover:border-nexora-blue/40 hover:shadow-lg hover:shadow-nexora-blue/25 transition-all duration-300 group"
          >
            {/* Event Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Like Button */}
              <button
                onClick={() => toggleLike(event.id)}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors duration-300"
              >
                {likedEvents.includes(event.id) ? (
                  <HeartIconSolid className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-white" />
                )}
              </button>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-nexora-blue/20 backdrop-blur-sm text-nexora-blue border border-nexora-blue/30 rounded-full text-xs font-medium">
                  {event.category}
                </span>
              </div>

              {/* Price Tag */}
              <div className="absolute bottom-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  event.isPaid 
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
                <h3 className="text-xl font-bold text-white group-hover:text-nexora-blue transition-colors line-clamp-2">
                  {event.title}
                </h3>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

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
                  <UsersIcon className="w-4 h-4 mr-2" />
                  {event.attendees} / {event.capacity} attendees
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="flex items-center px-2 py-1 bg-nexora-purple/20 text-nexora-purple border border-nexora-purple/30 rounded-full text-xs"
                  >
                    <TagIcon className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Rating and Organizer */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(event.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-gray-400 text-sm ml-1">{event.rating}</span>
                </div>
                <span className="text-gray-400 text-xs">{event.organizer}</span>
              </div>

              {/* Register Button */}
              <motion.button
                onClick={() => registerForEvent(event)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-nexora-pink to-nexora-blue rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-nexora-blue/25 transition-all duration-300"
              >
                Register Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center py-12 bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl"
        >
          <CalendarDaysIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 text-lg font-medium">No events found</p>
          <p className="text-gray-400">Try adjusting your search criteria or filters</p>
        </motion.div>
      )}
    </div>
  );
};

export default BrowseEvents;