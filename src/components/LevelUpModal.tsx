import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
  const { closeLevelUpModal, level } = useContext(ChallengesContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.LevelUpModalContainer}>
        <header>{level}</header>
        <strong>Congrats</strong>
        <p>You level up!</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Close Modal"/>
        </button>
      </div>
    </div>
  );
}
