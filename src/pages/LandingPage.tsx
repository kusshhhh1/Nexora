import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CalendarDaysIcon, 
  UsersIcon, 
  ChartBarIcon,
  PlayIcon,
  ArrowRightIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';

const LandingPage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Director",
      company: "TechConf 2024",
      content: "Nexora transformed our conference management. The real-time engagement features kept attendees interactive throughout the entire event.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      company: "StartupWeek",
      content: "The analytics dashboard provided insights we never had before. Registration increased by 40% using Nexora's engagement tools.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Community Lead",
      company: "DevMeetup",
      content: "From QR check-ins to live polls, Nexora made our events feel modern and professional. Attendees loved the seamless experience.",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const features = [
    {
      icon: CalendarDaysIcon,
      title: "Create Events",
      description: "Design beautiful event pages with custom branding, ticketing, and registration management.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: UsersIcon,
      title: "Engage Attendees",
      description: "Real-time polls, Q&A sessions, and interactive features that keep audiences engaged.",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: ChartBarIcon,
      title: "Analyze Results",
      description: "Comprehensive analytics and insights to measure success and improve future events.",
      color: "from-orange-500 to-red-400"
    }
  ];

  return (
    <div className="text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-black/50"></div>
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-nexora-purple/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Nexora" className="w-10 h-10 rounded-lg" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-nexora-blue to-nexora-pink bg-clip-text text-transparent">
                  Nexora
                </h1>
                <p className="text-xs text-gray-400">Smart Event Management</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
              <Link 
                to="/organizer/auth"
                className="px-4 py-2 bg-gradient-to-r from-nexora-blue to-nexora-pink rounded-lg font-medium hover:shadow-lg hover:shadow-nexora-pink/25 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-nexora-purple/20 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-nexora-pink/10 to-transparent rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-nexora-blue via-nexora-pink to-nexora-purple bg-clip-text text-transparent">
                Smart Event
              </span>
              <br />
              <span className="text-white">Management</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Next-generation events, organized effortlessly.
            </p>
            
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Create, manage, and analyze events with powerful tools for real-time engagement, 
              seamless registration, and comprehensive analytics.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                to="/organizer/auth"
                className="group px-8 py-4 bg-gradient-to-r from-nexora-blue to-nexora-pink rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-nexora-pink/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center space-x-2">
                  <span>Organizer Login</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link
                to="/attendee/auth"
                className="group px-8 py-4 border-2 border-nexora-purple rounded-xl font-semibold text-lg hover:bg-nexora-purple/20 hover:border-nexora-pink transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center space-x-2">
                  <span>Attendee Login</span>
                  <PlayIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-nexora-blue to-nexora-pink bg-clip-text text-transparent">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful features designed to make your events unforgettable and your management effortless.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group bg-nexora-dark/50 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-8 hover:border-nexora-pink/40 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-nexora-pink transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-nexora-blue to-nexora-pink bg-clip-text text-transparent">
              Loved by Event Professionals
            </h2>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-nexora-dark/80 backdrop-blur-sm border border-nexora-purple/20 rounded-2xl p-8 text-center"
            >
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-lg text-gray-300 mb-8 italic leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </p>
              
              <div>
                <h4 className="text-xl font-bold text-white mb-1">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-nexora-pink font-medium">
                  {testimonials[currentTestimonial].role}
                </p>
                <p className="text-gray-400 text-sm">
                  {testimonials[currentTestimonial].company}
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-nexora-pink scale-125'
                      : 'bg-nexora-purple/40 hover:bg-nexora-purple/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black/80 backdrop-blur-sm border-t border-nexora-purple/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <span className="text-gray-400">Made with</span>
            <HeartIcon className="w-5 h-5 text-nexora-pink animate-pulse" />
            <span className="text-gray-400">by</span>
            <span className="text-white font-semibold">Kushagra</span>
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-nexora-pink transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/_kusshhhh?igsh=bnIyZGR5cHdnYTJ4" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-nexora-pink transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/posts/kushagra-sharma-1b9336317_linuxworld-vimaldagasir-python-activity-7349385712347058177-Sday?utm_source=share&utm_medium=member_android&rcm=ACoAAFBRMJ0Bu_MEQ1E2dluUiNHokZwfOhToz_A" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-nexora-pink transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          
          <p className="text-gray-400 text-sm">
            © 2025 Nexora. All rights reserved. Innovating the Future, Today.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;