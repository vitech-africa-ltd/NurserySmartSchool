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

// Placeholder pages for other routes
export function LearningPage() { return <div className="p-6"><h1 className="text-2xl font-bold">Learning & Activities</h1><p className="text-gray-500 mt-2">Plan and track learning activities</p></div>; }
export function CommunicationPage() { return <div className="p-6"><h1 className="text-2xl font-bold">Communication</h1><p className="text-gray-500 mt-2">Announcements and messages</p></div>; }
export function EventsPage() { return <div className="p-6"><h1 className="text-2xl font-bold">Events</h1><p className="text-gray-500 mt-2">School events and calendar</p></div>; }
export function HealthPage() { return <div className="p-6"><h1 className="text-2xl font-bold">Health & Wellness</h1><p className="text-gray-500 mt-2">Monitor child health</p></div>; }
export function MealsPage() { return <div className="p-6"><h1 className="text-2xl font-bold">School Meals</h1><p className="text-gray-500 mt-2">Today's meal plan</p></div>; }
export function AdmissionsAdminPage() { return <div className="p-6"><h1 className="text-2xl font-bold">Admissions</h1><p className="text-gray-500 mt-2">Manage enrollment applications</p></div>; }
export function CertificatesPage() { return <div className="p-6"><h1 className="text-2xl font-bold">Certificates</h1><p className="text-gray-500 mt-2">Generate certificates</p></div>; }
export function ELearningPage() { return <div className="p-6"><h1 className="text-2xl font-bold">E-Learning</h1><p className="text-gray-500 mt-2">Fun learning activities</p></div>; }
export function TransportPage() { return <div className="p-6"><h1 className="text-2xl font-bold">Transport</h1><p className="text-gray-500 mt-2">School transport management</p></div>; }
export function DocumentsPage() { return <div className="p-6"><h1 className="text-2xl font-bold">Documents</h1><p className="text-gray-500 mt-2">School documents</p></div>; }
export function SettingsPage() { return <div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-gray-500 mt-2">Configure your school</p></div>; }
export function ParentsPage() { return <div className="p-6"><h1 className="text-2xl font-bold">Parents</h1><p className="text-gray-500 mt-2">Manage parent accounts</p></div>; }
