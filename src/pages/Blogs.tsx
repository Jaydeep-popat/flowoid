import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

const BLOGS_PER_PAGE = 5;

interface BlogPost {
  id: string;
  title: string;
  publishedAt: string;
  preview: string;
  content: string[];
}

const blogPosts: BlogPost[] = [
  // Add new blogs at the top so they naturally stay on the first page.
  {
    id: 'future-ready-web-apps',
    title: 'How to Build Future-Ready Web Apps Without Overengineering',
    publishedAt: '2026-05-24',
    preview:
      'Modern products fail when teams chase trends instead of clarity. A future-ready web app starts with a clean architecture, measurable business goals, and progressive delivery. Build only what creates real value now, while keeping the foundation flexible for what comes next.',
    content: [
      'Many teams confuse complexity with maturity. They add layers of abstraction, too many services, and unnecessary tooling before understanding their product behavior. The result is slower releases and more fragile systems.',
      'A future-ready app should begin with predictable structure: well-scoped modules, reusable UI primitives, and explicit domain boundaries. This lets your codebase evolve without becoming chaotic every time a new feature is added.',
      'Performance should be planned from day one. Use lazy loading where meaningful, prioritize critical rendering paths, and treat accessibility as a product quality baseline. Fast, inclusive apps win trust quickly.',
      'The strongest strategy is iterative sophistication. Start simple, observe real usage, and scale architecture based on evidence. That is how products remain stable, adaptable, and truly future-ready.',
    ],
  },
  {
    id: 'ai-chatbots-that-actually-help',
    title: 'AI Chatbots That Actually Help: From FAQ Bot to Business Assistant',
    publishedAt: '2026-05-18',
    preview:
      'Most chatbots fail because they only answer scripted questions. A useful AI assistant understands context, handles edge cases, and connects with your real workflows. The goal is not flashy automation, but reliable support that reduces friction for users.',
    content: [
      'A chatbot should be treated like a product feature, not a marketing add-on. It needs a clear purpose: lead qualification, support triage, appointment handling, or internal process acceleration.',
      'Knowledge quality decides output quality. Build a structured source of truth, define fallback behavior, and include human handoff when confidence is low. That improves trust while reducing frustration.',
      'Integration is where value multiplies. Connect the bot with CRM, helpdesk, or inventory systems so it can do more than answer text. Actionable responses create real business impact.',
      'Finally, monitor conversations as product feedback. Repeated user confusion highlights UX gaps, documentation issues, and opportunities for smarter automation.',
    ],
  },
  {
    id: 'designing-for-conversion',
    title: 'Designing for Conversion: Why Visual Beauty Alone Is Not Enough',
    publishedAt: '2026-05-12',
    preview:
      'A beautiful interface can attract users, but only intentional flow converts them. Conversion-focused design combines hierarchy, trust signals, and frictionless actions. Great design is not decoration; it is a system that guides decisions with confidence.',
    content: [
      'Visual polish is valuable, but it cannot replace clarity. Visitors decide quickly whether a page feels trustworthy, relevant, and easy to use. If they hesitate, they leave.',
      'Start with one dominant action per section. Remove competing calls to action and support decisions with concise copy, social proof, and contextual reassurance.',
      'Micro-interactions matter when they reinforce intent. Feedback on clicks, form progress, and validation states reduces uncertainty and keeps users moving forward.',
      'When design and product metrics work together, conversion improves consistently. Track outcomes, test assumptions, and refine structure based on actual behavior.',
    ],
  },
  {
    id: 'scalable-frontend-architecture',
    title: 'Scalable Frontend Architecture for Teams That Move Fast',
    publishedAt: '2026-05-07',
    preview:
      'Fast teams need a frontend architecture that supports change, not one that breaks under pressure. The key is predictable component boundaries, shared patterns, and disciplined state strategy. Scale in frontend is less about size and more about maintainability.',
    content: [
      'When every feature is built with a different pattern, velocity collapses over time. Teams spend more time debugging inconsistencies than shipping outcomes.',
      'Define conventions early: folder structure, naming standards, state ownership rules, and design token usage. These decisions reduce accidental complexity.',
      'Prefer composable components and clear data flow over deeply coupled logic. Keep business rules close to domain modules and avoid spreading side effects across UI layers.',
      'A scalable frontend is one where new developers can contribute quickly, refactors stay safe, and product iteration remains predictable under growth.',
    ],
  },
  {
    id: 'cloud-cost-without-compromise',
    title: 'Reducing Cloud Cost Without Sacrificing Reliability',
    publishedAt: '2026-05-01',
    preview:
      'Cloud spend often grows silently until it becomes painful. Cost control does not mean cutting quality; it means improving architecture decisions and operational visibility. Reliable systems can be efficient when usage patterns are understood and optimized.',
    content: [
      'Start by mapping where cost actually comes from: compute, storage, data transfer, and idle resources. Most teams are surprised by how much waste is hidden in defaults.',
      'Apply right-sizing and auto-scaling with realistic thresholds. Overprovisioning for peak traffic that rarely occurs is a common and expensive mistake.',
      'Use observability to tie performance metrics with spend trends. This helps teams prioritize optimizations that preserve user experience while reducing waste.',
      'Cloud efficiency is an ongoing practice. Small monthly improvements in architecture and operations create large long-term savings.',
    ],
  },
  {
    id: 'seo-for-modern-sites',
    title: 'SEO for Modern Sites: What Actually Matters in 2026',
    publishedAt: '2026-04-24',
    preview:
      'SEO is no longer about keyword stuffing or random backlinks. Modern SEO rewards relevance, performance, and intent alignment. If your pages solve real user questions quickly, search engines and users both respond positively over time.',
    content: [
      'Technical health is the first layer: crawlability, structured metadata, clean internal linking, and strong Core Web Vitals. Without this foundation, content impact gets limited.',
      'Content strategy should map directly to user journeys. Create topic clusters that move readers from awareness to decision with clear, helpful depth.',
      'Authority grows from consistency and usefulness. Publish practical insights, update older pages, and keep information current for changing market behavior.',
      'Sustainable SEO is a product discipline. The sites that win are the ones that keep delivering value page after page.',
    ],
  },
  {
    id: 'shipping-mvp-right-way',
    title: 'Shipping an MVP the Right Way: Validate Before You Scale',
    publishedAt: '2026-04-18',
    preview:
      'An MVP should test assumptions fast, not launch a half-finished product with no direction. The right MVP defines a narrow user problem, delivers one strong workflow, and measures outcomes clearly. Speed matters, but focus matters more.',
    content: [
      'The biggest MVP mistake is trying to satisfy every user type in version one. That expands scope, delays launch, and hides what truly matters in the data.',
      'Build one complete loop that users can finish end-to-end. A polished core workflow creates better signal than many incomplete features.',
      'Define success metrics before launch: activation rate, repeat usage, completion time, and conversion actions. Measure behavior, not assumptions.',
      'Once validated, scale confidently with better prioritization. A focused MVP gives you clarity for roadmap decisions and resource allocation.',
    ],
  },
  {
    id: 'writing-maintainable-code',
    title: 'Writing Maintainable Code in Fast-Moving Product Teams',
    publishedAt: '2026-04-11',
    preview:
      'Maintainable code is not about perfection; it is about clarity under change. Product teams move fast, and code should support iteration instead of resisting it. Consistent structure, clear naming, and practical review culture create long-term speed.',
    content: [
      'Maintainability starts with readability. If another developer cannot understand intent quickly, feature velocity slows and bug risk increases.',
      'Use small, explicit abstractions with meaningful names. Avoid clever shortcuts that save minutes now but cost hours during debugging or onboarding.',
      'Code reviews should optimize for shared understanding, not only correctness. Teams that explain decisions build stronger engineering alignment over time.',
      'The goal is sustainable delivery. Clean, understandable code lets teams iterate confidently while preserving product quality.',
    ],
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function Blogs() {
  useScrollReveal();

  const [currentPage, setCurrentPage] = useState(1);
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);

  const sortedBlogs = useMemo(
    () => [...blogPosts].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)),
    [],
  );

  const totalPages = Math.ceil(sortedBlogs.length / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const visibleBlogs = sortedBlogs.slice(startIndex, startIndex + BLOGS_PER_PAGE);
  const activeBlog = sortedBlogs.find((post) => post.id === activeBlogId) ?? null;

  const openBlog = (id: string) => {
    setActiveBlogId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setActiveBlogId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Flowoid Blogs | Insights on Web, AI & Product Engineering</title>
        <meta
          name="description"
          content="Explore Flowoid blogs on web development, AI chatbots, product strategy, cloud, and scalable engineering practices."
        />
      </Helmet>

      <Navbar />

      <main className="bg-page min-h-screen pt-[96px] md:pt-[108px] pb-20 px-[5%]">
        <section className="max-w-[1120px] mx-auto mb-10">
          <div className="reveal rounded-3xl border border-border bg-white p-7 md:p-10 shadow-sm">
            <div className="flex items-center gap-2 text-[.72rem] font-semibold text-muted tracking-[.08em] uppercase mb-4">
              <Link to="/" className="text-muted no-underline">
                Home
              </Link>
              <span className="opacity-40">/</span>
              <span className="text-gold">Blogs</span>
            </div>

            <h1 className="font-heading font-black text-[clamp(2rem,4vw,3.3rem)] leading-[1.08] tracking-[-0.03em] text-dark mb-4">
              Thoughtful Blogs for Builders and Growing Businesses
            </h1>
            <p className="text-[.96rem] leading-[1.8] text-body max-w-[780px]">
              Explore practical insights on modern web development, AI chatbots, scalable software systems, and
              digital growth. You will see 5 blogs per page. Click any topic card to read the complete blog.
            </p>
          </div>
        </section>

        <section className="max-w-[1120px] mx-auto">
          {activeBlog ? (
            <article className="reveal rounded-3xl border border-border bg-white p-7 md:p-10 shadow-sm">
              <button
                onClick={() => setActiveBlogId(null)}
                className="inline-flex items-center gap-2 text-[.84rem] font-semibold text-b4 hover:text-dark transition-colors mb-5"
              >
                <ChevronLeft size={16} /> Back to blogs
              </button>

              <h2 className="font-heading font-extrabold text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.2] text-dark mb-3">
                {activeBlog.title}
              </h2>

              <div className="inline-flex items-center gap-2 text-[.8rem] text-muted mb-7">
                <CalendarDays size={14} />
                <span>{formatDate(activeBlog.publishedAt)}</span>
              </div>

              <div className="space-y-5">
                {activeBlog.content.map((paragraph, index) => (
                  <p key={index} className="text-[.95rem] leading-[1.9] text-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleBlogs.map((post) => (
                  <article
                    key={post.id}
                    className="reveal rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-lg hover:border-b4 transition-[border,box-shadow] duration-250"
                  >
                    <div className="inline-flex items-center gap-2 text-[.74rem] text-muted mb-3">
                      <CalendarDays size={13} />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>

                    <h2 className="font-heading text-[1.2rem] font-bold text-dark leading-[1.35] mb-3">{post.title}</h2>

                    <p className="text-[.9rem] text-body leading-[1.8] mb-5">{post.preview}</p>

                    <button
                      onClick={() => openBlog(post.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[.82rem] font-bold text-white bg-mg shadow-[0_6px_18px_rgba(20,16,58,.26)] hover:-translate-y-[1px] transition-transform duration-200"
                    >
                      Read Full Blog <ChevronRight size={15} />
                    </button>
                  </article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => goToPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3.5 py-2 rounded-xl border border-border bg-white text-[.82rem] font-semibold text-body disabled:opacity-45 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 rounded-xl text-[.84rem] font-bold transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-dark text-white shadow-[0_8px_22px_rgba(15,14,42,.25)]'
                          : 'bg-white text-body border border-border hover:border-b4'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3.5 py-2 rounded-xl border border-border bg-white text-[.82rem] font-semibold text-body disabled:opacity-45 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer variant="inner" />
      <BackToTop />
    </>
  );
}
