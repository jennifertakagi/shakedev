import { createContext, useState, ReactNode, useEffect } from 'react';

import challenges from '../data/challenges.json';

interface ChallengesProviderProps {
  children: ReactNode
}

interface ChallengesContextData {
  activeChallenge: Challenge;
  challengesCompleted: number;
  completeChallenge: () => void;
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

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  function levelUp() {
    setLevel(level + 1);
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

  return (
    <ChallengesContext.Provider
      value={{
        activeChallenge,
        challengesCompleted,
        completeChallenge,
        currentExperience,
        experienceToNextLevel,
        level,
        levelUp,
        resetChallenge,
        startNewChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}
