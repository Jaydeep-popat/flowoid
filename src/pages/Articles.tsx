import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Check,
  Search,
  BookOpen,
  Share2,
  Copy,
  Sparkles,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

const ease = [0.16, 1, 0.3, 1] as const;

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

export interface Article {
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
   THE 6 CURATED EDUCATIONAL ARTICLES — PRACTICAL & SAMAJ SEVA
   ═════════════════════════════════════════════════════════════════ */
export const articles: Article[] = [
  {
    id: 'the-excel-trap-hidden-business-cost',
    title: 'The "Excel Trap": When Spreadsheets Turn from Helpful Tool into an Operational Risk',
    subtitle: 'Why growing businesses face data corruption, version confusion, and manual bottlenecks on spreadsheets—and how structured database systems solve it.',
    category: 'Custom Software',
    readTime: '4 min read',
    publishedAt: '2026-06-12',
    teaserStat: { value: '₹6.4L / yr', label: 'Hidden Manual Labor Bleed' },
    hook: 'If your business relies on 3 separate Excel files and 4 WhatsApp groups to fulfill an order, you don\'t have a workflow—you have an operational risk waiting for a single accidental edit or unexpected absence.',
    preview: 'Every growing business starts on Excel. It feels familiar, flexible, and free. But there is a silent tipping point: as soon as order volumes multiply, spreadsheets stop saving time and quietly begin consuming team hours in manual data entry and error reconciliation.',
    keyTakeaways: [
      'The "Free Tool" illusion: Calculating the hidden labor cost of manual copy-pasting',
      'The 3 critical failure points of spreadsheet-dependent business operations',
      'How structured relational databases allow a lean team to manage 3× the transaction volume',
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'Every growing business starts on spreadsheets. It makes complete sense: Excel is familiar, flexible, and feels entirely free. But there is a natural ceiling to spreadsheet operations: Excel was designed for financial analysis, not as a multi-user transactional database.',
      },
      {
        type: 'hard-truth',
        text: 'When a business scales beyond 15–20 daily transactions, running core operations on shared workbooks leads to silent formula overwrites, lost records, and hours wasted reconciling conflicting file versions.',
      },
      {
        type: 'paragraph',
        text: 'Consider what rarely shows up on a standard profit and loss sheet: the hours lost when an invoice formula accidentally gets overwritten and a client receives an outdated price quote. The 40 minutes lost every morning waiting for a locked spreadsheet on a shared drive. The security exposure of having your entire customer list saved on unsecured employee laptops without access permissions.',
      },
      {
        type: 'stat',
        stat: {
          value: '₹6.4 Lakhs',
          label: 'Average Annual Cost of Manual Re-Entry',
          subtext: 'Calculated across an 8-person team spending 2.5 hours every day copying data between sheets, fixing broken lookups, and reconciling dispatch mistakes.',
        },
      },
      {
        type: 'heading',
        text: 'The Operational Comparison: Spreadsheet Chaos vs Structured Data',
      },
      {
        type: 'comparison',
        comparison: {
          leftTitle: 'Spreadsheet Workflows (Common Bottlenecks)',
          leftItems: [
            'One accidental keystroke quietly corrupts formulas across linked sheets',
            'Customer contact records stored unprotected on employee personal devices',
            'Staff spend 3 hours every Friday evening compiling weekly sales summaries',
            'Zero audit trail: impossible to know who modified an order or deleted a row',
          ],
          rightTitle: 'Structured Database Architecture (Best Practice)',
          rightItems: [
            'Strict database schema validation: impossible to submit invalid quantities or rates',
            'Granular role-based security: team members only access what they need',
            'Real-time dashboards update the exact second an order closes on the floor',
            'Automated notifications triggered instantly to customers and warehouse teams',
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
          'You have files named "Final_Orders_2026_v4_FINAL_updated.xlsx" circulating in chats or shared folders.',
          'Your team spends more than 60 minutes a day copying information from one file into another.',
          'A customer calls to ask for their order status, and staff has to yell across the office or put them on hold to verify.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Software is not a luxury reserved for giant enterprises. Software is the operational leverage that allows a small, agile business to run smoothly. When you remove manual friction, your team stops acting like human data routers and focuses on customer satisfaction and growth.',
      },
      {
        type: 'hard-truth',
        text: 'Bottom Line: When spreadsheets start dictating how fast your business can serve customers, transitioning to a dedicated database portal pays for itself within months in saved labor and zero billing errors.',
      },
    ],
  },
  {
    id: 'the-shopify-trap-custom-ecommerce-advantage',
    title: 'Rented Platforms vs Independent E-Commerce: Understanding the Real Economics',
    subtitle: 'How transaction commissions, plugin subscription sprawl, and checkout limitations affect scaling D2C stores—and when custom architecture is right.',
    category: 'eCommerce',
    readTime: '5 min read',
    publishedAt: '2026-06-14',
    teaserStat: { value: '28% Higher', label: 'Direct UPI Checkout Conversion' },
    hook: 'Template storefronts make it easy to launch quickly. But as your sales grow, hidden transaction cuts and monthly plugin fees quietly erode your profit margins. Understanding the economics of custom checkouts is critical.',
    preview: 'Renting a template storefront feels cost-effective on day one. But as your sales volume grows, transaction taxes, currency fees, and app bloat impact your net margins. Learn how direct payment integration and clean architecture provide independence.',
    keyTakeaways: [
      'The Hidden Math: How transaction percentages and recurring app subscriptions reduce net profit',
      'The Indian Checkout Nuance: Why native UPI intent and instant COD verification drive higher conversions',
      'Performance and Speed: Why sub-second checkout loads directly increase completed purchases',
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'SaaS eCommerce builders are fantastic for launching a new idea with minimal initial effort. In the beginning, paying a small monthly fee to test product-market fit is a sensible decision.',
      },
      {
        type: 'hard-truth',
        text: 'However, once an online brand crosses steady monthly revenue (₹10L+ / month), the economic equation shifts. Platform commissions, third-party plugin bills, and restricted checkout customizations begin taking a noticeable toll on net margins.',
      },
      {
        type: 'paragraph',
        text: 'In the Indian market, eCommerce conversions depend heavily on zero-friction UPI instant intent, QR code payments, and reliable Cash on Delivery (COD) verification. When storefront platforms lock the checkout flow behind high enterprise tiers, brands lose the ability to trigger instant WhatsApp OTPs or dynamically balance multiple payment gateways during banking downtime.',
      },
      {
        type: 'stat',
        stat: {
          value: '₹3.2 Lakhs',
          label: 'Estimated Annual Platform & App Overhead for a ₹25L/mo Store',
          subtext: 'Calculated from 1.5% platform transaction cuts + monthly third-party app subscriptions (reviews, pincode checkers, WhatsApp alerts, COD anti-fraud) + FX fees.',
        },
      },
      {
        type: 'heading',
        text: 'Architectural Comparison: Rented SaaS vs Dedicated Custom Commerce',
      },
      {
        type: 'comparison',
        comparison: {
          leftTitle: 'Rented Storefront Platforms (SaaS)',
          leftItems: [
            'Additional platform commission taken on every transaction',
            'Locked checkout step with limited ability to customize local payment methods',
            'Multiple third-party scripts inject heavy code, often resulting in 4-6s mobile load times',
            'Customer data and business rules remain hosted in a closed proprietary ecosystem',
          ],
          rightTitle: 'Direct Custom Commerce Architecture (Best Practice)',
          rightItems: [
            '0% platform commission: 100% of sales settle directly via your payment gateway',
            'Direct developer integration with native UPI intent (GPay, PhonePe, Paytm, Razorpay)',
            'Sub-second mobile checkout built with clean modern frameworks (React / Next.js)',
            '100% database and code ownership with zero recurring third-party plugin dependencies',
          ],
        },
      },
      {
        type: 'heading',
        text: 'Why Direct Native UPI & Load Speed Transform Conversions',
      },
      {
        type: 'checklist',
        items: [
          'Native One-Tap UPI Intent: Opens Google Pay, PhonePe, or Paytm immediately on the customer\'s smartphone without confusing redirect hops or external browser tabs where buyers drop off.',
          'Automated COD Fraud Prevention: Sends an instant WhatsApp OTP verification before high-risk orders hit packing, cutting Return-to-Origin (RTO) shipping losses significantly.',
          'Smart Gateway Fallback: If Gateway A suffers an API delay or bank failure, the checkout seamlessly completes through Gateway B with zero user friction.',
          'Sub-Second Performance: Eliminates heavy bloated JavaScript, ensuring the checkout loads in under 900ms on 4G networks.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Every 1-second improvement in mobile checkout speed has been proven to increase purchase completion rates by up to 7%. For high-volume businesses, owning your eCommerce stack delivers higher customer retention and complete operational independence.',
      },
    ],
  },
  {
    id: 'why-92-percent-business-websites-fail',
    title: 'The Brochure Trap: Why Most Business Websites Fail to Convert Visitors (and How to Fix It)',
    subtitle: 'Why generic corporate jargon repels buyers, how eye-tracking patterns work, and the visual architecture of websites that actually generate inquiries.',
    category: 'Websites',
    readTime: '4 min read',
    publishedAt: '2026-06-10',
    teaserStat: { value: '3.8 Seconds', label: 'The Critical Evaluation Window' },
    hook: 'Many companies spend significant money on websites that look like corporate brochures. Visitors land, scan generic stock photos of people in suits, feel zero relevance, and exit in under 4 seconds.',
    preview: 'Most business websites fail because they are designed to look like static printed brochures rather than addressing what prospective buyers need. Learn how F/Z eye-tracking patterns and frictionless micro-copy turn casual visitors into verified inquiries.',
    keyTakeaways: [
      'The 3.8-second rule: What prospective clients evaluate first on a page',
      'The "Me, Myself & I" fallacy: Why talking about your company history before customer problems repels buyers',
      'The single dominant action framework that dramatically increases inbound inquiries',
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'Many business owners make a common, well-intentioned mistake: they build a website designed around company history rather than solving prospective customers\' immediate challenges.',
      },
      {
        type: 'paragraph',
        text: 'They launch a site filled with stock photos of corporate handshakes, an unread rotating carousel banner, and a headline that says: "Welcome to XYZ Enterprises — Delivering Excellence & Innovation Since 2011."',
      },
      {
        type: 'hard-truth',
        text: 'Visitors do not land on your site to read generic corporate mission statements. They land with two urgent questions: "Can these people solve my specific problem?" and "Can I trust them?" If your page doesn\'t answer both in 4 seconds, they bounce.',
      },
      {
        type: 'stat',
        stat: {
          value: '3.8 Seconds',
          label: 'The Critical Attention Window',
          subtext: 'Eye-tracking research shows visitors scan the headline, look for one concrete proof metric, and bounce if they encounter visual clutter or vague promises.',
        },
      },
      {
        type: 'heading',
        text: 'Understanding Eye-Scanning Patterns (F and Z Layouts)',
      },
      {
        type: 'paragraph',
        text: 'Users on the web scan rather than read every paragraph word for word. Their eyes naturally follow an F or Z pattern across the screen: landing on the main headline, scanning across the proof badges, and seeking a clear, low-friction action. When presented with 5 competing buttons ("Download Brochure", "Call Us", "Email", "Follow Instagram", "Read Mission"), decision paralysis takes over.',
      },
      {
        type: 'comparison',
        comparison: {
          leftTitle: 'Generic Brochure Websites (Low Engagement)',
          leftItems: [
            'Vague headline: "Leading Provider of Comprehensive Solutions"',
            'Stock photos that look staged and build minimal trust',
            '5 competing calls to action that overwhelm visitors',
            'Heavy unoptimized template loading in 5+ seconds on mobile data',
          ],
          rightTitle: 'Outcome-Driven Modern Web Design (High Conversion)',
          rightItems: [
            'Specific outcome headline: Clearly stating what is delivered and in what timeframe',
            'Authentic photos and specifications of actual products and completed work',
            'One dominant, clear action: Instant WhatsApp chat or straightforward quote form',
            'Sub-second load speed with optimized assets across all mobile devices',
          ],
        },
      },
      {
        type: 'heading',
        text: 'The Rule of Friction: Keep Contact Effortless',
      },
      {
        type: 'paragraph',
        text: 'Every extra mandatory field on an inquiry form cuts completion rates. Avoid asking for company turnover, designation, and fax numbers before even speaking with a potential client. Make the initial connection effortless: a single tap to a direct WhatsApp inquiry or a simple 3-field contact form.',
      },
      {
        type: 'hard-truth',
        text: 'Bottom Line: A website is not a digital trophy. It is an automated 24/7 communications channel. When you design around clarity, proof, and effortless inquiry paths, conversion rates naturally follow.',
      },
    ],
  },
  {
    id: 'the-app-store-delusion-web-vs-native',
    title: 'Native Mobile App vs Responsive Web Application: An Honest Decision Framework',
    subtitle: 'The hidden costs of App Store maintenance, install drop-offs, and why 90% of businesses are better served by a modern responsive web portal.',
    category: 'Web & Mobile',
    readTime: '5 min read',
    publishedAt: '2026-06-08',
    teaserStat: { value: '77% Drop', label: 'App Install Friction Rate' },
    hook: 'Founders often assume they need a mobile app on Google Play and Apple App Store. But spending significant capital on native app development before validating demand on the web introduces unnecessary friction.',
    preview: 'Before a user can use a native app, they have to search, check device storage, download 40MB, and grant permissions. Learn why modern responsive web applications deliver app-like experiences with zero download friction.',
    keyTakeaways: [
      'The 77% drop-off: How app store download friction impacts user acquisition',
      'Maintenance overhead: Keeping separate iOS and Android codebases updated',
      'The 3 specific technical criteria where building a native app is genuinely justified',
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'There is a common prestige bias in tech: founders frequently feel that having an app on Google Play or the Apple App Store makes their venture feel more legitimate.',
      },
      {
        type: 'hard-truth',
        text: 'In practice, developing and maintaining dual native apps without a validated user base often leads to high upfront costs and slow iteration cycles.',
      },
      {
        type: 'paragraph',
        text: 'Consider the user journey from your customer\'s perspective: they must search the store, verify storage space, download 40+ megabytes, accept multiple permissions, and complete an onboarding flow. That is multiple hurdles before seeing a single piece of value.',
      },
      {
        type: 'stat',
        stat: {
          value: '77% Abandonment',
          label: 'App Store Friction Drop-Off',
          subtext: 'More than three-quarters of potential users abandon an app download journey before ever opening it, compared to zero download friction on a responsive web link.',
        },
      },
      {
        type: 'heading',
        text: 'The Modern Responsive Web Alternative',
      },
      {
        type: 'paragraph',
        text: 'A modern web application built with responsive design frameworks looks, feels, and performs smoothly like a native app. It opens instantly from a WhatsApp link, QR code, or search result without waiting for app store review cycles or requiring device storage.',
      },
      {
        type: 'heading',
        text: 'The Litmus Test: When DO You Genuinely Need a Native App?',
      },
      {
        type: 'checklist',
        items: [
          'True offline functionality: Field staff working in remote areas with zero internet connectivity needing local database sync.',
          'Continuous background hardware access: Background GPS tracking for logistics fleet drivers or Bluetooth hardware peripherals.',
          'High-frequency daily interaction: Utility tools accessed 10+ times per day where home-screen widget integration is essential.',
        ],
      },
      {
        type: 'paragraph',
        text: 'If your business does not require continuous background hardware hooks or deep offline capabilities, a high-performance web application provides faster time-to-market and seamless access across all devices.',
      },
    ],
  },
  {
    id: 'real-custom-software-cost-india-breakdown',
    title: 'Understanding Custom Software Development Costs: A Founder\'s Practical Guide',
    subtitle: 'Why development quotes vary widely, how to evaluate scope, and critical IP ownership clauses every business should know.',
    category: 'Tech Economics',
    readTime: '5 min read',
    publishedAt: '2026-06-05',
    teaserStat: { value: '100% IP', label: 'Essential Ownership Requirement' },
    hook: 'Why does one proposal quote ₹30,000 while another quotes ₹6,00,000 for what seems like the same requirement? Here is the transparent breakdown of how software pricing works and how to protect your company.',
    preview: 'Demystifying software pricing in India. Learn the 3 real pricing tiers, the risks of rigid third-party templates, and the crucial contractual clause that ensures you own your code and database completely.',
    keyTakeaways: [
      'The Template Risk: Why low-cost cookie-cutter templates often fail when requirements evolve',
      'The 3 realistic project tiers for business software in India',
      'The Intellectual Property clause every business must secure in writing',
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'If you request quotes for custom software from multiple agencies or freelancers, estimates will often vary wildly. For non-technical business leaders, this variance can be confusing.',
      },
      {
        type: 'hard-truth',
        text: 'Large quote discrepancies typically stem from the difference between reselling a rigid, pre-built $20 template versus engineering a custom, maintainable database system tailored to your exact workflows.',
      },
      {
        type: 'paragraph',
        text: 'When a vendor installs a generic template, initial costs are low. But as soon as your business requires a custom invoice format, a specific tax calculation, or a direct ERP integration, the template breaks because the vendor did not build the underlying architecture.',
      },
      {
        type: 'stat',
        stat: {
          value: '80% Rewrite Rate',
          label: 'For Generic Off-the-Shelf Templates',
          subtext: 'Industry data indicates that 8 out of 10 businesses adopting rigid generic templates end up re-engineering their system from scratch within 18 months.',
        },
      },
      {
        type: 'heading',
        text: 'Standard Pricing Tiers & Realistic Expectations',
      },
      {
        type: 'comparison',
        comparison: {
          leftTitle: 'Project Scope & Complexity',
          leftItems: [
            'Tier 1: Single Workflow Utility (Lead tracker, quotation generator, inventory ledger)',
            'Tier 2: Multi-User Operational Portal (Role-based logins, automated invoicing, WhatsApp integration)',
            'Tier 3: Full Business Operations (Manufacturing ERP, multi-warehouse sync, accounting bridge)',
          ],
          rightTitle: 'Realistic Rupee Benchmark',
          rightItems: [
            '₹40,000 to ₹1,50,000 (Delivery: 3 to 5 weeks)',
            '₹1,80,000 to ₹4,50,000 (Delivery: 6 to 10 weeks)',
            '₹5,00,000 to ₹12,00,000+ (Delivery: 3 to 6 months)',
          ],
        },
      },
      {
        type: 'heading',
        text: 'The Critical Contract Question: Code & Data Ownership',
      },
      {
        type: 'paragraph',
        text: 'Before commencing any development agreement, always verify this core clause in writing: "Will our business receive full intellectual property ownership, the complete Git repository, and direct administrative database credentials upon final milestone completion?"',
      },
      {
        type: 'hard-truth',
        text: 'Never accept agreements where a vendor retains ownership of your custom code or charges an ongoing recurring license just to access your own business database.',
      },
    ],
  },
  {
    id: 'the-zero-admin-office-practical-automation',
    title: 'The "Zero-Admin" Workflow: Practical Business Automation Without AI Hype',
    subtitle: 'How simple webhooks, official WhatsApp APIs, and relational databases eliminate repetitive paperwork and save hours every week.',
    category: 'Automation',
    readTime: '4 min read',
    publishedAt: '2026-06-01',
    teaserStat: { value: '18.5 hrs', label: 'Reclaimed Weekly Staff Time' },
    hook: 'You don\'t need sci-fi artificial intelligence. You need three simple, rock-solid connections: a clean web inquiry form, an instant WhatsApp confirmation alert, and an automated database ledger.',
    preview: 'Entering an order into spreadsheets, typing a manual WhatsApp message, calling the warehouse to check stock. How connecting simple webhooks transforms a 15-minute manual loop into 1 second of automated execution.',
    keyTakeaways: [
      'The 15-minute manual loop vs 1.2-second automated workflow: A step-by-step breakdown',
      'The single-bottleneck rule: How to prioritize what to automate first for maximum leverage',
      'Connecting official WhatsApp business APIs reliably with automated PDF generation',
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'While the tech world focuses heavily on conversational AI models, most real-world businesses are looking for solutions to something far more practical: repetitive administrative tasks.',
      },
      {
        type: 'paragraph',
        text: 'Typing an order into an accounting ledger, manually drafting PDF quotations on a desktop, sending individual WhatsApp dispatch messages, and calling team members to confirm inventory.',
      },
      {
        type: 'hard-truth',
        text: 'Solving these bottlenecks doesn\'t require complex algorithms. It requires straightforward, reliable engineering pipes that run automatically on every transaction.',
      },
      {
        type: 'stat',
        stat: {
          value: '18.5 Hours',
          label: 'Average Weekly Time Reclaimed',
          subtext: 'Documented time savings for mid-sized distributors and manufacturers after automating quotation PDF generation and instant WhatsApp dispatch alerts.',
        },
      },
      {
        type: 'heading',
        text: 'Manual Workflow vs Automated Execution',
      },
      {
        type: 'comparison',
        comparison: {
          leftTitle: 'The Traditional Manual Loop (~15 mins/order)',
          leftItems: [
            '1. Lead arrives via email, phone call, or casual chat',
            '2. Staff manually saves the contact on a phone',
            '3. Manually enters item numbers into Word or Excel, exports to PDF',
            '4. Manually attaches PDF in a chat message, logs entry in workbook',
          ],
          rightTitle: 'The Automated Loop (~1.2 secs/order)',
          rightItems: [
            '1. Customer selects requirements on an interactive web form',
            '2. Database calculates rates and compiles branded PDF instantly',
            '3. Official WhatsApp API delivers quotation reference in 1.2 seconds',
            '4. Internal team dashboard updates in real time with zero manual effort',
          ],
        },
      },
      {
        type: 'heading',
        text: 'The Single Bottleneck Strategy',
      },
      {
        type: 'paragraph',
        text: 'When modernizing business workflows, avoid attempting to digitize everything in a single weekend. Identify your single most time-consuming bottleneck—typically quotation generation or dispatch notifications. Automate that first, observe the time savings, and then expand to the next workflow.',
      },
      {
        type: 'hard-truth',
        text: 'Bottom Line: The highest-return operational investment a growing business can make is automating repetitive data tasks so your team can focus on customer relationships and high-value work.',
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

export default function Articles() {
  useScrollReveal();
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Active article based on URL slug
  const activeArticle = useMemo(() => {
    if (!slug) return null;
    return articles.find((a) => a.id === slug) ?? null;
  }, [slug]);

  // Categories list
  const categories = [
    'All',
    'Custom Software',
    'eCommerce',
    'Websites',
    'Web & Mobile',
    'Tech Economics',
    'Automation',
  ];

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchesCategory =
        activeCategory === 'All' || a.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.hook.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Related articles (for reader view)
  const relatedArticles = useMemo(() => {
    if (!activeArticle) return [];
    return articles
      .filter((a) => a.id !== activeArticle.id)
      .slice(0, 3);
  }, [activeArticle]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {activeArticle
            ? `${activeArticle.title} | Articles & Knowledge Base`
            : 'Articles & Practical Guides | Open Technology & Business Insights'}
        </title>
        <meta
          name="description"
          content={
            activeArticle
              ? activeArticle.preview
              : 'Practical, no-fluff guides on custom software, web conversion, eCommerce architecture, and business automation. Open knowledge for founders and builders.'
          }
        />
        {activeArticle && (
          <link
            rel="canonical"
            href={`https://flowoid.tech/articles/${activeArticle.id}`}
          />
        )}
      </Helmet>

      <Navbar />

      <main className="bg-page min-h-screen pt-[96px] pb-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <AnimatePresence mode="wait">
            {activeArticle ? (
              /* ══════════════════════════════════════════════════════
                 SINGLE ARTICLE READER VIEW (DISTRACTION-FREE & CLEAN)
                 ══════════════════════════════════════════════════════ */
              <motion.div
                key={activeArticle.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease }}
                className="max-w-[860px] mx-auto"
              >
                {/* Top Navigation / Breadcrumbs Bar */}
                <div className="flex items-center justify-between gap-4 mb-8 pt-4">
                  <button
                    onClick={() => navigate('/articles')}
                    className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-full border border-border bg-white text-[.84rem] font-bold text-dark hover:border-b4 hover:text-b4 hover:shadow-xs transition-all cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                    <span>Back to all articles</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-full border border-border bg-white text-[.82rem] font-semibold text-muted hover:text-dark hover:border-b4 hover:shadow-xs transition-all cursor-pointer relative"
                    title="Share this article"
                  >
                    {copiedLink ? (
                      <>
                        <Check size={15} className="text-[#10B981]" />
                        <span className="text-[#10B981] font-bold">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 size={15} />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Main Article Container */}
                <article className="bg-white rounded-3xl border border-border p-7 sm:p-12 md:p-14 shadow-sm">
                  {/* Category & Meta */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="px-3.5 py-1 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.74rem] font-bold text-b4 uppercase tracking-wider">
                      {activeArticle.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-[.82rem] text-muted font-medium">
                      <Clock size={14} className="text-gold" />
                      <span>{activeArticle.readTime}</span>
                    </span>
                    <span className="text-muted/40">·</span>
                    <span className="flex items-center gap-1.5 text-[.82rem] text-muted font-medium">
                      <CalendarDays size={14} className="text-muted" />
                      <span>{formatDate(activeArticle.publishedAt)}</span>
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h1 className="font-heading font-black text-[clamp(1.85rem,3.5vw,2.9rem)] leading-[1.16] text-dark tracking-[-0.025em] mb-5">
                    {activeArticle.title}
                  </h1>

                  <p className="text-[1.06rem] leading-[1.75] text-muted font-medium mb-8 pb-8 border-b border-border/80">
                    {activeArticle.subtitle}
                  </p>

                  {/* Knowledge Byline */}
                  <div className="flex items-center gap-3 mb-10 text-[.84rem] text-muted font-medium">
                    <div className="w-8 h-8 rounded-full bg-pale flex items-center justify-center text-b4 font-bold text-xs border border-border">
                      <BookOpen size={14} />
                    </div>
                    <div>
                      <span className="text-dark font-bold">Open Knowledge Series</span>
                      <span className="mx-2">·</span>
                      <span>Practical Architecture &amp; Operations Guide</span>
                    </div>
                  </div>

                  {/* Key Takeaways Box */}
                  <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-pale/60 border border-border">
                    <div className="flex items-center gap-2 text-xs font-bold text-b4 tracking-widest uppercase mb-3.5">
                      <CheckCircle2 size={16} className="text-gold" />
                      <span>Core Takeaways in this Guide</span>
                    </div>
                    <ul className="space-y-3">
                      {activeArticle.keyTakeaways.map((takeaway, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-[.92rem] text-body leading-relaxed font-medium"
                        >
                          <span className="text-gold font-bold mt-0.5">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Article Content Blocks */}
                  <div className="space-y-6">
                    {activeArticle.blocks.map((block, idx) => {
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
                            className="my-7 p-6 rounded-2xl bg-[#FFFDF4] border-l-4 border-gold border-t border-r border-b border-gold/30 shadow-xs"
                          >
                            <div className="flex items-center gap-2 text-[.72rem] font-black text-gold tracking-widest uppercase mb-2">
                              <AlertCircle size={15} />
                              <span>KEY TAKEAWAY</span>
                            </div>
                            <p className="text-[1.02rem] font-semibold text-dark leading-[1.75]">
                              {block.text}
                            </p>
                          </div>
                        );
                      }

                      if (block.type === 'stat' && block.stat) {
                        return (
                          <div
                            key={idx}
                            className="my-8 p-7 rounded-2xl bg-gm text-white relative overflow-hidden shadow-sm"
                          >
                            <div className="relative z-[2]">
                              <div className="text-gold font-heading font-black text-3xl sm:text-4xl tracking-tight mb-1.5">
                                {block.stat.value}
                              </div>
                              <div className="font-heading font-bold text-white text-base mb-2">
                                {block.stat.label}
                              </div>
                              <p className="text-white/75 text-[.88rem] leading-relaxed max-w-[620px]">
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
                            className="font-heading font-black text-xl sm:text-[1.55rem] text-dark leading-tight pt-6 pb-1 border-t border-border/70"
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
                            <div className="p-6 rounded-2xl bg-[#FFF7F7] border border-red-200">
                              <h4 className="font-heading font-extrabold text-red-900 text-xs tracking-wide uppercase mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                {block.comparison.leftTitle}
                              </h4>
                              <ul className="space-y-2.5">
                                {block.comparison.leftItems.map((item, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2.5 text-[.86rem] text-red-950/80 leading-relaxed"
                                  >
                                    <span className="text-red-500 font-bold mt-0.5">
                                      ✕
                                    </span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-emerald-200">
                              <h4 className="font-heading font-extrabold text-emerald-900 text-xs tracking-wide uppercase mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                {block.comparison.rightTitle}
                              </h4>
                              <ul className="space-y-2.5">
                                {block.comparison.rightItems.map((item, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2.5 text-[.86rem] text-emerald-950/85 leading-relaxed font-medium"
                                  >
                                    <Check
                                      size={15}
                                      className="text-emerald-600 flex-shrink-0 mt-0.5"
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
                                className="flex items-start gap-3 text-[.94rem] text-body leading-relaxed font-medium"
                              >
                                <span className="w-5 h-5 rounded-full bg-gold/15 text-gold font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
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

                  {/* Knowledge Base Note at End of Essay */}
                  <div className="mt-14 pt-8 border-t border-border/80 flex items-center justify-between flex-wrap gap-4 text-[.85rem] text-muted">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-gold" />
                      <span>Enjoyed this guide? Share it with a fellow founder or builder.</span>
                    </div>
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-1.5 font-bold text-b4 hover:text-dark transition-colors cursor-pointer"
                    >
                      <Copy size={14} />
                      <span>Copy article link</span>
                    </button>
                  </div>

                  {/* Read Next Guides */}
                  <div className="mt-12 pt-8 border-t border-border/80">
                    <h3 className="font-heading font-bold text-dark text-lg mb-5">
                      Explore More Practical Guides
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {relatedArticles.map((rel) => (
                        <div
                          key={rel.id}
                          onClick={() => {
                            navigate(`/articles/${rel.id}`);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="p-5 rounded-2xl border border-border bg-page hover:bg-white hover:border-b4/40 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between text-[.7rem] font-bold text-muted mb-2">
                              <span className="text-b4 uppercase">
                                {rel.category}
                              </span>
                              <span>{rel.readTime}</span>
                            </div>
                            <h4 className="font-heading font-bold text-dark text-[.95rem] leading-snug group-hover:text-b4 transition-colors mb-2 line-clamp-2">
                              {rel.title}
                            </h4>
                          </div>
                          <div className="pt-3 flex items-center gap-1 text-[.78rem] font-bold text-b4 group-hover:translate-x-1 transition-transform">
                            <span>Read guide</span>
                            <ArrowRight size={12} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </motion.div>
            ) : (
              /* ══════════════════════════════════════════════════════
                 MAIN DIRECTORY VIEW (CLEAN HEADER, NO HERO BANNER)
                 ══════════════════════════════════════════════════════ */
              <motion.div
                key="directory"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* ── Compact & Content-First Header (NO HERO) ── */}
                <div className="mb-10 pb-8 border-b border-border/80">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <div className="inline-flex items-center gap-2 text-[.72rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3">
                        <BookOpen size={14} />
                        <span>Practical Guides &amp; Open Knowledge</span>
                      </div>
                      <h1 className="font-heading font-black text-[clamp(2rem,3.5vw,3rem)] text-dark leading-tight tracking-[-0.03em] mb-3">
                        Articles &amp; Technology Insights
                      </h1>
                      <p className="text-[1.02rem] text-muted leading-relaxed max-w-[620px]">
                        In-depth technical guides, architectural trade-offs, and operational analyses written plainly for founders and developers.
                      </p>
                    </div>

                    {/* Search bar */}
                    <div className="w-full md:w-[320px] relative flex-shrink-0">
                      <Search
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/70 pointer-events-none"
                      />
                      <input
                        type="text"
                        placeholder="Search articles &amp; topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-[.88rem] text-dark placeholder:text-muted/60 outline-none focus:border-b4 focus:ring-2 focus:ring-[rgba(72,69,168,.12)] transition-all"
                      />
                    </div>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-1 scrollbar-none">
                    {categories.map((cat) => {
                      const isSelected = activeCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-3.5 py-1.5 rounded-full text-[.8rem] font-bold whitespace-nowrap transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-dark text-white shadow-2xs'
                              : 'bg-white border border-border text-muted hover:border-b4 hover:text-dark'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── Featured Main Article (if viewing all & no search) ── */}
                {activeCategory === 'All' && searchQuery.trim() === '' && articles.length > 0 && (
                  <div className="mb-10">
                    <div
                      onClick={() => {
                        navigate(`/articles/${articles[0].id}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group rounded-3xl border border-border bg-white p-7 sm:p-10 shadow-sm hover:shadow-xl hover:border-b4/50 transition-all duration-300 cursor-pointer relative overflow-hidden"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 items-center">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.72rem] font-bold text-b4 uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                              Featured Guide
                            </span>
                            <span className="text-[.78rem] text-muted font-medium">
                              {articles[0].readTime}
                            </span>
                            <span className="text-muted/40">·</span>
                            <span className="text-[.78rem] text-muted font-medium">
                              {formatDate(articles[0].publishedAt)}
                            </span>
                          </div>

                          <h2 className="font-heading font-black text-[clamp(1.5rem,2.5vw,2.1rem)] leading-[1.2] text-dark group-hover:text-b4 transition-colors mb-4">
                            {articles[0].title}
                          </h2>

                          <p className="text-[.98rem] text-body leading-[1.75] mb-6 max-w-[620px]">
                            {articles[0].hook}
                          </p>

                          <div className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full text-[.84rem] font-bold text-white bg-mg shadow-sm group-hover:-translate-y-0.5 group-hover:shadow-md transition-all duration-200">
                            <span>Read Complete Guide</span>
                            <ArrowRight
                              size={15}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </div>

                        {/* Takeaways Card */}
                        <div className="bg-pale/60 rounded-2xl p-6 sm:p-7 border border-border/80">
                          <div className="mb-4 pb-4 border-b border-border/80">
                            <div className="text-gold font-heading font-black text-3xl">
                              {articles[0].teaserStat.value}
                            </div>
                            <div className="text-dark font-bold text-xs mt-1">
                              {articles[0].teaserStat.label}
                            </div>
                          </div>

                          <div className="text-[.7rem] font-bold text-b4 tracking-widest uppercase mb-3">
                            CORE HIGHLIGHTS:
                          </div>
                          <ul className="space-y-2.5">
                            {articles[0].keyTakeaways.map((point, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-[.84rem] text-body leading-relaxed font-medium"
                              >
                                <CheckCircle2
                                  size={14}
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
                )}

                {/* ── Articles Grid ── */}
                {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(activeCategory === 'All' && searchQuery.trim() === ''
                      ? filteredArticles.slice(1)
                      : filteredArticles
                    ).map((post: Article) => (
                      <article
                        key={post.id}
                        onClick={() => {
                          navigate(`/articles/${post.id}`);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="group bg-white rounded-2xl border border-border p-6 sm:p-7 shadow-2xs hover:shadow-xl hover:border-b4/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                      >
                        <div>
                          {/* Header: Category + Stat */}
                          <div className="flex items-center justify-between gap-2 mb-3.5">
                            <span className="px-2.5 py-0.5 rounded-full bg-pale border border-[rgba(45,43,107,.08)] text-[.7rem] font-bold text-b4 uppercase tracking-wider">
                              {post.category}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-gold/10 text-dark font-bold text-[.75rem]">
                              {post.teaserStat.value}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="font-heading text-[1.15rem] font-black text-dark leading-[1.3] group-hover:text-b4 transition-colors mb-2.5">
                            {post.title}
                          </h2>

                          {/* Hook */}
                          <p className="text-[.88rem] text-body leading-[1.68] mb-6 line-clamp-3">
                            {post.hook}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[.76rem] text-muted font-medium">
                            <Clock size={13} className="text-gold" />
                            <span>{post.readTime}</span>
                          </div>

                          <span className="inline-flex items-center gap-1 text-[.8rem] font-bold text-b4 group-hover:text-dark group-hover:translate-x-1 transition-all">
                            <span>Read Guide</span>
                            <ArrowRight size={13} />
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-2xl border border-border">
                    <BookOpen size={36} className="text-muted/40 mx-auto mb-3" />
                    <h3 className="font-heading font-bold text-dark text-lg mb-1">
                      No articles found
                    </h3>
                    <p className="text-[.9rem] text-muted">
                      Try clearing your search query or selecting a different category.
                    </p>
                  </div>
                )}

                {/* ── Samaj Seva / Open Knowledge Note ── */}
                <div className="mt-16 p-8 rounded-2xl bg-white border border-border text-center max-w-[800px] mx-auto">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-gold tracking-widest uppercase mb-2">
                    <Sparkles size={15} />
                    <span>OPEN KNOWLEDGE INITIATIVE</span>
                  </div>
                  <h3 className="font-heading font-black text-xl text-dark mb-2">
                    Practical Technology Guides for Founders &amp; Builders
                  </h3>
                  <p className="text-[.92rem] text-muted leading-relaxed max-w-[620px] mx-auto">
                    These articles are maintained as an open educational resource to help business owners understand technology economics, avoid common vendor pitfalls, and build efficient operations.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
