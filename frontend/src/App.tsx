import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AmbientBackground from './components/ambient/AmbientBackground';
import Header from './components/ambient/Header';
import Sidebar from './components/Sidebar/Sidebar';
import NeuralCore from './components/NeuralCore/NeuralCore';
import VoiceBar from './components/VoiceBar/VoiceBar';
import WeatherWidget from './components/widgets/WeatherWidget';
import CalendarWidget from './components/widgets/CalendarWidget';
import TelemetryWidget from './components/widgets/TelemetryWidget';
import AssistantStatus from './components/widgets/AssistantStatus';
import BootSequence from './components/BootSequence/BootSequence';

const App: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [activeTab, setActiveTab] = useState('TELEMETRY');

  useEffect(() => {
    const hasBooted = localStorage.getItem('mether_booted');
    if (hasBooted) {
      setIsBooted(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'B') {
        localStorage.removeItem('mether_booted');
        window.location.reload();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBootComplete = () => {
    localStorage.setItem('mether_booted', '1');
    setIsBooted(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-background text-on-surface font-body-md overflow-hidden">
      <AnimatePresence mode="wait">
        {!isBooted ? (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full"
          >
            {/* Background Atmosphere */}
            <AmbientBackground />

            {/* Navigation & Header */}
            <Header activeTab={activeTab} onTabChange={setActiveTab} />
            <Sidebar />

            {/* Main Interaction Area */}
            <main className="ml-32 pr-12 min-h-screen relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeTab === 'TELEMETRY' ? (
                  <motion.div 
                    key="telemetry-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="relative flex items-center justify-center w-full h-full"
                  >
                    {/* The Heart of the OS */}
                    <NeuralCore />

                    {/* Distributed UI Elements */}
                    <div className="absolute inset-0 pointer-events-none p-16">
                      <WeatherWidget />
                      <CalendarWidget />
                      <TelemetryWidget />
                      <AssistantStatus />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="other-view"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center justify-center text-on-surface/40 font-label-caps tracking-[0.2em]"
                  >
                    <div className="text-xl mb-4">{activeTab} VIEW</div>
                    <div className="text-[10px]">INITIALIZING SUBSYSTEMS...</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* Voice Interaction Layer */}
            <VoiceBar />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
