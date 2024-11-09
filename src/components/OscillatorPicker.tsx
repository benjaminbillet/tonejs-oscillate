import React from 'react';
import { useAtom } from 'jotai';

import * as oscillatorService from '../domains/oscillator/oscillator.service';
import * as oscillatorState from '../domains/oscillator/oscillator.state';
import { OscillatorType } from '../domains/oscillator/oscillator.type';
import { RadioPicker } from '../ds/RadioPicker';

const options = [
  { value: 'basic', label: 'Basic' },
  { value: 'am', label: 'AM' },
  { value: 'fm', label: 'FM' },
  { value: 'fat', label: 'Fat' },
];

export function OscillatorPicker() {
  const [oscillatorType] = useAtom(oscillatorState.oscillatorType);

  const onChange = React.useCallback(
    (type: string) => {
      oscillatorService.setOscillatorType(type as OscillatorType);
    },
    [oscillatorService],
  );

  return (
    <RadioPicker
      options={options}
      value={oscillatorType}
      onChange={onChange}
      name="oscillator-picker"
    />
  );
}
