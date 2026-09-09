import React, { useState, useEffect, useRef } from 'react';
import { children, teachers, classes, payments, fees, events, announcements, todayAttendance, revenueData, attendanceChartData, schoolSettings, admissions, observations, activities, learningAreas, meals, certificates } from '../data/demo';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, GraduationCap, CreditCard, CheckCircle, Calendar, Plus, X, Download, AlertTriangle, Search, FileText, Award, Eye } from 'lucide-react';

export function AdminDashboard() {
  const { user } = useApp();
  const totalChildren = children.length;
  const presentToday = todayAttendance.filter(a => a.status === 'Present').length;
  const totalTeachers = teachers.filter(t => t.status === 'Active').length;
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalDue = fees.reduce((sum, f) => sum + (f.totalDue - f.totalPaid), 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Good Morning, {user?.name.split(' ')[0]} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening at {schoolSettings.name} today.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">📋 Demo Data</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">{schoolSettings.currentTerm} • {schoolSettings.academicYear}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { label: 'Add Child', emoji: '👶', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700', link: '/children' },
          { label: 'Attendance', emoji: '✅', color: 'bg-green-50 hover:bg-green-100 text-green-700', link: '/attendance' },
          { label: 'Payment', emoji: '💰', color: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700', link: '/fees' },
          { label: 'Activity', emoji: '🎨', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700', link: '/learning' },
          { label: 'Message', emoji: '💬', color: 'bg-pink-50 hover:bg-pink-100 text-pink-700', link: '/communication' },
          { label: 'Report', emoji: '📊', color: 'bg-cyan-50 hover:bg-cyan-100 text-cyan-700', link: '/reports' },
          { label: 'Certificate', emoji: '🏆', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700', link: '/certificates' },
        ].map((action, i) => (
          <a key={i} href={action.link} className={`${action.color} p-3 rounded-xl text-center transition-all block`}>
            <div className="text-2xl mb-1">{action.emoji}</div>
            <div className="text-xs font-medium">{action.label}</div>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
            <Users size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalChildren}</p>
          <p className="text-sm text-gray-500">Total Children</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mb-3">
            <CheckCircle size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{presentToday}</p>
          <p className="text-sm text-gray-500">Present Today</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
            <GraduationCap size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalTeachers}</p>
          <p className="text-sm text-gray-500">Active Teachers</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600 mb-3">
            <CreditCard size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-900">RWF {(totalRevenue/1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-500">Fees Collected</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number) => `RWF ${v.toLocaleString()}`} />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#dbeafe" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendanceChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="present" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function ChildrenPage() {
  const { children: childrenData, addChild } = useApp();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = childrenData.filter(c => 
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Children</h1>
          <p className="text-gray-500 text-sm">{filtered.length} children enrolled</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="gradient-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <Plus size={16} /> Add Child
        </button>
      </div>

      <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2">
        <Search size={16} className="text-gray-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search children..." className="bg-transparent border-none outline-none ml-2 text-sm w-full" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left py-3 px-4 font-medium text-gray-500">Child</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Admission #</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Class</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(child => {
              const cls = classes.find(c => c.id === child.classId);
              return (
                <tr key={child.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {child.firstName.charAt(0)}{child.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{child.firstName} {child.lastName}</p>
                        <p className="text-xs text-gray-500">{child.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-gray-500">{child.admissionNumber}</td>
                  <td className="py-3 px-4 text-gray-600">{cls?.name}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{child.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Add New Child</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              addChild({
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                dateOfBirth: formData.get('dob'),
                gender: formData.get('gender'),
                classId: formData.get('classId'),
                admissionNumber: `N360-${Date.now()}`,
                parentId: 'p1',
                photo: '',
                status: 'Active',
                enrollmentDate: new Date().toISOString().split('T')[0],
                allergies: [],
                medicalNotes: '',
                emergencyContact: { name: '', phone: '', relationship: '' },
                authorizedPickups: [],
              });
              setShowAddModal(false); 
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-700 mb-1">First Name</label><input name="firstName" type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label><input name="lastName" type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label><input name="dob" type="date" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Gender</label><select name="gender" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option value="">Select</option><option>Male</option><option>Female</option></select></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Class</label><select name="classId" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">{classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
              <button type="submit" className="w-full gradient-primary text-white py-2.5 rounded-xl font-medium">Save Child</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function TeachersPage() {
  const { teachers: teachersData, addTeacher } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teachers & Staff</h1>
          <p className="text-gray-500 text-sm">{teachersData.length} team members</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="gradient-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2"><Plus size={16} /> Add Staff</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {teachersData.map(teacher => {
          const cls = classes.find(c => c.id === teacher.classId);
          return (
            <div key={teacher.id} className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                  {teacher.firstName.charAt(0)}{teacher.lastName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{teacher.firstName} {teacher.lastName}</p>
                  <p className="text-xs text-blue-600">{teacher.role}</p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-gray-500">
                {cls && <p>📚 {cls.name}</p>}
                <p>📞 {teacher.phone}</p>
                <p>✉️ {teacher.email}</p>
              </div>
              <div className="mt-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${teacher.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{teacher.status}</span>
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Add Staff Member</h3>
              <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              addTeacher({
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                role: formData.get('role'),
                classId: formData.get('classId') || null,
                photo: '',
                employmentDate: formData.get('startDate'),
                status: 'Active',
              });
              setShowAdd(false); 
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-700 mb-1">First Name</label><input name="firstName" type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label><input name="lastName" type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Email</label><input name="email" type="email" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Phone</label><input name="phone" type="tel" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Role</label><select name="role" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>Lead Teacher</option><option>Assistant Teacher</option><option>School Nurse</option></select></div>
              <button type="submit" className="w-full gradient-primary text-white py-2.5 rounded-xl font-medium">Add Staff Member</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState('c1');
  const [attendance, setAttendance] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    children.filter(c => c.classId === selectedClass).forEach(c => { init[c.id] = 'Present'; });
    return init;
  });
  const [saved, setSaved] = useState(false);

  const classChildren = children.filter(c => c.classId === selectedClass);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-500 text-sm">Mark daily attendance</p>
        </div>
        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white">
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {classChildren.map(child => (
          <div key={child.id} className="flex items-center justify-between p-4 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                {child.firstName.charAt(0)}{child.lastName.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{child.firstName} {child.lastName}</p>
                <p className="text-xs text-gray-500">{child.admissionNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {['Present', 'Absent', 'Late'].map(status => (
                <button
                  key={status}
                  onClick={() => setAttendance({ ...attendance, [child.id]: status })}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
                    attendance[child.id] === status
                      ? status === 'Present' ? 'bg-green-500 text-white' : status === 'Absent' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setSaved(true)}
        className={`w-full py-3 rounded-xl font-semibold ${saved ? 'bg-green-500 text-white' : 'gradient-primary text-white'}`}
      >
        {saved ? '✓ Attendance Saved!' : 'Save Attendance'}
      </button>
    </div>
  );
}

export function FeesPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const totalCollected = payments.reduce((s, p) => s + p.amount, 0);
  const totalOutstanding = fees.reduce((s, f) => s + (f.totalDue - f.totalPaid), 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fees & Payments</h1>
          <p className="text-gray-500 text-sm">Manage school fees</p>
        </div>
        <button onClick={() => setShowPaymentModal(true)} className="gradient-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <Plus size={16} /> Record Payment
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100">
          <p className="text-xs text-gray-500">Total Collected</p>
          <p className="text-xl font-bold text-green-600 mt-1">RWF {totalCollected.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100">
          <p className="text-xs text-gray-500">Outstanding</p>
          <p className="text-xl font-bold text-red-600 mt-1">RWF {totalOutstanding.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left py-3 px-4 font-medium text-gray-500">Child</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Total Due</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Paid</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Balance</th>
            </tr>
          </thead>
          <tbody>
            {fees.map(fee => {
              const child = children.find(c => c.id === fee.childId);
              const balance = fee.totalDue - fee.totalPaid;
              return (
                <tr key={fee.id} className="border-b border-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{child?.firstName} {child?.lastName}</td>
                  <td className="py-3 px-4">RWF {fee.totalDue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-green-600">RWF {fee.totalPaid.toLocaleString()}</td>
                  <td className="py-3 px-4 font-medium text-red-600">RWF {balance.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Record Payment</h3>
              <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowPaymentModal(false); }} className="space-y-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Child</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">{children.map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}</select></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Amount (RWF)</label><input type="number" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Payment Method</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>MTN Mobile Money</option><option>Bank Transfer</option><option>Cash</option></select></div>
              <button type="submit" className="w-full gradient-primary text-white py-2.5 rounded-xl font-medium">Record Payment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [generated, setGenerated] = useState<string[]>([]);

  const handleGenerate = (reportTitle: string) => {
    setGenerating(reportTitle);
    setTimeout(() => {
      setGenerating(null);
      setGenerated([...generated, reportTitle]);
      const element = document.createElement('a');
      const file = new Blob([`Report: ${reportTitle}\nGenerated: ${new Date().toLocaleString()}\n\nThis is a demo report.`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${reportTitle.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500 text-sm">Generate and download reports</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Child Progress Report', desc: 'Individual development report', icon: '📊', color: 'bg-blue-50' },
          { title: 'Attendance Report', desc: 'Attendance summary', icon: '✅', color: 'bg-green-50' },
          { title: 'Financial Report', desc: 'Fee collection report', icon: '💰', color: 'bg-yellow-50' },
          { title: 'Class Report', desc: 'Class-wise summary', icon: '📚', color: 'bg-purple-50' },
          { title: 'Health Report', desc: 'Health incidents', icon: '🏥', color: 'bg-red-50' },
          { title: 'Term Report', desc: 'Complete term summary', icon: '📋', color: 'bg-cyan-50' },
        ].map((report, i) => {
          const isGenerating = generating === report.title;
          const isGenerated = generated.includes(report.title);
          return (
            <div key={i} className={`${report.color} p-6 rounded-2xl border border-gray-100`}>
              <div className="text-3xl mb-3">{report.icon}</div>
              <h3 className="font-bold text-gray-900">{report.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{report.desc}</p>
              <button
                onClick={() => handleGenerate(report.title)}
                disabled={isGenerating}
                className={`mt-4 text-sm font-medium ${isGenerating ? 'text-gray-400' : isGenerated ? 'text-green-600' : 'text-blue-600 hover:underline'}`}
              >
                {isGenerating ? 'Generating...' : isGenerated ? '✓ Downloaded' : 'Generate'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ClassesPage() {
  const { classes: classesData, addClass } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Classes</h1>
          <p className="text-gray-500 text-sm">{classesData.length} classes configured</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="gradient-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2"><Plus size={16} /> Add Class</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {classesData.map((cls, i) => {
          const teacher = teachers.find(t => t.id === cls.teacherId);
          const classChildren = children.filter(c => c.classId === cls.id);
          const colors = ['from-blue-400 to-blue-600', 'from-green-400 to-green-600', 'from-purple-400 to-purple-600'];
          return (
            <div key={cls.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className={`h-24 bg-gradient-to-br ${colors[i]} flex items-center justify-center`}>
                <h3 className="text-xl font-bold text-white">{cls.name}</h3>
              </div>
              <div className="p-5">
                <div className="space-y-2 text-sm">
                  <p className="text-gray-500">📍 {cls.room}</p>
                  <p className="text-gray-500">👶 Ages: {cls.ageRange}</p>
                  <p className="text-gray-500">👩‍🏫 {teacher?.firstName} {teacher?.lastName}</p>
                  <p className="text-gray-500">📊 {cls.childrenCount}/{cls.maxCapacity} children</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-2">Students:</p>
                  <div className="flex flex-wrap gap-1">
                    {classChildren.map(c => (
                      <span key={c.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c.firstName}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Add New Class</h3>
              <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              addClass({
                name: formData.get('name'),
                ageRange: formData.get('ageRange'),
                maxCapacity: parseInt(formData.get('maxCapacity') as string),
                room: formData.get('room'),
                teacherId: formData.get('teacherId'),
                assistantId: null,
                childrenCount: 0,
              });
              setShowAdd(false); 
            }} className="space-y-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Class Name</label><input name="name" type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Age Range</label><input name="ageRange" type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Max Capacity</label><input name="maxCapacity" type="number" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Room Name</label><input name="room" type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
              <button type="submit" className="w-full gradient-primary text-white py-2.5 rounded-xl font-medium">Create Class</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== LEARNING PAGE ====================
export function LearningPage() {
  const [showAdd, setShowAdd] = useState(false);
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning & Activities</h1>
          <p className="text-gray-500 text-sm">Plan and track learning activities</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="gradient-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <Plus size={16} /> Plan Activity
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {learningAreas.map(area => (
          <div key={area.id} className="bg-white p-4 rounded-xl border border-gray-100 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-2">{area.icon}</div>
            <p className="text-xs font-medium text-gray-900">{area.name}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Today's Activities</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {activities.map(activity => {
            const cls = classes.find(c => c.id === activity.classId);
            const teacher = teachers.find(t => t.id === activity.teacherId);
            return (
              <div key={activity.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{learningAreas.find(la => la.name === activity.learningArea)?.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{cls?.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{activity.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>👩‍🏫 {teacher?.firstName}</span>
                      <span>⏱️ {activity.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Plan New Activity</h3>
              <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowAdd(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Activity Title</label>
                <input type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Learning Area</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  {learningAreas.map(la => <option key={la.id} value={la.id}>{la.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Class</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"></textarea>
              </div>
              <button type="submit" className="w-full gradient-primary text-white py-2.5 rounded-xl font-medium">Save Activity</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== COMMUNICATION PAGE ====================
export function CommunicationPage() {
  const [showCompose, setShowCompose] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communication</h1>
          <p className="text-gray-500 text-sm">Announcements and messages</p>
        </div>
        <button onClick={() => setShowCompose(true)} className="gradient-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <Plus size={16} /> New Announcement
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {announcements.map(ann => (
            <div key={ann.id} className="p-5 hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${ann.priority === 'High' ? 'bg-red-500' : ann.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">{ann.title}</h4>
                    <span className="text-xs text-gray-400">{ann.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{ann.message}</p>
                  <p className="text-xs text-gray-400 mt-2">By {ann.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCompose && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">New Announcement</h3>
              <button onClick={() => setShowCompose(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowCompose(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                <input type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <button type="submit" className="w-full gradient-primary text-white py-2.5 rounded-xl font-medium">Send Announcement</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== EVENTS PAGE ====================
export function EventsPage() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events & Calendar</h1>
          <p className="text-gray-500 text-sm">School events and important dates</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="gradient-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <Plus size={16} /> Add Event
        </button>
      </div>

      <div className="grid gap-4">
        {events.map(event => (
          <div key={event.id} className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex flex-col items-center justify-center shrink-0">
                <span className="text-xs text-blue-600 font-medium">{new Date(event.date).toLocaleString('en', { month: 'short' })}</span>
                <span className="text-lg font-bold text-blue-700">{new Date(event.date).getDate()}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{event.title}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{event.type}</span>
                </div>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-xs text-gray-400 mt-2">🕐 {event.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Add Event</h3>
              <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowAdd(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Event Title</label>
                <input type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
                  <input type="time" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option>Meeting</option>
                  <option>Trip</option>
                  <option>Celebration</option>
                  <option>Sports</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"></textarea>
              </div>
              <button type="submit" className="w-full gradient-primary text-white py-2.5 rounded-xl font-medium">Create Event</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== HEALTH PAGE ====================
export function HealthPage() {
  const [showIncident, setShowIncident] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health & Wellness</h1>
          <p className="text-gray-500 text-sm">Monitor child health and incidents</p>
        </div>
        <button onClick={() => setShowIncident(true)} className="bg-red-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <Plus size={16} /> Report Incident
        </button>
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center">
          <p className="text-3xl font-bold text-green-600">0</p>
          <p className="text-sm text-gray-500">Incidents Today</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center">
          <p className="text-3xl font-bold text-red-600">{children.filter(c => c.allergies.length > 0).length}</p>
          <p className="text-sm text-gray-500">Children with Allergies</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center">
          <p className="text-3xl font-bold text-blue-600">100%</p>
          <p className="text-sm text-gray-500">Health Records Complete</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center">
          <p className="text-3xl font-bold text-purple-600">0</p>
          <p className="text-sm text-gray-500">Total Incidents</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">⚠️ Allergy Alerts</h3>
        <div className="space-y-3">
          {children.filter(c => c.allergies.length > 0).map(child => (
            <div key={child.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
              <AlertTriangle size={18} className="text-red-500 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{child.firstName} {child.lastName}</p>
                <div className="flex gap-1 mt-1">
                  {child.allergies.map((a, i) => (
                    <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{a}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showIncident && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Report Incident</h3>
              <button onClick={() => setShowIncident(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowIncident(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Child</label>
                <select required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  {children.map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Incident Type</label>
                <select required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option>Minor Injury</option>
                  <option>Allergic Reaction</option>
                  <option>Fever</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-red-500 text-white py-2.5 rounded-xl font-medium">Submit Report</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== MEALS PAGE ====================
export function MealsPage() {
  const [showPlan, setShowPlan] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">School Meals</h1>
          <p className="text-gray-500 text-sm">Today's meal plan</p>
        </div>
        <button onClick={() => setShowPlan(true)} className="gradient-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <Plus size={16} /> Plan Meal
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {meals.map(meal => (
          <div key={meal.id} className="bg-white p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{meal.mealType === 'Breakfast' ? '🌅' : meal.mealType === 'Lunch' ? '☀️' : '🍪'}</span>
              <h3 className="font-bold text-gray-900">{meal.mealType}</h3>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-2">{meal.menu}</p>
            <div className="flex flex-wrap gap-1">
              {meal.ingredients.map((ing, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{ing}</span>
              ))}
            </div>
            {meal.allergies.length > 0 && (
              <div className="mt-3 flex gap-1">
                {meal.allergies.map((a, i) => (
                  <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">⚠️ {a}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showPlan && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Plan Meal</h3>
              <button onClick={() => setShowPlan(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowPlan(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Meal Type</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Snack</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Menu</label>
                <input type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Ingredients (comma separated)</label>
                <input type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <button type="submit" className="w-full gradient-primary text-white py-2.5 rounded-xl font-medium">Save Meal Plan</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== ADMISSIONS PAGE ====================
export function AdmissionsAdminPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admissions</h1>
        <p className="text-gray-500 text-sm">Manage enrollment applications</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-yellow-50 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-yellow-600">{admissions.filter(a => a.status === 'Pending').length}</p>
          <p className="text-xs text-yellow-700">Pending</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-green-600">{admissions.filter(a => a.status === 'Approved').length}</p>
          <p className="text-xs text-green-700">Approved</p>
        </div>
        <div className="bg-red-50 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-red-600">0</p>
          <p className="text-xs text-red-700">Rejected</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left py-3 px-4 font-medium text-gray-500">App #</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Child</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Age</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Class</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Parent</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map(adm => (
              <tr key={adm.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 px-4 font-mono text-xs text-gray-500">{adm.applicationNumber}</td>
                <td className="py-3 px-4 font-medium text-gray-900">{adm.childName}</td>
                <td className="py-3 px-4 text-gray-600">{adm.age} yrs</td>
                <td className="py-3 px-4 text-gray-600">{adm.classApplied}</td>
                <td className="py-3 px-4 text-gray-600">{adm.parentName}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    adm.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    adm.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>{adm.status}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="text-xs text-green-600 font-medium hover:underline">Approve</button>
                    <button className="text-xs text-red-600 font-medium hover:underline">Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== CERTIFICATES PAGE ====================
export function CertificatesPage() {
  const [showGenerate, setShowGenerate] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
          <p className="text-gray-500 text-sm">Generate and manage certificates</p>
        </div>
        <button onClick={() => setShowGenerate(true)} className="gradient-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <Plus size={16} /> Generate Certificate
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map(cert => {
          const child = children.find(c => c.id === cert.childId);
          return (
            <div key={cert.id} className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full gradient-warm mx-auto mb-3 flex items-center justify-center">
                <Award size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-gray-900">{cert.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{child?.firstName} {child?.lastName}</p>
              <p className="text-xs text-gray-400 mt-1">{cert.date} • {cert.term}</p>
              <button className="mt-4 text-sm text-blue-600 font-medium hover:underline">Download PDF</button>
            </div>
          );
        })}
      </div>

      {showGenerate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Generate Certificate</h3>
              <button onClick={() => setShowGenerate(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowGenerate(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Certificate Type</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option>Completion Certificate</option>
                  <option>Achievement Certificate</option>
                  <option>Participation Certificate</option>
                  <option>Good Behaviour Award</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Child</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  {children.map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Class</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full gradient-primary text-white py-2.5 rounded-xl font-medium">Generate & Download</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== E-LEARNING PAGE ====================
export function ELearningPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">E-Learning</h1>
        <p className="text-gray-500 text-sm">Fun learning activities for children</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { emoji: '🎵', title: 'ABC Song', desc: 'Learn the alphabet with this fun song!', subject: 'English', type: 'song' },
          { emoji: '📖', title: 'The Lost Kitten', desc: 'A story about a little kitten who finds its way home.', subject: 'English', type: 'story' },
          { emoji: '🔢', title: 'Count to 10', desc: 'Count the colorful objects on screen!', subject: 'Numeracy', type: 'game' },
          { emoji: '🎨', title: 'Draw a Rainbow', desc: 'Use your finger to draw a beautiful rainbow!', subject: 'Creative Arts', type: 'creative' },
          { emoji: '🇷🇼', title: 'Amajwi y\'Inyuguti', desc: 'Iga inyuguti mu Kinyarwanda!', subject: 'Kinyarwanda', type: 'song' },
          { emoji: '🧩', title: 'Animal Match', desc: 'Match the animals with their sounds!', subject: 'Discovery', type: 'game' },
          { emoji: '💃', title: 'Intore Dance', desc: 'Learn about the traditional Intore dance.', subject: 'Kinyarwanda', type: 'story' },
          { emoji: '🔷', title: 'Shape Finder', desc: 'Find all the shapes hidden in the picture!', subject: 'Numeracy', type: 'game' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.emoji}</div>
            <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{item.subject}</span>
              <span className="text-xs text-gray-400 capitalize">{item.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== TRANSPORT PAGE ====================
export function TransportPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transport</h1>
          <p className="text-gray-500 text-sm">School transport management</p>
        </div>
        <button className="gradient-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <Plus size={16} /> Add Vehicle
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">🚌 Vehicles</h3>
          <div className="space-y-3">
            {[
              { name: 'Bus 1 - Toyota Coaster', driver: 'James Mugabo', status: 'Active', children: 12 },
              { name: 'Bus 2 - Hiace', driver: 'Patrick Ndayi', status: 'Active', children: 8 },
            ].map((v, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl">
                <p className="font-medium text-gray-900 text-sm">{v.name}</p>
                <p className="text-xs text-gray-500">Driver: {v.driver}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{v.status}</span>
                  <span className="text-xs text-gray-400">{v.children} children</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">📍 Routes</h3>
          <div className="space-y-3">
            {[
              { name: 'Kicukiro Route', stops: 5, time: '7:00 - 7:45 AM' },
              { name: 'Gasabo Route', stops: 4, time: '7:00 - 7:40 AM' },
              { name: 'Nyarugenge Route', stops: 3, time: '7:10 - 7:35 AM' },
            ].map((r, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl">
                <p className="font-medium text-gray-900 text-sm">{r.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">{r.stops} stops</span>
                  <span className="text-xs text-gray-400">{r.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== DOCUMENTS PAGE ====================
export function DocumentsPage() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-500 text-sm">School documents and files</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="gradient-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <Plus size={16} /> Upload Document
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'School Policy 2024', type: 'PDF', size: '2.4 MB', date: '2024-01-15' },
          { name: 'Curriculum Guide', type: 'PDF', size: '5.1 MB', date: '2024-02-01' },
          { name: 'Child Protection Policy', type: 'PDF', size: '1.8 MB', date: '2024-01-10' },
          { name: 'Term 1 Report Template', type: 'DOCX', size: '0.5 MB', date: '2024-03-01' },
          { name: 'Health & Safety Guidelines', type: 'PDF', size: '3.2 MB', date: '2024-01-20' },
          { name: 'Fee Structure 2024', type: 'PDF', size: '0.3 MB', date: '2024-01-05' },
        ].map((doc, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <FileText size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{doc.type} • {doc.size}</p>
                <p className="text-xs text-gray-400 mt-1">{doc.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <button className="flex-1 text-xs text-blue-600 font-medium hover:bg-blue-50 py-1.5 rounded-lg transition-colors text-center">
                <Download size={12} className="inline mr-1" /> Download
              </button>
              <button className="flex-1 text-xs text-gray-500 font-medium hover:bg-gray-50 py-1.5 rounded-lg transition-colors text-center">
                <Eye size={12} className="inline mr-1" /> Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {showUpload && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Upload Document</h3>
              <button onClick={() => setShowUpload(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowUpload(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Document Name</label>
                <input type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">File Type</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option>PDF</option>
                  <option>DOCX</option>
                  <option>XLSX</option>
                  <option>Image</option>
                </select>
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">Max file size: 10MB</p>
              </div>
              <button type="submit" className="w-full gradient-primary text-white py-2.5 rounded-xl font-medium">Upload Document</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== SETTINGS PAGE ====================
export function SettingsPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm">Configure your school platform</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">🏫 School Information</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">School Name</label>
              <input type="text" defaultValue={schoolSettings.name} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
              <input type="text" defaultValue={schoolSettings.address} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" defaultValue={schoolSettings.phone} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input type="email" defaultValue={schoolSettings.email} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">📚 Academic Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Academic Year</label>
              <input type="text" defaultValue={schoolSettings.academicYear} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Current Term</label>
              <select defaultValue={schoolSettings.currentTerm} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option>Term 1</option>
                <option>Term 2</option>
                <option>Term 3</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Currency</label>
              <input type="text" defaultValue={schoolSettings.currency} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
        </div>
      </div>

      <button className="gradient-primary text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all">
        Save All Settings
      </button>
    </div>
  );
}

// ==================== PARENTS PAGE ====================
export function ParentsPage() {
  const { parents: parentsData, addParent } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parents</h1>
          <p className="text-gray-500 text-sm">{parentsData.length} registered parents</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="gradient-primary text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
          <Plus size={16} /> Add Parent
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {parentsData.map(parent => {
          const parentChildren = children.filter(c => c.parentId === parent.id);
          return (
            <div key={parent.id} className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full gradient-green flex items-center justify-center text-white font-bold">
                  {parent.firstName.charAt(0)}{parent.lastName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{parent.firstName} {parent.lastName}</p>
                  <p className="text-xs text-gray-500">{parent.occupation}</p>
                </div>
              </div>
              <div className="space-y-1 text-xs text-gray-500">
                <p>📞 {parent.phone}</p>
                <p>✉️ {parent.email}</p>
                <p>📍 {parent.address}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Children:</p>
                <div className="flex gap-1">
                  {parentChildren.map(c => (
                    <span key={c.id} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{c.firstName}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Add Parent</h3>
              <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              addParent({
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                occupation: formData.get('occupation'),
                childIds: [],
              });
              setShowAdd(false); 
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
                  <input name="firstName" type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
                  <input name="lastName" type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input name="email" type="email" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                <input name="phone" type="tel" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
                <input name="address" type="text" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Occupation</label>
                <input name="occupation" type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <button type="submit" className="w-full gradient-primary text-white py-2.5 rounded-xl font-medium">Add Parent</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
