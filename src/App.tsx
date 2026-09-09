import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { PublicLayout, DashboardLayout } from './components/Layout';
import { HomePage, AboutPage, ClassesPage as PublicClassesPage, ContactPage, AdmissionsPage } from './pages/PublicPages';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard, ChildrenPage, TeachersPage, AttendancePage, FeesPage, ReportsPage, ClassesPage, LearningPage, CommunicationPage, EventsPage, HealthPage, MealsPage, AdmissionsAdminPage, CertificatesPage, ELearningPage, TransportPage, DocumentsPage, SettingsPage, ParentsPage } from './pages/ManagementPages';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}

function DashboardRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}

function AppRoutes() {
  const { user } = useApp();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
      <Route path="/about" element={<PublicRoute><AboutPage /></PublicRoute>} />
      <Route path="/our-classes" element={<PublicRoute><PublicClassesPage /></PublicRoute>} />
      <Route path="/contact" element={<PublicRoute><ContactPage /></PublicRoute>} />
      <Route path="/apply" element={<PublicRoute><AdmissionsPage /></PublicRoute>} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />

      {/* Admin Dashboard */}
      <Route path="/dashboard" element={<DashboardRoute><AdminDashboard /></DashboardRoute>} />
      <Route path="/children" element={<DashboardRoute><ChildrenPage /></DashboardRoute>} />
      <Route path="/classes" element={<DashboardRoute><ClassesPage /></DashboardRoute>} />
      <Route path="/teachers" element={<DashboardRoute><TeachersPage /></DashboardRoute>} />
      <Route path="/attendance" element={<DashboardRoute><AttendancePage /></DashboardRoute>} />
      <Route path="/learning" element={<DashboardRoute><LearningPage /></DashboardRoute>} />
      <Route path="/activities" element={<DashboardRoute><LearningPage /></DashboardRoute>} />
      <Route path="/fees" element={<DashboardRoute><FeesPage /></DashboardRoute>} />
      <Route path="/parents" element={<DashboardRoute><ParentsPage /></DashboardRoute>} />
      <Route path="/reports" element={<DashboardRoute><ReportsPage /></DashboardRoute>} />
      <Route path="/communication" element={<DashboardRoute><CommunicationPage /></DashboardRoute>} />
      <Route path="/events" element={<DashboardRoute><EventsPage /></DashboardRoute>} />
      <Route path="/health" element={<DashboardRoute><HealthPage /></DashboardRoute>} />
      <Route path="/meals" element={<DashboardRoute><MealsPage /></DashboardRoute>} />
      <Route path="/admissions" element={<DashboardRoute><AdmissionsAdminPage /></DashboardRoute>} />
      <Route path="/certificates" element={<DashboardRoute><CertificatesPage /></DashboardRoute>} />
      <Route path="/elearning" element={<DashboardRoute><ELearningPage /></DashboardRoute>} />
      <Route path="/transport" element={<DashboardRoute><TransportPage /></DashboardRoute>} />
      <Route path="/documents" element={<DashboardRoute><DocumentsPage /></DashboardRoute>} />
      <Route path="/settings" element={<DashboardRoute><SettingsPage /></DashboardRoute>} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
