import React from 'react';
import { useAtom } from 'jotai';

import { oscillatorService } from '../domains/oscillator/oscillator.service';
import * as oscillatorState from '../domains/oscillator/oscillator.state';
import { CircleSliderWithLegend } from '../ds/CircleSliderWithLegend';
import styles from './FMControls.module.css';
import { ModulationWaveFormPicker } from './ModulationWaveFormPicker';

export function FMControls() {
  const [harmonicity] = useAtom(oscillatorState.harmonicity);
  const [modulationIndex] = useAtom(oscillatorState.modulationIndex);

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
        <CircleSliderWithLegend
          value={modulationIndex}
          onChange={value => oscillatorService.setModulationIndex(value)}
          className={styles.controlItem}
          legendClassName={styles.controlItem}
          legend="Modulation Index"
          min={0}
          max={5}
          stepSize={0.1}
        />
      </div>
    </div>
  );
}
