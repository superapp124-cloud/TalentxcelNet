import type { LifeSkillCategory } from './types'
import type { LifeSkillCurriculumModule } from './curriculum-types'

export interface InHouseVideoPreset {
  id: string
  name: string
  shortLabel: string
  domain: string
  category: LifeSkillCategory
  title: string
  description: string
  mp4Url: string
  posterUrl: string
  duration: string
  resolution: string
  curriculumReason: string
}

export type InstitutionalVideoPreset = InHouseVideoPreset

export const DEFAULT_SAMPLE_MP4_URL = '/videos/sample-lesson.mp4'

export const IN_HOUSE_VIDEO_PRESETS: InHouseVideoPreset[] = [
  {
    id: 'independence-morning-routine',
    name: 'TalentXcel In-House Production Studio',
    shortLabel: 'Morning Routine & Packing',
    domain: 'Personal Independence & Daily Living',
    category: 'life_independence',
    title: 'School Bag Packing & 3-Zone Ergonomics Demonstration',
    description:
      'Step-by-step practical demonstration showing timetable verification, 4-notebook sorting, packing heavy books against the spine panel, and preparing the night before.',
    mp4Url: '/videos/sample-lesson.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80',
    duration: '03:15',
    resolution: '1080p HD MP4',
    curriculumReason:
      'Native in-house demonstration aligned with Class 4–5 foundation modules on morning preparedness and independent school routines.',
  },
  {
    id: 'safety-firstaid-cpr',
    name: 'TalentXcel Medical Skills Studio',
    shortLabel: 'First Aid & CPR Drill',
    domain: 'Safety, Health and Well-being',
    category: 'life_safety_health',
    title: 'Certified Practical First Aid & Emergency Response',
    description:
      'Visual procedural guide showing unresponsiveness check, emergency helpline dialing (112), proper chest compression depth (5 cm) at 100–120 bpm, and sterile burn dressing.',
    mp4Url: '/videos/sample-lesson.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    duration: '03:30',
    resolution: '1080p HD MP4',
    curriculumReason:
      'Authentic demonstration of immediate life-saving techniques, recovery positions, and avoiding common panics during injuries.',
  },
  {
    id: 'citizenship-waste-segregation',
    name: 'TalentXcel Civic Life Studio',
    shortLabel: '4-Stream Waste Sorting',
    domain: 'Practical Citizenship & Community',
    category: 'life_citizenship_community',
    title: 'Source Waste Segregation & Home Composting Drill',
    description:
      'Demonstration of separating household waste into 4 distinct streams: Green (wet/organic), Blue (dry paper/plastic), Yellow (sanitary), and Red (e-waste) with zero cross-contamination.',
    mp4Url: '/videos/sample-lesson.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
    duration: '03:20',
    resolution: '1080p HD MP4',
    curriculumReason:
      'Direct hands-on demonstration for civic hygiene, neighborhood responsibility, and daily waste reduction routines.',
  },
  {
    id: 'money-banking-fraud-prevention',
    name: 'TalentXcel Financial Literacy Studio',
    shortLabel: 'Safe Banking & Receipt Check',
    domain: 'Money Management & Financial Literacy',
    category: 'life_money_management',
    title: 'Verifying Retail Receipts, MRP & Digital Payment Safety',
    description:
      'Practical demonstration on auditing grocery bills line-by-line, checking price tags, refusing OTP sharing, and reconciling UPI payment debit SMS notifications.',
    mp4Url: '/videos/sample-lesson.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    duration: '02:50',
    resolution: '1080p HD MP4',
    curriculumReason:
      'Teaches consumer awareness, retail math verification, and protecting personal money from deceptive charges.',
  },
  {
    id: 'communication-active-listening',
    name: 'TalentXcel Communication Studio',
    shortLabel: 'Public Speaking & Listening',
    domain: 'Communication and Confidence',
    category: 'life_communication',
    title: 'Active Listening & Assertive School Conversations',
    description:
      'Visual roleplay contrasting interrupted vs. active listening, eye contact, paraphrasing partner statements, and polite disagreement in classroom discussions.',
    mp4Url: '/videos/sample-lesson.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    duration: '03:10',
    resolution: '1080p HD MP4',
    curriculumReason:
      'Practical demonstration of confidence, conversational pacing, and resolving student miscommunications without conflict.',
  },
  {
    id: 'critical-emergency-problem-solving',
    name: 'TalentXcel Applied Thinking Studio',
    shortLabel: 'Emergency Problem Solving',
    domain: 'Critical Thinking & Everyday Problem-Solving',
    category: 'life_critical_thinking',
    title: 'Emergency Decision Trees & Rapid Risk Assessment',
    description:
      'Step-by-step walkthrough of remaining calm under pressure, identifying exits, evaluating alternatives, and taking systematic action during unexpected dilemmas.',
    mp4Url: '/videos/sample-lesson.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    duration: '03:05',
    resolution: '1080p HD MP4',
    curriculumReason:
      'Trains logical deduction, separating facts from panic, and taking safe practical decisions.',
  },
  {
    id: 'study-active-recall-planning',
    name: 'TalentXcel Learning Autonomy Studio',
    shortLabel: 'Study Timetables & Active Recall',
    domain: 'Study Skills and Learning Independence',
    category: 'life_study_skills',
    title: 'Scientific Study Routines & Distraction Control',
    description:
      'Practical demonstration of turning passive textbook reading into active recall through self-quiz cards, weekly study blocks, and distraction-free desk setup.',
    mp4Url: '/videos/sample-lesson.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    duration: '03:15',
    resolution: '1080p HD MP4',
    curriculumReason:
      'Equips students with self-directed revision strategies and balanced homework scheduling.',
  },
  {
    id: 'social-teamwork-collaboration',
    name: 'TalentXcel Social Dynamics Studio',
    shortLabel: 'Team Role Distribution',
    domain: 'Social Skills, Empathy and Teamwork',
    category: 'life_social_teamwork',
    title: 'Collaborative Project Roles & Group Problem Solving',
    description:
      'Demonstration of assigning project duties based on individual strengths, managing group deadlines, and resolving disagreements through consensus.',
    mp4Url: '/videos/sample-lesson.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    duration: '03:00',
    resolution: '1080p HD MP4',
    curriculumReason:
      'Teaches empathy, mutual accountability, and peer collaboration for school projects and community activities.',
  },
]

export const INSTITUTIONAL_VIDEO_PRESETS = IN_HOUSE_VIDEO_PRESETS

/**
 * Returns the best matching in-house video preset for a given module
 */
export function getInstitutionalVideoForModule(
  module: LifeSkillCurriculumModule | { category: LifeSkillCategory; title?: string }
): InHouseVideoPreset {
  const title = (module.title || '').toLowerCase()

  if (title.includes('cpr') || title.includes('first aid') || title.includes('wound') || title.includes('bleeding')) {
    return IN_HOUSE_VIDEO_PRESETS.find((p) => p.id === 'safety-firstaid-cpr')!
  }
  if (title.includes('waste') || title.includes('garbage') || title.includes('segregat') || title.includes('clean')) {
    return IN_HOUSE_VIDEO_PRESETS.find((p) => p.id === 'citizenship-waste-segregation')!
  }
  if (title.includes('bank') || title.includes('money') || title.includes('fraud') || title.includes('scam') || title.includes('upi') || title.includes('bill')) {
    return IN_HOUSE_VIDEO_PRESETS.find((p) => p.id === 'money-banking-fraud-prevention')!
  }
  if (title.includes('listen') || title.includes('speak') || title.includes('talk') || title.includes('speech')) {
    return IN_HOUSE_VIDEO_PRESETS.find((p) => p.id === 'communication-active-listening')!
  }
  if (title.includes('study') || title.includes('exam') || title.includes('timetable') || title.includes('homework')) {
    return IN_HOUSE_VIDEO_PRESETS.find((p) => p.id === 'study-active-recall-planning')!
  }
  if (title.includes('team') || title.includes('group') || title.includes('peer') || title.includes('friend')) {
    return IN_HOUSE_VIDEO_PRESETS.find((p) => p.id === 'social-teamwork-collaboration')!
  }

  // Fallback match by category
  const categoryMatch = IN_HOUSE_VIDEO_PRESETS.find((p) => p.category === module.category)
  if (categoryMatch) return categoryMatch

  return IN_HOUSE_VIDEO_PRESETS[0]
}
