import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './components/admin/Dashboard';
import StaffDashboard from './components/staff/StaffDashboard';
import StudentDashboard from './components/student/StudentDashboard';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
