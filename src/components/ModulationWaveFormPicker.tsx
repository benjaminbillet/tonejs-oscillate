import React from 'react';
import { useAtom } from 'jotai';

import { oscillatorService } from '../domains/oscillator/oscillator.service';
import * as oscillatorState from '../domains/oscillator/oscillator.state';
import { ModulationType } from '../domains/oscillator/oscillator.type';
import { WaveFormPicker } from './WaveFormPicker';

export function ModulationWaveFormPicker() {
  const [modulationType] = useAtom(oscillatorState.modulationType);

  return (
    <WaveFormPicker
      value={modulationType}
      onChange={type => oscillatorService.setModulationType(type as ModulationType)}
      legend="Modulation"
      hideCustom
      name="modulation-wave-form-picker"
    />
  );
}
