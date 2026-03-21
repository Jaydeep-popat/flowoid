import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/global.css';
import '../styles/home.css';

/* ─── DATA ─────────────────────────────────────────────── */
const services = [
  { n: '01', ico: '🖥️', name: 'Custom Software Development', info: 'End-to-end development of web, mobile, and desktop applications tailored precisely to your business workflows and requirements.' },
  { n: '02', ico: '☁️', name: 'Cloud Infrastructure & Migration', info: 'Seamlessly migrate to AWS, Azure, or GCP. We design scalable, cost-efficient cloud architectures that grow with your business.', feat: true },
  { n: '03', ico: '🔐', name: 'Cybersecurity Solutions', info: 'Comprehensive security audits, penetration testing, threat monitoring, and compliance frameworks to keep your data protected 24/7.' },
  { n: '04', ico: '📊', name: 'Data Analytics & BI', info: 'Transform raw data into actionable intelligence. Real-time dashboards, data warehouses, and predictive analytics pipelines built for you.' },
  { n: '05', ico: '🔗', name: 'ERP & System Integration', info: 'Connect disparate tools and systems. We implement and integrate ERP, CRM, and third-party platforms without disrupting operations.' },
  { n: '06', ico: '🤝', name: 'IT Consulting & Strategy', info: 'Strategic technology advisory to align your IT investments with business goals — roadmaps, vendor selection, and digital transformation.' },
];

const whyFeats = [
  { ico: '🎯', t: 'Requirement-First Approach', d: 'We deep-dive into your requirements before writing a single line of code, ensuring every solution is precisely what you need.' },
  { ico: '⚡', t: 'Agile & Fast Delivery', d: 'Iterative sprints, continuous feedback, and rapid deployment cycles ensure you see results faster than traditional vendors.' },
  { ico: '🛡️', t: 'Enterprise-Grade Quality', d: 'Rigorous testing, security-first architecture, and production-ready code that performs under real-world enterprise demands.' },
];

const stats = [
  { num: '300', suf: '+', lbl: 'Enterprise Clients Served' },
  { num: '1.2', suf: 'K', lbl: 'Projects Delivered' },
  { num: '99', suf: '%', lbl: 'On-Time Delivery Rate' },
  { num: '24', suf: '/7', lbl: 'Support & Monitoring' },
];

const portfolio = [
  { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop', tag: 'Enterprise Software', name: 'Real-Time Analytics Platform', desc: 'Built for a Fortune 500 client — processes 50M events/day with sub-second latency.', cls: 'sr-l' },
  { img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop', tag: 'Cybersecurity', name: 'Zero-Trust Security Framework', desc: 'Deployed across 12 global offices, protecting sensitive financial data with SOC2 compliance.', cls: 'sr-r d1' },
  { img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=450&fit=crop', tag: 'Cloud Migration', name: 'Multi-Cloud Migration for HealthTech', desc: 'Migrated legacy EHR systems to AWS with zero downtime and 60% cost reduction.', cls: 'sr-l d2' },
  { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop', tag: 'ERP Integration', name: 'SAP + Custom CRM Integration', desc: 'Unified 8 disconnected systems for a retail chain of 200+ stores with zero downtime.', cls: 'sr-r d3' },
];

const testimonials1 = [
  { tf: true, title: 'Amazing to work with', q: "Our redesign result is thrilling. TechSphere was amazing to work with, making the process fun and stress-free. They are always super responsive.", init: 'RK', name: 'Rajesh Kumar', role: 'CEO & Founder @ClickMagick' },
  { tf: false, title: 'Outstanding product design', q: "Their creativity and technical skills resulted in visually stunning, user-friendly designs. An absolute pleasure working with such talented people. Highly recommend!", init: 'SR', name: 'Sneha Reddy', role: 'Product Owner @Plix' },
  { tf: false, title: 'Reliable, Fast, Easy', q: "TechSphere was incredibly fast, offering numerous options. They solicit feedback constantly and worked hard to create the perfect design for us.", init: 'VS', name: 'Vikram Singh', role: 'Co-Founder @Legacy Blueprint' },
  { tf: true, title: 'TechSphere is one of the most talented', q: "TechSphere is one of the most talented teams I've worked with. They go above and beyond in understanding and executing design excellence.", init: 'AP', name: 'Aarav Patel', role: 'Marketing Lead @Stepsize' },
  { tf: false, title: 'Game-Changing Partnership', q: "Working with TechSphere was a game-changer. Their mobile app development expertise helped us launch our product successfully and reach new market heights.", init: 'AM', name: 'Arjun Mehta', role: 'CTO @InnovateCorp' },
  { tf: false, title: 'Brilliant cloud architects', q: "The team migrated our entire infrastructure to AWS with zero downtime. Their cloud expertise saved us 60% on costs and improved performance dramatically.", init: 'PK', name: 'Priya Kapoor', role: 'CTO @FinanceFirst' },
];

const testimonials2 = [
  { tf: false, title: 'Incredibly professional team', q: "The TechSphere team is incredibly professional and talented. They delivered our e-commerce platform on time, within budget, and with outstanding quality.", init: 'PS', name: 'Priya Sharma', role: 'Marketing Director @GrowthFirst' },
  { tf: true, title: 'Excellent Design', q: "Working with TechSphere has been a pleasure. They were fast, communicative, and crafted an excellent design that met all our requirements perfectly.", init: 'AG', name: 'Ananya Gupta', role: 'CEO & Co-Founder @Prönö' },
  { tf: false, title: 'Transformed our digital presence', q: "TechSphere completely transformed our digital presence. Their team delivered exceptional results that far exceeded our expectations and business goals.", init: 'NS', name: 'Neha Sharma', role: 'CEO @TechFlow Solutions' },
  { tf: false, title: 'Security experts', q: "Their cybersecurity audit identified 23 critical vulnerabilities we didn't know existed. The remediation was swift and thorough. Now we sleep easy.", init: 'RT', name: 'Ravi Tiwari', role: 'CISO @DataVault' },
  { tf: true, title: 'ERP integration experts', q: "Our 8 disconnected systems now talk seamlessly. TechSphere's ERP integration saved our team 15 hours a week. The ROI was visible in month one.", init: 'SM', name: 'Suresh Menon', role: 'COO @RetailGiant' },
  { tf: false, title: '5-star consulting', q: "Their IT consulting roadmap became our company's technology bible. 6 months in, we've automated 70% of manual processes. Exceptional team.", init: 'KP', name: 'Kavya Pillai', role: 'VP Operations @ScaleUp' },
];

const techStack = [
  { ico: '⚛️', name: 'React' }, { ico: '🟢', name: 'Node.js' }, { ico: '🐍', name: 'Python' },
  { ico: '☁️', name: 'AWS' }, { ico: '🔷', name: 'Azure' }, { ico: '🐳', name: 'Docker' },
  { ico: '☸️', name: 'Kubernetes' }, { ico: '🍃', name: 'MongoDB' }, { ico: '🐘', name: 'PostgreSQL' },
  { ico: '🔴', name: 'Redis' }, { ico: '📱', name: 'React Native' }, { ico: '🤖', name: 'TensorFlow' },
];

const logos = ['Microsoft', 'Deloitte', 'Accenture', 'Infosys', 'Wipro', 'TCS', 'HCL Technologies', 'Capgemini', 'Oracle', 'SAP'];

/* ─── TCARD COMPONENT ─────────────────────────────────── */
function TCard({ tf, title, q, init, name, role }: typeof testimonials1[0]) {
  return (
    <div className={`tcard${tf ? ' tf' : ''}`}>
      <div className="tcard-title">{title}</div>
      <p className="tq">{q}</p>
      <hr className="tper-divider" />
      <div className="tper">
        <div className="tav-init">{init}</div>
        <div>
          <div className="tname">{name}<span className="ton" /></div>
          <div className="trole">{role}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── THREE.JS GLOBE ─────────────────────────────────── */
function ThreeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Dynamically load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => initGlobe();
    document.head.appendChild(script);

    function initGlobe() {
      const canvas = canvasRef.current;
      if (!canvas || !(window as any).THREE) return;
      const THREE = (window as any).THREE;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0, 0);
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
      camera.position.set(0, 0, 6);

      function resize() {
        const w = canvas!.clientWidth, h = canvas!.clientHeight;
        renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      }
      resize(); window.addEventListener('resize', resize);

      scene.add(new THREE.AmbientLight(0x8888cc, .7));
      const dl = new THREE.DirectionalLight(0xffffff, 2.2); dl.position.set(5, 6, 6); scene.add(dl);
      const pl1 = new THREE.PointLight(0xc9a84c, 5, 18); pl1.position.set(-4, 3, 4); scene.add(pl1);
      const pl2 = new THREE.PointLight(0x4845a8, 3, 14); pl2.position.set(4, -3, -3); scene.add(pl2);
      const pl3 = new THREE.PointLight(0xe8c96a, 2, 10); pl3.position.set(0, 4, 2); scene.add(pl3);

      const cMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.25, 2),
        new THREE.MeshPhongMaterial({ color: 0x1a1845, emissive: 0x08071c, specular: 0xc9a84c, shininess: 220, transparent: true, opacity: .92 })
      ); scene.add(cMesh);
      const wMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.28, 2),
        new THREE.MeshBasicMaterial({ color: 0xc9a84c, wireframe: true, transparent: true, opacity: .16 })
      ); scene.add(wMesh);
      scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.82, 32, 32), new THREE.MeshBasicMaterial({ color: 0x2d2b6b, transparent: true, opacity: .06, side: THREE.BackSide })));

      const mkR = (r: number, t: number, c: number, rx: number, ry: number) => {
        const m = new THREE.Mesh(new THREE.TorusGeometry(r, t, 6, 90), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: .55 }));
        m.rotation.x = rx; m.rotation.y = ry; return m;
      };
      const r1 = mkR(2.1, .016, 0x4845a8, Math.PI / 4, 0);
      const r2 = mkR(2.6, .011, 0xc9a84c, -Math.PI / 5, .5);
      const r3 = mkR(1.8, .009, 0xe8c96a, Math.PI / 2, 0);
      scene.add(r1, r2, r3);

      const mkO = (c: number, s: number) => new THREE.Mesh(new THREE.SphereGeometry(s, 16, 16), new THREE.MeshPhongMaterial({ color: c, emissive: c, emissiveIntensity: .55 }));
      const o1 = mkO(0xc9a84c, .14), o2 = mkO(0x4845a8, .10), o3 = mkO(0xe8c96a, .12);
      scene.add(o1, o2, o3);

      const sg = new THREE.BufferGeometry(), sp = new Float32Array(280 * 3);
      for (let i = 0; i < 280; i++) { const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), r = 2.8 + Math.random() * 2; sp[i * 3] = r * Math.sin(ph) * Math.cos(th); sp[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th); sp[i * 3 + 2] = r * Math.cos(ph); }
      sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
      scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xd4b866, size: .04, transparent: true, opacity: .7 })));

      let mx = 0, my = 0;
      document.addEventListener('mousemove', (e) => { mx = (e.clientX / innerWidth - .5) * 2; my = (e.clientY / innerHeight - .5) * 2; });

      let t = 0;
      let animId: number;
      function animate() {
        animId = requestAnimationFrame(animate); t += .01;
        cMesh.rotation.x = t * .28 + my * .25; cMesh.rotation.y = t * .45 + mx * .25; wMesh.rotation.copy(cMesh.rotation);
        r1.rotation.z = t * .35; r2.rotation.z = -t * .28; r3.rotation.y = t * .55;
        o1.position.set(Math.cos(t * .7) * 2.1, Math.sin(t * .7) * 2.1 * .28, Math.sin(t * .7) * .6);
        o2.position.set(Math.cos(t * .5 + 2) * 2.6, Math.sin(t * .9) * .5, Math.sin(t * .5 + 2) * 2.6);
        o3.position.set(Math.sin(t * .6 + 1) * 1.8, Math.cos(t * .6 + 1) * 1.8, Math.sin(t * .4) * .5);
        camera.position.x += (mx * .45 - camera.position.x) * .05;
        camera.position.y += (-my * .45 - camera.position.y) * .05;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      }
      animate();
      return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); renderer.dispose(); };
    }

    return () => { document.head.removeChild(script); };
  }, []);

  return <canvas ref={canvasRef} id="threeCanvas" />;
}

/* ─── BG PARTICLES CANVAS ─────────────────────────────── */
function BgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    let W: number, H: number, pts: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    let animId: number;

    function resize() { W = c!.width = c!.parentElement!.offsetWidth; H = c!.height = c!.parentElement!.offsetHeight; }
    resize();

    function init() {
      pts = [];
      const n = Math.floor(W * H / 18000);
      for (let i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18, r: Math.random() * 1.1 + .3, a: Math.random() * .1 + .04 });
    }
    init();

    function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45,43,107,${p.a})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 80) { ctx.beginPath(); ctx.strokeStyle = `rgba(45,43,107,${.05 * (1 - d / 80)})`; ctx.lineWidth = .4; ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    const resizeHandler = () => { resize(); init(); };
    window.addEventListener('resize', resizeHandler);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resizeHandler); };
  }, []);

  return <canvas ref={canvasRef} id="bgCanvas" />;
}

/* ─── HOME PAGE ──────────────────────────────────────── */
export default function Home() {
  useScrollReveal();

  return (
    <>
      <Navbar variant="home" />

      {/* HERO */}
      <section id="hero">
        <div className="h-ring hr1" /><div className="h-ring hr2" /><div className="h-ring hr3" />
        <div className="h-glow" /><div className="h-glow2" />
        <BgCanvas />
        <div className="hero-left">
          <div className="h-eyebrow"><span className="bpulse" />IT Startup · Est. 2020 · India</div>
          <h1 className="h1">We Build the Tech<br />That Powers<br /><span className="shine">Your Business.</span></h1>
          <p className="h-sub">TechSphere delivers custom software, cloud infrastructure, and digital products — built to your exact requirements, shipped faster than any enterprise vendor.</p>
          <div className="h-chips">
            <div className="h-chip">☁️ Cloud Migration</div>
            <div className="h-chip">🔐 Cybersecurity</div>
            <div className="h-chip">⚡ 3× Faster Delivery</div>
            <div className="h-chip">🌍 28 Countries</div>
          </div>
          <div className="h-btns">
            <Link to="/contact" className="btn-hw">
              <span>Start Your Project</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <button className="btn-ho"><span className="playbtn">▶</span>See How It Works</button>
          </div>
          <div className="h-trust">
            <div className="t-avs">
              <div className="t-av"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="client" /></div>
              <div className="t-av"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt="client" /></div>
              <div className="t-av"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt="client" /></div>
              <div className="t-av"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" alt="client" /></div>
            </div>
            <div className="t-info"><strong>300+ happy clients</strong><br />across 28 countries worldwide</div>
          </div>
        </div>
        <div className="hero-right">
          <ThreeGlobe />
          <div className="fcard fc-a"><div className="fc-ico">🚀</div><div><div className="fc-lbl">Projects Delivered</div><div className="fc-val">1,200+ <span className="fc-hi">↑ this year</span></div></div></div>
          <div className="fcard fc-b"><div className="fc-ico">⚡</div><div><div className="fc-lbl">Avg. Delivery</div><div className="fc-val">3× Faster <span className="fc-hi">vs industry</span></div></div></div>
          <div className="fcard fc-c"><div className="fc-ico">✅</div><div><div className="fc-lbl">Client Retention</div><div className="fc-val">96% <span className="fc-hi">satisfaction</span></div></div></div>
        </div>
        <div className="scroll-cue" onClick={() => document.getElementById('logos')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="sc-t">Scroll</span><div className="sc-l" />
        </div>
      </section>

      {/* LOGOS */}
      <div id="logos">
        <div className="lb-inner">
          <span className="lb-lbl">Trusted by</span>
          <div className="lb-track">
            <div className="lb-row">
              {[...logos, ...logos].map((l, i) => <span key={i} className="lb-it">{l}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="sec" id="services">
        <div className="sec-in">
          <div className="sv-head">
            <div>
              <div className="stag sr">Our Services</div>
              <h2 className="stitle sr d1">IT Solutions Built<br /><span className="gt">For Your Exact Needs</span></h2>
            </div>
            <Link to="/services" className="btn-all sr d2">View All Services →</Link>
          </div>
          <div className="sv-grid">
            {services.map((s, i) => (
              <div key={i} className={`sv-card sr${s.feat ? ' feat' : ''}${i > 0 ? ` d${Math.min(i, 5)}` : ''}`}>
                {s.feat && <div className="sv-shimmer" />}
                <div className="sv-n">{s.n}</div>
                <div className="sv-ico">{s.ico}</div>
                <div className="sv-name">{s.name}</div>
                <p className="sv-info">{s.info}</p>
                <span className="sv-lnk">Explore →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="sec-alt" id="why" style={{ padding: '96px 5%' }}>
        <div className="why-g">
          <div className="why-imgs sr-l">
            <div className="why-main"><img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop" alt="IT team" loading="lazy" /></div>
            <div className="why-thumb"><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop" alt="Server" loading="lazy" /></div>
            <div className="why-badge"><span className="wbnum">12+</span><span className="wblbl">Years of Excellence</span></div>
          </div>
          <div className="sr-r d1">
            <div className="stag">Why TechSphere</div>
            <h2 className="stitle">We Don't Just Build IT.<br />We <span className="gt">Partner With You.</span></h2>
            <p className="ssub">Every business has unique technology challenges. We listen first, then engineer solutions that solve your actual problems — not generic ones.</p>
            <div className="why-feats">
              {whyFeats.map((w, i) => (
                <div key={i} className={`wfeat sr d${i + 2}`}>
                  <div className="wfico">{w.ico}</div>
                  <div><div className="wft">{w.t}</div><p className="wfd">{w.d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="sec" style={{ padding: '0 5% 96px' }}>
        <div className="stats-strip sr-s">
          {stats.map((s, i) => (
            <div key={i} className="scel">
              <div className="snum">{s.num}<em>{s.suf}</em></div>
              <div className="slbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="sec-alt" id="portfolio" style={{ padding: '96px 5%' }}>
        <div className="sec-in">
          <div className="port-h">
            <div><div className="stag sr">Our Work</div><h2 className="stitle sr d1">Projects That <span className="gt">Speak for Themselves</span></h2></div>
            <Link to="/projects" className="btn-all sr d2">View Full Portfolio →</Link>
          </div>
          <div className="port-g">
            {portfolio.map((p, i) => (
              <div key={i} className={`pcard ${p.cls}`}>
                <img src={p.img} alt={p.name} loading="lazy" />
                <div className="p-ov">
                  <div className="ptag">{p.tag}</div>
                  <div className="pname">{p.name}</div>
                  <div className="pdesc">{p.desc}</div>
                  <span className="plnk">View Case Study →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testi" style={{ background: '#fff' }}>
        <div className="testi-head">
          <div className="stag sr">Testimonials</div>
          <h2 className="stitle sr d1">What Our Clients <span className="gt">Actually Say</span></h2>
          <p className="ssub sr d2">Hear what our clients have to say about their experience.</p>
        </div>
        <div className="testi-marquee-wrap">
          <div className="testi-row testi-row-1">
            {[...testimonials1, ...testimonials1].map((t, i) => <TCard key={i} {...t} />)}
          </div>
          <div className="testi-row testi-row-2">
            {[...testimonials2, ...testimonials2].map((t, i) => <TCard key={i} {...t} />)}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="sec-alt" id="tech" style={{ padding: '96px 5%' }}>
        <div className="sec-in">
          <div className="tech-h">
            <div className="stag sr">Technology Stack</div>
            <h2 className="stitle sr d1" style={{ textAlign: 'center' }}>Powered by Industry-Leading<br /><span className="gt">Technologies</span></h2>
          </div>
          <div className="tgrid">
            {techStack.map((t, i) => (
              <div key={i} className={`tchip sr-s${i > 0 ? ` d${Math.min(i % 3 + 1, 5)}` : ''}`}>
                <div className="tcico">{t.ico}</div>
                <div className="tcname">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ background: '#fff', padding: '80px 5% 110px' }}>
        <div className="cta-box sr-s">
          <div className="cta-dots" /><div className="cta-band" />
          <h2 className="cta-title">Have a Project in Mind?<br />Let's Build It Together.</h2>
          <p className="cta-sub">Share your requirements with us — big or small. We'll analyze your needs and come back with a detailed proposal, timeline, and transparent pricing. No strings attached.</p>
          <div className="cta-btns">
            <Link to="/contact" className="btn-cw">Start Your Project →</Link>
            <Link to="/contact" className="btn-co">Schedule a Call</Link>
          </div>
          <div className="cta-note"><span>✓</span>Free consultation &nbsp;·&nbsp; <span>✓</span>No commitment &nbsp;·&nbsp; <span>✓</span>Response within 24 hrs</div>
        </div>
      </section>

      <Footer variant="home" />
      <BackToTop />
    </>
  );
}
