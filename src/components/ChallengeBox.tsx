import { useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, completeChallenge, resetChallenge } = useContext(ChallengesContext);

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
            onClick={resetChallenge}
          >
            Failed
          </button>
          <button
            type="button"
            className={styles.challengeSucceededButton}
            onClick={() => completeChallenge(activeChallenge.amount)}
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
