import { useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, completeChallenge, resetChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSucceeded () {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed () {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
      <div className={styles.challengeActive}>
        <header>Gain {activeChallenge.amount}xp</header>

        <main>
          <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
          <strong>New challenge</strong>
          <p>{activeChallenge.description}</p>
        </main>

        <footer>
          <button
            type="button"
            className={styles.challengeFailedButton}
            onClick={handleChallengeFailed}
          >
            Failed
          </button>
          <button
            type="button"
            className={styles.challengeSucceededButton}
            onClick={handleChallengeSucceeded}
          >
            Succeeded
          </button>
        </footer>
      </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finish a cycle to receive a challenge</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Up your level completing challenges
          </p>
        </div>
      )}
    </div>
  );
}
