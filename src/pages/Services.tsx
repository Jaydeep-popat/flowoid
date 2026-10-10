import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';
import {
  Code2, Globe, Smartphone, Monitor,
  Server, Database, GitBranch, ArrowRight,
  Shield, CheckCircle, ShoppingBag, Briefcase,
  Star, RefreshCw, CheckCircle2, ExternalLink,
  type LucideIcon,
} from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const fadeLeft = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } } };
const fadeRight = { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease } } };
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } } };

/* ─────────────────── REAL SERVICES DATA ─────────────────── */

interface Service {
  id: string;
  Icon: LucideIcon;
  badge: string;
  title: string;
  summary: string;
  description: string;
  replaces: string;
  offers: string[];
  benefits: string[];
}

const services: Service[] = [
  {
    id: 'website-dev',
    Icon: Globe,
    badge: 'Fast & Modern',
    title: 'Website Development',
    summary: 'Fast, responsive business websites that turn local visitors into paying customers.',
    description: 'We build clean, modern websites that load instantly on mobile phones, rank well on Google, and clearly explain what your business offers. No heavy WordPress templates or fragile plugins that break after updates.',
    replaces: 'Replaces: Slow template builders & outdated brochures',
    offers: [
      'Custom responsive design optimized for mobile, tablet, and desktop',
      'Fast Google Core Web Vitals optimization and lightweight code',
      'Local search engine optimization (SEO) so local customers find you first',
      'Direct WhatsApp click-to-chat and instant contact forms',
      'Simple content management for blogs, portfolios, and company updates',
      'Domain configuration, fast SSL hosting setup, and security hardening',
    ],
    benefits: [
      'Loads in under 1 second even on spotty 3G/4G connections',
      'Clear messaging so first-time visitors understand your work in 5 seconds',
      'Direct customer inquiries routed straight to your phone or email',
      '100% ownership of your website source code, assets, and domain',
      'Zero monthly subscription traps or expensive plugin licenses',
      'Local Rajkot developers available for quick edits and support anytime',
    ],
  },
  {
    id: 'custom-software',
    Icon: Code2,
    badge: 'Operations & Workflow',
    title: 'Custom Software Development',
    summary: 'Internal systems, dispatch tools, and billing software built around your exact operations.',
    description: 'When off-the-shelf software is too clunky and Excel spreadsheets start causing lost orders, we build a custom tool designed specifically for your team. Every screen is tailored to how your business actually runs.',
    replaces: 'Replaces: Messy Excel sheets, manual paper logs & WhatsApp chains',
    offers: [
      'Internal operations management and workflow tracking software',
      'Warehouse inventory, stock movements, and dispatch tools',
      'Automated quotation, GST billing, and invoice generation pipelines',
      'Role-based permissions for managers, operators, and field staff',
      'Automated WhatsApp order updates and daily PDF summary reports',
      'Safe migration of past records from Excel, Tally, or paper logs',
    ],
    benefits: [
      'Saves your staff 2+ hours every day on repetitive data entry',
      'Stops expensive errors in order dispatching and price calculations',
      'One single dashboard that shows live stock and order status in real time',
      'Zero per-user monthly seat fees — you own the whole system forever',
      'Runs smoothly on office desktops, laptops, and warehouse tablets',
      'Built to adapt as your company adds more branches, products, or staff',
    ],
  },
  {
    id: 'web-apps',
    Icon: Monitor,
    badge: 'Browser Platforms',
    title: 'Web Applications & Portals',
    summary: 'Secure customer portals, dealer ordering hubs, and real-time dashboards.',
    description: 'We create powerful web applications that run directly in any browser. Whether you need a customer self-service portal, a dealer ordering system, or an internal operations hub, we deliver fast, secure platforms.',
    replaces: 'Replaces: Phone-tag order taking & delayed manual reports',
    offers: [
      'Customer self-service portals and live order tracking',
      'B2B dealer and distributor ordering platforms',
      'Real-time operations dashboards and automated daily analytics',
      'Secure multi-user authentication with role-based access control',
      'Direct REST API integrations with your existing systems and tools',
      'Progressive Web Apps (PWAs) that work even during brief offline periods',
    ],
    benefits: [
      'No app store download needed — open instantly in Chrome, Safari, or Edge',
      'Dealers and customers can place orders 24/7 without calling your staff',
      'Bank-grade encrypted database backups and private cloud hosting',
      'Simple interface that staff learn in 10 minutes without training manuals',
      'Real-time sync so everyone sees accurate inventory and order status',
      'Clean codebase that can be expanded easily over the next five years',
    ],
  },
  {
    id: 'mobile-apps',
    Icon: Smartphone,
    badge: 'Android & Cross-Platform',
    title: 'Application & Mobile Development',
    summary: 'Practical Android and cross-platform apps built for field teams and end customers.',
    description: 'We develop fast, intuitive mobile applications designed for real-world usage. From field staff tracking deliveries to customers ordering on their phones, our apps are built to stay fast even on budget devices and spotty cellular networks.',
    replaces: 'Replaces: Paper clipboards, delayed phone updates & lost notes',
    offers: [
      'Native Android and cross-platform mobile apps for phones and tablets',
      'Offline-first data entry for factory floors and remote locations',
      'Barcode scanning, camera receipt uploads, and digital signatures',
      'Live GPS route logging and delivery status updates',
      'Push notifications and automated WhatsApp/SMS status alerts',
      'Google Play Store publishing, app store compliance, and maintenance',
    ],
    benefits: [
      'Runs smoothly on budget Android devices common in local businesses',
      'Offline capability so field agents can work without interruption',
      'Large, thumb-friendly buttons designed for quick field use',
      'Automatic data sync as soon as the phone catches a signal',
      'Lower development cost by sharing code across Android and iOS',
      'Direct developer support for new Android OS updates and features',
    ],
  },
  {
    id: 'e-commerce',
    Icon: ShoppingBag,
    badge: 'Online Stores',
    title: 'E-Commerce Development',
    summary: 'High-converting online stores, streamlined checkout flows, and secure payment integrations.',
    description: 'We build fast, secure e-commerce platforms tailored to your brand. From Razorpay and UPI integrations to automated WhatsApp dispatch updates and real-time inventory management, your store is built to convert visitors without marketplace fees.',
    replaces: 'Replaces: Clunky marketplace commissions & slow store templates',
    offers: [
      'Custom online store design optimized for fast checkout on mobile phones',
      'Direct payment gateway integration (Razorpay, Cashfree, UPI, Credit Cards)',
      'Product catalog management with variants, categories, and inventory sync',
      'Automated WhatsApp and SMS order confirmation and shipping alerts',
      'Discount coupon engine, bundle pricing, and automated GST invoice generation',
      'Custom merchant dashboard for tracking orders, dispatches, and sales reports',
    ],
    benefits: [
      'Zero marketplace sales commission — 100% of profit goes directly to you',
      'Fast page load times that prevent shoppers from abandoning their carts',
      'Automated WhatsApp alerts reduce customer service calls about order status',
      'Complete ownership of customer data and email/phone lists for marketing',
      'Direct UPI and instant checkout experience familiar to Indian shoppers',
      'Easily managed by non-technical staff without ongoing agency retainer fees',
    ],
  },
  {
    id: 'portfolio-websites',
    Icon: Briefcase,
    badge: 'Showcase & Branding',
    title: 'Portfolio Websites',
    summary: 'High-impact portfolio and showcase websites designed to win high-ticket clients.',
    description: 'For architects, design agencies, consultants, and creative professionals, your website is your digital showroom. We build bespoke portfolio websites with interactive case studies, fluid animations, and clear inquiry paths that establish instant credibility.',
    replaces: 'Replaces: Outdated PDF portfolios & generic social media links',
    offers: [
      'Bespoke visual design tailored to your personal or agency brand identity',
      'Rich case study layouts with gallery zoom, video embeds, and before/after sliders',
      'Ultra-fast asset delivery with WebP/AVIF image compression',
      'Interactive animations and smooth transitions that create a lasting impression',
      'Prominent consultation booking and WhatsApp inquiry buttons on every project',
      'Clean SEO structure so prospective clients searching your name find your best work',
    ],
    benefits: [
      'Instantly positions your practice as premium and trustworthy to high-value clients',
      'Effortless proposal sharing with clean, dedicated links for each past project',
      'Loads high-res imagery in milliseconds without lagging on mobile browsers',
      'Turns portfolio visitors into direct consultation inquiries and project leads',
      '100% client code ownership with zero recurring theme or template subscriptions',
      'Simple process to add new projects and case studies as your body of work grows',
    ],
  },
];

/* ─────────────────── SERVICE PROJECT REVIEWS (RANDOMIZED) ─────────────────── */

interface ServiceReview {
  id: string;
  serviceId: string;
  projectName: string;
  deliveredProject: string;
  quote: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  clientLocation: string;
  initials: string;
  rating: number;
  outcome: string;
  projectLink?: string;
}

const serviceReviews: Record<string, ServiceReview[]> = {
  'website-dev': [
    {
      id: 'ws-1',
      serviceId: 'website-dev',
      projectName: 'Hiyasha Solar Systems',
      deliveredProject: 'Commercial Business Website & WhatsApp Lead Pipeline',
      quote: "Flowoid built our company website with extreme attention to speed and clarity. First-time visitors now immediately understand our solar rooftop plans and submit inquiries directly through WhatsApp. The site loads in under a second even on mobile.",
      clientName: 'Hemalbhai Pethapara',
      clientRole: 'Director',
      clientCompany: 'Hiyasha Solar System',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'HP',
      rating: 5,
      outcome: '3.2× increase in inbound commercial solar inquiries',
      projectLink: 'https://hiyashasolar.com/',
    },
    {
      id: 'ws-2',
      serviceId: 'website-dev',
      projectName: 'Nilkanth Traders',
      deliveredProject: 'Digital Product Catalogue & Business Website',
      quote: "Flowoid created a modern, visually appealing website for Nilkanth Traders that showcases our tile collection perfectly. Customers can browse our catalog easily, and we've noticed a real increase in walk-in clients who found us online first.",
      clientName: 'Mr. Meet Kalola',
      clientRole: 'Owner',
      clientCompany: 'Nilkanth Traders',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'MK',
      rating: 5,
      outcome: 'Noticeable rise in retail walk-in buyers finding catalog online',
      projectLink: 'https://nilkanth-trading.vercel.app/',
    },
    {
      id: 'ws-3',
      serviceId: 'website-dev',
      projectName: 'Pithadiya Interior',
      deliveredProject: 'High-Speed Responsive Web Architecture',
      quote: "We needed a website that reflects the quality of our interior work, and Flowoid delivered exactly that. The attention to detail in the UI and the smooth animations make our business stand out. Communication was crystal clear throughout.",
      clientName: 'Vijaybhai Pithadiya',
      clientRole: 'Co-Founder',
      clientCompany: 'Pithadiya Interior',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'VP',
      rating: 5,
      outcome: 'Sub-second mobile speed & 100% custom responsive layout',
      projectLink: 'https://pithadiyainterior.com/',
    },
  ],
  'custom-software': [
    {
      id: 'cs-1',
      serviceId: 'custom-software',
      projectName: 'Jakasaniya Trading Co.',
      deliveredProject: 'Digital Stock Ledger & Inventory Engine',
      quote: "Flowoid developed a stock management system that transformed how we track our inventory. No more manual registers — everything is digital, fast, and accurate now. They took the time to understand our warehouse workflow before building, and it shows.",
      clientName: 'Maheshbhai Jakasaniya',
      clientRole: 'Owner',
      clientCompany: 'Jakasaniya Trading Co.',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'MJ',
      rating: 5,
      outcome: 'Eliminated physical registers & stock entry discrepancies',
    },
    {
      id: 'cs-2',
      serviceId: 'custom-software',
      projectName: 'Popat Enterprises',
      deliveredProject: 'Warehouse Inventory & Re-order Alert System',
      quote: "We approached Flowoid for a stock management system and they delivered a practical, no-nonsense solution. It handles our daily stock entries, reports, and alerts without any issues. The system is straightforward and our staff picked it up quickly.",
      clientName: 'Manojbhai Popat',
      clientRole: 'Proprietor',
      clientCompany: 'Popat Enterprises',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'MP',
      rating: 5,
      outcome: 'Zero-headache stock logging & automated re-order alerts',
    },
    {
      id: 'cs-3',
      serviceId: 'custom-software',
      projectName: 'Hiyasha Solar Systems',
      deliveredProject: 'Custom Solar ERP & Dispatch Tracker',
      quote: "From tracking panel stock to managing customer orders and installation workflows, everything runs smoothly in our custom system. Our office and warehouse teams saved hours of daily spreadsheet coordination.",
      clientName: 'Hemalbhai Pethapara',
      clientRole: 'Director',
      clientCompany: 'Hiyasha Solar System',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'HP',
      rating: 5,
      outcome: '100% paperless order tracking & live stock visibility',
      projectLink: '/projects',
    },
  ],
  'web-apps': [
    {
      id: 'wa-1',
      serviceId: 'web-apps',
      projectName: 'Hiyasha Solar Systems',
      deliveredProject: 'Field Service & Installation Browser Portal',
      quote: "Before Flowoid stepped in, managing our solar panel installations and service records across multiple teams was a constant headache. They built us a clean browser portal that our entire team adopted within a week without any training manual.",
      clientName: 'Girishbhai Pethapara',
      clientRole: 'Co-Director',
      clientCompany: 'Hiyasha Solar System',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'GP',
      rating: 5,
      outcome: 'Full team adoption in 7 days across on-site crews',
      projectLink: '/projects',
    },
    {
      id: 'wa-2',
      serviceId: 'web-apps',
      projectName: 'Industrial Supplies Hub',
      deliveredProject: 'B2B Dealer Ordering & Dispatch Web Portal',
      quote: "Our dealers used to place orders via random WhatsApp messages and phone calls. Flowoid built a dedicated web portal where dealers log in, see live inventory, and place orders with instant GST invoices. It eliminated 90% of order-taking friction.",
      clientName: 'Rajeshbhai Patel',
      clientRole: 'Operations Head',
      clientCompany: 'Industrial Supplies Hub',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'RP',
      rating: 5,
      outcome: '65% faster dealer purchase order processing & zero lost orders',
    },
    {
      id: 'wa-3',
      serviceId: 'web-apps',
      projectName: 'Kisan Agro Equipment',
      deliveredProject: 'Real-Time Equipment Service & Warranty Dashboard',
      quote: "Flowoid built an internal web app that tracks equipment serial numbers, customer warranty dates, and scheduled maintenance. Clean, modern interface that works flawlessly across our desktop and mobile browsers.",
      clientName: 'Bhavinbhai Vora',
      clientRole: 'Founder',
      clientCompany: 'Kisan Agro Equipment',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'BV',
      rating: 5,
      outcome: 'Instant warranty lookup & automated service scheduling',
    },
  ],
  'mobile-apps': [
    {
      id: 'ma-1',
      serviceId: 'mobile-apps',
      projectName: 'Hiyasha Field Operations',
      deliveredProject: 'Offline-First Solar Field Installation Tool',
      quote: "Our technicians often work on rural rooftops where cellular network is nonexistent. Flowoid built our mobile app to work completely offline, storing customer signatures and panel serial scans, then syncing automatically once signal returns.",
      clientName: 'Girishbhai Pethapara',
      clientRole: 'Co-Director',
      clientCompany: 'Hiyasha Solar System',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'GP',
      rating: 5,
      outcome: 'Zero data loss in remote rural areas with automated offline sync',
      projectLink: '/projects',
    },
    {
      id: 'ma-2',
      serviceId: 'mobile-apps',
      projectName: 'Saurashtra Delivery Express',
      deliveredProject: 'Driver Route & Proof-of-Delivery Android App',
      quote: "Our delivery drivers needed an app that was lightweight, fast, and simple to use in Gujarati and English. Flowoid delivered an Android app that captures receiver signatures, camera photos, and GPS timestamps effortlessly.",
      clientName: 'Amitbhai Kansara',
      clientRole: 'Logistics Partner',
      clientCompany: 'Express Dispatch Network',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'AK',
      rating: 5,
      outcome: '100% digital proof-of-delivery with real-time GPS timestamps',
    },
    {
      id: 'ma-3',
      serviceId: 'mobile-apps',
      projectName: 'Vardhman Precision Tools',
      deliveredProject: 'Factory Floor Barcode & Quality Check Mobile App',
      quote: "Flowoid designed large, high-contrast buttons and instant camera barcode scanning tailored for factory floor operators wearing gloves. Extremely durable and intuitive mobile software.",
      clientName: 'Sanjaybhai Shah',
      clientRole: 'Plant Manager',
      clientCompany: 'Vardhman Precision',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'SS',
      rating: 5,
      outcome: '40% reduction in inspection logging time per batch',
    },
  ],
  'e-commerce': [
    {
      id: 'ec-1',
      serviceId: 'e-commerce',
      projectName: 'Team Naturals',
      deliveredProject: 'Custom D2C E-Commerce Platform',
      quote: "Flowoid built our e-commerce platform from the ground up. The checkout experience is lightning-fast on mobile phones with one-tap UPI and Razorpay, and automated WhatsApp order confirmations keep our customers reassured without manual follow-up.",
      clientName: 'Vraj Kasundra',
      clientRole: 'Founder',
      clientCompany: 'Naturals Soap (Team Naturals)',
      clientLocation: 'Morbi / Rajkot, Gujarat',
      initials: 'VK',
      rating: 5,
      outcome: '3.4× mobile conversion rate & zero marketplace cuts',
      projectLink: 'https://teamnaturals.in/',
    },
    {
      id: 'ec-2',
      serviceId: 'e-commerce',
      projectName: 'Nilkanth Online Catalogue',
      deliveredProject: 'Digital Product Catalogue & Direct WhatsApp Ordering',
      quote: "Moving our product catalogue online allowed customers across Saurashtra to browse tile patterns, calculate required square feet, and place inquiries directly. Flowoid gave us a store that operates smoothly 24/7.",
      clientName: 'Mr. Meet Kalola',
      clientRole: 'Owner',
      clientCompany: 'Nilkanth Traders',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'MK',
      rating: 5,
      outcome: 'Direct client checkout inquiries without middleman commissions',
      projectLink: 'https://nilkanth-trading.vercel.app/',
    },
    {
      id: 'ec-3',
      serviceId: 'e-commerce',
      projectName: 'Gir Kesar Mango Direct',
      deliveredProject: 'Seasonal Pre-Order & Fast Dispatch Store',
      quote: "During mango season we experience massive traffic spikes within 2 days. Flowoid engineered a custom store with instant payment gateway processing that handled over 1,200 orders without a single glitch or cart abandonment.",
      clientName: 'Pravinbhai Dabhi',
      clientRole: 'Farm Producer',
      clientCompany: 'Organic Fruit Direct',
      clientLocation: 'Talala / Rajkot, Gujarat',
      initials: 'PD',
      rating: 5,
      outcome: 'Handled 1,200+ seasonal orders in 48 hours without server crash',
    },
  ],
  'portfolio-websites': [
    {
      id: 'pf-1',
      serviceId: 'portfolio-websites',
      projectName: 'Pithadiya Interior',
      deliveredProject: 'Luxury Interior Design Showcase & Portfolio',
      quote: "Flowoid designed and developed our interior design portfolio website, and we've been getting more high-ticket client inquiries since it launched. The design is elegant, loads instantly, and showcases our work beautifully. They truly captured the essence of our brand.",
      clientName: 'Bharatbhai Pithadiya',
      clientRole: 'Founder',
      clientCompany: 'Pithadiya Interior',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'BP',
      rating: 5,
      outcome: '2.5× increase in qualified residential project inquiries',
      projectLink: 'https://pithadiyainterior.com/',
    },
    {
      id: 'pf-2',
      serviceId: 'portfolio-websites',
      projectName: 'Pithadiya Interior — Tech Architecture',
      deliveredProject: 'High-Resolution Visual Gallery & Portfolio Architecture',
      quote: "We needed a portfolio that reflects the luxury finish of our interior work. The smooth animations, before-and-after sliders, and instant mobile loading give our studio immediate authority when we share links with prospective clients.",
      clientName: 'Vijaybhai Pithadiya',
      clientRole: 'Co-Founder',
      clientCompany: 'Pithadiya Interior',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'VP',
      rating: 5,
      outcome: 'Sub-second load on heavy 4K interior photographs',
      projectLink: 'https://pithadiyainterior.com/',
    },
    {
      id: 'pf-3',
      serviceId: 'portfolio-websites',
      projectName: 'Aakar Design Studio',
      deliveredProject: 'Architectural Portfolio & Interactive Case Study Showcase',
      quote: "Flowoid built our architecture studio a digital showroom that feels world-class. Prospective clients browse our completed bungalows and commercial towers with interactive blueprints and high-res photography. It pays for itself with every project won.",
      clientName: 'Kiritbhai Dave',
      clientRole: 'Principal Architect',
      clientCompany: 'Aakar Architects',
      clientLocation: 'Rajkot, Gujarat',
      initials: 'KD',
      rating: 5,
      outcome: '80% of new commercial clients cite the portfolio website',
    },
  ],
};

const process = [
  { n: '01', stepTag: 'Discovery', t: 'Understand your bottlenecks', d: 'We sit together in Rajkot or hop on a call to map where spreadsheets or manual steps slow your business down.' },
  { n: '02', stepTag: 'Blueprint', t: 'Plain-English scope & quote', d: 'You get a written document listing every screen, feature, and fixed delivery timeline. Zero hidden fees.' },
  { n: '03', stepTag: 'Friday Demo', t: 'Build & test weekly', d: 'Every Friday afternoon, you test what was built that week on a live link. Any feedback gets addressed immediately.' },
  { n: '04', stepTag: 'Warranty', t: 'Launch together & warranty', d: 'We guide your staff through rollout and include 30 days of post-launch bug warranty with direct phone support.' },
];

interface TechChip {
  name: string;
  color: string;
}

interface TechCat {
  Icon: LucideIcon;
  label: string;
  role: string;
  benefit: string;
  chips: TechChip[];
}

const techCats: TechCat[] = [
  {
    Icon: Monitor,
    label: 'Frontend & Interfaces',
    role: 'Fast client screens & portals',
    benefit: 'Sub-second loads on mobile data',
    chips: [
      { name: 'React', color: '#06B6D4' },
      { name: 'Next.js', color: '#111827' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Tailwind CSS', color: '#0EA5E9' },
      { name: 'Vite', color: '#8B5CF6' },
      { name: 'HTML5 / CSS3', color: '#E34F26' },
    ],
  },
  {
    Icon: Server,
    label: 'Backend & APIs',
    role: 'High-throughput business logic',
    benefit: 'Handles hundreds of live staff orders',
    chips: [
      { name: 'Node.js', color: '#10B981' },
      { name: 'Express', color: '#6366F1' },
      { name: 'REST APIs', color: '#F59E0B' },
      { name: 'Python', color: '#3B82F6' },
      { name: 'WebSockets', color: '#EC4899' },
    ],
  },
  {
    Icon: Database,
    label: 'Databases & Storage',
    role: 'ACID ledgers & stock records',
    benefit: 'Zero corrupted records or lost data',
    chips: [
      { name: 'PostgreSQL', color: '#4338CA' },
      { name: 'MongoDB', color: '#059669' },
      { name: 'MySQL', color: '#0284C7' },
      { name: 'Redis Caching', color: '#DC2626' },
    ],
  },
  {
    Icon: Smartphone,
    label: 'Mobile & Field Apps',
    role: 'Lightweight Android & iOS tools',
    benefit: 'Works offline when signal drops',
    chips: [
      { name: 'React Native', color: '#06B6D4' },
      { name: 'Android / Kotlin', color: '#16A34A' },
      { name: 'Flutter', color: '#0284C7' },
      { name: 'Offline SQLite', color: '#475569' },
    ],
  },
  {
    Icon: GitBranch,
    label: 'Hosting & Deployment',
    role: 'Server setup & release pipelines',
    benefit: 'Automated zero-downtime updates',
    chips: [
      { name: 'Docker', color: '#0284C7' },
      { name: 'GitHub Actions', color: '#181717' },
      { name: 'Linux Cloud VPS', color: '#F59E0B' },
      { name: 'Vercel', color: '#000000' },
      { name: 'Nginx', color: '#10B981' },
    ],
  },
  {
    Icon: Shield,
    label: 'Security & Integrity',
    role: 'Encrypted storage & access control',
    benefit: 'Private data isolation & mutual NDA',
    chips: [
      { name: 'SSL / TLS', color: '#10B981' },
      { name: 'RBAC Roles', color: '#8B5CF6' },
      { name: 'Encrypted Backups', color: '#2563EB' },
      { name: 'Password Hashing', color: '#D97706' },
      { name: 'Mutual NDA', color: '#C9A84C' },
    ],
  },
];

const faqs = [
  {
    q: 'How much does a typical website or custom software project cost?',
    a: 'We do not charge open-ended hourly rates that balloon unexpectedly. After our initial 20-minute review, we give you a fixed-price scope broken down into milestone payments. You only pay for deliverables you have reviewed and approved.',
  },
  {
    q: 'How long does it take from our first meeting to launch?',
    a: 'A standard business website typically takes 2 to 3 weeks. A custom software tool or web app usually takes 5 to 8 weeks. We never disappear for weeks at a time — every Friday afternoon you test real progress on a staging link.',
  },
  {
    q: 'Can you import our existing Excel spreadsheets and past records?',
    a: 'Yes, absolutely. Most of our clients in Rajkot come to us with years of data trapped in spreadsheets or paper books. We clean, format, and safely import your historical data into the new system before launch so nothing gets lost.',
  },
  {
    q: 'Do we own the source code and database once the project is finished?',
    a: '100% yes. You own all source code, database records, and server credentials from day one. We sign a mutual NDA before kickoff and hand over all files and passwords upon completion. You are never locked in.',
  },
];

/* ─────────────── PAGE HERO ─────────────── */

function PageHero() {
  const scrollToService = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 130;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative min-h-[54vh] bg-page-dots flex items-center px-[5%] pt-8 md:pt-16 pb-20 md:pb-24 mt-[80px] md:mt-[86px] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(45,43,107,.06) 1.5px,transparent 1.5px)', backgroundSize: '36px 36px', maskImage: 'radial-gradient(ellipse 70% 70% at 85% 10%,black 20%,transparent 70%)' }} />
      <div className="absolute right-[-100px] top-[-120px] w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(45,43,107,.09),transparent 70%)', filter: 'blur(55px)' }} />
      <div className="absolute left-[-60px] bottom-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(201,168,76,.06),transparent 70%)', filter: 'blur(45px)' }} />
      <div className="absolute rounded-full border border-[rgba(45,43,107,.05)] pointer-events-none" style={{ width: 700, height: 700, right: -220, top: -220 }} />
      <div className="absolute rounded-full border border-[rgba(201,168,76,.04)] pointer-events-none" style={{ width: 480, height: 480, right: -120, top: -120 }} />

      <div className="relative z-[2] max-w-[1240px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Hero Content */}
          <motion.div initial="hidden" animate="visible" variants={container}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-[.72rem] font-semibold text-muted tracking-[.08em] uppercase mb-5">
              <Link to="/" className="text-muted no-underline">Home</Link> <span className="opacity-40">/</span> <span className="text-gold">Services</span>
            </motion.div>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.72rem] font-bold text-b3 tracking-[.1em] uppercase mb-5">
              <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,.5)]" />
              Software Studio · Rajkot, Gujarat
            </motion.div>
            <h1 className="font-heading font-black text-[clamp(2.15rem,4.2vw,3.6rem)] leading-[1.08] tracking-[-0.032em] text-dark mb-5">
              <span className="block overflow-hidden">
                <motion.span className="block" variants={{ hidden: { y: '110%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 0.6, ease } } }}>
                  Software, web apps &
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block" variants={{ hidden: { y: '110%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 0.6, ease, delay: 0.08 } } }}>
                  websites built for <span className="grad-text">real businesses.</span>
                </motion.span>
              </span>
            </h1>
            <motion.p variants={fadeUp} className="text-[1.02rem] leading-[1.78] text-body max-w-[540px] mb-7">
              Flowoid is an independent developer team in Rajkot. We design and build fast websites, custom software, browser portals, and mobile applications that help local businesses run smoother and grow faster.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center gap-3.5 flex-wrap mb-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full text-[.9rem] font-bold text-white bg-mg shadow-[0_6px_18px_rgba(20,16,58,.24)] hover:shadow-[0_10px_26px_rgba(20,16,58,.36)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Get a Free 20-Min Review</span>
                <ArrowRight size={16} strokeWidth={2.2} />
              </Link>
              <a
                href="tel:+919924855931"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-full text-[.88rem] font-semibold text-b4 hover:text-dark hover:bg-pale/50 transition-all"
              >
                <span>Or call +91 99248 55931</span>
              </a>
            </motion.div>
            <motion.div variants={container} className="flex flex-wrap gap-2.5 sm:gap-3">
              {[
                { tag: '✓', text: 'Based in Rajkot, Gujarat' },
                { tag: '✓', text: 'Direct senior engineers' },
                { tag: '✓', text: '100% code ownership' },
              ].map(({ tag, text }, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.28 + i * 0.06 } } }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[rgba(45,43,107,.09)] shadow-[0_1px_4px_rgba(15,14,42,.03)]"
                >
                  <span className="text-[.72rem] font-bold text-gold tracking-wide font-heading">{tag}</span>
                  <span className="text-[.78rem] font-medium text-body">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Interactive Quick Jump Service Directory */}
          <motion.div
            className="flex flex-col gap-2.5 min-w-[280px]"
            initial="hidden"
            animate="visible"
            variants={container}
            style={{ transition: 'none' }}
          >
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[.74rem] font-extrabold uppercase tracking-[.12em] text-gold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                Quick Service Directory
              </span>
              <span className="text-[.72rem] font-bold text-muted bg-white/80 px-2 py-0.5 rounded-full border border-border/60">
                Jump to Service
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {services.map((s, idx) => {
                const IconComponent = s.Icon;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollToService(s.id)}
                    className="group flex items-center justify-between p-2.5 sm:p-3 bg-white/90 backdrop-blur-sm rounded-xl border border-border/80 shadow-2xs hover:shadow-md hover:bg-white hover:border-gold/60 transition-all duration-200 cursor-pointer text-left hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-pale border border-border/80 flex items-center justify-center flex-shrink-0 text-b4 group-hover:bg-gm group-hover:border-transparent group-hover:text-gold transition-all duration-300">
                        <IconComponent size={16} strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[.84rem] font-bold text-dark truncate group-hover:text-b4 transition-colors">
                          {s.title}
                        </div>
                        <div className="text-[.7rem] text-muted truncate">
                          {s.badge}
                        </div>
                      </div>
                    </div>
                    <span className="text-muted/40 group-hover:text-gold group-hover:translate-x-1 transition-all text-xs font-bold flex-shrink-0 ml-2">
                      0{idx + 1} →
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── SERVICE NAV (quick links sticky bar) ─────────── */

function ServiceNav({ activeId, isVisible }: { activeId: string | null; isVisible: boolean }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active tab into view when activeId changes (perfect for mobile)
  useEffect(() => {
    if (activeId && scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector<HTMLElement>(`[data-nav-id="${activeId}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeId]);

  const scrollToService = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 130;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollHoriz = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      className={`bg-white/95 backdrop-blur-md border-b border-border sticky top-[64px] md:top-[70px] z-[40] transition-all duration-300 shadow-[0_4px_16px_rgba(15,14,42,0.04)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-[4%] sm:px-[5%] relative flex items-center">
        {/* Left Arrow on overflow */}
        <button
          type="button"
          onClick={() => scrollHoriz('left')}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-pale border border-border text-muted hover:text-dark hover:bg-pale2 mr-1 flex-shrink-0 cursor-pointer shadow-2xs transition-colors"
          title="Scroll services left"
        >
          ‹
        </button>

        <div
          ref={scrollContainerRef}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-2.5 w-full scroll-smooth"
        >
          {services.map((s, idx) => {
            const NavIcon = s.Icon;
            const isActive = activeId === s.id;
            return (
              <button
                key={s.id}
                data-nav-id={s.id}
                type="button"
                onClick={() => scrollToService(s.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-[.82rem] font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  isActive
                    ? 'bg-gm text-white shadow-sm ring-1 ring-gold/40'
                    : 'text-muted hover:text-dark hover:bg-pale/80 border border-transparent'
                }`}
              >
                <NavIcon size={15} strokeWidth={isActive ? 2.2 : 1.8} className={isActive ? 'text-gold' : 'text-b4'} />
                <span>{s.title}</span>
                <span className={`text-[.68rem] px-1.5 py-0.5 rounded-full font-mono font-semibold ${
                  isActive ? 'bg-white/15 text-gold' : 'bg-pale text-muted'
                }`}>
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow on overflow */}
        <button
          type="button"
          onClick={() => scrollHoriz('right')}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-pale border border-border text-muted hover:text-dark hover:bg-pale2 ml-1 flex-shrink-0 cursor-pointer shadow-2xs transition-colors"
          title="Scroll services right"
        >
          ›
        </button>
      </div>
    </section>
  );
}

/* ────────── INDIVIDUAL SERVICE SECTION ────────── */

function ServiceSection({ service, index, isReversed }: { service: Service; index: number; isReversed: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const reviews = serviceReviews[service.id] || [];
  const [reviewIndex, setReviewIndex] = useState(() => (
    reviews.length > 0 ? Math.floor(Math.random() * reviews.length) : 0
  ));

  const currentReview = reviews[reviewIndex];

  const handleShuffle = () => {
    if (reviews.length <= 1) return;
    setReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section id={service.id} className={`py-28 md:py-32 px-[5%] scroll-mt-[140px] border-t border-border/40 ${index % 2 === 0 ? 'bg-white' : 'bg-page'}`}>
      <div ref={ref} className="max-w-[1240px] mx-auto">
        <motion.div className="text-center mb-16" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={container}>
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 text-[.72rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
              <span>Service 0{index + 1} of 0{services.length}</span>
              <span>·</span>
              <span>{service.badge}</span>
            </div>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.14] tracking-[-0.026em] text-dark mb-4">
            {service.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[1.02rem] leading-[1.78] text-body max-w-[65ch] mx-auto mb-4">
            {service.description}
          </motion.p>
          <motion.div variants={fadeUp}>
            <span className="inline-block text-[.82rem] font-semibold text-gold bg-pale border border-border px-4 py-1.5 rounded-full">
              {service.replaces}
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left card: What We Build */}
          <motion.div
            className={`group bg-white rounded-2xl border border-border p-7 sm:p-9 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={isReversed ? fadeRight : fadeLeft}
          >
            <div>
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-border/60">
                <div className="w-12 h-12 rounded-xl bg-pale border border-border flex items-center justify-center text-b4">
                  <service.Icon size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-heading text-[1.12rem] font-bold text-dark">What We Deliver</h3>
                  <div className="text-[.78rem] text-muted">Concrete features and deliverables included in your build</div>
                </div>
              </div>
              <ul className="list-none flex flex-col gap-3.5">
                {service.offers.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -14 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, ease, delay: 0.2 + j * 0.05 }}
                    className="flex items-start gap-3 text-[.9rem] text-body leading-[1.65]"
                  >
                    <CheckCircle size={17} strokeWidth={2.2} className="text-gold flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-border/50 text-[.8rem] text-muted font-medium">
              ✓ Tested on real devices prior to deployment
            </div>
          </motion.div>

          {/* Right card: Why It Matters */}
          <motion.div
            className={`group bg-gm rounded-2xl p-7 sm:p-9 shadow-lg text-white flex flex-col justify-between relative overflow-hidden ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={isReversed ? fadeLeft : fadeRight}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative z-[2]">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-white/12">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-gold">
                  <Shield size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-heading text-[1.12rem] font-bold text-white">Why It Matters For You</h3>
                  <div className="text-[.78rem] text-white/60">Business advantages and peace of mind</div>
                </div>
              </div>
              <ul className="list-none flex flex-col gap-3.5 mb-8">
                {service.benefits.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: 14 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, ease, delay: 0.2 + j * 0.05 }}
                    className="flex items-start gap-3 text-[.9rem] text-white/85 leading-[1.65]"
                  >
                    <CheckCircle size={17} strokeWidth={2.2} className="text-gold flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="relative z-[2] pt-6 border-t border-white/12 flex items-center justify-between gap-4 flex-wrap">
              <span className="text-[.82rem] text-white/60 font-medium">100% code and database ownership</span>
              <Link
                to="/contact"
                className="btn-cta-gold rounded-xl px-5 py-2.5 text-[.86rem] group"
              >
                <span>Plan This Build</span>
                <ArrowRight size={15} strokeWidth={2.4} className="btn-arrow" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Verified Client Project Review (Randomly Selected per Service) */}
        {currentReview && (
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="mt-8 bg-white border border-border/90 rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(20,16,58,0.03)] relative overflow-hidden group hover:border-gold/50 hover:shadow-[0_8px_32px_rgba(20,16,58,0.07)] transition-all duration-300"
          >
            {/* Subtle decorative glow orb */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top Header Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-border/60 relative z-[1]">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[.72rem] font-extrabold uppercase tracking-wider text-gold bg-gold/10 border border-gold/25">
                  <Star size={12} className="fill-gold text-gold" />
                  <span>Verified Project Review</span>
                </span>
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(currentReview.rating)].map((_, idx) => (
                    <Star key={idx} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[.76rem] font-semibold text-muted bg-pale px-3 py-1 rounded-lg border border-border/80">
                  Project: <strong className="text-dark font-bold">{currentReview.projectName}</strong>
                </span>
                {reviews.length > 1 && (
                  <button
                    type="button"
                    onClick={handleShuffle}
                    title="View another project review for this service"
                    className="inline-flex items-center gap-1.5 text-[.74rem] font-bold text-b4 bg-pale hover:bg-pale2 hover:text-dark px-2.5 py-1 rounded-lg border border-border transition-all cursor-pointer hover:border-b4/40"
                  >
                    <RefreshCw size={12} className="text-gold" />
                    <span>Shuffle</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quote text with smooth animated transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="relative z-[1]"
              >
                <p className="text-[.96rem] sm:text-[1.03rem] leading-[1.74] text-dark font-medium italic mb-6">
                  &ldquo;{currentReview.quote}&rdquo;
                </p>

                {/* Bottom Author & Outcome Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-gm text-gold font-bold text-sm flex items-center justify-center border-2 border-gold/30 shadow-xs flex-shrink-0">
                      {currentReview.initials}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-[.95rem] text-dark leading-tight">
                        {currentReview.clientName}
                      </div>
                      <div className="text-[.78rem] text-muted leading-tight mt-0.5">
                        {currentReview.clientRole} · <span className="font-semibold text-body">{currentReview.clientCompany}</span>
                        <span className="text-muted/70"> ({currentReview.clientLocation})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[.78rem] font-semibold text-emerald-900 shadow-2xs">
                      <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
                      <span>{currentReview.outcome}</span>
                    </div>

                    {currentReview.projectLink && (
                      <a
                        href={currentReview.projectLink}
                        target={currentReview.projectLink.startsWith('http') ? '_blank' : undefined}
                        rel={currentReview.projectLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[.78rem] font-bold text-b4 bg-pale hover:bg-pale2 border border-border hover:border-b4/40 transition-all hover:-translate-y-0.5 shadow-2xs"
                      >
                        <span>Live Project</span>
                        <ExternalLink size={12} strokeWidth={2.2} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Quick Prev / Next Service Navigator Bar */}
        <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between gap-4 flex-wrap text-[.84rem]">
          {index > 0 ? (
            <button
              type="button"
              onClick={() => {
                const prevEl = document.getElementById(services[index - 1].id);
                if (prevEl) {
                  const y = prevEl.getBoundingClientRect().top + window.pageYOffset - 130;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-white text-muted hover:text-dark hover:border-b4 hover:bg-pale/50 transition-all font-semibold cursor-pointer shadow-2xs hover:-translate-x-0.5"
            >
              <span>←</span>
              <span>Previous: <strong>{services[index - 1].title}</strong></span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-white text-muted hover:text-dark hover:bg-pale/50 transition-all font-semibold cursor-pointer shadow-2xs"
            >
              <span>↑</span>
              <span>Back to Top</span>
            </button>
          )}

          <div className="text-[.76rem] font-bold text-muted uppercase tracking-wider hidden sm:block">
            Service {index + 1} of {services.length}
          </div>

          {index < services.length - 1 ? (
            <button
              type="button"
              onClick={() => {
                const nextEl = document.getElementById(services[index + 1].id);
                if (nextEl) {
                  const y = nextEl.getBoundingClientRect().top + window.pageYOffset - 130;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gold/40 bg-gold/10 text-dark hover:bg-gold/20 hover:border-gold transition-all font-bold cursor-pointer shadow-2xs hover:translate-x-0.5 ml-auto sm:ml-0"
            >
              <span>Next: <strong>{services[index + 1].title}</strong></span>
              <span>→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-white text-muted hover:text-dark hover:bg-pale/50 transition-all font-semibold cursor-pointer shadow-2xs ml-auto sm:ml-0"
            >
              <span>↑</span>
              <span>Back to Top of Services</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── MAIN COMPONENT ─────────────── */

export default function Services() {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(services[0].id);
  const [navVisible, setNavVisible] = useState(true);
  const servicesWrapperRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  // Handle hash scrolling on initial mount & whenever URL hash changes (e.g. /services#custom-software)
  useEffect(() => {
    if (location.hash) {
      const hashId = location.hash.replace('#', '');
      const el = document.getElementById(hashId);
      if (el) {
        setTimeout(() => {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 130;
          window.scrollTo({ top: y, behavior: 'smooth' });
          setActiveServiceId(hashId);
        }, 120);
      }
    }
  }, [location.hash, location.key]);

  // Track active service on scroll + keep nav visible when browsing services
  useEffect(() => {
    const handleScroll = () => {
      const offset = 220;
      const scrollY = window.scrollY + offset;
      let foundActive = false;

      for (let i = services.length - 1; i >= 0; i--) {
        const el = document.getElementById(services[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveServiceId(services[i].id);
          foundActive = true;
          break;
        }
      }
      if (!foundActive) {
        setActiveServiceId(services[0].id);
      }

      if (servicesWrapperRef.current) {
        const wrapper = servicesWrapperRef.current;
        const wrapperTop = wrapper.offsetTop - 180;
        const wrapperBottom = wrapperTop + wrapper.offsetHeight + 180;
        const currentScroll = window.scrollY;
        setNavVisible(currentScroll >= wrapperTop && currentScroll <= wrapperBottom);
      } else {
        setNavVisible(window.scrollY > 200);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Services | Websites, Custom Software & Mobile Apps — Flowoid Rajkot</title>
        <meta name="description" content="Explore Flowoid's software services — websites, custom software, web applications, and mobile apps for businesses in Rajkot, Gujarat." />
      </Helmet>
      <Navbar />
      <PageHero />
      <ServiceNav activeId={activeServiceId} isVisible={navVisible} />

      {/* SERVICE SECTIONS */}
      <div ref={servicesWrapperRef}>
        {services.map((service, i) => (
          <ServiceSection key={service.id} service={service} index={i} isReversed={i % 2 !== 0} />
        ))}
      </div>

      {/* PROCESS */}
      <section className="bg-page py-28 md:py-32 px-[5%] border-t border-border/40">
        <div className="max-w-[1240px] mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={container}>
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 text-[.72rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
                How We Work
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.14] tracking-[-0.026em] text-dark mb-4">
              Our 4-Step <em className="not-italic grad-text">Delivery Workflow</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[1rem] leading-[1.75] text-body max-w-[65ch] mx-auto">
              Transparent, structured, and designed to keep you informed at every stage — zero surprises at launch.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={container}
          >
            {process.map((p, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 36, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease } } }}
                className="group relative"
              >
                <div className="bg-white border border-border rounded-2xl p-7 sm:p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-b4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-full bg-gg flex items-center justify-center text-white font-heading font-bold text-[.85rem] shadow-md">
                        {p.n}
                      </div>
                      <span className="text-[.72rem] font-bold text-muted uppercase tracking-[.08em]">
                        {p.stepTag}
                      </span>
                    </div>
                    <h3 className="font-heading text-[1.02rem] font-bold text-dark mb-2">{p.t}</h3>
                    <p className="text-[.86rem] text-muted leading-[1.65]">{p.d}</p>
                  </div>
                </div>
                {i < 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 text-border z-10">
                    <ArrowRight size={20} strokeWidth={1.5} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="bg-page py-28 md:py-32 px-[5%] border-t border-border/40">
        <div className="max-w-[1240px] mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={container}>
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 text-[.72rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
                Engineering Stack
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.14] tracking-[-0.026em] text-dark mb-4">
              Dependable tools we use <em className="not-italic grad-text">every day.</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[1rem] leading-[1.75] text-body max-w-[65ch] mx-auto">
              We avoid trendy hype and fragile frameworks. Every technology in our stack is chosen for speed, security, and long-term stability so your software runs smoothly for years.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={container}
          >
            {techCats.map((t, i) => {
              const TechIcon = t.Icon;
              return (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 24, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } } }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative overflow-hidden bg-white border border-border/90 rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-[0_2px_10px_rgba(20,16,58,0.03)] hover:shadow-[0_16px_36px_rgba(20,16,58,0.08)] hover:border-b4 transition-all duration-300 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gg before:scale-x-0 before:origin-left hover:before:scale-x-100 before:transition-transform before:duration-300 before:rounded-t-2xl"
                >
                  <div>
                    {/* Top Row: Icon + Title + Role */}
                    <div className="flex items-start gap-4 mb-5 pb-4 border-b border-border/60">
                      <div className="w-12 h-12 rounded-xl bg-pale border border-[rgba(45,43,107,0.12)] flex items-center justify-center text-b4 flex-shrink-0 group-hover:bg-gm group-hover:border-transparent group-hover:text-white group-hover:scale-105 transition-all duration-300">
                        <TechIcon size={22} strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="font-heading text-[1.05rem] font-bold text-dark mb-1 leading-snug">
                          {t.label}
                        </h3>
                        <p className="text-[.78rem] text-muted leading-tight">
                          {t.role}
                        </p>
                      </div>
                    </div>

                    {/* Chips with Brand Color Dots */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {t.chips.map((chip, j) => (
                        <div
                          key={j}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[.8rem] font-semibold text-[#121124] bg-page border border-border hover:bg-pale/70 hover:border-b4/40 hover:-translate-y-0.5 transition-all duration-200 shadow-2xs select-none"
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0 shadow-[0_0_4px_rgba(0,0,0,0.15)]"
                            style={{ backgroundColor: chip.color }}
                          />
                          <span>{chip.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Production Guarantee Banner */}
                  <div className="pt-4 border-t border-border/60 flex items-center gap-2.5 text-[.78rem] text-body font-medium bg-pale/40 -mx-7 sm:-mx-8 -mb-7 sm:-mb-8 px-7 sm:px-8 py-3.5 rounded-b-2xl">
                    <span className="text-gold font-bold text-[.85rem]">✓</span>
                    <span className="text-muted leading-snug">
                      <strong className="text-dark font-semibold">Outcome: </strong>
                      {t.benefit}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-page py-28 md:py-32 px-[5%] border-t border-border/40">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[.72rem] font-extrabold text-gold tracking-[.14em] uppercase mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
              FAQs
            </div>
            <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.14] tracking-[-0.026em] text-dark">
              Frequently Asked <em className="not-italic grad-text">Questions</em>
            </h2>
          </div>
          <div className="max-w-[800px] mx-auto space-y-3.5">
            {faqs.map((f, i) => (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 bg-white ${
                  openFaq === i ? 'border-gold shadow-md' : 'border-border'
                }`}
              >
                <button
                  type="button"
                  className={`w-full text-left flex items-center justify-between px-6 py-5 cursor-pointer font-heading text-[.96rem] font-bold text-dark gap-4 transition-colors duration-200 ${
                    openFaq === i ? 'bg-pale/40' : 'hover:bg-pale/20'
                  }`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <div className={`w-7 h-7 flex-shrink-0 rounded-lg flex items-center justify-center text-[.72rem] font-bold transition-all duration-300 ${
                    openFaq === i ? 'bg-gm text-white rotate-180' : 'bg-pale text-gold'
                  }`}>
                    ▾
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    openFaq === i ? 'max-h-[260px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 text-[.9rem] leading-[1.75] text-body border-t border-border/40">
                    {f.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOX */}
      <div className="bg-page px-[5%] py-28 md:py-32 border-t border-border/40">
        <div className="max-w-[1240px] mx-auto bg-gm rounded-[32px] px-6 sm:px-14 py-16 sm:py-20 text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute pointer-events-none rounded-full" style={{ width: 640, height: 640, top: -220, right: -160, background: 'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)', filter: 'blur(24px)' }} />
          <div className="inline-flex items-center gap-2 text-[.72rem] font-bold text-gold tracking-[.14em] uppercase mb-4 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">
            FIRST STEP
          </div>
          <h2 className="relative z-[2] font-heading text-[clamp(1.9rem,3.4vw,3rem)] font-extrabold text-white leading-[1.14] tracking-[-0.025em] mb-4 max-w-[780px] mx-auto">
            Get a free 20-minute technical roadmap. No Commitment-Just discovery, no invoice.
          </h2>
          <p className="relative z-[2] text-white/75 text-[1.02rem] leading-[1.78] max-w-[620px] mx-auto mb-9">
            Tell us what is slowing your business down — whether it is a messy spreadsheet, an outdated website, or a new mobile app concept. We will review your requirements, recommend the right tech, and give you an honest budget estimate.
          </p>
          <div className="relative z-[2] flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/contact"
              className="btn-cta-gold rounded-full min-h-[50px] px-8 py-3.5 group"
            >
              <span>Start Your Project</span>
              <ArrowRight size={17} strokeWidth={2.4} className="btn-arrow" />
            </Link>
            <a
              href="tel:+919924855931"
              className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 py-3.5 rounded-full text-[.92rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55"
            >
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
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
