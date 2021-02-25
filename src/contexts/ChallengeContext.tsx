import { createContext, useState, ReactNode } from 'react';

import challenges from '../data/challenges.json';

interface ChallengesProviderProps {
  children: ReactNode
}

interface ChallengesContextData {
  activeChallenge: Challenge;
  challengesCompleted: number;
  completeChallenge: (amount) => void;
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

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge () {
    setActiveChallenge(null);
  }

  function completeChallenge (amount: number) {
    if (amount > experienceToNextLevel) levelUp();

    setChallengesCompleted(challengesCompleted + 1);
    setCurrentExperience(currentExperience + amount);
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
