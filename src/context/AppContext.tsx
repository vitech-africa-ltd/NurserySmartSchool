import React, { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { children as initialChildren, teachers as initialTeachers, classes as initialClasses, parents as initialParents } from '../data/demo';

export type UserRole = 'super_admin' | 'headteacher' | 'teacher' | 'assistant_teacher' | 'accountant' | 'nurse' | 'parent' | 'driver';
export type Language = 'en' | 'fr' | 'rw';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  classId?: string;
  childIds?: string[];
}

interface AppState {
  user: User | null;
  language: Language;
  sidebarOpen: boolean;
  darkMode: boolean;
  notifications: { id: string; title: string; message: string; date: string; read: boolean }[];
  children: typeof initialChildren;
  teachers: typeof initialTeachers;
  classes: typeof initialClasses;
  parents: typeof initialParents;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setLanguage: (lang: Language) => void;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  markNotificationRead: (id: string) => void;
  addChild: (child: any) => void;
  addTeacher: (teacher: any) => void;
  addClass: (cls: any) => void;
  addParent: (parent: any) => void;
}

const defaultUsers: User[] = [
  { id: 'admin', name: 'Emmanuel Nshuti', email: 'admin@nursery360.rw', role: 'super_admin' },
  { id: 'head', name: 'Emmanuel Nshuti', email: 'head@nursery360.rw', role: 'headteacher' },
  { id: 'teacher1', name: 'Marie Uwimana', email: 'teacher@nursery360.rw', role: 'teacher', classId: 'c1' },
  { id: 'teacher2', name: 'Jean Mugisha', email: 'teacher2@nursery360.rw', role: 'teacher', classId: 'c2' },
  { id: 'parent1', name: 'David Niyonzima', email: 'parent@nursery360.rw', role: 'parent', childIds: ['ch1'] },
  { id: 'parent2', name: 'Josephine Mutesi', email: 'parent2@nursery360.rw', role: 'parent', childIds: ['ch2', 'ch3'] },
  { id: 'accountant', name: 'Finance Dept', email: 'finance@nursery360.rw', role: 'accountant' },
];

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nursery360_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [language, setLanguageState] = useState<Language>('en');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifs, setNotifs] = useState([
    { id: 'n1', title: 'Welcome!', message: 'Welcome to Nursery360 Rwanda', date: new Date().toISOString(), read: false },
  ]);

  const [childrenData, setChildrenData] = useState(initialChildren);
  const [teachersData, setTeachersData] = useState(initialTeachers);
  const [classesData, setClassesData] = useState(initialClasses);
  const [parentsData, setParentsData] = useState(initialParents);

  useEffect(() => {
    if (user) {
      localStorage.setItem('nursery360_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nursery360_user');
    }
  }, [user]);

  const login = useCallback((email: string, _password: string) => {
    const found = defaultUsers.find(u => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    setUser(defaultUsers[0]);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('nursery360_user');
  }, []);

  const setLanguage = useCallback((lang: Language) => setLanguageState(lang), []);
  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), []);
  const toggleDarkMode = useCallback(() => setDarkMode(p => !p), []);
  const markNotificationRead = useCallback((id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const addChild = useCallback((child: any) => {
    setChildrenData(prev => [...prev, { ...child, id: `ch-${Date.now()}` }]);
  }, []);

  const addTeacher = useCallback((teacher: any) => {
    setTeachersData(prev => [...prev, { ...teacher, id: `t-${Date.now()}` }]);
  }, []);

  const addClass = useCallback((cls: any) => {
    setClassesData(prev => [...prev, { ...cls, id: `c-${Date.now()}` }]);
  }, []);

  const addParent = useCallback((parent: any) => {
    setParentsData(prev => [...prev, { ...parent, id: `p-${Date.now()}` }]);
  }, []);

  return (
    <AppContext.Provider value={{
      user, language, sidebarOpen, darkMode, notifications: notifs,
      children: childrenData,
      teachers: teachersData,
      classes: classesData,
      parents: parentsData,
      login, logout, setLanguage, toggleSidebar, toggleDarkMode, markNotificationRead,
      addChild, addTeacher, addClass, addParent,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
