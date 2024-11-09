import { atom } from 'jotai';

import { CarrierType, ModulationType, OscillatorType } from './oscillator.type';

export const oscillatorType = atom<OscillatorType>('basic');
export const carrierType = atom<CarrierType>('sine');
export const modulationType = atom<ModulationType>('sine');
export const partials = atom<number[]>([]);
export const harmonicity = atom(0.3);
export const modulationIndex = atom(2);
export const spread = atom(20);
export const count = atom(3);
