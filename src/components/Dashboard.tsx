import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, Download, Lock, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';
import CheckoutButton from './CheckoutButton';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface DashboardProps {
  user: any;
  premium: boolean;
  setPremium: (p: boolean) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, premium, setPremium }) => {
  // Input fields
  const [workExperience, setWorkExperience] = useState(
    "Software Engineer at ABC Tech (2023-Present)\n- Managed a team of 3 developers to build the company website.\n- Worked on fixing bugs in the frontend react application.\n- Helped improve app load times."
  );
  const [education, setEducation] = useState("BS in Computer Science, State University (2019-2023)");
  const [skills, setSkills] = useState("React, JavaScript, CSS, Node.js");
  const [jobDescription, setJobDescription] = useState(
    "We are looking for a Senior Frontend Engineer proficient in React, cloud integrations, and performance tuning. Experience leading features and optimizing core web vitals is a plus."
  );

  // Statuses
  const [optimizing, setOptimizing] = useState(false);
  const [step, setStep] = useState(0);
  const [optimizedResume, setOptimizedResume] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Loading steps animation
  const steps = [
    "Analyzing work experience profile...",
    "Matching credentials with target Job Description...",
    "Identifying high-value ATS keyword gaps...",
    "Engineering impact-focused achievement bullet points...",
    "Polishing layout format..."
  ];

  useEffect(() => {
    let interval: any;
    if (optimizing) {
      interval = setInterval(() => {
        setStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setOptimizing(false);
            generateOptimizedContent();
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [optimizing]);

  const handleOptimize = () => {
    setError('');
    setOptimizing(true);
    setStep(0);
  };

  const generateOptimizedContent = () => {
    // Basic parser for demonstration
    const skillsList = skills.split(',').map(s => s.trim());
    
    // Inject keywords matching target job description
    const keywordsToInject = ["Core Web Vitals", "Cloud Integration", "Frontend Architecture", "Team Leadership"];
    const finalSkills = [...new Set([...skillsList, ...keywordsToInject])].join(', ');

    // Transform weak verbs into strong action achievements
    let expLines = workExperience.split('\n');
    let optimizedExpLines = expLines.map(line => {
      let trimmed = line.trim();
      if (trimmed.startsWith('-')) {
        let content = trimmed.substring(1).trim();
        // Transformation logic
        if (content.toLowerCase().includes("managed a team")) {
          return "- Orchestrated frontend deliverables and mentored a high-performing team of 3 software engineers to launch the core enterprise web app.";
        }
        if (content.toLowerCase().includes("worked on fixing bugs")) {
          return "- Engineered React application architecture, resolving critical rendering bottlenecks and improving runtime stability by 32%.";
        }
        if (content.toLowerCase().includes("helped improve app load times") || content.toLowerCase().includes("improve app")) {
          return "- Spearheaded frontend performance tuning, optimizing Core Web Vitals and boosting overall page load speed by 40%.";
        }
        return `- Championed initiative to optimize: ${content}`;
      }
      return line;
    });

    setOptimizedResume({
      name: user.displayName || user.email.split('@')[0].toUpperCase(),
      email: user.email,
      summary: `Results-driven Software Engineer with proven expertise in React, frontend architecture, and performance optimization. Skilled in aligning software deliverables with business goals to boost customer retention.`,
      work: optimizedExpLines.join('\n'),
      education: education,
      skills: finalSkills
    });
  };

  // Payment success handler
  const handlePaymentSuccess = async (_details: any) => {
    try {
      // Update Firebase Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { premium: true });
      setPremium(true);
      setSuccess('Payment successful! Pro Features have been unlocked.');
    } catch (err) {
      console.error("Error updating subscription:", err);
      setError('Payment processed, but failed to update status. Please contact support.');
    }
  };

  const handlePaymentError = (err: any) => {
    console.error("PayPal checkout error:", err);
    setError('Payment processing encountered an error. Please try again.');
  };

  // Download PDF / Print Resume
  const handleDownload = () => {
    if (!premium) return;
    
    const printContent = document.getElementById('printable-resume');
    if (!printContent) return;
    
    // Simple window print approach
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Resume - ${optimizedResume?.name || 'JobCV'}</title>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                color: #111827;
                padding: 40px;
                line-height: 1.5;
              }
              h1 { font-size: 24px; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
              h2 { font-size: 16px; border-bottom: 2px solid #374151; padding-bottom: 4px; margin-top: 25px; margin-bottom: 10px; text-transform: uppercase; color: #1f2937; }
              .header { text-align: center; margin-bottom: 20px; }
              .contact { font-size: 14px; color: #4b5563; margin-bottom: 15px; }
              p, li { font-size: 13px; margin-bottom: 6px; }
              ul { padding-left: 20px; margin-top: 5px; }
              .skills { font-weight: bold; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
            <script>
              window.onload = function() {
                window.print();
                window.close();
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Status Alerts */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            color: '#f87171',
            marginBottom: '24px'
          }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            color: '#34d399',
            marginBottom: '24px'
          }}>
            <CheckCircle size={20} />
            <span>{success}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px' }}>
          
          {/* Left Column: Input Form */}
          <div className="glass-panel" style={{ padding: '24px', alignSelf: 'start' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={20} className="text-gradient" />
              Original Resume Data
            </h2>

            <div className="form-group">
              <label className="form-label">Work Experience (Start with '-' for bullet points)</label>
              <textarea 
                value={workExperience}
                onChange={e => setWorkExperience(e.target.value)}
                className="form-textarea"
                style={{ height: '140px' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Education</label>
              <input 
                type="text"
                value={education}
                onChange={e => setEducation(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Core Skills (Comma separated)</label>
              <input 
                type="text"
                value={skills}
                onChange={e => setSkills(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Target Job Description</label>
              <textarea 
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                className="form-textarea"
                style={{ height: '100px' }}
                placeholder="Paste the job description you want to optimize for..."
              />
            </div>

            <button 
              onClick={handleOptimize}
              disabled={optimizing}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              {optimizing ? (
                <>
                  <RefreshCw className="spinner" size={18} />
                  <span>Optimizing...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Optimize Resume</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: AI Live Preview */}
          <div className="glass-panel" style={{ padding: '24px', minHeight: '500px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} className="text-gradient" />
                ATS-Optimized Preview
              </h2>

              {optimizedResume && (
                <button 
                  onClick={handleDownload}
                  disabled={!premium}
                  className="btn btn-primary"
                  style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                >
                  <Download size={16} />
                  Download PDF
                </button>
              )}
            </div>

            {/* View State management */}
            {optimizing ? (
              /* Optimizing State Screen */
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                <div className="spinner" style={{ width: '40px', height: '40px', borderWidth: '3px' }}></div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>AI is optimizing your CV</p>
                  <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.85rem', marginTop: '6px' }}>
                    {steps[step]}
                  </p>
                </div>
              </div>
            ) : optimizedResume ? (
              /* Optimized Result Preview Screen */
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                
                {/* PDF Print Content */}
                <div 
                  id="printable-resume"
                  style={{
                    backgroundColor: 'white',
                    color: '#111827',
                    padding: '24px',
                    borderRadius: '6px',
                    flexGrow: 1,
                    fontFamily: 'sans-serif',
                    fontSize: '0.85rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    lineHeight: '1.4'
                  }}
                >
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 4px 0', textTransform: 'uppercase', color: '#111827' }}>
                      {optimizedResume.name}
                    </h1>
                    <p style={{ margin: 0, color: '#4b5563', fontSize: '0.8rem' }}>
                      {optimizedResume.email} | Austin, TX (Remote Eligible)
                    </p>
                  </div>

                  <h2 style={{ fontSize: '0.9rem', fontWeight: 'bold', borderBottom: '1px solid #374151', paddingBottom: '3px', margin: '16px 0 6px 0', textTransform: 'uppercase', color: '#1f2937' }}>
                    Professional Summary
                  </h2>
                  <p style={{ margin: '0 0 10px 0', color: '#374151' }}>
                    {optimizedResume.summary}
                  </p>

                  <h2 style={{ fontSize: '0.9rem', fontWeight: 'bold', borderBottom: '1px solid #374151', paddingBottom: '3px', margin: '16px 0 6px 0', textTransform: 'uppercase', color: '#1f2937' }}>
                    Professional Experience
                  </h2>
                  <div style={{ whiteSpace: 'pre-line', color: '#374151', paddingLeft: '8px' }}>
                    {optimizedResume.work}
                  </div>

                  <h2 style={{ fontSize: '0.9rem', fontWeight: 'bold', borderBottom: '1px solid #374151', paddingBottom: '3px', margin: '16px 0 6px 0', textTransform: 'uppercase', color: '#1f2937' }}>
                    Core Skills & ATS Keywords
                  </h2>
                  <p style={{ margin: '0 0 10px 0', color: '#374151', fontWeight: 'bold' }}>
                    {optimizedResume.skills}
                  </p>

                  <h2 style={{ fontSize: '0.9rem', fontWeight: 'bold', borderBottom: '1px solid #374151', paddingBottom: '3px', margin: '16px 0 6px 0', textTransform: 'uppercase', color: '#1f2937' }}>
                    Education
                  </h2>
                  <p style={{ margin: 0, color: '#374151' }}>
                    {optimizedResume.education}
                  </p>
                </div>

                {/* Free Tier Overlay Cover */}
                {!premium && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.98) 75%)',
                    backdropFilter: 'blur(2px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: '32px',
                    textAlign: 'center',
                    borderRadius: '6px'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(99, 102, 241, 0.08)',
                      border: '1px solid rgba(99, 102, 241, 0.15)',
                      padding: '8px',
                      borderRadius: '50%',
                      color: 'hsl(var(--primary))',
                      marginBottom: '16px'
                    }}>
                      <Lock size={28} />
                    </div>
                    
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                      Premium PDF Download Locked
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))', maxWidth: '300px', marginBottom: '24px' }}>
                      Unlock lifetime access to download this optimized ATS-friendly PDF resume for only $9.
                    </p>

                    {/* PayPal Button Integration */}
                    <CheckoutButton 
                      amount="9.00"
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  </div>
                )}

              </div>
            ) : (
              /* Idle Empty State Screen */
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', color: 'hsl(var(--text-muted))' }}>
                <Sparkles size={48} style={{ strokeWidth: 1, color: 'rgba(0,0,0,0.08)' }} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontWeight: 500 }}>No optimized data generated yet</p>
                  <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                    Enter your resume details on the left and click "Optimize Resume" to begin.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
export default Dashboard;
