import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@nursery360.rw', desc: 'Full access' },
    { role: 'Teacher', email: 'teacher@nursery360.rw', desc: 'Class management' },
    { role: 'Parent', email: 'parent@nursery360.rw', desc: 'Child progress' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <div>
              <span className="font-bold text-2xl text-gray-900">Nursery360</span>
              <span className="text-blue-600 ml-1 font-medium">RWANDA</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome Back to Your School Dashboard</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">Manage your school, track child development, communicate with parents, and much more.</p>
          <div className="space-y-4">
            {['📊 Real-time dashboard', '👶 Child development tracking', '💬 Parent communication', '📋 Attendance management'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-700">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="font-bold text-lg text-gray-900">Nursery360</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
          <p className="text-gray-500 text-sm mb-6">Access your school management dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full gradient-primary text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3 text-center">Quick Demo Login:</p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((acc, i) => (
                <button
                  key={i}
                  onClick={() => { setEmail(acc.email); setPassword('demo'); }}
                  className="text-left p-2.5 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all"
                >
                  <p className="text-xs font-semibold text-gray-900">{acc.role}</p>
                  <p className="text-[10px] text-gray-500">{acc.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
