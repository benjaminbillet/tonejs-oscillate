import React from 'react';
import { useAtom } from 'jotai';

import { oscillatorService } from '../domains/oscillator/oscillator.service';
import * as oscillatorState from '../domains/oscillator/oscillator.state';
import { CircleSliderWithLegend } from '../ds/CircleSliderWithLegend';
import styles from './FatControls.module.css';

export function FatControls() {
  const [spread] = useAtom(oscillatorState.spread);
  const [count] = useAtom(oscillatorState.count);

  return (
    <div className={styles.controlsContainer}>
      <CircleSliderWithLegend
        value={spread}
        onChange={value => oscillatorService.setSpread(value)}
        className={styles.controlItem}
        legendClassName={styles.controlItem}
        legend="Spread"
        min={0}
        max={40}
      />
      <CircleSliderWithLegend
        value={count}
        onChange={value => oscillatorService.setCount(value)}
        className={styles.controlItem}
        legendClassName={styles.controlItem}
        legend="Count"
        min={1}
        max={10}
      />
    </div>
  );
}
