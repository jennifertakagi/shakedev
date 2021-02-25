import { useContext } from 'react';

import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/CountDown.module.css';

export function Countdown() {
  const {
    hasFinished,
    isActive,
    minutes,
    seconds,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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
