import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  StarIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

interface EventFeedback {
  id: number;
  eventTitle: string;
  eventDate: string;
  organizer: string;
  image: string;
  hasSubmitted: boolean;
  rating?: number;
  feedback?: string;
  categories?: {
    content: number;
    organization: number;
    venue: number;
    networking: number;
  };
}

const Feedback: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventFeedback | null>(null);
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 0,
    content: 0,
    organization: 0,
    venue: 0,
    networking: 0,
    feedback: '',
    wouldRecommend: true,
    improvements: ''
  });

  // Mock attended events
  const attendedEvents: EventFeedback[] = [
    {
      id: 1,
      eventTitle: 'AI & Machine Learning Bootcamp',
      eventDate: '2024-02-15',
      organizer: 'AI Learning Institute',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      hasSubmitted: false
    },
    {
      id: 2,
      eventTitle: 'Product Design Workshop',
      eventDate: '2024-02-08',
      organizer: 'Creative Design Co.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      hasSubmitted: true,
      rating: 5,
      feedback: 'Excellent workshop with hands-on activities. Learned a lot about user-centered design principles.',
      categories: {
        content: 5,
        organization: 4,
        venue: 5,
        networking: 4
      }
    },
    {
      id: 3,
      eventTitle: 'Digital Marketing Masterclass',
      eventDate: '2024-02-05',
      organizer: 'Marketing Pros',
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400',
      hasSubmitted: true,
      rating: 4,
      feedback: 'Great content and practical examples. Would have liked more time for Q&A sessions.',
      categories: {
        content: 4,
        organization: 4,
        venue: 3,
        networking: 4
      }
    },
    {
      id: 4,
      eventTitle: 'Startup Networking Night',
      eventDate: '2024-01-28',
      organizer: 'Startup Community',
      image: 'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=400',
      hasSubmitted: false
    }
  ];

  const openFeedbackModal = (event: EventFeedback) => {
    setSelectedEvent(event);
    if (event.hasSubmitted) {
      setFeedbackForm({
        rating: event.rating || 0,
        content: event.categories?.content || 0,
        organization: event.categories?.organization || 0,
        venue: event.categories?.venue || 0,
        networking: event.categories?.networking || 0,
        feedback: event.feedback || '',
        wouldRecommend: true,
        improvements: ''
      });
    } else {
      setFeedbackForm({
        rating: 0,
        content: 0,
        organization: 0,
        venue: 0,
        networking: 0,
        feedback: '',
        wouldRecommend: true,
        improvements: ''
      });
    }
  };

  const submitFeedback = () => {
    if (feedbackForm.rating === 0) {
      toast.error('Please provide an overall rating');
      return;
    }

    // Simulate API call
    toast.success('Feedback submitted successfully!');
    setSelectedEvent(null);
    
    // Reset form
    setFeedbackForm({
      rating: 0,
      content: 0,
      organization: 0,
      venue: 0,
      networking: 0,
      feedback: '',
      wouldRecommend: true,
      improvements: ''
    });
  };

  const StarRating: React.FC<{ 
    rating: number; 
    onRatingChange?: (rating: number) => void; 
    readonly?: boolean;
    size?: 'sm' | 'md' | 'lg';
  }> = ({ rating, onRatingChange, readonly = false, size = 'md' }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onRatingChange && onRatingChange(star)}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform duration-200`}
          >
            {star <= rating ? (
              <StarIconSolid className={`${sizeClasses[size]} text-yellow-400`} />
            ) : (
              <StarIcon className={`${sizeClasses[size]} text-gray-400`} />
            )}
          </button>
        ))}
      </div>
    );
  };

  const pendingFeedback = attendedEvents.filter(event => !event.hasSubmitted);
  const completedFeedback = attendedEvents.filter(event => event.hasSubmitted);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Event Feedback</h1>
        <p className="text-gray-300">
          Share your experience and help improve future events
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { 
            label: 'Events Attended', 
            value: attendedEvents.length, 
            icon: CalendarDaysIcon, 
            color: 'from-nexora-pink to-nexora-blue' 
          },
          { 
            label: 'Feedback Submitted', 
            value: completedFeedback.length, 
            icon: CheckCircleIcon, 
            color: 'from-green-500 to-emerald-400' 
          },
          { 
            label: 'Pending Reviews', 
            value: pendingFeedback.length, 
            icon: PencilIcon, 
            color: 'from-orange-500 to-yellow-400' 
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

      {/* Pending Feedback */}
      {pendingFeedback.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <PencilIcon className="w-6 h-6 mr-2 text-orange-400" />
            Pending Feedback ({pendingFeedback.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingFeedback.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-nexora-purple/10 border border-nexora-purple/20 rounded-xl hover:border-orange-400/40 hover:bg-nexora-purple/20 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gray-300 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={event.image} 
                    alt={event.eventTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{event.eventTitle}</h4>
                  <p className="text-gray-400 text-sm mb-2">{event.eventDate} • {event.organizer}</p>
                  <button
                    onClick={() => openFeedbackModal(event)}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg font-semibold text-white text-sm hover:shadow-lg transition-all duration-300"
                  >
                    Leave Feedback
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Completed Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <CheckCircleIcon className="w-6 h-6 mr-2 text-green-400" />
          Completed Reviews ({completedFeedback.length})
        </h3>
        
        <div className="space-y-4">
          {completedFeedback.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="flex items-start space-x-4 p-4 bg-nexora-purple/10 border border-nexora-purple/20 rounded-xl hover:border-green-400/40 hover:bg-nexora-purple/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gray-300 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={event.image} 
                  alt={event.eventTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-white mb-1">{event.eventTitle}</h4>
                    <p className="text-gray-400 text-sm">{event.eventDate} • {event.organizer}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StarRating rating={event.rating || 0} readonly size="sm" />
                    <span className="text-yellow-400 font-semibold">{event.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-3">{event.feedback}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4 text-xs text-gray-400">
                    <span>Content: {event.categories?.content}/5</span>
                    <span>Organization: {event.categories?.organization}/5</span>
                    <span>Venue: {event.categories?.venue}/5</span>
                    <span>Networking: {event.categories?.networking}/5</span>
                  </div>
                  
                  <button
                    onClick={() => openFeedbackModal(event)}
                    className="px-3 py-1 border border-nexora-purple/30 text-gray-300 rounded-lg hover:bg-nexora-purple/20 hover:text-white transition-all duration-300 text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Feedback Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-nexora-dark/95 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gray-300 rounded-xl overflow-hidden">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.eventTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedEvent.eventTitle}</h3>
                <p className="text-gray-300">{selectedEvent.eventDate} • {selectedEvent.organizer}</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Overall Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Overall Rating *
                </label>
                <div className="flex items-center space-x-4">
                  <StarRating 
                    rating={feedbackForm.rating} 
                    onRatingChange={(rating) => setFeedbackForm({...feedbackForm, rating})}
                    readonly={selectedEvent.hasSubmitted}
                    size="lg"
                  />
                  <span className="text-white font-semibold">
                    {feedbackForm.rating > 0 && `${feedbackForm.rating}/5`}
                  </span>
                </div>
              </div>

              {/* Category Ratings */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'content', label: 'Content Quality' },
                  { key: 'organization', label: 'Organization' },
                  { key: 'venue', label: 'Venue & Facilities' },
                  { key: 'networking', label: 'Networking Opportunities' }
                ].map((category) => (
                  <div key={category.key}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {category.label}
                    </label>
                    <StarRating 
                      rating={feedbackForm[category.key as keyof typeof feedbackForm] as number} 
                      onRatingChange={(rating) => setFeedbackForm({
                        ...feedbackForm, 
                        [category.key]: rating
                      })}
                      readonly={selectedEvent.hasSubmitted}
                    />
                  </div>
                ))}
              </div>

              {/* Written Feedback */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Feedback
                </label>
                <textarea
                  value={feedbackForm.feedback}
                  onChange={(e) => setFeedbackForm({...feedbackForm, feedback: e.target.value})}
                  disabled={selectedEvent.hasSubmitted}
                  rows={4}
                  className="w-full px-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-blue focus:border-transparent transition-all duration-300 resize-none disabled:opacity-50"
                  placeholder="Share your experience, what you liked, and what could be improved..."
                />
              </div>

              {/* Recommendation */}
              {!selectedEvent.hasSubmitted && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Would you recommend this event to others?
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recommend"
                        checked={feedbackForm.wouldRecommend}
                        onChange={() => setFeedbackForm({...feedbackForm, wouldRecommend: true})}
                        className="w-4 h-4 text-nexora-pink bg-nexora-purple/20 border-nexora-purple/30 focus:ring-nexora-pink"
                      />
                      <span className="ml-2 text-white">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recommend"
                        checked={!feedbackForm.wouldRecommend}
                        onChange={() => setFeedbackForm({...feedbackForm, wouldRecommend: false})}
                        className="w-4 h-4 text-nexora-pink bg-nexora-purple/20 border-nexora-purple/30 focus:ring-nexora-pink"
                      />
                      <span className="ml-2 text-white">No</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-3 border border-nexora-purple/30 text-gray-300 rounded-lg hover:bg-nexora-purple/20 transition-colors duration-300"
              >
                {selectedEvent.hasSubmitted ? 'Close' : 'Cancel'}
              </button>
              {!selectedEvent.hasSubmitted && (
                <button
                  onClick={submitFeedback}
                  className="px-6 py-3 bg-gradient-to-r from-nexora-pink to-nexora-blue rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-nexora-blue/25 transition-all duration-300"
                >
                  Submit Feedback
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Feedback;