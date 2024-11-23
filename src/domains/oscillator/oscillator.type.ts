import {
  AMOscillator,
  FatOscillator,
  FMOscillator,
  Oscillator,
  PulseOscillator,
  PWMOscillator,
} from 'tone';

export type CarrierType = 'sine' | 'square' | 'sawtooth' | 'triangle' | 'custom';
export type ModulationType = 'sine' | 'square' | 'sawtooth' | 'triangle';
export type OscillatorType = 'basic' | 'am' | 'fm' | 'fat';

export type OmniOscillatorType =
  | 'sine'
  | 'square'
  | 'sawtooth'
  | 'triangle'
  | 'custom'
  | 'pwm'
  | 'pulse'
  | 'fatsine'
  | 'fatsquare'
  | 'fatsawtooth'
  | 'fattriangle'
  | 'fatcustom'
  | 'fmpulse'
  | 'fmsine'
  | 'fmsquare'
  | 'fmsawtooth'
  | 'fmtriangle'
  | 'fmcustom'
  | 'amsine'
  | 'amsquare'
  | 'amsawtooth'
  | 'amtriangle'
  | 'amcustom';

export type AnyOscillator =
  | Oscillator
  | PWMOscillator
  | PulseOscillator
  | FatOscillator
  | AMOscillator
  | FMOscillator;
