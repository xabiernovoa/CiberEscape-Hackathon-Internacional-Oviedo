
import React, { useState, useEffect } from 'react';
import { Screen, UserProfile } from './types';
import { Splash } from './components/screens/Splash';
import { Onboarding } from './components/screens/Onboarding';
import { Hub } from './components/screens/Hub';
import { LevelOne } from './components/levels/LevelOne';
import { LevelTwo } from './components/levels/LevelTwo';
import { LevelThree } from './components/levels/LevelThree';
import { LevelFour } from './components/levels/LevelFour';
import { LevelFive } from './components/levels/LevelFive';
import { Arcade } from './components/screens/Arcade';
import { Online } from './components/screens/Online';
import { ProfileSettings } from './components/screens/ProfileSettings';
import { Resources } from './components/screens/Resources';
import { Navbar } from './components/ui/Navbar';
import { RANKS_DATA } from './constants';

const INITIAL_PROFILE: UserProfile = {
  name: "Xabi",
  xp: 0,
  rank: "Becario de Distrito",
  level: 1,
  streak: 1,
  completedLevels: []
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SPLASH);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('ciberescape_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        // Merge with initial to ensure new fields exist if schema changes
        setProfile({ ...INITIAL_PROFILE, ...parsed });
      } catch (e) {
        console.error("Failed to load profile", e);
      }
    }
  }, []);

  // Save to LocalStorage whenever profile changes
  useEffect(() => {
    localStorage.setItem('ciberescape_profile', JSON.stringify(profile));
  }, [profile]);

  const gainXp = (amount: number) => {
    setProfile(prev => {
      const newXp = prev.xp + amount;
      // Simple leveling logic: 1 level every 300 XP
      const newLevel = Math.floor(newXp / 300) + 1;
      
      // Calculate Rank based on XP thresholds defined in constants
      // We find the highest rank where newXp >= rank.minXp
      let newRank = prev.rank;
      const applicableRank = [...RANKS_DATA].reverse().find(r => newXp >= r.minXp);
      
      if (applicableRank) {
          newRank = applicableRank.title;
      }
      
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        rank: newRank
      };
    });
  };

  const handleLevelComplete = (levelId: number, xpReward: number) => {
    // Only grant rewards if first time completing
    if (!profile.completedLevels.includes(levelId)) {
      gainXp(xpReward);
      setProfile(prev => ({
        ...prev,
        completedLevels: [...prev.completedLevels, levelId]
      }));
    }
    setCurrentScreen(Screen.HUB);
  };

  const handleProfileUpdate = (newName: string) => {
      setProfile(prev => ({ ...prev, name: newName }));
      setCurrentScreen(Screen.HUB);
  };

  const handleResetProgress = () => {
      localStorage.removeItem('ciberescape_profile');
      // Reset to a fresh object literal to ensure clean state
      setProfile({
        name: "Xabi",
        xp: 0,
        rank: "Becario de Distrito",
        level: 1,
        streak: 1,
        completedLevels: []
      });
      setCurrentScreen(Screen.ONBOARDING);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.SPLASH:
        return <Splash onComplete={() => setCurrentScreen(Screen.ONBOARDING)} />;
      case Screen.ONBOARDING:
        return <Onboarding onComplete={() => setCurrentScreen(Screen.HUB)} />;
      case Screen.HUB:
        return (
          <Hub 
            profile={profile} 
            onSelectLevel={(levelId) => {
              if (levelId === 1) setCurrentScreen(Screen.LEVEL_1);
              if (levelId === 2) setCurrentScreen(Screen.LEVEL_2);
              if (levelId === 3) setCurrentScreen(Screen.LEVEL_3);
              if (levelId === 4) setCurrentScreen(Screen.LEVEL_4);
              if (levelId === 5) setCurrentScreen(Screen.LEVEL_5);
            }}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        );
      case Screen.ARCADE:
        return (
            <Arcade 
                profile={profile} 
                onSelectLevel={(levelId) => {
                    if (levelId === 1) setCurrentScreen(Screen.LEVEL_1);
                    if (levelId === 2) setCurrentScreen(Screen.LEVEL_2);
                    if (levelId === 3) setCurrentScreen(Screen.LEVEL_3);
                    if (levelId === 4) setCurrentScreen(Screen.LEVEL_4);
                    if (levelId === 5) setCurrentScreen(Screen.LEVEL_5);
                }}
                onBack={() => setCurrentScreen(Screen.HUB)}
            />
        );
      case Screen.ONLINE:
          return <Online profile={profile} onBack={() => setCurrentScreen(Screen.HUB)} />;
      case Screen.RESOURCES:
          return <Resources onBack={() => setCurrentScreen(Screen.HUB)} />;
      case Screen.PROFILE_SETTINGS:
          return (
            <ProfileSettings 
                profile={profile} 
                onSave={handleProfileUpdate} 
                onReset={handleResetProgress}
                onBack={() => setCurrentScreen(Screen.HUB)} 
            />
          );
      case Screen.LEVEL_1:
        return (
          <LevelOne 
            onComplete={(success) => {
              if (success) handleLevelComplete(1, 100);
              else setCurrentScreen(Screen.HUB);
            }}
            onExit={() => setCurrentScreen(Screen.HUB)}
          />
        );
      case Screen.LEVEL_2:
        return (
          <LevelTwo
            onComplete={(success) => {
               if (success) handleLevelComplete(2, 250);
               else setCurrentScreen(Screen.HUB);
            }}
            onExit={() => setCurrentScreen(Screen.HUB)}
          />
        );
      case Screen.LEVEL_3:
        return (
          <LevelThree
            onComplete={(success) => {
               if (success) handleLevelComplete(3, 500);
               else setCurrentScreen(Screen.HUB);
            }}
            onExit={() => setCurrentScreen(Screen.HUB)}
          />
        );
      case Screen.LEVEL_4:
        return (
            <LevelFour 
                onComplete={(success) => {
                    if (success) handleLevelComplete(4, 300);
                    else setCurrentScreen(Screen.HUB);
                }}
                onExit={() => setCurrentScreen(Screen.HUB)}
            />
        );
      case Screen.LEVEL_5:
        return (
            <LevelFive
                onComplete={(success) => {
                    if (success) handleLevelComplete(5, 600);
                    else setCurrentScreen(Screen.HUB);
                }}
                onExit={() => setCurrentScreen(Screen.HUB)}
            />
        );
      default:
        return <div className="p-10 text-white">Error: Pantalla desconocida</div>;
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col bg-[#080d19]">
      <div className="cyber-scanline pointer-events-none absolute inset-0 z-50"></div>
      
      {currentScreen !== Screen.SPLASH && currentScreen !== Screen.ONBOARDING && (
        <Navbar profile={profile} onNavigate={(screen) => setCurrentScreen(screen)} />
      )}

      <main className="flex-1 relative z-10 flex flex-col overflow-y-auto overflow-x-hidden">
        {renderScreen()}
      </main>
    </div>
  );
}
