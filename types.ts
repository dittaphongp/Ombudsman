export interface SocialComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  commentText: string;
  postUrl: string;
  reactionsCount: number;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  category: 'corruption' | 'infrastructure' | 'inefficiency' | 'law_enforcement' | 'general';
  constitutionSection: ConstitutionSection; // New field for NLP linkage
}

export type ConstitutionSection = 
  | 'S51' // Right to Follow Up
  | 'S53' // Law Enforcement & Good Governance
  | 'S54' // Education
  | 'S55' // Public Health
  | 'S56' // Basic Infrastructure
  | 'S59' // Information Disclosure
  | 'S60' // Frequency & Spectrum
  | 'S61' // Consumer Protection
  | 'S63' // Anti-Corruption
  | 'OTHER';

export interface DashboardStats {
  totalComments: number;
  negativeSentiment: number;
  topCategory: string;
  criticalIssues: number;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  WORKFLOW = 'WORKFLOW',
  MONITOR = 'MONITOR',
  RAG = 'RAG'
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  groundingMetadata?: any; // Added for Google Maps Grounding
}