import React from 'react';
import clsx from 'clsx';

import * as oscillatorService from '../domains/oscillator/oscillator.service';
import { Button } from '../ds/Button';
import styles from './PlayPauseButton.module.css';

export function PlayPauseButton() {
  const [playing, setPlaying] = React.useState(false);

  const onClick = React.useCallback(() => {
    if (playing) {
      oscillatorService.pause();
    } else {
      oscillatorService.play();
    }
    setPlaying(!playing);
  }, [playing]);

  let text = 'Play';
  let stateClassName = styles.playPauseButtonPlaying;
  if (playing) {
    text = 'Pause';
    stateClassName = styles.playPauseButtonPaused;
  }

  return (
    <Button className={clsx(styles.playPauseButton, stateClassName)} onClick={onClick}>
      {text}
    </Button>
  );
}
