import React, { useState } from 'react';
import { X, Mail, Lock, AlertCircle } from 'lucide-react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Create user document in firestore
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          premium: false,
          createdAt: new Date().toISOString()
        });
      } else {
        // Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Ensure user document exists in firestore (in case Google/manual signup missed it)
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            email: user.email,
            premium: false,
            createdAt: new Date().toISOString()
          });
        }
      }
      onLoginSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else {
        setError(err.message || 'An error occurred during authentication.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="glass-panel fade-in" style={{
        width: '100%',
        maxWidth: '400px',
        padding: '32px',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.08)'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'hsl(var(--text-muted))',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px', textAlign: 'center', fontFamily: 'var(--font-heading)' }}>
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))', marginBottom: '24px', textAlign: 'center' }}>
          {isSignUp ? 'Sign up to start optimizing your resume' : 'Sign in to access your CV optimizer'}
        </p>

        {/* Error Message */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px',
            color: '#f87171',
            fontSize: '0.85rem',
            marginBottom: '20px'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'rgba(0,0,0,0.25)' }} />
              <input 
                type="email" 
                required 
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-input" 
                style={{ paddingLeft: '38px' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'rgba(0,0,0,0.25)' }} />
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input" 
                style={{ paddingLeft: '38px' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)' }}
          >
            {loading ? <div className="spinner" style={{ margin: '0 auto' }}></div> : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        {/* Toggle */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem' }}>
          <span style={{ color: 'hsl(var(--text-muted))' }}>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          </span>
          <button 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'hsl(var(--primary))',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};
