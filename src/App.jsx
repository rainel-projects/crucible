import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Splash } from './components/Splash';
import { ThemeSelector } from './components/ThemeSelector';
import { LanguageSelector } from './components/LanguageSelector';
import { Dashboard } from './components/Dashboard';
import { ZoomGuide } from './components/ZoomGuide';

function App() {
  const [step, setStep] = useState('splash'); // splash, theme, language, dashboard
  const [theme, setTheme] = useState('coding-dojo'); // Default theme
  const [language, setLanguage] = useState(null);

  const handleSplashComplete = () => {
    setStep('theme');
  };

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    // Add a small delay for effect before switching
    setTimeout(() => {
      setStep('language');
    }, 300);
  };

  const handleLanguageSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setStep('dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono selection:bg-primary selection:text-background transition-colors duration-700" data-theme={theme}>
      <AnimatePresence mode="wait">
        {step === 'splash' && (
          <Splash key="splash" onComplete={handleSplashComplete} />
        )}

        {step === 'theme' && (
          <motion.div
            key="theme"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ThemeSelector onSelect={handleThemeSelect} />
          </motion.div>
        )}

        {step === 'language' && (
          <motion.div
            key="language"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <LanguageSelector onSelect={handleLanguageSelect} />
          </motion.div>
        )}

        {step === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
          >
            <Dashboard theme={theme} language={language} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Noise/Grain Overlay for texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <ZoomGuide />
    </div>
  );
}

export default App;
