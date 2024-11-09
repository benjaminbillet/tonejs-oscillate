import React from 'react';
import { useAtom } from 'jotai';

import * as oscillatorState from '../domains/oscillator/oscillator.state';
import { AMControls } from './AMControls';
import { CarrierWaveFormPicker } from './CarrierWaveFormPicker';
import { FatControls } from './FatControls';
import { FMControls } from './FMControls';
import styles from './OscillatorControls.module.css';
import { PartialEqualizer } from './PartialEqualizer';

export function OscillatorControls() {
  const [oscillatorType] = useAtom(oscillatorState.oscillatorType);
  const [carrierType] = useAtom(oscillatorState.carrierType);

  let additionalControls = null;
  if (oscillatorType === 'am') {
    additionalControls = <AMControls />;
  } else if (oscillatorType === 'fm') {
    additionalControls = <FMControls />;
  } else if (oscillatorType === 'fat') {
    additionalControls = <FatControls />;
  }

  let partialsControl = null;
  if (carrierType === 'custom') {
    partialsControl = <PartialEqualizer size={16} />;
  }

  return (
    <div className={styles.content}>
      <div className={styles.panel}>
        <CarrierWaveFormPicker />
        {partialsControl}
      </div>
      {additionalControls}
    </div>
  );
}
