import { Suspect, User, Case } from '../types';

export const mockUsers: User[] = [
  {
    id: 'OFF123',
    name: 'Sarah Wilson',
    badge: 'DET-456',
    role: 'investigator',
    department: 'Cyber Crime Unit',
    email: 'sarah.wilson@police.gov',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
  },
  {
    id: 'OFF124',
    name: 'John Martinez',
    badge: 'ADM-789',
    role: 'admin',
    department: 'Central Command',
    email: 'john.martinez@police.gov',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  }
];

export const mockSuspects: Suspect[] = [
  {
    id: '1',
    name: 'John Smith',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    status: 'wanted',
    crimeType: 'Cybercrime',
    lastSeen: '2024-03-15',
    description: 'Suspected of involvement in multiple cybercrime incidents.',
    matchConfidence: 89,
    lastKnownLocation: 'Downtown Area',
    caseNumber: 'CYB-2024-001'
  },
  {
    id: '2',
    name: 'Robert Johnson',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    status: 'person of interest',
    crimeType: 'Financial Fraud',
    lastSeen: '2024-03-10',
    description: 'Person of interest in ongoing financial fraud investigation.',
    matchConfidence: 75,
    lastKnownLocation: 'Business District',
    caseNumber: 'FRD-2024-003'
  }
];

export const mockCases: Case[] = [
  {
    id: 'CASE-001',
    title: 'Operation Cyber Shield',
    status: 'open',
    assignedTo: 'OFF123',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-15',
    suspects: ['1'],
    priority: 'high'
  },
  {
    id: 'CASE-002',
    title: 'Financial District Investigation',
    status: 'pending',
    assignedTo: 'OFF124',
    createdAt: '2024-03-05',
    updatedAt: '2024-03-12',
    suspects: ['2'],
    priority: 'medium'
  }
];