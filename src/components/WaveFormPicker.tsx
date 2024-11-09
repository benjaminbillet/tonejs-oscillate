import React from 'react';

import { RadioPicker } from '../ds/RadioPicker';
import styles from './WaveFormPicker.module.css';

const options = [
  { value: 'sine', label: 'Sine' },
  { value: 'square', label: 'Square' },
  { value: 'sawtooth', label: 'Sawtooth' },
  { value: 'triangle', label: 'Triangle' },
  { value: 'custom', label: 'Custom' },
];

export interface WaveFormPickerProps {
  value: string;
  onChange: (value: string) => void;
  name: string;
  legend?: string | null;
  hideCustom?: boolean;
}

export function WaveFormPicker({
  value,
  onChange,
  name,
  legend = null,
  hideCustom = false,
}: WaveFormPickerProps) {
  let legendComponent = null;
  if (legend != null) {
    legendComponent = <span className={styles.waveFormLegend}>{legend}</span>;
  }

  const finalOptions = hideCustom ? options.filter(option => option.value !== 'custom') : options;

  return (
    <div className={styles.waveFormContainer}>
      {legendComponent}
      <RadioPicker options={finalOptions} value={value} onChange={onChange} name={name} />
    </div>
  );
}
