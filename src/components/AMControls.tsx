import React from 'react';
import { useAtom } from 'jotai';

import { oscillatorService } from '../domains/oscillator/oscillator.service';
import * as oscillatorState from '../domains/oscillator/oscillator.state';
import { CircleSliderWithLegend } from '../ds/CircleSliderWithLegend';
import styles from './AMControls.module.css';
import { ModulationWaveFormPicker } from './ModulationWaveFormPicker';

export function AMControls() {
  const [harmonicity] = useAtom(oscillatorState.harmonicity);

  return (
    <div>
      <ModulationWaveFormPicker />
      <div className={styles.controlsContainer}>
        <CircleSliderWithLegend
          value={harmonicity}
          onChange={value => oscillatorService.setHarmonicity(value)}
          className={styles.controlItem}
          legendClassName={styles.controlItem}
          legend="Harmonicity"
          min={0.3}
          max={5}
          stepSize={0.1}
        />
      </div>
    </div>
  );
}
