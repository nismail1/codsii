import type { SafetyGuide, SafetyGuideId } from '../types';
import type { SupportPartner } from '../types/admin';
import { DEMO_SUPPORT_PARTNERS } from '../data/adminDemo';

/**
 * On-device digital-safety guidance.
 * The description is never stored or sent. A later model can replace
 * `assessOnlineSituation` without changing the screen.
 */

export const SAFETY_LANGUAGE = {
  id: 'en' as const,
  label: 'English',
};

export const SAFETY_EXAMPLES = [
  {
    id: 'cousin-link',
    label: 'WhatsApp login link',
    text: 'Someone claiming to be my cousin sent me a WhatsApp link and asked me to log in.',
  },
  {
    id: 'code',
    label: 'Verification code',
    text: 'A message asked me to send my WhatsApp verification code.',
  },
  {
    id: 'photos',
    label: 'Threat about photos',
    text: 'Someone is threatening to share my private photos unless I pay.',
  },
] as const;

type Signal = {
  pattern: RegExp;
  weight: number;
};

const PHISHING: Signal[] = [
  { pattern: /\bphish/, weight: 3 },
  { pattern: /\bimpersonat/, weight: 3 },
  { pattern: /\b(pretending to be|claiming to be|claims to be)\b/, weight: 3 },
  { pattern: /\b(log ?in|login|sign ?in|password)\b/, weight: 2 },
  { pattern: /\b(link|url)\b/, weight: 2 },
  { pattern: /\b(cousin|uncle|aunt|auntie|brother|sister|mother|father|mum|mom|dad|husband|wife)\b/, weight: 1 },
  { pattern: /\b(whatsapp|telegram|instagram|facebook|sms|text message)\b/, weight: 1 },
];

const VERIFICATION: Signal[] = [
  { pattern: /\b(verification code|one[- ]time code|otp|two[- ]step)\b/, weight: 3 },
  { pattern: /\bcode\b/, weight: 2 },
  { pattern: /\b(share|send|give|forward|asked for|asking for)\b/, weight: 1 },
  { pattern: /\b(whatsapp|telegram|instagram|account)\b/, weight: 1 },
];

const MONEY: Signal[] = [
  { pattern: /\b(zaad|edahab|e-dahab|evc|sahal|mpesa|m-pesa|mobile money)\b/, weight: 3 },
  { pattern: /\b(send|transfer|wire)\b[^.]{0,24}\b(money|cash|dollars|usd)\b/, weight: 3 },
  { pattern: /\b(money|cash|dollars)\b[^.]{0,24}\b(send|transfer|wire|urgent)\b/, weight: 3 },
  { pattern: /\b(prize|lottery|you(?:'ve| have) won|won a prize|inheritance)\b/, weight: 3 },
  { pattern: /\b(processing fee|visa fee|job fee)\b/, weight: 3 },
  { pattern: /\b(investment|crypto)\b/, weight: 2 },
  { pattern: /\b(fee|payment)\b/, weight: 1 },
];

const STOLEN_PHOTOS: Signal[] = [
  { pattern: /\b(using|used|uses|use|took|taking|stole|stolen|copied|copying) my (photo|picture|image|pic)s?\b/, weight: 3 },
  { pattern: /\b(posted|posting|shared|sharing) my (photo|picture|image|pic)s?\b/, weight: 3 },
  { pattern: /\b(photo|picture|image|pic)s? (of me )?as (their|his|her) own\b/, weight: 3 },
  { pattern: /\b(fake|false) (account|profile|page)\b/, weight: 3 },
  { pattern: /\b(pretending to be me|impersonating me|posing as me|catfish)\b/, weight: 3 },
  { pattern: /\bmy (photo|picture|image|face|pic)s? on (their|his|her|a |another )?(account|profile|page)\b/, weight: 3 },
];

const PRESSURE: Signal[] = [
  { pattern: /\b(blackmail|extort)/, weight: 3 },
  { pattern: /\b(nude|naked|intimate)\b/, weight: 3 },
  { pattern: /\bprivate (photo|picture|image|video)s?\b/, weight: 3 },
  { pattern: /\b(threaten|threatening|threatened)\b/, weight: 2 },
  { pattern: /\bharass/, weight: 2 },
  { pattern: /\b(post|share|leak|send) (my |the )?(photo|picture|image|video|pics)s?\b/, weight: 2 },
];

const AI: Signal[] = [
  { pattern: /\b(deepfake|voice clone|ai-generated|fake video|fake voice|fake call)\b/, weight: 3 },
  { pattern: /\b(voice note|voice message)\b/, weight: 2 },
  { pattern: /\b(sounded strange|doesn't sound like|does not sound like|not really (him|her|them))\b/, weight: 2 },
];

const IMMEDIATE: Signal[] = [
  { pattern: /\b(at my door|outside my (house|home)|following me|going to hurt)\b/, weight: 3 },
  { pattern: /\b(hit me|beating me|attacked me|being attacked|kidnap)\b/, weight: 3 },
  { pattern: /\b(has a gun|has a knife|with a gun|with a knife)\b/, weight: 3 },
  { pattern: /\b(rape|sexually assault)/, weight: 3 },
  { pattern: /\bi(?: am|'m) not safe\b/, weight: 3 },
];

const DIGITAL_SUPPORT = ['Digital-safety guidance', 'Scam support', 'Safe referral', 'Counseling'];
const CARE_SUPPORT = ['Counseling', 'Trauma-informed care', 'Safe referral', 'Digital-safety guidance'];

const COUSIN_NOW =
  "Don't open the link. Contact your cousin through a number you already know. Don't provide a password or verification code.";

const GUIDES: Record<SafetyGuideId, Omit<SafetyGuide, 'happening' | 'now'> & { happening: string; now: string }> = {
  phishing: {
    id: 'phishing',
    happening: 'This could be an impersonation or phishing attempt.',
    now: "Don't open the link. Contact them through a number you already know. Don't provide a password or verification code.",
    lessonId: 'phishing',
    lessonCta: '2-minute phishing lesson',
    lessonPrompt: 'Want to learn why?',
    supportIntro:
      'These verified options can help you talk through a suspicious message. Your description is not sent to them, and contact is not live in this demo.',
    supportCategories: DIGITAL_SUPPORT,
    showSos: false,
  },
  verification: {
    id: 'verification',
    happening: 'Someone may be trying to take over your account.',
    now: "Don't share the code. It lets someone else open your account. Close the chat, and turn on two-step verification in WhatsApp if you can.",
    lessonId: 'whatsapp',
    lessonCta: '2-minute WhatsApp lesson',
    lessonPrompt: 'Want to learn why?',
    supportIntro:
      'These verified options can help if someone is trying to enter your account. Your description is not sent to them, and contact is not live in this demo.',
    supportCategories: DIGITAL_SUPPORT,
    showSos: false,
  },
  money: {
    id: 'money',
    happening: 'This could be a scam trying to get money or personal details.',
    now: "Don't send money, fees, or identity documents. Check the request with someone you trust, using a number you already have.",
    lessonId: 'scams',
    lessonCta: '2-minute scams lesson',
    lessonPrompt: 'Want to learn why?',
    supportIntro:
      'These verified options can help you check a money request before you act. Your description is not sent to them, and contact is not live in this demo.',
    supportCategories: DIGITAL_SUPPORT,
    showSos: false,
  },
  pressure: {
    id: 'pressure',
    happening: 'This could be harassment, or pressure using private images or threats.',
    now: "Don't send money or more images. Stop replying if you can, and block the account when that feels safe. You can talk with a verified support option.",
    lessonId: 'pressure',
    lessonCta: '2-minute pressure lesson',
    lessonPrompt: 'Want to learn why?',
    supportIntro:
      'These verified options include counseling and safe referral. Your description is not sent to them, and contact is not live in this demo.',
    supportCategories: CARE_SUPPORT,
    showSos: false,
  },
  photos: {
    id: 'photos',
    happening: 'Someone may be using your photos to pretend they are you, or to pass your pictures off as their own.',
    now: "Don't send more photos. Report the account where you saw it, and tell people who might think that account is you. Save a screenshot only if that feels safe.",
    lessonId: 'stolen-photos',
    lessonCta: '2-minute photo lesson',
    lessonPrompt: 'Want to learn why?',
    supportIntro:
      'These verified options can help if someone is misusing your photos. Your description is not sent to them, and contact is not live in this demo.',
    supportCategories: CARE_SUPPORT,
    showSos: false,
  },
  ai: {
    id: 'ai',
    happening: 'This could be a fake voice, image, or message made to look real.',
    now: "Don't send money or codes because of that message. Confirm it with the person through a number you already know.",
    lessonId: 'ai-safety',
    lessonCta: '2-minute AI safety lesson',
    lessonPrompt: 'Want to learn why?',
    supportIntro:
      'These verified options can help you check a message that may not be real. Your description is not sent to them, and contact is not live in this demo.',
    supportCategories: DIGITAL_SUPPORT,
    showSos: false,
  },
  unclear: {
    id: 'unclear',
    happening: "There isn't enough here to name a specific online risk.",
    now: "Don't open links, share codes, or send money yet. Add what they asked you to do, and who they claimed to be.",
    lessonId: 'scams',
    lessonCta: '2-minute scams lesson',
    lessonPrompt: 'Want a place to start?',
    supportIntro:
      'If you want to talk it through, these verified options are a starting point. Your description is not sent to them, and contact is not live in this demo.',
    supportCategories: DIGITAL_SUPPORT,
    showSos: false,
  },
  english: {
    id: 'english',
    happening: 'This assistant currently answers in English.',
    now: 'Choose English, then describe what happened in English. Include what they asked for and who they claimed to be.',
    lessonId: null,
    lessonCta: null,
    lessonPrompt: null,
    supportIntro:
      'These verified options are available while English answers are the only ones ready. Your description is not sent to them.',
    supportCategories: DIGITAL_SUPPORT,
    showSos: false,
  },
  immediate: {
    id: 'immediate',
    happening: 'This sounds like a present safety concern, not only an online message.',
    now: 'If you are in danger now, go to Home and hold SOS to alert your trusted contacts. This assistant only helps with what happens online.',
    lessonId: null,
    lessonCta: null,
    lessonPrompt: null,
    supportIntro:
      'If you are in danger now, use SOS on Home. These verified options are for follow-up support. Your description is not sent to them.',
    supportCategories: CARE_SUPPORT,
    showSos: true,
  },
};

function score(text: string, signals: Signal[]): number {
  return signals.reduce((total, signal) => (signal.pattern.test(text) ? total + signal.weight : total), 0);
}

function mostlyNotEnglish(text: string): boolean {
  const nonAscii = text.match(/[^\x00-\x7F]/g)?.length ?? 0;
  const asciiLetters = text.match(/[A-Za-z]/g)?.length ?? 0;
  return nonAscii > 8 && asciiLetters < 8;
}

export function assessOnlineSituation(input: string): SafetyGuide {
  const text = input.toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, ' ').trim();

  if (mostlyNotEnglish(text)) {
    return GUIDES.english;
  }

  if (score(text, IMMEDIATE) >= 3) {
    return GUIDES.immediate;
  }

  const ranked: { id: SafetyGuideId; value: number }[] = [
    { id: 'pressure', value: score(text, PRESSURE) },
    { id: 'photos', value: score(text, STOLEN_PHOTOS) },
    { id: 'ai', value: score(text, AI) },
    { id: 'verification', value: score(text, VERIFICATION) },
    { id: 'phishing', value: score(text, PHISHING) },
    { id: 'money', value: score(text, MONEY) },
  ];

  const best = ranked.reduce((lead, item) => (item.value > lead.value ? item : lead));

  if (best.value < 3) {
    return GUIDES.unclear;
  }

  if (best.id === 'phishing' && /\bcousins?\b/.test(text)) {
    return { ...GUIDES.phishing, now: COUSIN_NOW };
  }

  return GUIDES[best.id];
}

export function safetyGuideIntro(id: string | undefined): Pick<SafetyGuide, 'supportIntro' | 'supportCategories'> {
  const guide = GUIDES[id as SafetyGuideId];
  if (!guide) return { supportIntro: GUIDES.unclear.supportIntro, supportCategories: GUIDES.unclear.supportCategories };
  return { supportIntro: guide.supportIntro, supportCategories: guide.supportCategories };
}

export function verifiedSupportFor(guideId: string | undefined): SupportPartner[] {
  const { supportCategories } = safetyGuideIntro(guideId);
  const ranked = DEMO_SUPPORT_PARTNERS.filter((partner) => partner.verified)
    .map((partner, index) => ({
      partner,
      index,
      relevance: partner.categories.filter((category) => supportCategories.includes(category)).length,
    }))
    .sort((a, b) => b.relevance - a.relevance || a.index - b.index);

  const relevant = ranked.filter((item) => item.relevance > 0);
  return (relevant.length > 0 ? relevant : ranked).map((item) => item.partner);
}
