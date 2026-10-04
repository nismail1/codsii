import type { LearnTopic, TrustedContact, EmergencyServiceConfig } from '../types';

export const DEMO_CONTACTS: TrustedContact[] = [
  {
    id: 'contact-mum',
    name: 'Mum',
    relationship: 'Mother',
    phone: '+252 61 000 0001',
    smsEnabled: true,
  },
  {
    id: 'contact-aisha',
    name: 'Aisha',
    relationship: 'Sister',
    phone: '+252 61 000 0002',
    smsEnabled: true,
  },
  {
    id: 'contact-hodan',
    name: 'Hodan',
    relationship: 'Friend',
    phone: '+252 61 000 0003',
    smsEnabled: true,
  },
];

export const DEFAULT_EMERGENCY_SERVICE: EmergencyServiceConfig = {
  name: 'Local Emergency Services',
  phone: '',
  smsNumber: '',
};

export const LEARN_TOPICS: LearnTopic[] = [
  {
    id: 'whatsapp',
    title: 'Protecting WhatsApp',
    summary: 'Lock down your chats and account settings.',
    category: 'Messaging',
    body: [
      'Turn on two-step verification in WhatsApp Settings → Account → Two-step verification.',
      'Never share your verification code with anyone, even if they claim to be family.',
      'Review who can see your last seen, profile photo, and about information.',
      'Leave groups you do not recognize and report suspicious messages.',
    ],
  },
  {
    id: 'passwords',
    title: 'Strong Passwords',
    summary: 'Create harder-to-guess logins and protect accounts.',
    category: 'Accounts',
    body: [
      'Use a unique password for every important account.',
      'Prefer long passphrases made of several unrelated words.',
      'Enable biometric or PIN lock on your phone.',
      'Do not reuse passwords from social apps for email or banking.',
    ],
  },
  {
    id: 'scams',
    title: 'Avoiding Scams',
    summary: 'Spot common tricks used to steal money or information.',
    category: 'Fraud',
    body: [
      'Be cautious of urgent messages asking for money, codes, or personal details.',
      'Verify requests by calling the person through a known number.',
      'Do not click unknown links promising jobs, prizes, or remittances.',
      'If something feels rushed or secretive, pause and ask a trusted person.',
    ],
  },
  {
    id: 'social',
    title: 'Safe Social Media Use',
    summary: 'Reduce risk while staying connected online.',
    category: 'Social',
    body: [
      'Limit location tags and avoid posting your live whereabouts.',
      'Keep personal photos and family details private when possible.',
      'Block and report accounts that harass or pressure you.',
      'Review friend or follower lists regularly and remove people you do not trust.',
    ],
  },
  {
    id: 'ai-safety',
    title: 'Internet Safety & AI',
    summary: 'Stay safer as AI tools become more common online.',
    category: 'Digital',
    body: [
      'Do not share private documents, IDs, or sensitive photos with AI chat tools.',
      'Be skeptical of AI-generated voice notes, images, or messages that feel unusual.',
      'Treat “too perfect” online advice carefully — verify important guidance with trusted sources.',
      'Teach family members that AI can be used to impersonate people and create fake urgency.',
    ],
  },
];
