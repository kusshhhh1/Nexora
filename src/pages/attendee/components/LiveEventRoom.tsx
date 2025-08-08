import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  HandRaisedIcon,
  ChartBarIcon,
  UsersIcon,
  PaperAirplaneIcon,
  HeartIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Poll {
  id: string;
  question: string;
  options: string[];
  userVote?: number;
  results?: number[];
}

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'chat' | 'announcement';
}

interface Question {
  id: string;
  text: string;
  author: string;
  likes: number;
  userLiked: boolean;
  status: 'pending' | 'answered';
}

type TabType = 'poll' | 'chat' | 'qa';

const LiveEventRoom: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('poll');
  const [chatMessage, setChatMessage] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // Mock current event
  const currentEvent = {
    id: 1,
    title: 'Tech Innovation Summit 2024',
    isLive: true,
    attendees: 342,
    startTime: '09:00 AM'
  };

  // Mock live poll
  const [activePoll, setActivePoll] = useState<Poll>({
    id: '1',
    question: 'Which technology excites you most for 2024?',
    options: ['AI/Machine Learning', 'Web3/Blockchain', 'AR/VR', 'IoT'],
    results: [45, 23, 18, 14]
  });

  // Mock chat messages
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: '1',
      author: 'Event Host',
      content: 'Welcome to Tech Innovation Summit 2024! 🎉',
      timestamp: '09:00 AM',
      type: 'announcement'
    },
    {
      id: '2',
      author: 'John Developer',
      content: 'Excited to be here! Great lineup of speakers.',
      timestamp: '09:02 AM',
      type: 'chat'
    },
    {
      id: '3',
      author: 'Sarah Designer',
      content: 'The AI presentation was amazing! 🤖',
      timestamp: '09:15 AM',
      type: 'chat'
    }
  ]);

  // Mock Q&A questions
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: 'How do you see AI impacting software development in the next 5 years?',
      author: 'Alex Chen',
      likes: 15,
      userLiked: false,
      status: 'pending'
    },
    {
      id: '2',
      text: 'What are the best practices for implementing microservices architecture?',
      author: 'Maria Rodriguez',
      likes: 8,
      userLiked: true,
      status: 'answered'
    },
    {
      id: '3',
      text: 'How can startups effectively compete with established tech companies?',
      author: 'David Kim',
      likes: 12,
      userLiked: false,
      status: 'pending'
    }
  ]);

  useEffect(() => {
    // Simulate connection
    setTimeout(() => {
      setIsConnected(true);
      toast.success('Connected to live event!');
    }, 1000);

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Add random chat message
      if (Math.random() > 0.7) {
        const newMessage: Message = {
          id: Date.now().toString(),
          author: `Attendee ${Math.floor(Math.random() * 100)}`,
          content: `This is a great session! Learning so much 📚`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'chat'
        };
        setChatMessages(prev => [...prev, newMessage]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const votePoll = (optionIndex: number) => {
    if (activePoll.userVote !== undefined) {
      toast.error('You have already voted in this poll!');
      return;
    }

    setActivePoll(prev => ({
      ...prev,
      userVote: optionIndex,
      results: prev.results?.map((count, index) => 
        index === optionIndex ? count + 1 : count
      )
    }));

    toast.success('Vote submitted successfully!');
  };

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        author: 'You',
        content: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'chat'
      };
      setChatMessages(prev => [...prev, newMessage]);
      setChatMessage('');
    }
  };

  const submitQuestion = () => {
    if (questionText.trim()) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        text: questionText,
        author: 'You',
        likes: 0,
        userLiked: false,
        status: 'pending'
      };
      setQuestions(prev => [newQuestion, ...prev]);
      setQuestionText('');
      toast.success('Question submitted!');
    }
  };

  const toggleQuestionLike = (questionId: string) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === questionId 
          ? { ...q, likes: q.userLiked ? q.likes - 1 : q.likes + 1, userLiked: !q.userLiked }
          : q
      )
    );
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-white">Live Event Room</h1>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
            isConnected 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-orange-400'}`}></div>
            <span>{isConnected ? 'Live' : 'Connecting...'}</span>
          </div>
        </div>
        <p className="text-gray-300">
          Join the conversation and participate in real-time interactions
        </p>
      </motion.div>

      {/* Current Event Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-nexora-pink to-nexora-blue rounded-xl flex items-center justify-center">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{currentEvent.title}</h3>
              <p className="text-gray-300">Started at {currentEvent.startTime}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-gray-300">
              <UsersIcon className="w-5 h-5" />
              <span>{currentEvent.attendees} attendees</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>LIVE</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex space-x-1 bg-nexora-purple/20 rounded-2xl p-1"
      >
        {[
          { key: 'poll', label: 'Live Poll', icon: ChartBarIcon },
          { key: 'chat', label: 'Chat', icon: ChatBubbleLeftRightIcon },
          { key: 'qa', label: 'Q&A', icon: HandRaisedIcon }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as TabType)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-nexora-pink to-nexora-blue text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-nexora-purple/30'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'poll' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Live Poll</h3>
            
            <div className="max-w-2xl mx-auto">
              <h4 className="text-xl text-white mb-6 text-center">{activePoll.question}</h4>
              
              <div className="space-y-4">
                {activePoll.options.map((option, index) => {
                  const totalVotes = activePoll.results?.reduce((sum, count) => sum + count, 0) || 0;
                  const percentage = totalVotes > 0 ? (activePoll.results?.[index] || 0) / totalVotes * 100 : 0;
                  const isSelected = activePoll.userVote === index;
                  
                  return (
                    <motion.button
                      key={index}
                      onClick={() => votePoll(index)}
                      disabled={activePoll.userVote !== undefined}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? 'border-nexora-pink/60 bg-nexora-pink/10'
                          : activePoll.userVote !== undefined
                          ? 'border-nexora-purple/20 bg-nexora-purple/5 cursor-not-allowed'
                          : 'border-nexora-purple/30 bg-nexora-purple/10 hover:border-nexora-blue/50 hover:bg-nexora-purple/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{option}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm">
                            {activePoll.results?.[index] || 0} votes
                          </span>
                          {isSelected && <span className="text-nexora-pink">✓</span>}
                        </div>
                      </div>
                      
                      {activePoll.userVote !== undefined && (
                        <div className="w-full bg-nexora-purple/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-nexora-pink to-nexora-blue h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              
              {activePoll.userVote !== undefined && (
                <div className="text-center mt-6">
                  <p className="text-green-400 font-medium">Thank you for voting!</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Total votes: {activePoll.results?.reduce((sum, count) => sum + count, 0)}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'chat' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Live Chat</h3>
            
            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto mb-4 space-y-3 bg-nexora-purple/5 rounded-xl p-4">
              {chatMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex items-start space-x-3 ${
                    message.type === 'announcement' ? 'bg-nexora-blue/10 rounded-lg p-3' : ''
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-nexora-pink to-nexora-blue rounded-full flex items-center justify-center flex-shrink-0">
                    {message.type === 'announcement' ? (
                      <BellIcon className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-xs font-bold text-white">
                        {message.author.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`font-semibold text-sm ${
                        message.type === 'announcement' ? 'text-nexora-blue' : 'text-white'
                      }`}>
                        {message.author}
                      </span>
                      <span className="text-gray-400 text-xs">{message.timestamp}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Chat Input */}
            <div className="flex space-x-3">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-blue focus:border-transparent transition-all duration-300"
              />
              <motion.button
                onClick={sendChatMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-nexora-pink to-nexora-blue rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-nexora-blue/25 transition-all duration-300"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {activeTab === 'qa' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Submit Question */}
            <div className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Ask a Question</h3>
              
              <div className="flex space-x-3">
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="What would you like to ask the speakers?"
                  rows={3}
                  className="flex-1 px-4 py-3 bg-nexora-purple/20 border border-nexora-purple/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nexora-blue focus:border-transparent transition-all duration-300 resize-none"
                />
                <motion.button
                  onClick={submitQuestion}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-nexora-pink to-nexora-blue rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-nexora-blue/25 transition-all duration-300 self-start"
                >
                  Submit
                </motion.button>
              </div>
            </div>

            {/* Questions List */}
            <div className="bg-nexora-dark/60 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Community Questions</h3>
              
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`p-4 rounded-xl border ${
                      question.status === 'answered' 
                        ? 'border-green-500/30 bg-green-500/5' 
                        : 'border-nexora-purple/20 bg-nexora-purple/5'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-white font-medium mb-2">{question.text}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>By {question.author}</span>
                          {question.status === 'answered' && (
                            <span className="text-green-400 font-medium">✓ Answered</span>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleQuestionLike(question.id)}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-all duration-300 ${
                          question.userLiked
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-nexora-purple/20 text-gray-400 border border-nexora-purple/30 hover:text-red-400 hover:border-red-500/30'
                        }`}
                      >
                        <HeartIcon className="w-4 h-4" />
                        <span>{question.likes}</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LiveEventRoom;