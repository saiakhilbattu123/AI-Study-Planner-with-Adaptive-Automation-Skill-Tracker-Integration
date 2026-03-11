import type { Student, Notification, SubjectAttendance, CieData, LabSubmission, Skill } from '../types';

export const mockStudent: Student = {
  name: 'Alex Doe',
  studentId: 'STU12345',
  currentSemester: '5th Semester',
  profilePicUrl: 'https://picsum.photos/100',
};

export const mockNotifications: Notification[] = [
  { id: 1, icon: 'calendar', title: 'CIE-2 Exam Date', detail: 'Data Structures - Nov 25th', read: false },
  { id: 2, icon: 'document', title: 'Lab Submission Due', detail: 'Workbook for Week 5 due tomorrow', read: false },
  { id: 3, icon: 'alert', title: 'Fee Payment Reminder', detail: 'Semester fees due next week', read: true },
  { id: 4, icon: 'calendar', title: 'Project Demo', detail: 'DBMS Project - Nov 28th', read: false },
];

export const mockAttendance: SubjectAttendance[] = [
  { name: 'Data Structures', days: ['present', 'present', 'absent', 'present', 'none', 'none', 'present'] },
  { name: 'Algorithms', days: ['present', 'absent', 'present', 'present', 'none', 'none', 'present'] },
  { name: 'Database Systems', days: ['absent', 'present', 'present', 'absent', 'none', 'none', 'present'] },
  { name: 'Operating Systems', days: ['present', 'present', 'present', 'present', 'none', 'none', 'absent'] },
  { name: 'Web Technologies', days: ['present', 'present', 'absent', 'present', 'none', 'none', 'present'] },
];

export const mockCieData: CieData[] = [
  {
    semester: '5th Semester',
    subjects: [
      { name: 'Data Structures', credits: 4, marks: { 'CIE - 1': 9, 'AAT: 1-1': 4, 'AAT: 1-2': 4, 'CIE - 2': 10, 'AAT: 2-1': 3, 'AAT: 2-2': 4 } }, // CIE: 34
      { name: 'Database Systems', credits: 4, marks: { 'CIE - 1': 8, 'AAT: 1-1': 5, 'AAT: 1-2': 3, 'CIE - 2': 9, 'AAT: 2-1': 4, 'AAT: 2-2': 4 } }, // CIE: 33
      { name: 'Web Technologies', credits: 3, marks: { 'CIE - 1': 10, 'AAT: 1-1': 5, 'AAT: 1-2': 5, 'CIE - 2': 10, 'AAT: 2-1': 5, 'AAT: 2-2': 3 } }, // CIE: 38
      { name: 'Operating Systems', credits: 3, marks: { 'CIE - 1': 7, 'AAT: 1-1': 3, 'AAT: 1-2': 4, 'CIE - 2': 8, 'AAT: 2-1': 4, 'AAT: 2-2': 3 } }, // CIE: 29
    ]
  },
  {
    semester: '4th Semester',
    subjects: [
        { name: 'Algorithms', credits: 4, marks: { 'CIE - 1': 8, 'AAT: 1-1': 4, 'AAT: 1-2': 5, 'CIE - 2': 9, 'AAT: 2-1': 4, 'AAT: 2-2': 2 } }, // CIE: 32
        { name: 'Computer Networks', credits: 4, marks: { 'CIE - 1': 9, 'AAT: 1-1': 4, 'AAT: 1-2': 4, 'CIE - 2': 8, 'AAT: 2-1': 5, 'AAT: 2-2': 5 } }, // CIE: 35
        { name: 'Software Engineering', credits: 3, marks: { 'CIE - 1': 10, 'AAT: 1-1': 5, 'AAT: 1-2': 4, 'CIE - 2': 9, 'AAT: 2-1': 4, 'AAT: 2-2': 4 } }, // CIE: 36
    ],
    actualSGPA: 8.5,
  },
  {
    semester: '3rd Semester',
    subjects: [
        { name: 'Discrete Mathematics', credits: 4, marks: { 'CIE - 1': 10, 'AAT: 1-1': 5, 'AAT: 1-2': 4, 'CIE - 2': 10, 'AAT: 2-1': 5, 'AAT: 2-2': 4 } }, // CIE: 38
        { name: 'Digital Logic', credits: 3, marks: { 'CIE - 1': 9, 'AAT: 1-1': 5, 'AAT: 1-2': 5, 'CIE - 2': 9, 'AAT: 2-1': 5, 'AAT: 2-2': 5 } }, // CIE: 38
        { name: 'OOP with Java', credits: 4, marks: { 'CIE - 1': 10, 'AAT: 1-1': 4, 'AAT: 1-2': 4, 'CIE - 2': 9, 'AAT: 2-1': 4, 'AAT: 2-2': 4 } }, // CIE: 35
    ],
    actualSGPA: 9.2,
  },
];

export const upcomingLabs: LabSubmission[] = [
  { id: 1, name: 'Data Structures Lab 4', deadline: 'Due: November 20, 2025', submitted: false },
  { id: 2, name: 'DBMS Lab 5', deadline: 'Due: November 27, 2025', submitted: false },
];

export const pastLabs: LabSubmission[] = [
  { id: 3, name: 'Data Structures Lab 3', deadline: 'Submitted: Nov 13, 2025', submitted: true },
  { id: 4, name: 'DBMS Lab 4', deadline: 'Submitted: Nov 20, 2025', submitted: true },
];

export const skillData: Skill[] = [
  { subject: 'Problem Solving', A: 85, fullMark: 100 },
  { subject: 'Web Dev', A: 70, fullMark: 100 },
  { subject: 'Database', A: 90, fullMark: 100 },
  { subject: 'AI/ML', A: 60, fullMark: 100 },
  { subject: 'OS', A: 75, fullMark: 100 },
];

export const mockDesiredSkills: string[] = ['System Design', 'Advanced Algorithms', 'Cloud Computing'];