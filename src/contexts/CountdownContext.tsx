import { createContext, ReactNode, useState, useEffect, useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengeContext';

interface CountdownContextProps {
  children: ReactNode
}

interface CountdownContextData {
  hasFinished: boolean;
  isActive: boolean;
  minutes: number;
  seconds: number;
  startCountdown: () => void;
  resetCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownContextProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  let countdownTimeout: NodeJS.Timeout;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown () {
    setIsActive(true);
  }

  function resetCountdown () {
    clearTimeout(countdownTimeout);
    setTime(25 * 60);
    setIsActive(false);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider
      value={{
        hasFinished,
        isActive,
        minutes,
        seconds,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
