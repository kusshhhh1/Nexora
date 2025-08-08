import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  PlayIcon,
  PauseIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Poll {
  id: string;
  question: string;
  options: string[];
  responses: number[];
  isActive: boolean;
  createdAt: string;
}

interface Question {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  approved: boolean;
  likes: number;
}

const LivePolls: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'polls' | 'qa'>('polls');
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [newPoll, setNewPoll] = useState({
    question: '',
    options: ['', '']
  });

  // Mock data
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: '1',
      question: 'Which technology excites you most for 2024?',
      options: ['AI/Machine Learning', 'Web3/Blockchain', 'AR/VR', 'IoT'],
      responses: [45, 23, 18, 14],
      isActive: false,
      createdAt: '2024-02-15'
    },
    {
      id: '2',
      question: 'What\'s your preferred learning format?',
      options: ['Online Videos', 'In-person Workshops', 'Books/Articles', 'Podcasts'],
      responses: [32, 28, 25, 15],
      isActive: true,
      createdAt: '2024-02-14'
    }
  ]);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: 'How do you handle scalability challenges in microservices architecture?',
      author: 'John Developer',
      timestamp: '2024-02-15 14:30',
      approved: false,
      likes: 12
    },
    {
      id: '2',
      text: 'What are the best practices for implementing CI/CD pipelines?',
      author: 'Sarah Engineer',
      timestamp: '2024-02-15 14:25',
      approved: true,
      likes: 8
    },
    {
      id: '3',
      text: 'Can you share insights on building user-centric product designs?',
      author: 'Mike Designer',
      timestamp: '2024-02-15 14:20',
      approved: false,
      likes: 15
    }
  ]);

  const addPollOption = () => {
    setNewPoll({
      ...newPoll,
      options: [...newPoll.options, '']
    });
  };

  const updatePollOption = (index: number, value: string) => {
    const updatedOptions = [...newPoll.options];
    updatedOptions[index] = value;
    setNewPoll({
      ...newPoll,
      options: updatedOptions
    });
  };

  const removePollOption = (index: number) => {
    if (newPoll.options.length > 2) {
      const updatedOptions = newPoll.options.filter((_, i) => i !== index);
      setNewPoll({
        ...newPoll,
        options: updatedOptions
      });
    }
  };

  const createPoll = () => {
    if (newPoll.question && newPoll.options.every(option => option.trim())) {
      const poll: Poll = {
        id: Date.now().toString(),
        question: newPoll.question,
        options: newPoll.options,
        responses: new Array(newPoll.options.length).fill(0),
        isActive: false,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setPolls([poll, ...polls]);
      setNewPoll({ question: '', options: ['', ''] });
      setShowCreatePoll(false);
      toast.success('Poll created successfully!');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  const togglePoll = (pollId: string) => {
    setPolls(polls.map(poll => 
      poll.id === pollId 
        ? { ...poll, isActive: !poll.isActive }
        : { ...poll, isActive: false } // Only one poll can be active at a time
    ));
  };

  const deletePoll = (pollId: string) => {
    setPolls(polls.filter(poll => poll.id !== pollId));
    toast.success('Poll deleted');
  };

  const approveQuestion = (questionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, approved: !q.approved } : q
    ));
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
    toast.success('Question removed');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Live Polls & Q&A</h1>
        <p className="text-gray-300">
          Engage your audience with real-time polls and interactive Q&A sessions
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
          onClick={() => setActiveTab('polls')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
            activeTab === 'polls'
              ? 'bg-gradient-to-r from-nexora-blue to-nexora-pink text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-nexora-purple/30'
          }`}
        >
          <ChartBarIcon className="w-5 h-5" />
          <span>Live Polls</span>
        </button>
        <button
          onClick={() => setActiveTab('qa')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
            activeTab === 'qa'
              ? 'bg-gradient-to-r from-nexora-blue to-nexora-pink text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-nexora-purple/30'
          }`}
        >
          <ChatBubbleLeftRightIcon className="w-5 h-5" />
          <span>Q&A Management</span>
        </button>
      </motion.div>

      {activeTab === 'polls' && (
        <div className="space-y-6">
          {/* Create Poll Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-end"
          >
            <button
              onClick={() => setShowCreatePoll(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-nexora-blue to-nexora-pink rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-nexora-pink/25 transition-all duration-300"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Create New Poll</span>
            </button>
          </motion.div>

          {/* Polls List */}
          <div className="space-y-4">
            {polls.map((poll, index) => (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`bg-nexora-dark/60 backdrop-blur-sm border rounded-2xl p-6 ${
                  poll.isActive 
                    ? 'border-nexora-pink/60 shadow-lg shadow-nexora-pink/25' 
                    : 'border-nexora-purple/20'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{poll.question}</h3>
                    <p className="text-gray-400 text-sm">Created: {poll.createdAt}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {poll.isActive && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm font-medium">
                        Live
                      </span>
                    )}
                    <button
                      onClick={() => togglePoll(poll.id)}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        poll.isActive 
                          ? 'text-orange-400 hover:bg-orange-500/20' 
                          : 'text-green-400 hover:bg-green-500/20'
                      }`}
                    >
                      {poll.isActive ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => deletePoll(poll.id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {poll.options.map((option, optionIndex) => {
                    const totalResponses = poll.responses.reduce((sum, count) => sum + count, 0);
                    const percentage = totalResponses > 0 ? (poll.responses[optionIndex] / totalResponses) * 100 : 0;
                    
                    return (
                      <div key={optionIndex} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white font-medium">{option}</span>
                          <span className="text-gray-400">{poll.responses[optionIndex]} votes ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-nexora-purple/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-nexora-blue to-nexora-pink h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-nexora-purple/20">
                  <p className="text-gray-400 text-sm">
                    Total responses: {poll.responses.reduce((sum, count) => sum + count, 0)}
                  </p>
                  <button className="flex items-center space-x-1 text-nexora-pink hover:text-nexora-blue transition-colors text-sm">
                    <EyeIcon className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'qa' && (
        <div className="space-y-6">
          {/* Q&A Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { label: 'Total Questions', value: questions.length, color: 'from-nexora-blue to-nexora-pink' },
              { label: 'Approved', value: questions.filter(q => q.approved).length, color: 'from-green-500 to-emerald-400' },
              { label: 'Pending', value: questions.filter(q => !q.approved).length, color: 'from-orange-500 to-yellow-400' }
            ].map((stat) => (
              <div key={stat.label} className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Questions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {questions.map((question) => (
              <div
                key={question.id}
                className={`bg-nexora-dark/60 backdrop-blur-sm border rounded-2xl p-6 ${
                  question.approved 
                    ? 'border-green-500/30' 
                    : 'border-nexora-purple/20'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-white text-lg mb-2">{question.text}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>By {question.author}</span>
                      <span>{question.timestamp}</span>
                      <span className="flex items-center space-x-1">
                        <span>❤️</span>
                        <span>{question.likes}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {question.approved && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm font-medium">
                        Approved
                      </span>
                    )}
                    <button
                      onClick={() => approveQuestion(question.id)}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        question.approved 
                          ? 'text-orange-400 hover:bg-orange-500/20' 
                          : 'text-green-400 hover:bg-green-500/20'
                      }`}
                    >
                      {question.approved ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => deleteQuestion(question.id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Create Poll Modal */}
      {showCreatePoll && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-nexora-dark/95 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Create New Poll</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Poll Question *
                </label>
                <textarea
                  value={newPoll.question}
                  onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
                  className="w-full px-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300 resize-none"
                  rows={3}
                  placeholder="Enter your poll question..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Answer Options *
                </label>
                <div className="space-y-3">
                  {newPoll.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updatePollOption(index, e.target.value)}
                        className="flex-1 px-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-pink focus:border-transparent transition-all duration-300"
                        placeholder={`Option ${index + 1}`}
                      />
                      {newPoll.options.length > 2 && (
                        <button
                          onClick={() => removePollOption(index)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  {newPoll.options.length < 6 && (
                    <button
                      onClick={addPollOption}
                      className="flex items-center space-x-2 px-4 py-2 border border-nexora-purple/30 text-gray-300 rounded-lg hover:bg-nexora-purple/20 hover:text-white transition-all duration-300"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Add Option</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => {
                  setShowCreatePoll(false);
                  setNewPoll({ question: '', options: ['', ''] });
                }}
                className="px-6 py-3 border border-nexora-purple/30 text-gray-300 rounded-lg hover:bg-nexora-purple/20 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={createPoll}
                className="px-6 py-3 bg-gradient-to-r from-nexora-blue to-nexora-pink rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-nexora-pink/25 transition-all duration-300"
              >
                Create Poll
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LivePolls;