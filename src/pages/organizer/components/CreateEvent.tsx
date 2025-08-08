import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PhotoIcon,
  CalendarDaysIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  TagIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const CreateEvent: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    category: '',
    price: '',
    isPaid: false,
    capacity: '',
    tags: '',
    image: null as File | null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Technology',
    'Business',
    'Education',
    'Entertainment',
    'Health',
    'Sports',
    'Arts',
    'Music',
    'Networking',
    'Workshop'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Event created:', formData);
      
      toast.success('Event created successfully!');
      
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        category: '',
        price: '',
        isPaid: false,
        capacity: '',
        tags: '',
        image: null
      });
      setImagePreview(null);
    } catch {
      toast.error('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Create New Event</h1>
        <p className="text-gray-300">
          Fill in the details to create an amazing event experience
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Image */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-4">
              Event Banner Image
            </label>
            <div className="relative">
              <div 
                className="border-2 border-dashed border-nexora-purple/40 rounded-xl p-8 text-center hover:border-nexora-pink/60 transition-colors duration-300 cursor-pointer group"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <PhotoIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 font-medium">Click to upload event banner</p>
                    <p className="text-gray-400 text-sm mt-1">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Event Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Event Title *
              </label>
              <div className="relative">
                <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
                  placeholder="Enter event title"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Capacity */}
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-300 mb-2">
                Capacity
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
                placeholder="Maximum attendees"
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                Date *
              </label>
              <div className="relative">
                <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">
                Time *
              </label>
              <input
                type="time"
                id="time"
                name="time"
                required
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Venue */}
            <div className="md:col-span-2">
              <label htmlFor="venue" className="block text-sm font-medium text-gray-300 mb-2">
                Venue *
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  required
                  value={formData.venue}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
                  placeholder="Event location or virtual link"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPaid"
                    checked={formData.isPaid}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-nexora-pink bg-nexora-purple/20 border-nexora-purple/30 rounded focus:ring-nexora-pink focus:ring-2"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-300">This is a paid event</span>
                </label>
              </div>

              {formData.isPaid && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                    Ticket Price ($) *
                  </label>
                  <div className="relative">
                    <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      id="price"
                      name="price"
                      required={formData.isPaid}
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Tags */}
            <div className="md:col-span-2">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
                placeholder="e.g. networking, tech, startup"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Event Description *
              </label>
              <div className="relative">
                <DocumentTextIcon className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Describe your event, what attendees can expect, agenda, speakers, etc."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-nexora-purple/20">
            <button
              type="button"
              className="px-6 py-3 border border-nexora-purple/30 text-gray-300 rounded-lg hover:bg-nexora-purple/20 transition-colors duration-300"
            >
              Save as Draft
            </button>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-nexora-blue to-nexora-pink rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-nexora-pink/25 focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:ring-offset-2 focus:ring-offset-nexora-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Event...
                </div>
              ) : (
                'Create Event'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateEvent;