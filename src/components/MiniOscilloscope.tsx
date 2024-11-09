import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useAtom } from 'jotai';

import * as oscillatorService from '../domains/oscillator/oscillator.service';
import * as oscillatorState from '../domains/oscillator/oscillator.state';
import { scale } from '../utils/scale';
import styles from './MiniOscilloscope.module.css';

const draw = async (canvas: HTMLCanvasElement, color: string) => {
  const samples = (await oscillatorService.getOscillatorSamples()).toArray(0);

  const context = canvas.getContext('2d');
  if (!context) {
    return;
  }

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  context.clearRect(0, 0, width, height);

  const max = 1.1;
  const min = -1.1;
  const lineWidth = 4;

  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.strokeStyle = color;

  context.beginPath();
  samples.forEach((v, i) => {
    const x = scale(i, 0, samples.length, lineWidth, width - lineWidth);
    const y = scale(v as number, max, min, 0, height - lineWidth);
    if (i === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });

  context.stroke();
};

export function MiniOscilloscope({ color = '#b4006f', style = null }) {
  const [carrierType] = useAtom(oscillatorState.carrierType);
  const [oscillatorType] = useAtom(oscillatorState.oscillatorType);
  const [partials] = useAtom(oscillatorState.partials);
  const [harmonicity] = useAtom(oscillatorState.harmonicity);
  const [modulationIndex] = useAtom(oscillatorState.modulationIndex);
  const [spread] = useAtom(oscillatorState.spread);
  const [count] = useAtom(oscillatorState.count);
  const [modulationType] = useAtom(oscillatorState.modulationType);

  const canvasRef = React.createRef<HTMLCanvasElement>();

  useEffect(() => {
    if (canvasRef.current) {
      draw(canvasRef.current, color);
    }
  }, [
    carrierType,
    oscillatorType,
    partials,
    harmonicity,
    modulationIndex,
    spread,
    count,
    modulationType,
  ]);

  return <canvas ref={canvasRef} className={clsx(styles.canvas, style)} />;
}
