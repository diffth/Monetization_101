import React from 'react';
import { ArrowRight, Sparkles, FileText, CheckCircle, ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  user: any;
  premium: boolean;
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ user, premium, onGetStarted }) => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', paddingBottom: '80px' }}>
      {/* Background glow effects */}
      <div className="glow-bg glow-purple"></div>
      <div className="glow-bg glow-cyan"></div>

      {/* Hero Section */}
      <section style={{ paddingTop: '100px', paddingBottom: '60px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }} className="badge badge-purple">
            <Sparkles size={14} />
            <span>AI-Powered ATS Resume Optimizer</span>
          </div>

          <h1 style={{ 
            fontSize: '3.8rem', 
            lineHeight: 1.1, 
            marginBottom: '24px', 
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            maxWidth: '900px',
            margin: '0 auto 24px auto'
          }}>
            Supercharge Your Resume for <span className="text-gradient">Global Positions</span>
          </h1>

          <p style={{ 
            fontSize: '1.2rem', 
            color: 'hsl(var(--text-muted))', 
            maxWidth: '650px', 
            margin: '0 auto 40px auto',
            lineHeight: 1.6 
          }}>
            Optimize your work experience, match job descriptions, and pass automated ATS screening filters in seconds.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button onClick={onGetStarted} className="btn btn-primary btn-large">
              Optimize My Resume Now
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '60px 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '48px', fontFamily: 'var(--font-heading)' }}>
            Engineered to Get You Interviews
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px' 
          }}>
            <div className="glass-panel glass-panel-hover" style={{ padding: '32px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                background: 'rgba(147, 51, 234, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'hsl(var(--primary))',
                marginBottom: '24px'
              }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>AI Bullet Points Enhancer</h3>
              <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.95rem' }}>
                Converts weak, passive descriptions into high-impact, results-driven professional action phrases.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover" style={{ padding: '32px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                background: 'rgba(6, 182, 212, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'hsl(var(--secondary))',
                marginBottom: '24px'
              }}>
                <FileText size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>ATS Keyword Matching</h3>
              <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.95rem' }}>
                Analyzes target job descriptions to extract and inject critical keywords into your experience.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover" style={{ padding: '32px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                background: 'rgba(16, 185, 129, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#10b981',
                marginBottom: '24px'
              }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Clean PDF Export</h3>
              <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.95rem' }}>
                Exports resume in standard formats that resume parsers and hiring managers love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ padding: '60px 0', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ color: 'hsl(var(--text-muted))', marginBottom: '40px' }}>
            No subscriptions. No hidden fees. Pay once, use forever.
          </p>

          <div className="glass-panel" style={{ 
            padding: '48px 32px',
            border: '2px solid rgba(99, 102, 241, 0.25)',
            boxShadow: '0 15px 40px rgba(99, 102, 241, 0.05)',
            position: 'relative'
          }}>
            <div style={{ 
              position: 'absolute', 
              top: '-15px', 
              left: '50%', 
              transform: 'translateX(-50%)' 
            }} className="badge badge-purple">
              Most Popular
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>Pro Lifetime Pass</h3>
            <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.9rem', marginBottom: '24px' }}>
              Perfect for active job seekers
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', marginBottom: '32px' }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>$9</span>
              <span style={{ color: 'hsl(var(--text-muted))', marginLeft: '4px', fontSize: '0.95rem' }}>/ one-time</span>
            </div>

            <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                <span>Unlimited AI resume optimizations</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                <span>Unlock premium formatted PDF downloads</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                <span>ATS-friendly keywords injection</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                <span>Lifetime product updates & priority support</span>
              </li>
            </ul>

            <button onClick={onGetStarted} className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)' }}>
              {premium ? 'Go to Dashboard' : (user ? 'Unlock Pro Now' : 'Sign Up to Unlock Pro')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: '80px', borderTop: '1px solid var(--border)', paddingTop: '40px', textAlign: 'center', color: 'hsl(var(--text-muted))', fontSize: '0.85rem' }}>
        <p>&copy; {new Date().getFullYear()} JobCV.ai. All rights reserved.</p>
        <p style={{ marginTop: '8px' }}>Designed for global builders. Payments powered securely by PayPal.</p>
      </footer>
    </div>
  );
};
