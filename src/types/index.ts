export interface Suspect {
  id: string;
  name: string;
  image: string;
  status: 'wanted' | 'arrested' | 'person of interest';
  crimeType: string;
  lastSeen: string;
  description: string;
  matchConfidence?: number;
  lastKnownLocation?: string;
  associates?: string[];
  caseNumber?: string;
}

export interface User {
  id: string;
  name: string;
  badge: string;
  role: 'officer' | 'admin' | 'investigator';
  department: string;
  email: string;
  avatar?: string;
}

export interface Case {
  id: string;
  title: string;
  status: 'open' | 'closed' | 'pending';
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  suspects: string[];
  priority: 'high' | 'medium' | 'low';
}