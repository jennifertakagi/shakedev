import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengesProvider } from '../contexts/ChallengeContext';
import { CountdownProvider } from '../contexts/CountdownContext';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  challengesCompleted: number;
  currentExperience: number;
  level: number;
}

function Home({ challengesCompleted, currentExperience, level }: HomeProps) {
  return (
    <ChallengesProvider
      challengesCompleted={challengesCompleted}
      currentExperience={currentExperience}
      level={level}
    >
      <div className={styles.container}>
        <Head>
          <title>Home | shake.dev</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges/>
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userCookies = ctx.req.cookies['SHAKEDEV-userCookies'] || '{}';
  const { challengesCompleted, currentExperience, level } = JSON.parse(userCookies);

  return {
    props: {
      challengesCompleted: Number(challengesCompleted),
      currentExperience: Number(currentExperience),
      level: Number(level),
    }
  };
}
