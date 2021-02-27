import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

import { LevelUpModal } from '../components/LevelUpModal';

import challenges from '../data/challenges.json';

interface ChallengesProviderProps {
  children: ReactNode,
  challengesCompleted: number;
  currentExperience: number;
  level: number;
}

interface ChallengesContextData {
  activeChallenge: Challenge;
  challengesCompleted: number;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
  currentExperience: number;
  experienceToNextLevel: number;
  level: number;
  levelUp: () => void;
  resetChallenge: () => void;
  startNewChallenge: () => void;
}

interface Challenge {
  amount: number;
  description: string;
  type: 'body' | 'eye';
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest  }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    const userCookies = {
      level,
      currentExperience,
      challengesCompleted
    };

    Cookies.set('SHAKEDEV-userCookies', JSON.stringify(userCookies));
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3');

    if (Notification.permission === 'granted') {
      new Notification('New Challenge 🎉', {
        body: `You can gain ${challenge.amount}xp!`
      });
    }
  }

  function resetChallenge () {
    setActiveChallenge(null);
  }

  function completeChallenge () {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setChallengesCompleted(challengesCompleted + 1);
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
  }

  function closeLevelUpModal () {
    setIsLevelUpModalOpen(false);
  }

  return (
    <ChallengesContext.Provider
      value={{
        activeChallenge,
        challengesCompleted,
        completeChallenge,
        closeLevelUpModal,
        currentExperience,
        experienceToNextLevel,
        level,
        levelUp,
        resetChallenge,
        startNewChallenge,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}
