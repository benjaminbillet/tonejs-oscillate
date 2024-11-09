import React from 'react';
import { useAtom } from 'jotai';

import * as oscillatorService from '../domains/oscillator/oscillator.service';
import * as oscillatorState from '../domains/oscillator/oscillator.state';
import { CarrierType } from '../domains/oscillator/oscillator.type';
import { WaveFormPicker } from './WaveFormPicker';

export function CarrierWaveFormPicker() {
  const [carrierType] = useAtom(oscillatorState.carrierType);

  return (
    <WaveFormPicker
      value={carrierType}
      onChange={type => {
        oscillatorService.setCarrierType(type as CarrierType);
      }}
      name="carrier-wave-form-picker"
    />
  );
}
