import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Menu, X, Bell, LogOut, Search } from 'lucide-react';

const adminNavItems = [
  { path: '/dashboard', label: 'Dashboard', emoji: '📊' },
  { path: '/children', label: 'Children', emoji: '👶' },
  { path: '/classes', label: 'Classes', emoji: '🏫' },
  { path: '/teachers', label: 'Teachers', emoji: '👩‍🏫' },
  { path: '/attendance', label: 'Attendance', emoji: '✅' },
  { path: '/learning', label: 'Learning', emoji: '📚' },
  { path: '/activities', label: 'Activities', emoji: '🎯' },
  { path: '/fees', label: 'Fees & Payments', emoji: '💰' },
  { path: '/parents', label: 'Parents', emoji: '❤️' },
  { path: '/reports', label: 'Reports', emoji: '📋' },
  { path: '/communication', label: 'Communication', emoji: '📢' },
  { path: '/events', label: 'Events', emoji: '📅' },
  { path: '/health', label: 'Health', emoji: '🏥' },
  { path: '/meals', label: 'Meals', emoji: '🍽️' },
  { path: '/admissions', label: 'Admissions', emoji: '📝' },
  { path: '/certificates', label: 'Certificates', emoji: '🏆' },
  { path: '/elearning', label: 'E-Learning', emoji: '💻' },
  { path: '/transport', label: 'Transport', emoji: '🚌' },
  { path: '/documents', label: 'Documents', emoji: '📁' },
  { path: '/settings', label: 'Settings', emoji: '⚙️' },
];

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const { user } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 text-lg">Nursery360</span>
                <span className="text-xs text-blue-600 ml-1 font-medium">RWANDA</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</Link>
              <Link to="/our-classes" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Classes</Link>
              <Link to="/apply" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Admissions</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <button onClick={() => navigate('/dashboard')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Dashboard
                </button>
              ) : (
                <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-16">{children}</main>
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 Nursery360 Rwanda. All rights reserved. | Demo Data</p>
        </div>
      </footer>
    </div>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, sidebarOpen, toggleSidebar, logout, notifications, markNotificationRead } = useApp();
  const location = useLocation();
  const [showNotifs, setShowNotifs] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0 md:w-20'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}>
        <div className="h-16 flex items-center px-4 border-b border-gray-100 shrink-0">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shrink-0">
              <span className="text-white font-bold">N</span>
            </div>
            {sidebarOpen && (
              <div>
                <span className="font-bold text-gray-900 text-sm">Nursery360</span>
                <span className="text-[10px] text-blue-600 ml-1 font-semibold">RW</span>
              </div>
            )}
          </Link>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto scrollbar-hide">
          {adminNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                title={item.label}
                className={`flex items-center gap-3 px-3 py-2 mx-2 rounded-lg mb-0.5 transition-all text-sm font-medium group relative ${
                  isActive ? 'bg-blue-600 text-white shadow-sm shadow-blue-200' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {sidebarOpen ? (
                  <>
                    <span className="text-base shrink-0 w-6 text-center">{item.emoji}</span>
                    <span className="truncate">{item.label}</span>
                  </>
                ) : (
                  <span className="text-base mx-auto">{item.emoji}</span>
                )}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gray-100 shrink-0">
          <button onClick={logout} title="Logout" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors">
            {sidebarOpen ? (
              <>
                <span className="text-base">🚪</span>
                <span>Logout</span>
              </>
            ) : (
              <span className="text-base mx-auto">🚪</span>
            )}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
              <Search size={16} className="text-gray-400" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none ml-2 text-sm w-full" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifs && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-bold text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} onClick={() => markNotificationRead(n.id)} className={`p-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                        <p className="text-sm font-medium text-gray-900">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                {user?.name.charAt(0)}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role.replace('_', ' ')}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
