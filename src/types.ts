export type ReminderType = 'medicine' | 'water' | 'exercise' | 'appointment' | 'custom';

export interface Reminder {
  id: string;
  title: string;
  type: ReminderType;
  schedule: string;
  status: 'pending' | 'completed';
  dosage?: string;
  avatarUrl?: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  gradientFrom: string;
  gradientTo: string;
  badge?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatarUrl: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  avatarUrl: string;
  healthScore: number;
  medicationStatus: string;
  alertState: 'normal' | 'warning' | 'danger';
  lastActive: string;
  activeReminders: string[];
}

export interface SyncDevice {
  id: string;
  name: string;
  iconName: string;
  status: 'connected' | 'syncing' | 'disconnected';
  batteryLevel: number;
  lastSync: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface WeightTrendPoint {
  day: string;
  weight: number;
}

export interface ReportProgressPoint {
  name: string;
  completed: number;
  missed: number;
}
