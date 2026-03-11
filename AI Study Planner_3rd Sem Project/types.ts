
export interface Student {
  name: string;
  studentId: string;
  currentSemester: string;
  profilePicUrl: string;
}

export interface Notification {
  id: number;
  icon: 'calendar' | 'document' | 'alert';
  title: string;
  detail: string;
  read: boolean;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface SubjectAttendance {
  name: string;
  days: ('present' | 'absent' | 'none')[]; // 7 days
}

export interface SubjectCie {
  name: string;
  credits: number;
  marks: {
    'CIE - 1': number;
    'AAT: 1-1': number;
    'AAT: 1-2': number;
    'CIE - 2': number;
    'AAT: 2-1': number;
    'AAT: 2-2': number;
  };
}

export interface CieData {
  semester: string;
  subjects: SubjectCie[];
  actualSGPA?: number;
}


export interface LabSubmission {
  id: number;
  name: string;
  deadline: string;
  submitted: boolean;
}

export interface Skill {
    subject: string;
    A: number;
    fullMark: number;
}

export type ActiveView = 'Dashboard' | 'Attendance' | 'CIE Tracker' | 'Lab Uploads' | 'Goal Tracker';