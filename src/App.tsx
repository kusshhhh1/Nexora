import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import OrganizerAuth from './pages/auth/OrganizerAuth';
import AttendeeAuth from './pages/auth/AttendeeAuth';
import OrganizerDashboard from './pages/organizer/OrganizerDashboard';
import AttendeeDashboard from './pages/attendee/AttendeeDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import backgroundImage from './assets/p1.png';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div 
          className="App min-h-screen"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/organizer/auth" element={<OrganizerAuth />} />
            <Route path="/attendee/auth" element={<AttendeeAuth />} />
            <Route 
              path="/organizer/dashboard/*" 
              element={
                <ProtectedRoute userType="organizer">
                  <OrganizerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/attendee/dashboard/*" 
              element={
                <ProtectedRoute userType="attendee">
                  <AttendeeDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1A0736',
                color: '#ffffff',
                border: '1px solid #FF2E98'
              }
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;