import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  variant?: 'home' | 'inner';
}

export default function Footer({ variant = 'inner' }: FooterProps) {
  const [email, setEmail] = useState('');

  const logoSvg = (
    <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: 'var(--dark)', position: 'relative', zIndex: 1 }}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );

  if (variant === 'home') {
    return (
      <footer>
        {/* Newsletter */}
        <div className="f-newsletter">
          <div className="f-newsletter-in">
            <div className="f-nl-left">
              <h4>Stay ahead in tech</h4>
              <p>Get insights, case studies, and IT tips — no spam, ever.</p>
            </div>
            <div className="f-nl-form">
              <input
                className="f-nl-input"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button className="f-nl-btn">Subscribe →</button>
            </div>
          </div>
        </div>
        {/* Main footer */}
        <div className="f-top-bar">
          <div className="f-top-bar-in">
            <div>
              <div className="f-logo">
                <div className="lmark" style={{ width: 34, height: 34, borderRadius: 9 }}>{logoSvg}</div>
                Tech<em>Sphere</em>
              </div>
              <p className="f-desc">Custom IT solutions built around your specific business requirements — software development, cloud infrastructure, cybersecurity, and beyond.</p>
              <div className="f-contact-row">
                <div className="f-contact-item"><span>📧</span><a href="mailto:hello@techsphere.in">hello@techsphere.in</a></div>
                <div className="f-contact-item"><span>📞</span><a href="tel:+919876543210">+91 98765 43210</a></div>
                <div className="f-contact-item"><span>📍</span><span>Ahmedabad, Gujarat, India</span></div>
              </div>
              <div className="f-socs">
                <div className="fsoc">in</div><div className="fsoc">𝕏</div>
                <div className="fsoc">▶</div><div className="fsoc">f</div><div className="fsoc">@</div>
              </div>
            </div>
            <div>
              <div className="fh">Services</div>
              <ul className="fls">
                <li><Link to="/services">Software Development</Link></li>
                <li><Link to="/services">Cloud &amp; Infrastructure</Link></li>
                <li><Link to="/services">Cybersecurity</Link></li>
                <li><Link to="/services">Data &amp; Analytics</Link></li>
                <li><Link to="/services">IT Consulting</Link></li>
              </ul>
            </div>
            <div>
              <div className="fh">Company</div>
              <ul className="fls">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/about">Our Team</Link></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <div className="fh">Resources</div>
              <ul className="fls">
                <li><Link to="/projects">Case Studies</Link></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Partner Program</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="f-bot">
          <div className="f-bot-in">
            <div className="f-copy">© 2025 TechSphere IT Solutions Pvt. Ltd. All rights reserved.</div>
            <div className="f-bl">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Inner page footer
  return (
    <footer className="ft-footer">
      <div className="ft-wrap">
        <div className="ft-top">
          <div>
            <div className="nav-logo">
              <div className="lmark">{logoSvg}</div>
              <span style={{ fontFamily: 'var(--fh)', fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
                Tech<em style={{ fontStyle: 'normal', background: 'var(--gg)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sphere</em>
              </span>
            </div>
            <p className="ft-brand-desc">Custom IT solutions for forward-thinking enterprises. From strategy to deployment — your technology partner for life.</p>
          </div>
          <div className="ft-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="ft-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Cloud Solutions</Link></li>
              <li><Link to="/services">Cybersecurity</Link></li>
              <li><Link to="/services">Custom Software</Link></li>
              <li><Link to="/services">Data &amp; Analytics</Link></li>
            </ul>
          </div>
          <div className="ft-col">
            <h4>Connect</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/projects">Portfolio</Link></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="ft-bottom">
          <span className="ft-copy">© 2024 TechSphere IT Solutions. All rights reserved.</span>
          <div className="ft-socs">
            <a href="#" className="ft-soc">in</a>
            <a href="#" className="ft-soc">𝕏</a>
            <a href="#" className="ft-soc">gh</a>
            <a href="#" className="ft-soc">yt</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
