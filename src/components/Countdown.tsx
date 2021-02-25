import { useState, useCallback, useEffect, useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/CountDown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  const startCountdown = useCallback(() => {
    setIsActive(true);
  }, [isActive])


  const resetCountdown = useCallback(() => {
    clearTimeout(countdownTimeout);
    setTime(25 * 60);
    setIsActive(false);
  }, [isActive])

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
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          type="button"
          className={styles.countdownButton}
          onClick={startCountdown}
        >
          Finished cycle
        </button>
      ): (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Stop cycle
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Start new cycle
            </button>
          )}
        </>
      )}
    </div>
  );
}
