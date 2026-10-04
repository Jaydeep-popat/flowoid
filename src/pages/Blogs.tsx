import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Phone,
  ShieldCheck,
  Check,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
};

interface EssayBlock {
  type: 'paragraph' | 'stat' | 'hard-truth' | 'comparison' | 'heading' | 'checklist';
  text?: string;
  stat?: { value: string; label: string; subtext: string };
  comparison?: {
    leftTitle: string;
    leftItems: string[];
    rightTitle: string;
    rightItems: string[];
  };
  items?: string[];
}

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: 'Custom Software' | 'eCommerce' | 'Websites' | 'Web & Mobile' | 'Tech Economics' | 'Automation';
  readTime: string;
  publishedAt: string;
  teaserStat: { value: string; label: string };
  hook: string;
  preview: string;
  keyTakeaways: string[];
  blocks: EssayBlock[];
}

/* ═════════════════════════════════════════════════════════════════
   THE 5 CURATED ESSAYS — HIGH PSYCHOLOGY, ADDICTIVE & PERSUASIVE
   ═════════════════════════════════════════════════════════════════ */
const blogPosts: BlogPost[] = [
  {
    id: 'the-excel-trap-hidden-business-cost',
    title: 'The "Excel Trap": How Indian Businesses Silently Bleed ₹50,000/Month on Spreadsheets',
    subtitle: 'Why founders mistake "free software" for efficiency, and the exact moment Excel turns into an existential business risk.',
    category: 'Custom Software',
    readTime: '4 min read',
    publishedAt: '2026-06-12',
    teaserStat: { value: '₹6.4L / yr', label: 'Hidden Spreadsheet Bleed' },
    hook: 'If your business relies on 3 separate Excel files and 4 WhatsApp groups to fulfill an order, you don\'t have a workflow—you have an impending catastrophe waiting for someone to quit.',
    preview: 'Every growing business in Gujarat starts on Excel. It feels familiar, flexible, and free. But there is a silent trap: as soon as your order volume multiplies, spreadsheets stop saving you money and quietly begin burning it.',
    keyTakeaways: [
      'The "Free Software" illusion: why Excel is actually your most expensive tool',
      'The 3 breaking points where spreadsheets trigger severe operational failure',
      'How custom software allows a 5-person team to produce the output of 15 people',
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'If your business relies on three separate Excel workbooks, two WhatsApp groups, and someone\'s memory to fulfill a customer order, you do not have an operational workflow.',
      },
      {
        type: 'hard-truth',
        text: 'You have an operational disaster waiting for a single key employee to fall sick, take leave, or quit for a competitor across town.',
      },
      {
        type: 'paragraph',
        text: 'Every growing business in Gujarat starts on spreadsheets. It makes complete sense: Excel is familiar, flexible, and feels entirely free. But there is a silent psychological trap: Excel does not scale with human ambition. The moment your daily order volume crosses 15 transactions, spreadsheets stop saving you money and quietly begin draining your margins.',
      },
      {
        type: 'stat',
        stat: {
          value: '₹6.4 Lakhs',
          label: 'Average Annual Cost of Manual Re-Entry',
          subtext: 'Calculated across an 8-person team spending 2.5 hours every day copying data between sheets, fixing broken VLOOKUPs, and reconciling dispatch mistakes.',
        },
      },
      {
        type: 'heading',
        text: 'The Sunk Cost Fallacy: "We Already Know How to Use It"',
      },
      {
        type: 'paragraph',
        text: 'Founders frequently tell us: "Our team already knows Excel. Why spend capital on custom software?" Here is what they never calculate on their balance sheet: the ₹18,000 lost when an invoice formula accidentally gets overwritten and a client receives an outdated price. The 45 minutes lost every morning waiting for a locked spreadsheet on a shared network drive to open. The catastrophic vulnerability of having your entire customer list living on an unsecured file on someone\'s laptop.',
      },
      {
        type: 'comparison',
        comparison: {
          leftTitle: 'The Spreadsheet Reality (The Broken Way)',
          leftItems: [
            'One accidental keystroke quietly corrupts formulas across 12 sheets',
            'Customer contact records stored unprotected on employee personal devices',
            'Staff spend 3 hours every Friday evening compiling weekly sales reports',
            'Zero audit trail: you never know who changed an order or deleted a row',
          ],
          rightTitle: 'Custom Software Portal (The Flowoid Way)',
          rightItems: [
            'Strict database validation: impossible to submit invalid quantities or rates',
            'Granular role-based security: team members only see what they need to see',
            'Real-time dashboards update the exact second an order closes on the floor',
            'Instant WhatsApp updates triggered automatically to customer and warehouse',
          ],
        },
      },
      {
        type: 'heading',
        text: 'The 3 Warning Signs You Have Crossed the Tipping Point',
      },
      {
        type: 'checklist',
        items: [
          'You have files named "Final_Orders_2026_v4_FINAL_updated.xlsx" circulating in WhatsApp chats.',
          'Your team spends more than 60 minutes a day copying information from one file into another.',
          'A customer calls to ask for their order status, and someone has to yell across the office or put them on hold to check.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Software is not a trophy you buy when your business is already massive. Software is the operational leverage that makes you massive in the first place. When you remove manual friction, your team stops acting like human data routers and starts focusing on customer relationships and revenue growth.',
      },
      {
        type: 'hard-truth',
        text: 'Bottom Line: When spreadsheets start dictating how fast your business can grow, you are no longer managing operations—you are babysitting software that was designed in 1985.',
      },
    ],
  },
  {
    id: 'the-shopify-trap-custom-ecommerce-advantage',
    title: 'The "Shopify Trap": Why Growing Indian Brands Are Ditching Rented Stores for Custom Commerce',
    subtitle: 'How 2% platform cuts, app subscription creep, and locked checkouts quietly devour your margins—and the custom payment architecture that sets you free.',
    category: 'eCommerce',
    readTime: '5 min read',
    publishedAt: '2026-06-14',
    teaserStat: { value: '₹3.2L / yr', label: 'Wasted on Shopify Fees & Apps' },
    hook: 'Shopify makes it ridiculously easy to launch a store on a Friday. By next year, they take a 2% cut of your gross revenue, charge ₹18,000/month for 8 different plugin subscriptions, and refuse to let you touch your own checkout code.',
    preview: 'Renting a template storefront feels cheap on day one. But as your sales grow, Shopify\'s hidden transaction taxes and app bloat eat your margins alive. Learn why high-growth brands switch to custom checkouts with direct, developer-integrated payment gateways.',
    keyTakeaways: [
      'The Hidden Math: How per-transaction fees and monthly app bills quietly siphon away your net profit',
      'The Checkout Wall: Why Shopify\'s locked checkout hurts Indian conversions (UPI intent, COD confirmation)',
      'The Flowoid Solution: Direct developer-integrated payment gateways (Razorpay/Cashfree/UPI) with 0% platform cuts and sub-second speed',
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'Shopify is the ultimate gateway drug of modern eCommerce. For $29 a month, anyone can upload a logo, pick a pastel color scheme, and be live by Friday afternoon. In the beginning, it feels like magic.',
      },
      {
        type: 'hard-truth',
        text: 'What they never advertise on their homepage is that you are not building a business asset—you are leasing a digital retail booth on landlord terms that become increasingly predatory the more successful you become.',
      },
      {
        type: 'paragraph',
        text: 'Here is the silent margin trap: the moment your brand starts doing ₹10 Lakhs to ₹50 Lakhs a month in revenue, Shopify\'s economic model turns aggressively against you. First, they penalize you with an additional transaction cut (up to 2%) if you don\'t use their proprietary payments. Then comes the subscription creep: you need an app for product reviews ($19/mo), an app for custom pincode checking ($15/mo), an app for WhatsApp alerts ($29/mo), an app for COD fraud verification ($49/mo), and an app for custom bundle discounts ($39/mo).',
      },
      {
        type: 'stat',
        stat: {
          value: '₹3.2 Lakhs',
          label: 'Average Annual "Shopify Tax" for a ₹25L/mo Store',
          subtext: 'Calculated from 1.5% platform transaction cuts + $240/month in mandatory third-party app subscriptions + foreign currency exchange markups.',
        },
      },
      {
        type: 'heading',
        text: 'The Payment Gateway Stranglehold in India',
      },
      {
        type: 'paragraph',
        text: 'In India, eCommerce is not fought on international credit cards. It is won or lost on UPI instant intent, zero-friction QR codes, and COD (Cash on Delivery) verification. This is where Shopify completely breaks down: their checkout code is locked behind an enterprise $2,000/month "Shopify Plus" paywall. On standard plans, you cannot modify the checkout step. You cannot trigger a WhatsApp OTP to verify high-risk COD orders. You cannot route payments dynamically between Razorpay and Cashfree when one gateway experiences an outage.',
      },
      {
        type: 'comparison',
        comparison: {
          leftTitle: 'The Shopify Rented Store (The Bottleneck)',
          leftItems: [
            'Shopify takes up to a 2% cut on every single sale your business makes',
            'Locked checkout: zero ability to customize the payment step without paying $2,000/mo',
            '8–12 third-party apps injecting heavy JavaScript, slowing mobile load times to 5+ seconds',
            'Customer data lives inside a closed US ecosystem with recurring subscription risk',
          ],
          rightTitle: 'Custom Full-Stack Commerce (The Flowoid Way)',
          rightItems: [
            '0% platform commission: you keep 100% of your gross sales and margins',
            'Direct developer-integrated payment gateway (Razorpay/Cashfree/PhonePe) built to your rules',
            'Sub-second mobile checkout built with React/Next.js and clean PostgreSQL database',
            '100% source code and customer database ownership with zero recurring app fees',
          ],
        },
      },
      {
        type: 'heading',
        text: 'Why Developer-Integrated Custom Payments Convert 28% Higher',
      },
      {
        type: 'paragraph',
        text: 'When our developers build and integrate your payment gateway directly into your application codebase, you gain unfair operational advantages:',
      },
      {
        type: 'checklist',
        items: [
          'Native One-Tap UPI Intent: Opens Google Pay, PhonePe, or Paytm immediately on the customer\'s phone without redirect hops or external browser windows where drop-offs happen.',
          'Automated COD Fraud Prevention: Sends an instant WhatsApp OTP verification before high-risk orders hit your warehouse packing floor, cutting Return-to-Origin (RTO) shipping losses by up to 40%.',
          'Smart Gateway Fallback: If Gateway A suffers an API delay or bank failure, the checkout seamlessly completes through Gateway B with zero user friction.',
          'Direct Bank Settlements: Funds settle directly into your business current account on your negotiated merchant fee terms without middleman foreign exchange markups.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Furthermore, load speed is direct revenue. A typical Shopify store with 10 third-party apps loads over 3.5 megabytes of bloated JavaScript. On a mobile phone in Surat or Rajkot on 4G, that takes 4 to 6 seconds to become interactive. A custom React store built by Flowoid loads in under 900 milliseconds. Every 1-second improvement in checkout load speed increases completed purchases by 7%.',
      },
      {
        type: 'hard-truth',
        text: 'Bottom Line: Shopify is fine for testing a college dropshipping hobby. But if you are building a serious, high-volume brand in India, renting your core checkout is financial suicide. Owning your custom eCommerce platform gives you higher margins, faster checkouts, and total operational control.',
      },
    ],
  },
  {
    id: 'why-92-percent-business-websites-fail',
    title: 'The Brochure Curse: Why 92% of Business Websites Never Generate a Single Qualified Lead',
    subtitle: 'Why visual beauty is a vanity trap, how corporate jargon paralyzes buyers, and the psychological architecture of websites that actually convert.',
    category: 'Websites',
    readTime: '4 min read',
    publishedAt: '2026-06-10',
    teaserStat: { value: '3.8 Seconds', label: 'The Brutal Decision Window' },
    hook: 'You paid ₹30,000 for a website that looks like a corporate brochure. Visitors land, stare at generic stock photos of people in suits shaking hands, feel zero emotion, and leave in 4 seconds.',
    preview: 'Most business websites fail because they are designed to stroke the owner\'s ego rather than solve the customer\'s urgent anxiety. Learn the F/Z reading patterns and frictionless micro-copy that turn casual visitors into paying clients.',
    keyTakeaways: [
      'The 3.8-second rule: the exact cognitive window before a visitor bounces',
      'The "Me, Myself & I" fallacy: why talking about your passion repels buyers',
      'The single dominant action framework that doubles customer WhatsApp inquiries',
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'Most business owners make the exact same expensive mistake: they build a website to impress their competitors instead of converting their prospective customers.',
      },
      {
        type: 'paragraph',
        text: 'They pay an agency ₹30,000. The agency delivers a generic template filled with stock photos of smiling Caucasian models in business suits, a moving carousel that nobody reads, and a headline that says: "Welcome to XYZ Enterprises — Delivering Excellence in Innovation Since 2011."',
      },
      {
        type: 'hard-truth',
        text: 'Nobody cares about your "passion for excellence." A customer lands on your website with one urgent question: "Can these people solve my specific headache right now, and can I trust them?" If you do not answer both in 4 seconds, they hit back.',
      },
      {
        type: 'stat',
        stat: {
          value: '3.8 Seconds',
          label: 'The Critical Evaluation Window',
          subtext: 'According to eye-tracking heatmaps, visitors scan the headline, look for one concrete proof metric, and bounce if they encounter cognitive friction or vague claims.',
        },
      },
      {
        type: 'heading',
        text: 'The Psychology of the F/Z Reading Pattern',
      },
      {
        type: 'paragraph',
        text: 'Human beings on the web do not read every sentence; they scan in an F or Z trajectory. Their eyes land on the top headline, sweep across the proof metric, and immediately look for a single, low-friction action. When you present five competing buttons ("Download Brochure", "Call Us", "Email", "Follow on Instagram", "Read Our Mission"), you trigger decision paralysis. The visitor clicks nothing and exits.',
      },
      {
        type: 'comparison',
        comparison: {
          leftTitle: 'The 92% Brochure Website (Failure)',
          leftItems: [
            'Generic headline: "Leading Provider of Modern Solutions"',
            'Stock photos downloaded from free image websites',
            '5 competing calls to action that overwhelm visitors',
            'Heavy WordPress theme loading in 6+ seconds on mobile 4G',
          ],
          rightTitle: 'The High-Converting Asset (The Flowoid Way)',
          rightItems: [
            'Outcome headline: "We Install Commercial Solar in 7 Days"',
            'Real, unretouched photos of actual delivered projects',
            'One dominant action: "Get Instant WhatsApp Estimate"',
            'Sub-second load speed on every mobile device across Gujarat',
          ],
        },
      },
      {
        type: 'heading',
        text: 'The Single Rule: Friction Destroys Conversion',
      },
      {
        type: 'paragraph',
        text: 'Every single extra field you place on an inquiry form cuts your conversion rate by 20%. If you ask for company turnover, designation, and address before even speaking with the customer, you are asking for marriage on the first date. Keep the first touchpoint effortless: a single tap to WhatsApp or a direct phone call.',
      },
      {
        type: 'hard-truth',
        text: 'Bottom Line: A website is not an art gallery. It is an automated 24/7 sales representative. If it doesn\'t make a prospective customer pick up the phone, its visual beauty is completely irrelevant.',
      },
    ],
  },
  {
    id: 'the-app-store-delusion-web-vs-native',
    title: 'The App Store Delusion: Why You Almost Certainly Don\'t Need a Mobile App (Yet)',
    subtitle: 'The expensive vanity trap of native mobile apps, and why 90% of business founders should launch a responsive web portal first.',
    category: 'Web & Mobile',
    readTime: '5 min read',
    publishedAt: '2026-06-08',
    teaserStat: { value: '77% Drop', label: 'App Install Friction' },
    hook: 'Every founder wants to announce: "We have an app on Google Play." It feels prestigious. But spending ₹4 Lakhs on a native app before validating your customer loop on the web is the fastest way to burn your capital.',
    preview: 'Before a user can use your mobile app, they have to search for it, clear phone storage, download 45 megabytes, and grant permissions. Learn why progressive web applications capture 3x more users at half the build cost.',
    keyTakeaways: [
      'The 77% drop-off: how app store friction kills user acquisition before it starts',
      'The ongoing maintenance nightmare: Android vs iOS updates and app store fees',
      'The 3 legitimate reasons to build an app—and why 90% of businesses don\'t meet them',
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'There is a pervasive prestige bias in modern business: founders love saying, "We have an app on the App Store." It feels sophisticated. It feels like a real tech company.',
      },
      {
        type: 'hard-truth',
        text: 'What tech agencies never tell you is that building a native mobile app is often a ₹4 Lakh graveyard for features nobody asked for.',
      },
      {
        type: 'paragraph',
        text: 'Think about user behavior from your customer\'s perspective. Before someone can use your mobile app, they have to: search for it, check if their phone has enough storage space, download 45 megabytes over mobile data, accept camera and location permissions, wait for an OTP SMS, and create an account. That is six friction hurdles before they see a single product.',
      },
      {
        type: 'stat',
        stat: {
          value: '77% Abandonment',
          label: 'App Store Friction Drop-Off',
          subtext: 'More than three-quarters of potential users abandon an app download before ever opening it, compared to zero download friction on a responsive web link.',
        },
      },
      {
        type: 'heading',
        text: 'The Power of the Responsive Web Application',
      },
      {
        type: 'paragraph',
        text: 'A modern responsive web app built with React or Next.js looks, feels, and navigates like a mobile app. But it opens in half a second from a simple WhatsApp link, QR code, or Google search. No Google Play approval delays. No 30% App Store commission fees. No forcing your customer to delete family photos just to browse your catalog.',
      },
      {
        type: 'heading',
        text: 'The Litmus Test: When DO You Genuinely Need an App?',
      },
      {
        type: 'checklist',
        items: [
          'Your staff needs full offline capability deep inside warehouses or rural fields with zero internet connectivity.',
          'You require background hardware hooks like continuous GPS tracking for logistics delivery drivers.',
          'Your end-users interact with the platform multiple times every single day (like a food delivery driver or warehouse barcode scanner).',
        ],
      },
      {
        type: 'paragraph',
        text: 'If your answer to all three questions is "No", you do not need an app store application. You need a lightning-fast responsive web application that costs half as much, reaches three times as many users, and can be deployed in three weeks instead of six months.',
      },
      {
        type: 'hard-truth',
        text: 'Bottom Line: Validate your customer loop on the open web first. Once your users are screaming for daily push notifications and offline access, expand into native mobile with proven demand and zero financial risk.',
      },
    ],
  },
  {
    id: 'real-custom-software-cost-india-breakdown',
    title: 'The Brutally Honest Cost of Custom Software in India (What Agencies Never Tell You)',
    subtitle: 'Why agency quotes swing from ₹25,000 to ₹15,00,000, how to spot the "cheap template trap", and how to protect yourself from vendor hostage situations.',
    category: 'Tech Economics',
    readTime: '5 min read',
    publishedAt: '2026-06-05',
    teaserStat: { value: '80% Scrapped', label: 'Bargain Software Failure' },
    hook: 'Why does Agency A quote ₹25,000 while Agency B quotes ₹12,00,000 for the exact same project brief? Someone is lying to you. Here is the exact cost equation agencies never want non-technical founders to calculate.',
    preview: 'Demystifying software pricing in India. Learn the 3 real pricing tiers, the hidden cost traps that blow up budgets, and the single question you must ask to guarantee you own your source code 100%.',
    keyTakeaways: [
      'The "Cheap Template Trap": why ₹20,000 software gets thrown in the trash within a year',
      'The 3 honest pricing tiers for Indian businesses in 2026',
      'The Intellectual Property clause that prevents agencies from holding your database hostage',
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'If you request proposals for custom business software from five different agencies in India, you will receive quotes ranging from ₹30,000 to ₹15,00,000. It feels like buying a vehicle where one dealership quotes ₹50,000 and another quotes ₹35 Lakhs for what claims to be the exact same car.',
      },
      {
        type: 'hard-truth',
        text: 'Someone is either lying about what is included, or cutting technical corners that will blow up in your face three months after deployment.',
      },
      {
        type: 'paragraph',
        text: 'Here is what actually happens in the "₹25,000 Trap": A freelancer buys an outdated PHP template off Envato for $19, modifies the logo, and hands it over. As soon as your business requests a custom invoice format or an automated WhatsApp trigger, they stop answering your phone calls. Because they did not write the underlying architecture, they cannot modify it.',
      },
      {
        type: 'stat',
        stat: {
          value: '80% Scrapped',
          label: 'Template Software Rewrite Rate',
          subtext: '8 out of 10 businesses that hire bargain freelancers end up completely abandoning the code and rebuilding from scratch within 12 months.',
        },
      },
      {
        type: 'heading',
        text: 'The Real Pricing Benchmarks for 2026',
      },
      {
        type: 'comparison',
        comparison: {
          leftTitle: 'Project Scope & Complexity',
          leftItems: [
            'Tier 1: Single Workflow Tool (Quotation maker, lead tracker, inventory ledger)',
            'Tier 2: Multi-Role Business Portal (Customer/staff login, automated invoicing, WhatsApp)',
            'Tier 3: Enterprise Operations (Manufacturing ERP, multi-warehouse sync, accounting bridge)',
          ],
          rightTitle: 'Honest Indian Rupee Range',
          rightItems: [
            '₹50,000 to ₹1,80,000 (Delivery: 3 to 5 weeks)',
            '₹2,00,000 to ₹5,50,000 (Delivery: 6 to 10 weeks)',
            '₹6,00,000 to ₹15,00,000+ (Delivery: 3 to 6 months)',
          ],
        },
      },
      {
        type: 'heading',
        text: 'The Single Question That Protects Your Company',
      },
      {
        type: 'paragraph',
        text: 'Before signing a contract or paying a single rupee of advance, ask the developer this exact question: "Will our company receive 100% intellectual property ownership, the raw Git source code repository, and direct administrative database credentials upon final payment?"',
      },
      {
        type: 'hard-truth',
        text: 'If the agency hesitates, mentions "proprietary internal platforms", or charges a monthly license fee to access your own data, walk away immediately. At Flowoid, every line of code we write belongs entirely to you from day one.',
      },
    ],
  },
  {
    id: 'the-zero-admin-office-practical-automation',
    title: 'The "Zero-Admin" Office: How to Reclaim 18 Hours/Week Without Artificial Intelligence Hype',
    subtitle: 'Forget sci-fi chatbots. How real Gujarat businesses connect simple webhooks, WhatsApp APIs, and relational databases to eliminate repetitive paperwork forever.',
    category: 'Automation',
    readTime: '4 min read',
    publishedAt: '2026-06-01',
    teaserStat: { value: '18.5 hrs', label: 'Reclaimed Weekly Time' },
    hook: 'You don\'t need complex neural networks or sci-fi bots. You need three simple, bulletproof connections: a web inquiry form, an instant WhatsApp confirmation alert, and an automated database ledger.',
    preview: 'Entering an order into Tally. Typing a WhatsApp message to confirm dispatch. Calling the warehouse to check stock. How to crush a 15-minute manual loop down to 1.2 seconds of automated execution.',
    keyTakeaways: [
      'The 15-minute nightmare vs the 1.2-second reality: real operational teardown',
      'The single-loop rule: start with one high-friction bottleneck before automating everything',
      'How to connect official WhatsApp APIs without risking account bans',
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'The internet is completely obsessed with artificial intelligence bots that write poetry or generate pictures of astronauts riding horses. Meanwhile, actual business owners in Rajkot and Gujarat are drowning in something far more mundane: repetitive paperwork.',
      },
      {
        type: 'paragraph',
        text: 'Entering an order into an accounting ledger. Typing a WhatsApp message to confirm dispatch. Calling the warehouse to ask if stock arrived. Manually creating PDF quotations one by one on a desktop computer.',
      },
      {
        type: 'hard-truth',
        text: 'You do not need a machine learning algorithm to fix this. You need three simple, rock-solid engineering pipes that never take a day off.',
      },
      {
        type: 'stat',
        stat: {
          value: '18.5 Hours',
          label: 'Reclaimed Every Single Week',
          subtext: 'Documented time savings for a Rajkot industrial equipment distributor after automating quotation PDF generation and instant WhatsApp dispatch notifications.',
        },
      },
      {
        type: 'heading',
        text: 'The 15-Minute Nightmare vs The 1.2-Second Reality',
      },
      {
        type: 'comparison',
        comparison: {
          leftTitle: 'The Old Manual Loop (15 mins/order)',
          leftItems: [
            '1. Lead comes in via email or website contact form',
            '2. Admin copies phone number into personal smartphone contact list',
            '3. Manually types quotation in Word, saves as PDF',
            '4. Sends WhatsApp message manually, logs row in Excel sheet',
          ],
          rightTitle: 'The Automated Loop (1.2 secs/order)',
          rightItems: [
            '1. Customer submits requirement on interactive web form',
            '2. Database calculates rates and generates branded PDF immediately',
            '3. Official WhatsApp API delivers quotation reference in 1.2 seconds',
            '4. Sales executive dashboard updates in real time with zero manual clicks',
          ],
        },
      },
      {
        type: 'heading',
        text: 'The One-Loop Rule: Start Where It Hurts Most',
      },
      {
        type: 'paragraph',
        text: 'Do not attempt to digitize your entire business in a single weekend. Pick your single most painful administrative bottleneck: for most businesses, that is dispatch notifications or quotation generation. Automate that first. Feel the immediate relief of having 10 to 15 hours handed back to your week. Then expand to your next workflow.',
      },
      {
        type: 'hard-truth',
        text: 'Bottom Line: The highest-return investment a business can make in 2026 is not more advertising. It is automating operations so you can fulfill 3x more orders without your team burning out.',
      },
    ],
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function Blogs() {
  useScrollReveal();

  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);

  const activeBlog =
    blogPosts.find((post: BlogPost) => post.id === activeBlogId) ?? null;

  // Other 4 essays to recommend when reading
  const otherEssays = blogPosts.filter((p) => p.id !== activeBlogId);

  const openBlog = (id: string) => {
    setActiveBlogId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeBlog = () => {
    setActiveBlogId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>
          {activeBlog
            ? `${activeBlog.title} | Flowoid Field Notes`
            : 'The Flowoid Field Notes | Provocative Essays on Software & Business'}
        </title>
        <meta
          name="description"
          content={
            activeBlog
              ? activeBlog.preview
              : 'Five battle-tested essays on custom software, website conversion, real development costs in India, and practical business automation. No fluff.'
          }
        />
      </Helmet>

      <Navbar />

      {/* ══ HERO SECTION ══ */}
      <div className="relative min-h-[48vh] bg-page-dots flex items-center px-[5%] pt-8 md:pt-16 pb-20 md:pb-24 mt-[80px] md:mt-[86px] overflow-hidden border-b border-border/60">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)',
            backgroundSize: '36px 36px',
            maskImage:
              'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)',
          }}
        />
        <div
          className="absolute right-[-100px] top-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)',
            filter: 'blur(55px)',
          }}
        />
        <div
          className="absolute left-[-60px] bottom-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle,rgba(201,168,76,.06),transparent 70%)',
            filter: 'blur(45px)',
          }}
        />

        <div className="relative z-[2] max-w-[1240px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 xl:gap-20 items-center">
            {/* Left Column */}
            <motion.div initial="hidden" animate="visible" variants={container}>
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 text-[.72rem] font-semibold text-muted tracking-[.08em] uppercase mb-5"
              >
                <Link to="/" className="text-muted no-underline hover:text-dark">
                  Home
                </Link>
                <span className="opacity-40">/</span>
                <span className="text-gold">Field Notes</span>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.72rem] font-bold text-b3 tracking-[.1em] uppercase mb-5"
              >
                <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,.5)]" />
                The Flowoid Field Notes · Rajkot, Gujarat
              </motion.div>

              <h1 className="font-heading font-black text-[clamp(2.15rem,4.2vw,3.6rem)] leading-[1.08] tracking-[-0.032em] text-dark mb-5">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: '110%', opacity: 0 },
                      visible: { y: '0%', opacity: 1, transition: { duration: 0.6, ease } },
                    }}
                  >
                    Unvarnished truths on software,
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: '110%', opacity: 0 },
                      visible: {
                        y: '0%',
                        opacity: 1,
                        transition: { duration: 0.6, ease, delay: 0.08 },
                      },
                    }}
                  >
                    pricing & <span className="grad-text">business leverage.</span>
                  </motion.span>
                </span>
              </h1>

              <motion.p
                variants={fadeUp}
                className="text-[1.02rem] leading-[1.78] text-body max-w-[560px] mb-8"
              >
                Zero buzzwords. Zero corporate press releases. Six battle-tested
                essays on what actually works, what costs money, and how to stop
                wasting capital on bad technology.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-6 text-[.82rem] text-muted font-medium"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles size={15} className="text-gold" />
                  <span>6 Essential Essays</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={15} className="text-gold" />
                  <span>4–5 Min Reads</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-[#10B981]" />
                  <span>100% Real Numbers</span>
                </span>
              </motion.div>
            </motion.div>

            {/* Right Column: The 3 Core Commitments */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="bg-white border border-border rounded-2xl p-6 sm:p-7 shadow-sm relative overflow-hidden"
            >
              <div className="inline-flex items-center gap-2 text-[.7rem] font-bold text-gold tracking-widest uppercase mb-4">
                <TrendingUp size={14} />
                <span>Our Editorial Stance</span>
              </div>
              <h3 className="font-heading font-extrabold text-[1.2rem] text-dark leading-tight mb-4">
                Why Read These 6 Essays?
              </h3>

              <div className="space-y-4 text-[.9rem] leading-[1.65]">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-pale flex items-center justify-center text-gold font-bold text-xs mt-0.5 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-[.92rem]">
                      No Theory, Only Production
                    </h4>
                    <p className="text-muted text-[.85rem]">
                      Every figure and case study is pulled directly from systems
                      we built for Gujarat businesses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-pale flex items-center justify-center text-gold font-bold text-xs mt-0.5 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-[.92rem]">
                      Radical Financial Honesty
                    </h4>
                    <p className="text-muted text-[.85rem]">
                      We break down real software costs in rupees and call out
                      the agency traps that burn budgets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-pale flex items-center justify-center text-gold font-bold text-xs mt-0.5 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-[.92rem]">
                      Maximum Reading Leverage
                    </h4>
                    <p className="text-muted text-[.85rem]">
                      Compact, addictive writing designed to save you lakhs
                      before you write a single line of code.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ MAIN BODY ══ */}
      <main className="bg-page min-h-[60vh] py-16 md:py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <AnimatePresence mode="wait">
            {activeBlog ? (
              /* ─── SINGLE ESSAY DEEP-DIVE READER VIEW ─── */
              <motion.div
                key="reader"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease }}
                className="max-w-[840px] mx-auto"
              >
                {/* Back Button */}
                <button
                  onClick={closeBlog}
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 rounded-full border border-border bg-white text-[.85rem] font-bold text-dark hover:border-b4 hover:text-b4 hover:shadow-xs transition-all duration-200 mb-8 cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>Back to all essays</span>
                </button>

                <article className="bg-white rounded-3xl border border-border p-7 sm:p-12 shadow-sm">
                  {/* Category & Metadata */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="px-3.5 py-1 rounded-full bg-pale border border-[rgba(45,43,107,.14)] text-[.74rem] font-bold text-b4 uppercase tracking-wider">
                      {activeBlog.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-[.82rem] text-muted font-medium">
                      <Clock size={14} className="text-gold" />
                      <span>{activeBlog.readTime}</span>
                    </span>
                    <span className="text-muted/40">·</span>
                    <span className="flex items-center gap-1.5 text-[.82rem] text-muted font-medium">
                      <CalendarDays size={14} className="text-muted" />
                      <span>{formatDate(activeBlog.publishedAt)}</span>
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h1 className="font-heading font-black text-[clamp(1.9rem,3.8vw,3.1rem)] leading-[1.14] text-dark tracking-[-0.025em] mb-4">
                    {activeBlog.title}
                  </h1>

                  <p className="text-[1.08rem] leading-[1.7] text-muted font-medium mb-7">
                    {activeBlog.subtitle}
                  </p>

                  {/* Author Byline */}
                  <div className="flex items-center gap-3.5 pb-8 mb-8 border-b border-border/80">
                    <div className="w-10 h-10 rounded-full bg-gm text-gold font-bold text-sm flex items-center justify-center shadow-xs">
                      FL
                    </div>
                    <div>
                      <div className="text-[.9rem] font-bold text-dark">
                        Flowoid Engineering Team
                      </div>
                      <div className="text-[.78rem] text-muted">
                        Software & Web Studio · Rajkot, Gujarat
                      </div>
                    </div>
                  </div>

                  {/* Key Takeaways Box */}
                  <div className="mb-10 p-6 rounded-2xl bg-pale/60 border border-border">
                    <div className="flex items-center gap-2 text-xs font-bold text-b4 tracking-widest uppercase mb-3">
                      <CheckCircle2 size={15} className="text-gold" />
                      <span>What you will discover in this essay</span>
                    </div>
                    <ul className="space-y-2.5">
                      {activeBlog.keyTakeaways.map((takeaway, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-[.94rem] text-body leading-relaxed font-medium"
                        >
                          <span className="text-gold font-bold mt-0.5">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Rich Rendered Essay Content Blocks */}
                  <div className="essay-blocks space-y-6">
                    {activeBlog.blocks.map((block, idx) => {
                      if (block.type === 'paragraph') {
                        return (
                          <p
                            key={idx}
                            className="text-[1.04rem] leading-[1.85] text-body max-w-[70ch]"
                          >
                            {block.text}
                          </p>
                        );
                      }

                      if (block.type === 'hard-truth') {
                        return (
                          <div
                            key={idx}
                            className="my-7 p-6 rounded-2xl bg-[#FFFDF4] border-l-4 border-gold border-t border-r border-b border-gold/30 shadow-xs relative overflow-hidden"
                          >
                            <div className="flex items-center gap-2 text-[.74rem] font-black text-gold tracking-widest uppercase mb-2">
                              <AlertCircle size={15} />
                              <span>THE UNVARNISHED TRUTH</span>
                            </div>
                            <p className="text-[1.04rem] font-semibold text-dark leading-[1.78]">
                              {block.text}
                            </p>
                          </div>
                        );
                      }

                      if (block.type === 'stat' && block.stat) {
                        return (
                          <div
                            key={idx}
                            className="my-8 p-7 rounded-2xl bg-gm text-white relative overflow-hidden shadow-md"
                          >
                            <div
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                backgroundImage:
                                  'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)',
                                backgroundSize: '24px 24px',
                              }}
                            />
                            <div className="relative z-[2]">
                              <div className="text-gold font-heading font-black text-4xl sm:text-5xl tracking-tight mb-2">
                                {block.stat.value}
                              </div>
                              <div className="font-heading font-bold text-white text-lg mb-2">
                                {block.stat.label}
                              </div>
                              <p className="text-white/75 text-[.92rem] leading-relaxed max-w-[620px]">
                                {block.stat.subtext}
                              </p>
                            </div>
                          </div>
                        );
                      }

                      if (block.type === 'heading') {
                        return (
                          <h3
                            key={idx}
                            className="font-heading font-black text-2xl sm:text-[1.75rem] text-dark leading-tight pt-6 pb-2 border-t border-border/80"
                          >
                            {block.text}
                          </h3>
                        );
                      }

                      if (block.type === 'comparison' && block.comparison) {
                        return (
                          <div
                            key={idx}
                            className="my-8 grid grid-cols-1 md:grid-cols-2 gap-5"
                          >
                            {/* Left: The Old Way */}
                            <div className="p-6 rounded-2xl bg-[#FFF5F5] border border-red-200">
                              <h4 className="font-heading font-extrabold text-red-900 text-sm tracking-wide uppercase mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                {block.comparison.leftTitle}
                              </h4>
                              <ul className="space-y-3">
                                {block.comparison.leftItems.map((item, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2.5 text-[.88rem] text-red-950/80 leading-relaxed"
                                  >
                                    <span className="text-red-500 font-bold mt-0.5">
                                      ✕
                                    </span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Right: The High-Leverage Way */}
                            <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-emerald-200">
                              <h4 className="font-heading font-extrabold text-emerald-900 text-sm tracking-wide uppercase mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                {block.comparison.rightTitle}
                              </h4>
                              <ul className="space-y-3">
                                {block.comparison.rightItems.map((item, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2.5 text-[.88rem] text-emerald-950/85 leading-relaxed font-medium"
                                  >
                                    <Check
                                      size={15}
                                      className="text-emerald-600 flex-shrink-0 mt-1"
                                      strokeWidth={2.5}
                                    />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        );
                      }

                      if (block.type === 'checklist' && block.items) {
                        return (
                          <div
                            key={idx}
                            className="my-6 p-6 rounded-2xl bg-pale/50 border border-border space-y-3"
                          >
                            {block.items.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-3 text-[.96rem] text-body leading-relaxed font-medium"
                              >
                                <span className="w-6 h-6 rounded-full bg-gold/15 text-gold font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {i + 1}
                                </span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>

                  {/* Consultation Box at End of Essay */}
                  <div className="mt-14 pt-10 border-t border-border/80">
                    <div className="p-7 sm:p-9 rounded-2xl bg-gm text-white relative overflow-hidden shadow-lg">
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)',
                          backgroundSize: '24px 24px',
                        }}
                      />
                      <div
                        className="absolute pointer-events-none rounded-full"
                        style={{
                          width: 320,
                          height: 320,
                          top: -100,
                          right: -80,
                          background:
                            'radial-gradient(circle,rgba(201,168,76,.2),transparent 70%)',
                          filter: 'blur(30px)',
                        }}
                      />

                      <div className="relative z-[2]">
                        <span className="inline-block text-[.72rem] font-bold text-gold tracking-widest uppercase mb-2">
                          EXPERIENCING THIS IN YOUR BUSINESS?
                        </span>
                        <h3 className="font-heading font-extrabold text-[1.45rem] sm:text-[1.7rem] text-white leading-tight mb-3">
                          Talk directly with the senior engineers who wrote this.
                        </h3>
                        <p className="text-white/75 text-[.95rem] leading-[1.75] max-w-[560px] mb-7">
                          We will audit your current website, spreadsheet
                          bottleneck, or software vision for free. No sales pitch,
                          no junior account managers—just senior engineers in
                          Rajkot giving you honest technical numbers.
                        </p>

                        <div className="flex items-center gap-3.5 flex-wrap">
                          <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full text-[.88rem] font-bold text-white bg-mg shadow-md hover:-translate-y-0.5 transition-all duration-200"
                          >
                            <span>Book a Free 20-Min Review</span>
                            <ArrowRight size={15} />
                          </Link>
                          <a
                            href="tel:+919924855931"
                            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full text-[.88rem] font-semibold text-white/90 border border-white/25 hover:bg-white/10 transition-colors"
                          >
                            <Phone size={14} className="text-gold" />
                            <span>Call +91 99248 55931</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Read Next Other Essays */}
                  <div className="mt-14 pt-8 border-t border-border/80">
                    <h3 className="font-heading font-bold text-dark text-xl mb-6">
                      Read Another Field Note
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {otherEssays.slice(0, 2).map((rel) => (
                        <div
                          key={rel.id}
                          onClick={() => openBlog(rel.id)}
                          className="p-6 rounded-2xl border border-border bg-page hover:bg-white hover:border-b4/40 hover:shadow-md transition-all duration-250 cursor-pointer group flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between text-[.72rem] font-bold text-muted mb-2">
                              <span className="text-b4 uppercase">
                                {rel.category}
                              </span>
                              <span>{rel.readTime}</span>
                            </div>
                            <h4 className="font-heading font-bold text-dark text-[1.08rem] leading-snug group-hover:text-b4 transition-colors mb-2">
                              {rel.title}
                            </h4>
                            <p className="text-[.85rem] text-body line-clamp-2 leading-relaxed">
                              {rel.hook}
                            </p>
                          </div>
                          <div className="pt-4 flex items-center gap-1.5 text-[.8rem] font-bold text-b4 group-hover:translate-x-1 transition-transform">
                            <span>Read essay</span>
                            <ArrowRight size={13} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </motion.div>
            ) : (
              /* ─── DIRECTORY VIEW: THE 5 ESSAYS ─── */
              <motion.div
                key="directory"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {/* ══ ASYMMETRIC FEATURED ESSAY (#1) ══ */}
                <div className="mb-14">
                  <div
                    onClick={() => openBlog(blogPosts[0].id)}
                    className="group rounded-3xl border border-border bg-white p-7 sm:p-10 shadow-sm hover:shadow-xl hover:border-b4/50 transition-all duration-300 cursor-pointer relative overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pale border border-[rgba(45,43,107,.14)] text-[.72rem] font-bold text-b4 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                            Must-Read Editorial
                          </span>
                          <span className="text-[.78rem] text-muted font-medium">
                            {blogPosts[0].readTime}
                          </span>
                          <span className="text-muted/40">·</span>
                          <span className="text-[.78rem] text-muted font-medium">
                            {formatDate(blogPosts[0].publishedAt)}
                          </span>
                        </div>

                        <h2 className="font-heading font-black text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.2] text-dark group-hover:text-b4 transition-colors mb-4">
                          {blogPosts[0].title}
                        </h2>

                        <p className="text-[1.02rem] text-body leading-[1.78] mb-7 max-w-[620px]">
                          {blogPosts[0].hook}
                        </p>

                        <div className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full text-[.88rem] font-bold text-white bg-mg shadow-[0_6px_18px_rgba(20,16,58,.22)] group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_24px_rgba(20,16,58,.3)] transition-all duration-200">
                          <span>Read Complete Essay</span>
                          <ArrowRight
                            size={15}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>

                      {/* Right column: Big Stat & Takeaways */}
                      <div className="bg-pale/60 rounded-2xl p-6 sm:p-7 border border-border/80">
                        <div className="mb-4 pb-4 border-b border-border/80">
                          <div className="text-gold font-heading font-black text-3xl sm:text-4xl">
                            {blogPosts[0].teaserStat.value}
                          </div>
                          <div className="text-dark font-bold text-sm">
                            {blogPosts[0].teaserStat.label}
                          </div>
                        </div>

                        <div className="text-[.72rem] font-bold text-b4 tracking-widest uppercase mb-3">
                          IN THIS ESSAY:
                        </div>
                        <ul className="space-y-2.5">
                          {blogPosts[0].keyTakeaways.map((point, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-[.86rem] text-body leading-relaxed font-medium"
                            >
                              <CheckCircle2
                                size={15}
                                className="text-gold flex-shrink-0 mt-0.5"
                              />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ══ THE REMAINING 5 ESSAYS ══ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  {blogPosts.slice(1).map((post: BlogPost, index: number) => (
                    <article
                      key={post.id}
                      onClick={() => openBlog(post.id)}
                      className={`group bg-white rounded-2xl border border-border p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-b4/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                        index === 4 ? 'md:col-span-2' : ''
                      }`}
                    >
                      <div>
                        {/* Header: Category + Teaser Stat */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="px-3 py-0.5 rounded-full bg-pale border border-[rgba(45,43,107,.1)] text-[.72rem] font-bold text-b4 uppercase tracking-wider">
                            {post.category}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-gold/10 text-dark font-bold text-xs">
                            {post.teaserStat.value}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-heading text-[1.25rem] sm:text-[1.35rem] font-black text-dark leading-[1.3] group-hover:text-b4 transition-colors mb-3">
                          {post.title}
                        </h2>

                        {/* Hook */}
                        <p className="text-[.94rem] text-body leading-[1.74] mb-6">
                          {post.hook}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="pt-5 border-t border-border/60 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[.78rem] text-muted font-medium">
                          <Clock size={13} className="text-gold" />
                          <span>{post.readTime}</span>
                        </div>

                        <span className="inline-flex items-center gap-1.5 text-[.84rem] font-bold text-b4 group-hover:text-dark group-hover:translate-x-1 transition-all">
                          <span>Read Essay</span>
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ══ CLOSING ROADMAP CTA ══ */}
      <div className="bg-page px-[5%] py-28 md:py-32 border-t border-border/40">
        <motion.div
          className="max-w-[1240px] mx-auto bg-gm rounded-[32px] px-6 sm:px-14 py-16 sm:py-20 text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scaleIn}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 640,
              height: 640,
              top: -220,
              right: -160,
              background:
                'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)',
              filter: 'blur(24px)',
            }}
          />

          <div className="inline-flex items-center gap-2 text-[.72rem] font-bold text-gold tracking-[.14em] uppercase mb-4 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
            FIRST STEP
          </div>
          <h2 className="relative z-[2] font-heading text-[clamp(1.9rem,3.4vw,3rem)] font-extrabold text-white leading-[1.14] tracking-[-0.025em] mb-4 max-w-[780px] mx-auto">
            Get a free 20-minute technical roadmap. No Commitment-Just discovery, no invoice.
          </h2>
          <p className="relative z-[2] text-white/75 text-[1.02rem] leading-[1.78] max-w-[620px] mx-auto mb-9">
            Bring us your current website, spreadsheet dilemma, or new software
            vision. We will review what technology fits best, give you a
            realistic timeline, and outline an honest budget estimate.
          </p>

          <div className="relative z-[2] flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 py-3.5 rounded-full text-[.92rem] font-bold text-white bg-mg shadow-[0_10px_30px_rgba(20,16,58,.36)] relative overflow-hidden transition-all duration-[280ms] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(20,16,58,.48)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.22),transparent_55%)] before:pointer-events-none"
            >
              <span>Book Your Free 20-Minute Review →</span>
            </Link>
            <a
              href="tel:+919924855931"
              className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 py-3.5 rounded-full text-[.92rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55"
            >
              <Phone size={15} className="text-gold" />
              <span>Call +91 99248 55931</span>
            </a>
          </div>

          <div className="relative z-[2] mt-7 flex flex-wrap items-center justify-center gap-3 text-[.82rem] text-white/60 font-medium">
            <span>✓ Zero sales pressure</span>
            <span>·</span>
            <span>✓ Direct discussion with a senior engineer</span>
            <span>·</span>
            <span>✓ Technical roadmap is yours to keep</span>
          </div>
        </motion.div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
