import React from 'react';
import { useAtom } from 'jotai';

import * as oscillatorService from '../domains/oscillator/oscillator.service';
import * as oscillatorState from '../domains/oscillator/oscillator.state';
import { Slider } from '../ds/Slider';
import styles from './PartialEqualizer.module.css';

function EqualizerLegend() {
  return (
    <div className={styles.legend}>
      <div className={styles.track}></div>
      <div className={styles.marks}>
        <div className={styles.topMark}>1</div>
        <div className={styles.middleMark}>0</div>
        <div className={styles.bottomMark}>-1</div>
      </div>
    </div>
  );
}

export function PartialEqualizer({ size = 16 }) {
  const [partials] = useAtom(oscillatorState.partials);

  const onChange = React.useCallback((index: number, value: number) => {
    oscillatorService.setPartial(index, value);
  }, []);

  const sliders = Array.from({ length: size }, (_, index) => (
    <Slider
      key={index}
      min={-1}
      max={1}
      step={0.1}
      orientation="vertical"
      value={partials[index] ?? 0}
      onChange={value => onChange(index, Array.isArray(value) ? value[0] : value)}
    />
  ));

  return (
    <div className={styles.equalizer}>
      {sliders}
      <EqualizerLegend />
    </div>
  );
}
