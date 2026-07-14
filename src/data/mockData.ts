import {
  Reminder,
  StatItem,
  FeatureItem,
  TestimonialItem,
  PricingPlan,
  FAQItem,
  FamilyMember,
  SyncDevice,
  ChatMessage,
  WeightTrendPoint,
  ReportProgressPoint
} from '../types';

// 1. Orbiting Hero Reminders
export const heroOrbitingReminders: Reminder[] = [
  {
    id: 'hero-1',
    title: 'Vitamin D3 (1000 IU)',
    type: 'medicine',
    schedule: '08:30 AM',
    status: 'completed',
    dosage: '1 Capsule'
  },
  {
    id: 'hero-2',
    title: 'Hydration Target (250ml)',
    type: 'water',
    schedule: '11:00 AM',
    status: 'pending',
    dosage: 'Water'
  },
  {
    id: 'hero-3',
    title: 'Posture Check & Stretch',
    type: 'exercise',
    schedule: '02:15 PM',
    status: 'pending',
    dosage: '5 Mins'
  }
];

// 2. Stats Section
export const statsData: StatItem[] = [
  {
    id: 'stat-1',
    label: 'Reminder Success',
    value: 95,
    suffix: '%',
    description: 'Adherence rate among consistent users compared to the 45% clinical average.'
  },
  {
    id: 'stat-2',
    label: 'Healthy Users',
    value: 50,
    prefix: '',
    suffix: 'K+',
    description: 'Active individuals managing their chronic conditions and daily routines.'
  },
  {
    id: 'stat-3',
    label: 'Reminders Sent',
    value: 1.2,
    suffix: 'M+',
    description: 'Automated push notifications, voice warnings, and alert messages triggered.'
  },
  {
    id: 'stat-4',
    label: 'Health Metrics',
    value: 25,
    suffix: '+',
    description: 'Tracked variables across sleep, hydration, nutrition, and cardiovascular sensors.'
  }
];

// 3. Dashboard Today's Reminders
export const dashboardReminders: Reminder[] = [
  {
    id: 'rem-1',
    title: 'Omega-3 Fish Oil',
    type: 'medicine',
    schedule: '08:00 AM',
    status: 'completed',
    dosage: '1 Capsule'
  },
  {
    id: 'rem-2',
    title: 'Hydration Intake',
    type: 'water',
    schedule: '10:00 AM',
    status: 'completed',
    dosage: '350 ml'
  },
  {
    id: 'rem-3',
    title: 'Metformin (500mg)',
    type: 'medicine',
    schedule: '12:30 PM',
    status: 'pending',
    dosage: '1 Tablet'
  },
  {
    id: 'rem-4',
    title: 'Cardio Walk Routine',
    type: 'exercise',
    schedule: '05:00 PM',
    status: 'pending',
    dosage: '30 mins'
  },
  {
    id: 'rem-5',
    title: 'Blood Pressure Log',
    type: 'custom',
    schedule: '08:00 PM',
    status: 'pending',
    dosage: 'Log'
  }
];

// 4. Weight Trend (D3/Recharts)
export const weightTrendData: WeightTrendPoint[] = [
  { day: 'Mon', weight: 78.4 },
  { day: 'Tue', weight: 78.1 },
  { day: 'Wed', weight: 77.9 },
  { day: 'Thu', weight: 78.0 },
  { day: 'Fri', weight: 77.6 },
  { day: 'Sat', weight: 77.3 },
  { day: 'Sun', weight: 77.1 }
];

// 5. Features Section
export const featuresData: FeatureItem[] = [
  {
    id: 'feat-1',
    title: 'Smart Medication Alarms',
    description: 'AI-generated schedules tailored to your drug interactions, meals, and natural circadian cycles.',
    iconName: 'Pills',
    gradientFrom: 'from-emerald-500/10',
    gradientTo: 'to-teal-500/10',
    badge: 'Core'
  },
  {
    id: 'feat-2',
    title: 'Precision Hydration Tracker',
    description: 'Dynamic water goals adjusting instantly to local ambient temperatures, activity, and humidity.',
    iconName: 'Droplet',
    gradientFrom: 'from-sky-500/10',
    gradientTo: 'to-blue-500/10'
  },
  {
    id: 'feat-3',
    title: 'Circadian Sleep Analysis',
    description: 'Auto-detect wake-up windows to remind you when to wind down, leading to consistent recovery scores.',
    iconName: 'Moon',
    gradientFrom: 'from-purple-500/10',
    gradientTo: 'to-indigo-500/10'
  },
  {
    id: 'feat-4',
    title: 'Biometric Exercises',
    description: 'Interactive stretches and heart-rate recovery exercises suggested when our AI detects sedentariness.',
    iconName: 'Activity',
    gradientFrom: 'from-rose-500/10',
    gradientTo: 'to-orange-500/10'
  },
  {
    id: 'feat-5',
    title: 'AI Clinical Health Insights',
    description: 'Weekly summaries prepared for medical review, spotting correlations between sleep quality and metrics.',
    iconName: 'BrainCircuit',
    gradientFrom: 'from-emerald-500/10',
    gradientTo: 'to-indigo-500/10',
    badge: 'AI Powered'
  },
  {
    id: 'feat-6',
    title: 'SOS Emergency Alerts',
    description: 'Critical fall detection or extreme blood pressure alarms automatically notify verified emergency contacts.',
    iconName: 'HeartPulse',
    gradientFrom: 'from-rose-500/10',
    gradientTo: 'to-red-500/10',
    badge: 'Security'
  },
  {
    id: 'feat-7',
    title: 'Seamless Smartwatch Sync',
    description: 'Continuous background syncing with watch sensors, updating your hydration metrics without opening the app.',
    iconName: 'Watch',
    gradientFrom: 'from-sky-500/10',
    gradientTo: 'to-purple-500/10'
  },
  {
    id: 'feat-8',
    title: 'Family Health Guardian',
    description: 'Keep tabs on aging parents or children securely. Receive push alerts when they miss a vital prescription.',
    iconName: 'Users',
    gradientFrom: 'from-amber-500/10',
    gradientTo: 'to-orange-500/10'
  }
];

// 6. AI Assistant Dialogue
export const assistantScript: ChatMessage[] = [
  {
    id: 'chat-1',
    sender: 'user',
    text: "Hey, I think I forgot my morning medicine because I had a rushed meeting. What should I do?",
    timestamp: '09:12 AM'
  },
  {
    id: 'chat-2',
    sender: 'assistant',
    text: "I detected you missed your 08:00 AM Omega-3 dose. Since it is less than 2 hours late, you should take 1 capsule now with water. Avoid double-dosing later. I will snooze your midday calcium supplement by 45 minutes to optimize absorption.",
    timestamp: '09:12 AM'
  },
  {
    id: 'chat-3',
    sender: 'user',
    text: "Awesome, thanks. Let me log that. Also, how is my hydration looking today?",
    timestamp: '09:13 AM'
  },
  {
    id: 'chat-4',
    sender: 'assistant',
    text: "You have completed 600ml of your 2500ml daily target. Considering the high humidity today (78%), you should drink an extra 250ml glass in the next hour. I have queued a smart vibration reminder on your smartwatch.",
    timestamp: '09:13 AM'
  }
];

// 7. Reports Chart Data (Weekly, Monthly, Yearly)
export const reportWeeklyData: ReportProgressPoint[] = [
  { name: 'Mon', completed: 8, missed: 1 },
  { name: 'Tue', completed: 9, missed: 0 },
  { name: 'Wed', completed: 7, missed: 2 },
  { name: 'Thu', completed: 10, missed: 0 },
  { name: 'Fri', completed: 6, missed: 3 },
  { name: 'Sat', completed: 8, missed: 1 },
  { name: 'Sun', completed: 9, missed: 0 }
];

export const reportMonthlyData: ReportProgressPoint[] = [
  { name: 'Week 1', completed: 58, missed: 5 },
  { name: 'Week 2', completed: 62, missed: 2 },
  { name: 'Week 3', completed: 55, missed: 9 },
  { name: 'Week 4', completed: 64, missed: 1 }
];

export const reportYearlyData: ReportProgressPoint[] = [
  { name: 'Q1', completed: 720, missed: 45 },
  { name: 'Q2', completed: 780, missed: 22 },
  { name: 'Q3', completed: 810, missed: 18 },
  { name: 'Q4', completed: 795, missed: 30 }
];

// Calendar Heatmap Data (4 weeks, 7 days each = 28 points)
export interface HeatmapDay {
  day: number;
  level: 0 | 1 | 2 | 3 | 4; // 0: missed all, 4: perfect streak
  tooltip: string;
}

export const heatmapData: HeatmapDay[] = [
  { day: 1, level: 3, tooltip: 'July 1: 8/9 Completed' },
  { day: 2, level: 4, tooltip: 'July 2: 9/9 Completed (Perfect)' },
  { day: 3, level: 2, tooltip: 'July 3: 6/8 Completed' },
  { day: 4, level: 4, tooltip: 'July 4: 7/7 Completed (Perfect)' },
  { day: 5, level: 3, tooltip: 'July 5: 8/9 Completed' },
  { day: 6, level: 4, tooltip: 'July 6: 10/10 Completed (Perfect)' },
  { day: 7, level: 1, tooltip: 'July 7: 3/9 Completed (Missed morning doses)' },
  { day: 8, level: 3, tooltip: 'July 8: 7/8 Completed' },
  { day: 9, level: 4, tooltip: 'July 9: 9/9 Completed (Perfect)' },
  { day: 10, level: 4, tooltip: 'July 10: 8/8 Completed (Perfect)' },
  { day: 11, level: 3, tooltip: 'July 11: 7/9 Completed' },
  { day: 12, level: 2, tooltip: 'July 12: 5/8 Completed' },
  { day: 13, level: 4, tooltip: 'July 13: 9/9 Completed (Perfect)' },
  { day: 14, level: 4, tooltip: 'July 14: 10/10 Completed (Perfect)' },
  { day: 15, level: 3, tooltip: 'July 15: 7/8 Completed' },
  { day: 16, level: 4, tooltip: 'July 16: 9/9 Completed (Perfect)' },
  { day: 17, level: 4, tooltip: 'July 17: 8/8 Completed (Perfect)' },
  { day: 18, level: 0, tooltip: 'July 18: 0/8 Completed (Phone Out of Battery)' },
  { day: 19, level: 3, tooltip: 'July 19: 7/8 Completed' },
  { day: 20, level: 4, tooltip: 'July 20: 10/10 Completed (Perfect)' },
  { day: 21, level: 4, tooltip: 'July 21: 9/9 Completed (Perfect)' },
  { day: 22, level: 3, tooltip: 'July 22: 8/9 Completed' },
  { day: 23, level: 4, tooltip: 'July 23: 8/8 Completed (Perfect)' },
  { day: 24, level: 4, tooltip: 'July 24: 9/9 Completed (Perfect)' },
  { day: 25, level: 2, tooltip: 'July 25: 5/8 Completed' },
  { day: 26, level: 3, tooltip: 'July 26: 7/9 Completed' },
  { day: 27, level: 4, tooltip: 'July 27: 10/10 Completed (Perfect)' },
  { day: 28, level: 4, tooltip: 'July 28: 9/9 Completed (Perfect)' }
];

// 8. Family Guardian Members
export const familyMembersData: FamilyMember[] = [
  {
    id: 'fam-1',
    name: 'Arthur Miller',
    relationship: 'Grandfather (Age 78)',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    healthScore: 82,
    medicationStatus: 'Missed Blood Pressure Tablet',
    alertState: 'danger',
    lastActive: '12 mins ago',
    activeReminders: ['Ramipril 5mg (Missed - 08:00 AM)', 'Hydration (Completed - 10:00 AM)', 'Insulin Dose (Pending - 01:00 PM)']
  },
  {
    id: 'fam-2',
    name: 'Sarah Miller',
    relationship: 'Mother (Age 54)',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    healthScore: 94,
    medicationStatus: 'All morning pills completed',
    alertState: 'normal',
    lastActive: '4 mins ago',
    activeReminders: ['Thyroxine 100mcg (Completed)', 'Vitamin B-Complex (Completed)', 'Calcium Supplement (Pending - 06:00 PM)']
  },
  {
    id: 'fam-3',
    name: 'Robert Miller',
    relationship: 'Father (Age 56)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    healthScore: 89,
    medicationStatus: 'Upcoming cholesterol check',
    alertState: 'warning',
    lastActive: '1 hour ago',
    activeReminders: ['Daily Walk 40 mins (Completed)', 'Atorvastatin 20mg (Pending - 09:00 PM)']
  },
  {
    id: 'fam-4',
    name: 'Leo Miller',
    relationship: 'Child (Age 9)',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    healthScore: 97,
    medicationStatus: 'All reminders up-to-date',
    alertState: 'normal',
    lastActive: 'Just now',
    activeReminders: ['Multivitamin Gummy (Completed)', 'After-school Hydration (Pending - 03:30 PM)']
  }
];

// 9. Connected Devices
export const syncDevicesData: SyncDevice[] = [
  {
    id: 'dev-1',
    name: 'Apple Watch Ultra',
    iconName: 'Watch',
    status: 'connected',
    batteryLevel: 88,
    lastSync: 'Just now'
  },
  {
    id: 'dev-2',
    name: 'Fitbit Charge 6',
    iconName: 'Activity',
    status: 'syncing',
    batteryLevel: 42,
    lastSync: 'Syncing...'
  },
  {
    id: 'dev-3',
    name: 'Samsung Galaxy Watch 6',
    iconName: 'Watch',
    status: 'connected',
    batteryLevel: 95,
    lastSync: '2 mins ago'
  },
  {
    id: 'dev-4',
    name: 'Google Fit Cloud',
    iconName: 'Cloud',
    status: 'connected',
    batteryLevel: 100,
    lastSync: '10 mins ago'
  }
];

// 10. Testimonials
export const testimonialsData: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Dr. Evelyn Carter',
    role: 'MD, Chief of Geriatrics at Saint Jude',
    rating: 5,
    comment: 'The adherence rate among patients using Health Reminder Plus jumped from 45% to an astonishing 95%. The family monitoring dashboards provide real peace of mind to caregivers, and the clinical reports are exceptionally structured for physicians.',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'test-2',
    name: 'Marcus Sterling',
    role: 'Angel Investor & Diabetic Patient',
    rating: 5,
    comment: 'Managing Type-2 Diabetes requires rigorous schedule precision. Health Reminder Plus transformed my routine completely. The smart alerts integrate flawlessly with my Apple Watch and adjust intelligently based on my blood sugar logs.',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'test-3',
    name: 'Julianne Vance',
    role: 'Daughter & Primary Caregiver',
    rating: 5,
    comment: 'I used to lay awake worrying if my grandfather had taken his critical heart medication. With the SOS fall alerts and family monitors, I receive real-time confirmations on my phone. It is a absolute life-saver, literally.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  }
];

// 11. Pricing Plans
export const pricingPlansData: PricingPlan[] = [
  {
    id: 'plan-free',
    name: 'Essential Care',
    price: '$0',
    description: 'Perfect for basic daily reminders and hydration goals.',
    features: [
      'Up to 5 medication reminders',
      'Daily hydration tracking',
      'Basic smartwatch sync (Apple/Fitbit)',
      '7-day health history',
      'Standard push notifications'
    ],
    ctaText: 'Start Free Trial'
  },
  {
    id: 'plan-premium',
    name: 'Elite Health AI',
    price: '$12',
    period: '/ month',
    description: 'Fully unlocked AI capabilities, comprehensive tracking, and clinical analytics.',
    features: [
      'Unlimited smart AI reminders',
      'Drug interaction warning analysis',
      'Complete biometric & smartwatch sync',
      'Family dashboard (up to 4 members)',
      'Clinical PDF reports for doctors',
      'SOS Fall & Hypertension detection',
      'Advanced Sleep & Heart Trend insights'
    ],
    isPopular: true,
    ctaText: 'Upgrade to Elite'
  },
  {
    id: 'plan-enterprise',
    name: 'Clinic & Care',
    price: 'Custom',
    description: 'Custom setups for nursing homes, care facilities, and medical practitioners.',
    features: [
      'Unlimited managed patients',
      'Direct HIPAA-compliant EHR integrations',
      'Dedicated clinician portal with alert queues',
      'Custom hardware smartwatch dispatching',
      '24/7 Priority Medical Line integration',
      'Enterprise SLA & Dedicated Manager'
    ],
    ctaText: 'Contact Partnerships'
  }
];

// 12. FAQ List
export const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does the AI Assistant personalize my reminder schedule?',
    answer: 'Health Reminder Plus analyzes your prescription specifications, food intake requirements, and sleep circadian rhythms. If you take a medication that requires an empty stomach, the AI schedules it exactly 1 hour before your typical breakfast, adjusting dynamically if your sleep patterns or waking times shift.'
  },
  {
    id: 'faq-2',
    question: 'Does this app connect with my existing smartwatches and medical devices?',
    answer: 'Yes, we offer deep native integrations with Apple HealthKit, Google Fit, Samsung Health, Fitbit SDK, and Garmin Connect. This allows us to sync real-time heart rates, blood oxygen levels, sleep cycles, and physical activity seamlessly without draining your battery.'
  },
  {
    id: 'faq-3',
    question: 'How does the Family Guardian monitoring system work?',
    answer: 'With the Elite plan, you can link up to 4 family members securely. If a member misses a high-priority reminder (such as cardiac or diabetic medication) by more than 30 minutes, or if their synced device flags a dangerous biometric anomaly, caregivers receive an instant SMS and push alert detailing the situation.'
  },
  {
    id: 'faq-4',
    question: 'Is my health data secure and HIPAA-compliant?',
    answer: 'Absolutely. Security is our foundational pillar. All health metrics, medication names, and biometric logs are encrypted using military-grade AES-256 both in transit and at rest. We never sell your personal data, and our storage architectures comply strictly with HIPAA regulations.'
  },
  {
    id: 'faq-5',
    question: 'Can I generate structured reports for my doctor visits?',
    answer: 'Yes! You can instantly generate and export clean, professional PDF health reports (weekly, monthly, or quarterly). These include clinical-grade charts of your medication adherence rates, blood pressure averages, hydration patterns, sleep scores, and flagged biometric events.'
  }
];
