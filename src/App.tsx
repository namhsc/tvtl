import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import OtpVerification from './pages/OtpVerification';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import ExpertDetail from './pages/ExpertDetail';
import BookingConsultation from './pages/BookingConsultation';
import SurveyDetail from './pages/SurveyDetail';
import Surveys from './pages/Surveys';
import Experts from './pages/Experts';
import ExpertRegistration from './pages/ExpertRegistration';
import Profile from './pages/Profile';
import AccessDenied from './pages/AccessDenied';
import { RoleBasedRoute, ProtectedAdminRoute } from './components/common';

import {
  AdminDashboard,
  UserManagement,
  ExpertManagement,
  SurveyManagement,
  SystemSettings,
} from './pages/admin';
import AdminDemo from './pages/admin/AdminDemo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/reset-password" element={<ResetPassword contact="" />} />
        <Route
          path="/dashboard"
          element={
            <RoleBasedRoute>
              <Dashboard />
            </RoleBasedRoute>
          }
        />
        <Route path="/expert/:id" element={<ExpertDetail />} />
        <Route
          path="/booking/:id"
          element={
            <RoleBasedRoute>
              <BookingConsultation />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/surveys"
          element={
            <RoleBasedRoute>
              <Surveys />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/survey/:id"
          element={
            <RoleBasedRoute>
              <SurveyDetail />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/experts"
          element={
            <RoleBasedRoute>
              <Experts />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/expert-registration"
          element={
            <RoleBasedRoute>
              <ExpertRegistration />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <RoleBasedRoute>
              <Profile />
            </RoleBasedRoute>
          }
        />
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <RoleBasedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/admin/demo"
          element={
            <ProtectedAdminRoute>
              <AdminDemo />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RoleBasedRoute allowedRoles={['ADMIN']}>
              <UserManagement />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/admin/experts"
          element={
            <RoleBasedRoute allowedRoles={['ADMIN']}>
              <ExpertManagement />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/admin/surveys"
          element={
            <RoleBasedRoute allowedRoles={['ADMIN']}>
              <SurveyManagement />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <RoleBasedRoute allowedRoles={['ADMIN']}>
              <SystemSettings />
            </RoleBasedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
