import './theme.css';

import React from 'react';

import styles from './App.module.css';
import { MiniOscilloscope } from './components/MiniOscilloscope';
import { OscillatorControls } from './components/OscillatorControls';
import { OscillatorPicker } from './components/OscillatorPicker';
import { PlayPauseButton } from './components/PlayPauseButton';

const WavyBackground = () => {
  return <div className={styles.wavyBackground} />;
};

export const App = () => {
  return (
    <>
      <WavyBackground />
      <div className={styles.container}>
        <div className={styles.content}>
          <PlayPauseButton />
          <OscillatorPicker />
          <MiniOscilloscope />
          <OscillatorControls />
        </div>
      </div>
    </>
  );
};
