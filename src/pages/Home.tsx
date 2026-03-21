import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';

/* ─── DATA ─────────────────────────────────────────────── */
const services = [
  { n: '01', ico: '🖥️', name: 'Custom Software Development',       info: 'End-to-end development of web, mobile, and desktop applications tailored precisely to your business workflows and requirements.' },
  { n: '02', ico: '☁️', name: 'Cloud Infrastructure & Migration',   info: 'Seamlessly migrate to AWS, Azure, or GCP. We design scalable, cost-efficient cloud architectures that grow with your business.', feat: true },
  { n: '03', ico: '🔐', name: 'Cybersecurity Solutions',            info: 'Comprehensive security audits, penetration testing, threat monitoring, and compliance frameworks to keep your data protected 24/7.' },
  { n: '04', ico: '📊', name: 'Data Analytics & BI',               info: 'Transform raw data into actionable intelligence. Real-time dashboards, data warehouses, and predictive analytics pipelines built for you.' },
  { n: '05', ico: '🔗', name: 'ERP & System Integration',          info: 'Connect disparate tools and systems. We implement and integrate ERP, CRM, and third-party platforms without disrupting operations.' },
  { n: '06', ico: '🤝', name: 'IT Consulting & Strategy',          info: 'Strategic technology advisory to align your IT investments with business goals — roadmaps, vendor selection, and digital transformation.' },
];

const whyFeats = [
  { ico: '🎯', t: 'Requirement-First Approach', d: 'We deep-dive into your requirements before writing a single line of code, ensuring every solution is precisely what you need.' },
  { ico: '⚡', t: 'Agile & Fast Delivery',      d: 'Iterative sprints, continuous feedback, and rapid deployment cycles ensure you see results faster than traditional vendors.' },
  { ico: '🛡️', t: 'Enterprise-Grade Quality',   d: 'Rigorous testing, security-first architecture, and production-ready code that performs under real-world enterprise demands.' },
];

const stats = [
  { num: '300', suf: '+',  lbl: 'Enterprise Clients Served' },
  { num: '1.2', suf: 'K', lbl: 'Projects Delivered' },
  { num: '99',  suf: '%', lbl: 'On-Time Delivery Rate' },
  { num: '24',  suf: '/7',lbl: 'Support & Monitoring' },
];

const portfolio = [
  { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop', tag: 'Enterprise Software', name: 'Real-Time Analytics Platform',       desc: 'Built for a Fortune 500 client — processes 50M events/day with sub-second latency.', cls: 'sr-l' },
  { img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop', tag: 'Cybersecurity',      name: 'Zero-Trust Security Framework',       desc: 'Deployed across 12 global offices, protecting sensitive financial data with SOC2 compliance.', cls: 'sr-r d1' },
  { img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=450&fit=crop', tag: 'Cloud Migration',    name: 'Multi-Cloud Migration for HealthTech', desc: 'Migrated legacy EHR systems to AWS with zero downtime and 60% cost reduction.', cls: 'sr-l d2' },
  { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop', tag: 'ERP Integration',    name: 'SAP + Custom CRM Integration',        desc: 'Unified 8 disconnected systems for a retail chain of 200+ stores with zero downtime.', cls: 'sr-r d3' },
];

const testimonials1 = [
  { tf: true,  title: 'Amazing to work with',                   q: "Our redesign result is thrilling. TechSphere was amazing to work with, making the process fun and stress-free. They are always super responsive.",                   init: 'RK', name: 'Rajesh Kumar', role: 'CEO & Founder @ClickMagick' },
  { tf: false, title: 'Outstanding product design',             q: "Their creativity and technical skills resulted in visually stunning, user-friendly designs. An absolute pleasure working with such talented people. Highly recommend!", init: 'SR', name: 'Sneha Reddy',   role: 'Product Owner @Plix' },
  { tf: false, title: 'Reliable, Fast, Easy',                   q: "TechSphere was incredibly fast, offering numerous options. They solicit feedback constantly and worked hard to create the perfect design for us.",                      init: 'VS', name: 'Vikram Singh',  role: 'Co-Founder @Legacy Blueprint' },
  { tf: true,  title: 'TechSphere is one of the most talented', q: "TechSphere is one of the most talented teams I've worked with. They go above and beyond in understanding and executing design excellence.",                          init: 'AP', name: 'Aarav Patel',   role: 'Marketing Lead @Stepsize' },
  { tf: false, title: 'Game-Changing Partnership',              q: "Working with TechSphere was a game-changer. Their mobile app development expertise helped us launch our product successfully and reach new market heights.",            init: 'AM', name: 'Arjun Mehta',   role: 'CTO @InnovateCorp' },
  { tf: false, title: 'Brilliant cloud architects',             q: "The team migrated our entire infrastructure to AWS with zero downtime. Their cloud expertise saved us 60% on costs and improved performance dramatically.",             init: 'PK', name: 'Priya Kapoor',  role: 'CTO @FinanceFirst' },
];
const testimonials2 = [
  { tf: false, title: 'Incredibly professional team',  q: "The TechSphere team is incredibly professional and talented. They delivered our e-commerce platform on time, within budget, and with outstanding quality.",        init: 'PS', name: 'Priya Sharma',  role: 'Marketing Director @GrowthFirst' },
  { tf: true,  title: 'Excellent Design',              q: "Working with TechSphere has been a pleasure. They were fast, communicative, and crafted an excellent design that met all our requirements perfectly.",                  init: 'AG', name: 'Ananya Gupta',  role: 'CEO & Co-Founder @Prönö' },
  { tf: false, title: 'Transformed our digital presence', q: "TechSphere completely transformed our digital presence. Their team delivered exceptional results that far exceeded our expectations and business goals.",           init: 'NS', name: 'Neha Sharma',   role: 'CEO @TechFlow Solutions' },
  { tf: false, title: 'Security experts',              q: "Their cybersecurity audit identified 23 critical vulnerabilities we didn't know existed. The remediation was swift and thorough. Now we sleep easy.",                  init: 'RT', name: 'Ravi Tiwari',   role: 'CISO @DataVault' },
  { tf: true,  title: 'ERP integration experts',       q: "Our 8 disconnected systems now talk seamlessly. TechSphere's ERP integration saved our team 15 hours a week. The ROI was visible in month one.",                       init: 'SM', name: 'Suresh Menon',  role: 'COO @RetailGiant' },
  { tf: false, title: '5-star consulting',             q: "Their IT consulting roadmap became our company's technology bible. 6 months in, we've automated 70% of manual processes. Exceptional team.",                           init: 'KP', name: 'Kavya Pillai',  role: 'VP Operations @ScaleUp' },
];

const techStack = [
  { ico: '⚛️', name: 'React' },      { ico: '🟢', name: 'Node.js' },  { ico: '🐍', name: 'Python' },
  { ico: '☁️', name: 'AWS' },        { ico: '🔷', name: 'Azure' },    { ico: '🐳', name: 'Docker' },
  { ico: '☸️', name: 'Kubernetes' }, { ico: '🍃', name: 'MongoDB' },  { ico: '🐘', name: 'PostgreSQL' },
  { ico: '🔴', name: 'Redis' },      { ico: '📱', name: 'React Native' }, { ico: '🤖', name: 'TensorFlow' },
];

const logos = ['Microsoft', 'Deloitte', 'Accenture', 'Infosys', 'Wipro', 'TCS', 'HCL Technologies', 'Capgemini', 'Oracle', 'SAP'];

/* ─── TCARD ─────────────────────────────────────────────── */
function TCard({ tf, title, q, init, name, role }: typeof testimonials1[0]) {
  return (
    <div className={`flex-shrink-0 w-[340px] sm:w-[300px] p-[28px_26px] rounded-[20px] border cursor-default transition-[transform,box-shadow] duration-300 hover:-translate-y-1 ${
      tf
        ? 'bg-[linear-gradient(145deg,#3730a3_0%,#4845A8_100%)] border-transparent shadow-[0_8px_32px_rgba(45,43,107,.35)] hover:shadow-[0_16px_48px_rgba(45,43,107,.45)]'
        : 'bg-white border-border shadow-[0_4px_20px_rgba(15,14,42,.07)] hover:shadow-[0_12px_36px_rgba(15,14,42,.12)]'
    }`}>
      <div className={`font-heading text-[1rem] font-bold mb-3 leading-[1.3] ${tf ? 'text-white' : 'text-dark'}`}>{title}</div>
      <p className={`text-[.87rem] leading-[1.78] mb-5 ${tf ? 'text-white/82' : 'text-muted'}`}>{q}</p>
      <hr className={`border-none border-t mb-4 ${tf ? 'border-white/20' : 'border-border'}`} />
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-heading text-[.8rem] font-bold flex-shrink-0 ${tf ? 'bg-white/20 border-white/30 text-white' : 'bg-pale2 border-border text-b3'}`}>{init}</div>
        <div>
          <div className={`font-heading text-[.88rem] font-bold ${tf ? 'text-white/90' : 'text-dark'}`}>
            {name}<span className="inline-block w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,.5)] ml-[5px] align-middle animate-blink" />
          </div>
          <div className={`text-[.75rem] ${tf ? 'text-white/60' : 'text-muted'}`}>{role}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── THREE.JS GLOBE ─────────────────────────────────── */
function ThreeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

      const cMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, 2), new THREE.MeshPhongMaterial({ color: 0x1a1845, emissive: 0x08071c, specular: 0xc9a84c, shininess: 220, transparent: true, opacity: .92 })); scene.add(cMesh);
      const wMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.28, 2), new THREE.MeshBasicMaterial({ color: 0xc9a84c, wireframe: true, transparent: true, opacity: .16 })); scene.add(wMesh);
      scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.82, 32, 32), new THREE.MeshBasicMaterial({ color: 0x2d2b6b, transparent: true, opacity: .06, side: THREE.BackSide })));

      const mkR = (r: number, t: number, c: number, rx: number, ry: number) => { const m = new THREE.Mesh(new THREE.TorusGeometry(r, t, 6, 90), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: .55 })); m.rotation.x = rx; m.rotation.y = ry; return m; };
      const r1 = mkR(2.1, .016, 0x4845a8, Math.PI / 4, 0);
      const r2 = mkR(2.6, .011, 0xc9a84c, -Math.PI / 5, .5);
      const r3 = mkR(1.8, .009, 0xe8c96a, Math.PI / 2, 0);
      scene.add(r1, r2, r3);

      const mkO = (c: number, s: number) => new THREE.Mesh(new THREE.SphereGeometry(s, 16, 16), new THREE.MeshPhongMaterial({ color: c, emissive: c, emissiveIntensity: .55 }));
      const o1 = mkO(0xc9a84c, .14), o2 = mkO(0x4845a8, .10), o3 = mkO(0xe8c96a, .12);
      scene.add(o1, o2, o3);

      const sg = new THREE.BufferGeometry(), sp = new Float32Array(280 * 3);
      for (let i = 0; i < 280; i++) { const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), r = 2.8 + Math.random() * 2; sp[i*3]=r*Math.sin(ph)*Math.cos(th); sp[i*3+1]=r*Math.sin(ph)*Math.sin(th); sp[i*3+2]=r*Math.cos(ph); }
      sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
      scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xd4b866, size: .04, transparent: true, opacity: .7 })));

      let mx = 0, my = 0;
      document.addEventListener('mousemove', (e) => { mx = (e.clientX / innerWidth - .5) * 2; my = (e.clientY / innerHeight - .5) * 2; });

      let t = 0; let animId: number;
      function animate() {
        animId = requestAnimationFrame(animate); t += .01;
        cMesh.rotation.x = t*.28+my*.25; cMesh.rotation.y = t*.45+mx*.25; wMesh.rotation.copy(cMesh.rotation);
        r1.rotation.z=t*.35; r2.rotation.z=-t*.28; r3.rotation.y=t*.55;
        o1.position.set(Math.cos(t*.7)*2.1, Math.sin(t*.7)*2.1*.28, Math.sin(t*.7)*.6);
        o2.position.set(Math.cos(t*.5+2)*2.6, Math.sin(t*.9)*.5, Math.sin(t*.5+2)*2.6);
        o3.position.set(Math.sin(t*.6+1)*1.8, Math.cos(t*.6+1)*1.8, Math.sin(t*.4)*.5);
        camera.position.x += (mx*.45-camera.position.x)*.05;
        camera.position.y += (-my*.45-camera.position.y)*.05;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      }
      animate();
      return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); renderer.dispose(); };
    }
    return () => { document.head.removeChild(script); };
  }, []);

  return <canvas ref={canvasRef} id="threeCanvas" className="w-full max-w-[500px] h-[500px] rounded-[22px] block" />;
}

/* ─── BG CANVAS ──────────────────────────────────────── */
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
      for (let i = 0; i < n; i++) pts.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-.5)*.18, vy: (Math.random()-.5)*.18, r: Math.random()*1.1+.3, a: Math.random()*.1+.04 });
    }
    init();

    function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(45,43,107,${p.a})`; ctx.fill();
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<80){ctx.beginPath();ctx.strokeStyle=`rgba(45,43,107,${.05*(1-d/80)})`;ctx.lineWidth=.4;ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();}
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    const resizeHandler = () => { resize(); init(); };
    window.addEventListener('resize', resizeHandler);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resizeHandler); };
  }, []);

  return <canvas ref={canvasRef} id="bgCanvas" className="absolute inset-0 z-[1] pointer-events-none w-full h-full" />;
}

/* ─── HOME PAGE ──────────────────────────────────────── */
export default function Home() {
  useScrollReveal();

  return (
    <>
      <Navbar variant="home" />

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center px-[5%] gap-0"
        style={{ backgroundImage: 'radial-gradient(ellipse 70% 60% at 100% 0%,rgba(72,69,168,.06),transparent 60%),radial-gradient(ellipse 55% 50% at 0% 100%,rgba(45,43,107,.05),transparent 55%),radial-gradient(ellipse 50% 40% at 50% 50%,rgba(201,168,76,.04),transparent 55%)' }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(rgba(45,43,107,.06) 1px,transparent 1px)', backgroundSize:'36px 36px', maskImage:'radial-gradient(ellipse 70% 70% at 65% 45%,black 10%,transparent 80%)' }} />
        {/* Rings */}
        <div className="absolute rounded-full pointer-events-none border border-solid z-[1]" style={{ width:700,height:700,top:-200,right:-180,borderColor:'rgba(45,43,107,.05)' }} />
        <div className="absolute rounded-full pointer-events-none border border-solid z-[1]" style={{ width:480,height:480,top:-60,right:-40,borderColor:'rgba(201,168,76,.06)' }} />
        <div className="absolute rounded-full pointer-events-none border border-solid z-[1]" style={{ width:920,height:920,bottom:-420,left:-200,borderColor:'rgba(45,43,107,.04)' }} />
        {/* Glows */}
        <div className="absolute rounded-full pointer-events-none z-0" style={{ width:560,height:560,right:-60,top:-80,background:'radial-gradient(circle,rgba(45,43,107,.06),transparent 70%)',filter:'blur(50px)' }} />
        <div className="absolute rounded-full pointer-events-none z-0" style={{ width:420,height:420,left:-80,bottom:-80,background:'radial-gradient(circle,rgba(201,168,76,.05),transparent 70%)',filter:'blur(44px)' }} />
        <BgCanvas />

        {/* Left */}
        <div className="relative z-[2] pt-[110px] pb-[72px] animate-hup">
          <div className="inline-flex items-center gap-2 px-[14px] py-[5px] pl-2 rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.71rem] font-bold text-b3 tracking-[.1em] uppercase mb-[22px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,.6)] animate-blink" />
            IT Startup · Est. 2020 · India
          </div>

          <h1 className="font-heading font-black text-[clamp(2.8rem,5vw,4.4rem)] leading-[1.03] tracking-[-0.04em] text-dark mb-5">
            We Build the Tech<br />That Powers<br /><span className="grad-text">Your Business.</span>
          </h1>
          <p className="text-[1.04rem] leading-[1.8] text-muted max-w-[455px] mb-[34px]">
            TechSphere delivers custom software, cloud infrastructure, and digital products — built to your exact requirements, shipped faster than any enterprise vendor.
          </p>

          <div className="flex flex-wrap gap-2 mb-9">
            {['☁️ Cloud Migration','🔐 Cybersecurity','⚡ 3× Faster Delivery','🌍 28 Countries'].map(c => (
              <div key={c} className="inline-flex items-center gap-[5px] px-3 py-[5px] rounded-full bg-pale border border-[rgba(45,43,107,.12)] text-[.72rem] font-semibold text-b3">{c}</div>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap mb-0">
            <Link to="/contact" className="relative overflow-hidden inline-flex items-center gap-2 px-[26px] py-[13px] rounded-xl text-[.93rem] font-bold text-dark bg-gg shadow-[0_6px_24px_rgba(201,168,76,.4)] transition-all duration-[280ms] hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(201,168,76,.55)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,.24),transparent_55%)] before:pointer-events-none">
              <span className="relative z-[1]">Start Your Project</span>
              <svg className="relative z-[1] w-4 h-4 transition-transform duration-[250ms] group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[.93rem] font-semibold text-b3 border-[1.5px] border-[rgba(45,43,107,.12)] bg-pale transition-all duration-[280ms] hover:bg-pale2 hover:border-b4 hover:text-dark">
              <span className="w-[30px] h-[30px] rounded-full bg-gm flex items-center justify-center text-[.58rem] text-white flex-shrink-0">▶</span>
              See How It Works
            </button>
          </div>

          <div className="flex items-center gap-[14px] mt-10">
            <div className="flex">
              {[
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
              ].map((src, i) => (
                <div key={i} className={`w-[33px] h-[33px] rounded-full border-[2.5px] border-white overflow-hidden shadow-[0_2px_8px_rgba(15,14,42,.1)] ${i > 0 ? '-ml-[9px]' : ''}`}>
                  <img src={src} alt="client" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-[.79rem] text-muted leading-[1.55]"><strong className="text-dark">300+ happy clients</strong><br />across 28 countries worldwide</div>
          </div>
        </div>

        {/* Right */}
        <div className="relative z-[2] hidden lg:flex items-center justify-center py-[90px] animate-hup">
          <ThreeGlobe />
          {/* Float cards */}
          {[
            { cls: 'animate-ffa', pos: 'top-[18%] -left-4', ico: '🚀', lbl: 'Projects Delivered', val: '1,200+', hi: '↑ this year' },
            { cls: 'animate-ffb', pos: 'bottom-[22%] -right-4', ico: '⚡', lbl: 'Avg. Delivery', val: '3× Faster', hi: 'vs industry' },
            { cls: 'animate-ffc', pos: 'top-[52%] -left-5', ico: '✅', lbl: 'Client Retention', val: '96%', hi: 'satisfaction' },
          ].map(({ cls, pos, ico, lbl, val, hi }) => (
            <div key={lbl} className={`absolute z-[3] ${pos} ${cls} bg-white/96 backdrop-blur-[18px] border border-[rgba(45,43,107,.1)] rounded-2xl px-4 py-3 flex items-center gap-[11px] shadow-[0_10px_36px_rgba(15,14,42,.1)] text-dark`}>
              <div className="w-[38px] h-[38px] rounded-[10px] flex-shrink-0 flex items-center justify-center text-[1.05rem] bg-pale border border-border">{ico}</div>
              <div>
                <div className="text-[.67rem] text-muted mb-[2px] font-medium">{lbl}</div>
                <div className="font-heading text-[.94rem] font-extrabold leading-[1.2]">{val} <span className="text-[.63rem] text-[#10B981] font-bold">{hi}</span></div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[6px] z-[3] cursor-pointer"
          onClick={() => document.getElementById('logos')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[.66rem] font-semibold text-light tracking-[.1em] uppercase">Scroll</span>
          <div className="w-[1.5px] h-9 bg-[linear-gradient(to_bottom,rgba(45,43,107,.3),transparent)] animate-scb" />
        </div>
      </section>

      {/* LOGOS */}
      <div id="logos" className="bg-white px-[5%] py-[30px] border-t border-b border-border">
        <div className="max-w-[1240px] mx-auto flex items-center gap-[22px]">
          <span className="text-[.7rem] font-bold text-light uppercase tracking-[.1em] whitespace-nowrap">Trusted by</span>
          <div className="flex-1 overflow-hidden" style={{ maskImage: 'linear-gradient(90deg,transparent,black 10%,black 90%,transparent)' }}>
            <div className="flex gap-[52px] items-center w-max animate-tick">
              {[...logos, ...logos].map((l, i) => (
                <span key={i} className="font-heading text-[.9rem] font-bold text-light whitespace-nowrap cursor-default hover:text-b4 transition-colors duration-[250ms]">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="bg-white py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex justify-between items-end gap-8 mb-14 flex-wrap">
            <div>
              <div className="sr inline-flex items-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Our Services</div>
              <h2 className="sr d1 font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.03em] text-dark">IT Solutions Built<br /><span className="grad-text">For Your Exact Needs</span></h2>
            </div>
            <Link to="/services" className="sr d2 px-[22px] py-[10px] rounded-[10px] text-[.84rem] font-semibold text-b3 border-[1.5px] border-[rgba(45,43,107,.12)] bg-pale transition-all duration-[250ms] hover:bg-pale2 hover:border-b4">View All Services →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={i} className={`sr${s.feat ? '' : ''} d${Math.min(i,5)} group relative overflow-hidden rounded-[22px] border p-[34px_28px] cursor-pointer transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] shadow-sm ${
                s.feat
                  ? 'bg-gm border-transparent shadow-[0_16px_48px_rgba(15,14,42,.3)] hover:-translate-y-[7px] hover:shadow-[0_28px_64px_rgba(15,14,42,.42)]'
                  : 'bg-white border-border hover:border-[rgba(45,43,107,.18)] hover:-translate-y-[7px] hover:shadow-md'
              }`}>
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] transition-transform duration-[450ms] ease-[cubic-bezier(.4,0,.2,1)] origin-left scale-x-0 group-hover:scale-x-100 ${s.feat ? 'scale-x-100 bg-[rgba(201,168,76,.4)]' : 'bg-gg'}`} />
                {/* Hover bg tint */}
                {!s.feat && <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(160deg,#F0F0FA,transparent_55%)] transition-opacity duration-[380ms] pointer-events-none" />}
                {/* Shimmer for featured */}
                {s.feat && <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,168,76,.1),transparent_50%)] pointer-events-none" />}

                <div className={`text-[.66rem] font-bold tracking-[.12em] mb-5 relative z-[1] ${s.feat ? 'text-white' : 'text-light'}`}>{s.n}</div>
                <div className={`w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[1.45rem] mb-5 relative z-[1] transition-transform duration-[380ms] ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-[1.12] group-hover:-rotate-[5deg] border ${s.feat ? 'bg-[rgba(201,168,76,.15)] border-[rgba(201,168,76,.3)]' : 'bg-pale border-border'}`}>{s.ico}</div>
                <div className={`font-heading text-[1.06rem] font-bold mb-[10px] relative z-[1] ${s.feat ? 'text-white' : 'text-dark'}`}>{s.name}</div>
                <p className={`text-[.85rem] leading-[1.72] mb-5 relative z-[1] ${s.feat ? 'text-white' : 'text-muted'}`}>{s.info}</p>
                <span className={`inline-flex items-center gap-[6px] text-[.81rem] font-bold relative z-[1] transition-[gap] duration-300 group-hover:gap-3 ${s.feat ? 'text-gold3' : 'text-b4'}`}>Explore →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="bg-page py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Images */}
          <div className="sr-l relative" style={{ height: 'auto' }}>
            <div className="relative rounded-[30px] overflow-hidden aspect-[4/3] shadow-[0_28px_80px_rgba(15,14,42,.12)] border border-border group">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop" alt="IT team" loading="lazy" className="w-full h-full object-cover transition-transform duration-[600ms] ease-in-out group-hover:scale-[1.04]" />
            </div>
            {/* Thumb */}
            <div className="absolute -bottom-6 -right-6 w-[190px] rounded-card overflow-hidden border-[3px] border-white shadow-lg hidden md:block">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop" alt="Server" loading="lazy" className="w-full h-full object-cover aspect-square block" />
            </div>
            {/* Badge */}
            <div className="absolute -top-[22px] -left-[22px] w-24 h-24 rounded-full bg-gm shadow-brand border-[3px] border-white flex flex-col items-center justify-center text-white font-heading overflow-hidden hidden md:flex">
              <span className="text-[1.7rem] font-black leading-none relative z-[1]">12+</span>
              <span className="text-[.47rem] font-bold uppercase tracking-[.04em] text-center opacity-85 relative z-[1]">Years of Excellence</span>
            </div>
          </div>

          {/* Text */}
          <div className="sr-r d1">
            <div className="inline-flex items-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Why TechSphere</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.03em] text-dark mb-[14px]">We Don't Just Build IT.<br />We <span className="grad-text">Partner With You.</span></h2>
            <p className="text-[1rem] leading-[1.8] text-muted max-w-[520px] mb-[38px]">Every business has unique technology challenges. We listen first, then engineer solutions that solve your actual problems — not generic ones.</p>
            <div className="flex flex-col gap-[14px]">
              {whyFeats.map((w, i) => (
                <div key={i} className={`sr d${i+2} group flex gap-[15px] items-start p-[18px_20px] rounded-card bg-white border border-border shadow-sm relative overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(.4,0,.2,1)] hover:border-[rgba(45,43,107,.15)] hover:shadow-md hover:translate-x-[6px] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-gg before:scale-y-0 before:origin-bottom before:transition-transform before:duration-[350ms] hover:before:scale-y-100`}>
                  <div className="w-10 h-10 rounded-[10px] flex-shrink-0 bg-pale border border-border flex items-center justify-center text-[1rem] transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-110 group-hover:-rotate-[4deg]">{w.ico}</div>
                  <div>
                    <div className="font-heading text-[.93rem] font-bold text-dark mb-1">{w.t}</div>
                    <p className="text-[.83rem] leading-[1.65] text-muted">{w.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white pb-24 px-[5%]">
        <div className="sr-s max-w-[1240px] mx-auto bg-gm rounded-[30px] grid grid-cols-2 lg:grid-cols-4 overflow-hidden shadow-[0_24px_72px_rgba(15,14,42,.26)] relative before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(201,168,76,.14),transparent_50%)] before:pointer-events-none">
          {stats.map((s, i) => (
            <div key={i} className={`relative overflow-hidden text-center py-[52px] px-9 border-r border-white/8 last:border-r-0 hover:bg-white/6 transition-colors duration-[350ms] ${i === 1 || i === 3 ? 'lg:border-r-0' : ''}`}>
              <div className="font-heading text-[2.9rem] font-black text-white leading-none mb-[10px] relative">{s.num}<em className="not-italic grad-text">{s.suf}</em></div>
              <div className="text-[.82rem] text-white/52 relative">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="bg-page py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex justify-between items-end mb-[52px] gap-7 flex-wrap">
            <div>
              <div className="sr inline-flex items-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Our Work</div>
              <h2 className="sr d1 font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.03em] text-dark">Projects That <span className="grad-text">Speak for Themselves</span></h2>
            </div>
            <Link to="/projects" className="sr d2 px-[22px] py-[10px] rounded-[10px] text-[.84rem] font-semibold text-b3 border-[1.5px] border-[rgba(45,43,107,.12)] bg-pale transition-all duration-[250ms] hover:bg-pale2 hover:border-b4">View Full Portfolio →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
            {portfolio.map((p, i) => (
              <div key={i} className={`${p.cls} group relative rounded-[30px] overflow-hidden aspect-video cursor-pointer shadow-sm`}>
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-[1.07] block" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,7,28,.94)_0%,rgba(8,7,28,.38)_55%,transparent_100%)] flex flex-col justify-end p-7">
                  <div className="inline-block px-[11px] py-1 rounded-full bg-[rgba(201,168,76,.25)] border border-[rgba(201,168,76,.45)] text-[.67rem] font-bold text-gold3 uppercase tracking-[.09em] mb-[9px] w-fit">{p.tag}</div>
                  <div className="font-heading text-[1.22rem] font-bold text-white mb-[7px]">{p.name}</div>
                  <div className="text-[.8rem] text-white/56 leading-[1.55]">{p.desc}</div>
                  <span className="inline-flex items-center gap-[6px] text-[.78rem] font-bold text-gold2 mt-3 opacity-0 translate-y-2 transition-all duration-[320ms] group-hover:opacity-100 group-hover:translate-y-0">View Case Study →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testi" className="overflow-hidden py-24 bg-white">
        <div className="px-[5%] max-w-[1240px] mx-auto mb-[52px]">
          <div className="sr inline-flex items-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Testimonials</div>
          <h2 className="sr d1 font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.03em] text-dark">What Our Clients <span className="grad-text">Actually Say</span></h2>
          <p className="sr d2 text-[1rem] leading-[1.8] text-muted max-w-[520px]">Hear what our clients have to say about their experience.</p>
        </div>
        <div className="relative overflow-hidden flex flex-col gap-4 [&:hover_>_div]:[animation-play-state:paused]" style={{ mask: 'none' }}>
          <div className="absolute top-0 bottom-0 left-0 z-[2] pointer-events-none w-[160px] bg-[linear-gradient(90deg,#fff,transparent)]" />
          <div className="absolute top-0 bottom-0 right-0 z-[2] pointer-events-none w-[160px] bg-[linear-gradient(-90deg,#fff,transparent)]" />
          <div className="flex gap-4 w-max animate-marqueeleft">
            {[...testimonials1, ...testimonials1].map((t, i) => <TCard key={i} {...t} />)}
          </div>
          <div className="flex gap-4 w-max animate-marqueeright">
            {[...testimonials2, ...testimonials2].map((t, i) => <TCard key={i} {...t} />)}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="tech" className="bg-page py-24 px-[5%]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-[54px]">
            <div className="sr inline-flex items-center justify-center gap-[7px] text-[.7rem] font-extrabold tracking-[.14em] uppercase text-gold mb-3 before:content-[''] before:w-5 before:h-[2px] before:rounded-sm before:bg-gg">Technology Stack</div>
            <h2 className="sr d1 font-heading font-extrabold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.03em] text-dark text-center">Powered by Industry-Leading<br /><span className="grad-text">Technologies</span></h2>
          </div>
          <div className="max-w-[1240px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[13px]">
            {techStack.map((t, i) => (
              <div key={i} className={`sr-s${i > 0 ? ` d${Math.min(i % 3 + 1, 5)}` : ''} group p-[22px_12px] rounded-card bg-white border border-border text-center cursor-default shadow-sm transition-all duration-[350ms] ease-[cubic-bezier(.34,1.56,.64,1)] hover:border-[rgba(45,43,107,.2)] hover:bg-pale hover:-translate-y-[6px] hover:scale-[1.02] hover:shadow-md`}>
                <div className="text-[1.85rem] mb-[9px] transition-transform duration-[350ms] ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-[1.15] group-hover:-rotate-[5deg]">{t.ico}</div>
                <div className="text-[.74rem] font-semibold text-muted">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-white px-[5%] pt-20 pb-[110px]">
        <div className="sr-s max-w-[1240px] mx-auto bg-gm rounded-[30px] px-14 py-20 text-center relative overflow-hidden shadow-[0_28px_88px_rgba(15,14,42,.28)]">
          {/* Decorative */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1.5px,transparent 1.5px)', backgroundSize: '32px 32px' }} />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(201,168,76,.07),transparent_45%)]" />
          <div className="absolute rounded-full pointer-events-none" style={{ width:640,height:640,top:-220,right:-160,background:'radial-gradient(circle,rgba(201,168,76,.22),transparent 70%)',filter:'blur(24px)' }} />
          <h2 className="relative z-[1] font-heading text-[clamp(1.9rem,3.8vw,3.05rem)] font-black text-white mb-4 tracking-[-0.03em]">Have a Project in Mind?<br />Let's Build It Together.</h2>
          <p className="relative z-[1] text-[1rem] leading-[1.76] text-white/62 max-w-[520px] mx-auto mb-10">Share your requirements with us — big or small. We'll analyze your needs and come back with a detailed proposal, timeline, and transparent pricing. No strings attached.</p>
          <div className="relative z-[1] flex items-center justify-center gap-[14px] flex-wrap">
            <Link to="/contact" className="px-[34px] py-[14px] rounded-xl text-[.92rem] font-bold text-dark bg-gg shadow-gold transition-all duration-[280ms] hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(201,168,76,.5)]">Start Your Project →</Link>
            <Link to="/contact" className="px-8 py-[13px] rounded-xl text-[.92rem] font-semibold text-white border-[1.5px] border-white/28 bg-white/8 backdrop-blur-[8px] transition-all duration-[280ms] hover:bg-white/18 hover:border-white/55">Schedule a Call</Link>
          </div>
          <div className="relative z-[1] text-[.77rem] text-white/42 mt-[22px]">
            <span className="text-gold2 mr-[5px]">✓</span>Free consultation &nbsp;·&nbsp; <span className="text-gold2 mr-[5px]">✓</span>No commitment &nbsp;·&nbsp; <span className="text-gold2 mr-[5px]">✓</span>Response within 24 hrs
          </div>
        </div>
      </section>

      <Footer variant="home" />
      <BackToTop />
    </>
  );
}
