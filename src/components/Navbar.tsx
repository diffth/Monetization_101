import React from 'react';
import { LogOut, Award, LayoutDashboard } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';

interface NavbarProps {
  user: User | null;
  premium: boolean;
  onOpenAuth: () => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  premium,
  onOpenAuth,
  currentTab,
  setCurrentTab,
}) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentTab('landing');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          onClick={() => setCurrentTab('landing')}
        >
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '8px', 
            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'var(--font-heading)'
          }}>
            J
          </div>
          <span className="text-gradient" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800 }}>
            JobCV.ai
          </span>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {user && (
            <button 
              className={`btn ${currentTab === 'dashboard' ? 'btn-primary' : 'btn-text'}`}
              onClick={() => setCurrentTab('dashboard')}
              style={{ fontSize: '0.85rem', padding: '6px 12px' }}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </button>
          )}

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>{user.email}</span>
                {premium ? (
                  <span className="badge badge-purple" style={{ fontSize: '0.65rem', marginTop: '2px', gap: '2px' }}>
                    <Award size={10} /> PRO
                  </span>
                ) : (
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 600 }}>Free Tier</span>
                )}
              </div>
              <button 
                onClick={handleLogout}
                className="btn btn-secondary" 
                style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)' }}
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
