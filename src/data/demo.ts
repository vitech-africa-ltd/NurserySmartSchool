// Demo Data for Nursery360 Rwanda
export const schoolSettings = {
  name: 'Little Stars Nursery School',
  address: 'KG 123 St, Kicukiro, Kigali, Rwanda',
  phone: '+250 788 100 200',
  email: 'info@littlestars.rw',
  academicYear: '2024-2025',
  currentTerm: 'Term 1',
  currency: 'RWF',
};

export const classes = [
  { id: 'c1', name: 'Nursery 1', ageRange: '3-4 years', teacherId: 't1', assistantId: 't4', maxCapacity: 20, room: 'Room 1 - Sunshine', childrenCount: 18 },
  { id: 'c2', name: 'Nursery 2', ageRange: '4-5 years', teacherId: 't2', assistantId: 't5', maxCapacity: 22, room: 'Room 2 - Rainbow', childrenCount: 20 },
  { id: 'c3', name: 'Nursery 3', ageRange: '5-6 years', teacherId: 't3', assistantId: 't6', maxCapacity: 25, room: 'Room 3 - Stars', childrenCount: 22 },
];

export const teachers = [
  { id: 't1', firstName: 'Marie', lastName: 'Uwimana', email: 'marie@nursery360.rw', phone: '+250 788 123 456', role: 'Lead Teacher', classId: 'c1', photo: '', employmentDate: '2022-01-15', status: 'Active' },
  { id: 't2', firstName: 'Jean', lastName: 'Mugisha', email: 'jean@nursery360.rw', phone: '+250 788 234 567', role: 'Lead Teacher', classId: 'c2', photo: '', employmentDate: '2021-09-01', status: 'Active' },
  { id: 't3', firstName: 'Grace', lastName: 'Mukamana', email: 'grace@nursery360.rw', phone: '+250 788 345 678', role: 'Lead Teacher', classId: 'c3', photo: '', employmentDate: '2020-03-10', status: 'Active' },
  { id: 't4', firstName: 'Alice', lastName: 'Ingabire', email: 'alice@nursery360.rw', phone: '+250 788 456 789', role: 'Assistant Teacher', classId: 'c1', photo: '', employmentDate: '2023-02-01', status: 'Active' },
  { id: 't5', firstName: 'Patrick', lastName: 'Habimana', email: 'patrick@nursery360.rw', phone: '+250 788 567 890', role: 'Assistant Teacher', classId: 'c2', photo: '', employmentDate: '2023-06-15', status: 'Active' },
  { id: 't6', firstName: 'Diane', lastName: 'Uwase', email: 'diane@nursery360.rw', phone: '+250 788 678 901', role: 'Assistant Teacher', classId: 'c3', photo: '', employmentDate: '2022-08-20', status: 'Active' },
  { id: 't7', firstName: 'Emmanuel', lastName: 'Nshuti', email: 'emmanuel@nursery360.rw', phone: '+250 788 789 012', role: 'Head Teacher', classId: null, photo: '', employmentDate: '2019-01-01', status: 'Active' },
  { id: 't8', firstName: 'Claudine', lastName: 'Nyiramana', email: 'claudine@nursery360.rw', phone: '+250 788 890 123', role: 'School Nurse', classId: null, photo: '', employmentDate: '2021-04-01', status: 'Active' },
];

export const parents = [
  { id: 'p1', firstName: 'David', lastName: 'Niyonzima', email: 'david.n@gmail.com', phone: '+250 788 111 222', address: 'Kicukiro, Kigali', occupation: 'Engineer', childIds: ['ch1'] },
  { id: 'p2', firstName: 'Josephine', lastName: 'Mutesi', email: 'j.mutesi@gmail.com', phone: '+250 788 222 333', address: 'Gasabo, Kigali', occupation: 'Teacher', childIds: ['ch2', 'ch3'] },
  { id: 'p3', firstName: 'Robert', lastName: 'Kamanzi', email: 'r.kamanzi@gmail.com', phone: '+250 788 333 444', address: 'Nyarugenge, Kigali', occupation: 'Business Owner', childIds: ['ch4'] },
  { id: 'p4', firstName: 'Sarah', lastName: 'Uwamahoro', email: 's.uwamahoro@gmail.com', phone: '+250 788 444 555', address: 'Kicukiro, Kigali', occupation: 'Doctor', childIds: ['ch5'] },
  { id: 'p5', firstName: 'Emmanuel', lastName: 'Tuyisenge', email: 'e.tuyisenge@gmail.com', phone: '+250 788 555 666', address: 'Gasabo, Kigali', occupation: 'Banker', childIds: ['ch6'] },
  { id: 'p6', firstName: 'Ange', lastName: 'Mukagatare', email: 'a.mukagatare@gmail.com', phone: '+250 788 666 777', address: 'Nyarugenge, Kigali', occupation: 'Lawyer', childIds: ['ch7'] },
];

export const children = [
  { id: 'ch1', admissionNumber: 'N360-2024-001', firstName: 'Ineza', lastName: 'Niyonzima', dateOfBirth: '2020-05-15', gender: 'Female', classId: 'c2', parentId: 'p1', photo: '', status: 'Active', enrollmentDate: '2024-01-10', allergies: ['Peanuts'], medicalNotes: 'No chronic conditions', emergencyContact: { name: 'Grandmother Uwase', phone: '+250 788 999 000', relationship: 'Grandmother' }, authorizedPickups: [{ name: 'David Niyonzima', phone: '+250 788 111 222', relationship: 'Father' }] },
  { id: 'ch2', admissionNumber: 'N360-2024-002', firstName: 'Ishimwe', lastName: 'Mutesi', dateOfBirth: '2019-08-22', gender: 'Male', classId: 'c3', parentId: 'p2', photo: '', status: 'Active', enrollmentDate: '2024-01-10', allergies: [], medicalNotes: 'Asthma - has inhaler', emergencyContact: { name: 'Josephine Mutesi', phone: '+250 788 222 333', relationship: 'Mother' }, authorizedPickups: [{ name: 'Josephine Mutesi', phone: '+250 788 222 333', relationship: 'Mother' }] },
  { id: 'ch3', admissionNumber: 'N360-2024-003', firstName: 'Keza', lastName: 'Mutesi', dateOfBirth: '2021-03-10', gender: 'Female', classId: 'c1', parentId: 'p2', photo: '', status: 'Active', enrollmentDate: '2024-01-10', allergies: ['Milk'], medicalNotes: 'Lactose intolerant', emergencyContact: { name: 'Josephine Mutesi', phone: '+250 788 222 333', relationship: 'Mother' }, authorizedPickups: [{ name: 'Josephine Mutesi', phone: '+250 788 222 333', relationship: 'Mother' }] },
  { id: 'ch4', admissionNumber: 'N360-2024-004', firstName: 'Mugisha', lastName: 'Kamanzi', dateOfBirth: '2020-11-05', gender: 'Male', classId: 'c2', parentId: 'p3', photo: '', status: 'Active', enrollmentDate: '2024-02-01', allergies: [], medicalNotes: 'No known conditions', emergencyContact: { name: 'Robert Kamanzi', phone: '+250 788 333 444', relationship: 'Father' }, authorizedPickups: [{ name: 'Robert Kamanzi', phone: '+250 788 333 444', relationship: 'Father' }] },
  { id: 'ch5', admissionNumber: 'N360-2024-005', firstName: 'Uwimana', lastName: 'Uwamahoro', dateOfBirth: '2021-07-18', gender: 'Female', classId: 'c1', parentId: 'p4', photo: '', status: 'Active', enrollmentDate: '2024-01-15', allergies: ['Eggs'], medicalNotes: 'Egg allergy - carry EpiPen', emergencyContact: { name: 'Sarah Uwamahoro', phone: '+250 788 444 555', relationship: 'Mother' }, authorizedPickups: [{ name: 'Sarah Uwamahoro', phone: '+250 788 444 555', relationship: 'Mother' }] },
  { id: 'ch6', admissionNumber: 'N360-2024-006', firstName: 'Hirwa', lastName: 'Tuyisenge', dateOfBirth: '2020-01-25', gender: 'Male', classId: 'c2', parentId: 'p5', photo: '', status: 'Active', enrollmentDate: '2024-01-10', allergies: [], medicalNotes: 'No known conditions', emergencyContact: { name: 'Emmanuel Tuyisenge', phone: '+250 788 555 666', relationship: 'Father' }, authorizedPickups: [{ name: 'Emmanuel Tuyisenge', phone: '+250 788 555 666', relationship: 'Father' }] },
  { id: 'ch7', admissionNumber: 'N360-2024-007', firstName: 'Ishimwe', lastName: 'Mukagatare', dateOfBirth: '2019-12-30', gender: 'Female', classId: 'c3', parentId: 'p6', photo: '', status: 'Active', enrollmentDate: '2024-01-10', allergies: ['Dust'], medicalNotes: 'Mild dust allergy', emergencyContact: { name: 'Ange Mukagatare', phone: '+250 788 666 777', relationship: 'Mother' }, authorizedPickups: [{ name: 'Ange Mukagatare', phone: '+250 788 666 777', relationship: 'Mother' }] },
  { id: 'ch8', admissionNumber: 'N360-2024-008', firstName: 'Nshuti', lastName: 'Habimana', dateOfBirth: '2021-04-12', gender: 'Male', classId: 'c1', parentId: 'p1', photo: '', status: 'Active', enrollmentDate: '2024-03-01', allergies: [], medicalNotes: 'No known conditions', emergencyContact: { name: 'Claudine Habimana', phone: '+250 788 777 888', relationship: 'Mother' }, authorizedPickups: [{ name: 'Claudine Habimana', phone: '+250 788 777 888', relationship: 'Mother' }] },
];

export const payments = [
  { id: 'pay1', childId: 'ch1', parentId: 'p1', date: '2024-09-05', amount: 150000, type: 'Tuition Term 1', method: 'MTN Mobile Money', term: 'Term 1', receiptNumber: 'RCP-2024-001', status: 'Paid' },
  { id: 'pay2', childId: 'ch2', parentId: 'p2', date: '2024-09-03', amount: 150000, type: 'Tuition Term 1', method: 'Bank Transfer', term: 'Term 1', receiptNumber: 'RCP-2024-002', status: 'Paid' },
  { id: 'pay3', childId: 'ch3', parentId: 'p2', date: '2024-09-03', amount: 120000, type: 'Tuition Term 1', method: 'Bank Transfer', term: 'Term 1', receiptNumber: 'RCP-2024-003', status: 'Paid' },
  { id: 'pay4', childId: 'ch4', parentId: 'p3', date: '2024-10-15', amount: 100000, type: 'Tuition Term 1', method: 'Cash', term: 'Term 1', receiptNumber: 'RCP-2024-004', status: 'Paid' },
  { id: 'pay5', childId: 'ch5', parentId: 'p4', date: '2024-09-10', amount: 120000, type: 'Tuition Term 1', method: 'MTN Mobile Money', term: 'Term 1', receiptNumber: 'RCP-2024-005', status: 'Paid' },
];

export const fees = [
  { id: 'f1', childId: 'ch1', term: 'Term 1', tuition: 150000, meals: 45000, transport: 30000, activities: 15000, totalPaid: 150000, totalDue: 240000, dueDate: '2024-09-30' },
  { id: 'f2', childId: 'ch2', term: 'Term 1', tuition: 150000, meals: 45000, transport: 0, activities: 15000, totalPaid: 150000, totalDue: 210000, dueDate: '2024-09-30' },
  { id: 'f3', childId: 'ch3', term: 'Term 1', tuition: 120000, meals: 45000, transport: 0, activities: 15000, totalPaid: 120000, totalDue: 180000, dueDate: '2024-09-30' },
  { id: 'f4', childId: 'ch4', term: 'Term 1', tuition: 150000, meals: 45000, transport: 30000, activities: 15000, totalPaid: 100000, totalDue: 240000, dueDate: '2024-09-30' },
  { id: 'f5', childId: 'ch5', term: 'Term 1', tuition: 120000, meals: 45000, transport: 0, activities: 15000, totalPaid: 120000, totalDue: 180000, dueDate: '2024-09-30' },
];

export const events = [
  { id: 'e1', title: 'Parent-Teacher Meeting', date: '2024-12-15', time: '09:00', description: 'Term 1 progress review meeting with all parents.', type: 'Meeting' },
  { id: 'e2', title: 'Christmas Celebration', date: '2024-12-20', time: '10:00', description: 'End of term celebration with performances by children.', type: 'Celebration' },
  { id: 'e3', title: 'School Trip - Nyarutarama Park', date: '2024-12-12', time: '08:00', description: 'Nature walk and discovery activity at the park.', type: 'Trip' },
];

export const announcements = [
  { id: 'an1', title: 'Term 2 Begins January 6th', message: 'We are excited to welcome all children back for Term 2. Classes begin on Monday, January 6th, 2025.', date: '2024-12-10', author: 'Administration', priority: 'High' },
  { id: 'an2', title: 'Christmas Holiday Homework', message: 'Holiday activity sheets have been sent home. Please encourage your child to complete them during the break.', date: '2024-12-08', author: 'Teachers', priority: 'Medium' },
];

export const observations = [
  { id: 'obs1', childId: 'ch1', date: '2024-12-08', teacherId: 't2', learningArea: 'Numeracy', observation: 'Ineza can count from 1 to 10 independently and is beginning to recognize written numbers.', level: 'Progressing', activity: 'Counting with Objects' },
  { id: 'obs2', childId: 'ch2', date: '2024-12-08', teacherId: 't3', learningArea: 'English', observation: 'Ishimwe shows excellent pronunciation and confidently uses new vocabulary in conversations.', level: 'Achieved', activity: 'Animal Sounds & Names' },
  { id: 'obs3', childId: 'ch3', date: '2024-12-07', teacherId: 't1', learningArea: 'Creative Arts & Culture', observation: 'Keza enjoys mixing colors and shows creativity in her artwork. She needs support with fine motor control.', level: 'Developing', activity: 'Finger Painting' },
];

export const activities = [
  { id: 'a1', classId: 'c1', learningArea: 'Discovery of the World', theme: 'My Community', title: 'People Who Help Us', description: 'Children learn about community helpers through role play and storytelling.', date: '2024-12-09', teacherId: 't1', materials: ['Costumes', 'Pictures', 'Story books'], duration: '30 min' },
  { id: 'a2', classId: 'c2', learningArea: 'Numeracy', theme: 'Numbers 1-10', title: 'Counting with Objects', description: 'Using colorful objects to practice counting from 1 to 10.', date: '2024-12-09', teacherId: 't2', materials: ['Colored blocks', 'Beads', 'Number cards'], duration: '25 min' },
  { id: 'a3', classId: 'c3', learningArea: 'English', theme: 'Animals', title: 'Animal Sounds & Names', description: 'Learning English names and sounds of farm animals.', date: '2024-12-09', teacherId: 't3', materials: ['Animal flashcards', 'Songs', 'Puppets'], duration: '30 min' },
];

export const learningAreas = [
  { id: 'la1', name: 'Discovery of the World', icon: '🌍', color: '#3b82f6' },
  { id: 'la2', name: 'Numeracy', icon: '🔢', color: '#22c55e' },
  { id: 'la3', name: 'Kinyarwanda', icon: '🇷🇼', color: '#eab308' },
  { id: 'la4', name: 'English', icon: '🔤', color: '#8b5cf6' },
  { id: 'la5', name: 'Creative Arts & Culture', icon: '🎨', color: '#ec4899' },
  { id: 'la6', name: 'Physical Development & Health', icon: '🏃', color: '#f97316' },
];

export const meals = [
  { id: 'm1', date: '2024-12-09', mealType: 'Breakfast', menu: 'Porridge with milk and banana', ingredients: ['Maize flour', 'Milk', 'Banana', 'Sugar'], allergies: ['Milk'] },
  { id: 'm2', date: '2024-12-09', mealType: 'Lunch', menu: 'Rice with beans and steamed vegetables', ingredients: ['Rice', 'Beans', 'Carrots', 'Cabbage', 'Tomatoes'], allergies: [] },
  { id: 'm3', date: '2024-12-09', mealType: 'Snack', menu: 'Fresh fruits and biscuits', ingredients: ['Mango', 'Orange', 'Biscuits'], allergies: ['Gluten'] },
];

export const certificates = [
  { id: 'cert1', childId: 'ch1', type: 'Achievement', title: 'Star Reader Award', date: '2024-11-15', term: 'Term 1' },
  { id: 'cert2', childId: 'ch2', type: 'Participation', title: 'Sports Day Champion', date: '2024-10-20', term: 'Term 1' },
];

export const admissions = [
  { id: 'adm1', childName: 'Ishimwe Nshuti', age: 4, classApplied: 'Nursery 2', parentName: 'Claudine Habimana', phone: '+250 788 777 888', date: '2024-12-05', status: 'Pending' as const, applicationNumber: 'APP-2024-008' },
  { id: 'adm2', childName: 'Uwase Keza', age: 3, classApplied: 'Nursery 1', parentName: 'Patrick Ndayisaba', phone: '+250 788 999 111', date: '2024-12-03', status: 'Approved' as const, applicationNumber: 'APP-2024-007' },
];

export const revenueData = [
  { month: 'Sep', revenue: 850000, expenses: 420000 },
  { month: 'Oct', revenue: 920000, expenses: 450000 },
  { month: 'Nov', revenue: 780000, expenses: 400000 },
  { month: 'Dec', revenue: 680000, expenses: 380000 },
];

export const attendanceChartData = [
  { day: 'Mon', present: 55, absent: 5 },
  { day: 'Tue', present: 58, absent: 2 },
  { day: 'Wed', present: 52, absent: 8 },
  { day: 'Thu', present: 56, absent: 4 },
  { day: 'Fri', present: 50, absent: 10 },
];

export const todayAttendance = children.map((c, i) => ({
  id: `att-${i}`, childId: c.id, date: new Date().toISOString().split('T')[0],
  status: (i === 2 ? 'Absent' : i === 5 ? 'Late' : 'Present') as 'Present' | 'Absent' | 'Late' | 'Excused',
  markedBy: 't1',
}));
