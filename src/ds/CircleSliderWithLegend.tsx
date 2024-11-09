import * as React from 'react';

import { CircleSlider } from './CircleSlider';

export interface CircleSliderWithLegendProps {
  value: number;
  onChange: (value: number) => void;
  legend: string;
  className: string;
  legendClassName: string;
  min?: number;
  max?: number;
  stepSize?: number;
}

export function CircleSliderWithLegend({
  value,
  onChange,
  legend,
  className,
  legendClassName,
  min = 0,
  max = 100,
  stepSize = 1,
}: CircleSliderWithLegendProps) {
  return (
    <div className={className}>
      <CircleSlider
        value={value}
        size={150}
        min={min}
        max={max}
        step={stepSize}
        onChange={onChange}
      />
      <div className={legendClassName}>{legend}</div>
    </div>
  );
}
