import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [premium, setPremium] = useState<boolean>(false);
  const [authOpen, setAuthOpen] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [loading, setLoading] = useState<boolean>(true);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch premium status from firestore real-time
        const userRef = doc(db, 'users', currentUser.uid);
        const unsubDoc = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setPremium(!!docSnap.data().premium);
          } else {
            setPremium(false);
          }
          setLoading(false);
        }, (err) => {
          console.error("Firestore snapshot error:", err);
          setLoading(false);
        });

        return () => unsubDoc();
      } else {
        setPremium(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      setCurrentTab('dashboard');
    } else {
      setAuthOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setCurrentTab('dashboard');
  };

  return (
    <PayPalScriptProvider options={{ clientId: "test", currency: "USD" }}>
      <div className="app-container">
        {/* Navigation Bar */}
        <Navbar 
          user={user}
          premium={premium}
          onOpenAuth={() => setAuthOpen(true)}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />

        {/* Main Content Area */}
        <main style={{ flexGrow: 1, position: 'relative' }}>
          {loading ? (
            <div style={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
              <div className="spinner" style={{ width: '40px', height: '40px', borderWidth: '3px' }}></div>
            </div>
          ) : currentTab === 'landing' ? (
            <LandingPage 
              user={user}
              premium={premium}
              onGetStarted={handleGetStarted}
            />
          ) : (
            <Dashboard 
              user={user}
              premium={premium}
              setPremium={setPremium}
            />
          )}
        </main>

        {/* Authentication Modal */}
        {authOpen && (
          <AuthModal 
            onClose={() => setAuthOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
