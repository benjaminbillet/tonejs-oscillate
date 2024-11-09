import { getDefaultStore } from 'jotai';
import * as Tone from 'tone';

import * as state from './oscillator.state';
import { CarrierType, ModulationType, OmniOscillatorType, OscillatorType } from './oscillator.type';

const store = getDefaultStore();

const getOscillatorFullType = (oscillatorType: OscillatorType, carrierType: CarrierType) => {
  let type: OmniOscillatorType = carrierType;
  if (oscillatorType !== 'basic') {
    type = `${oscillatorType}${type}`;
  }
  return type;
};

const syncPartials = () => {
  const carrierType = store.get(state.carrierType);
  if (carrierType === 'custom') {
    const partials = store.get(state.partials);
    oscillator.partials = partials.length === 0 ? new Array(16).fill(0) : partials;
  }
};

const syncOscillatorParams = () => {
  const oscillatorType = store.get(state.oscillatorType);
  if ((oscillatorType === 'am' || oscillatorType === 'fm') && oscillator.harmonicity) {
    oscillator.harmonicity.value = store.get(state.harmonicity);
  }

  if (oscillatorType === 'fm' && oscillator.modulationIndex) {
    oscillator.modulationIndex.value = store.get(state.modulationIndex);
  }

  if (oscillatorType === 'fat') {
    oscillator.spread = store.get(state.spread);
    oscillator.count = store.get(state.count);
  }
};

const oscillator = new Tone.OmniOscillator({
  type: getOscillatorFullType(store.get(state.oscillatorType), store.get(state.carrierType)),
  frequency: 440,
  volume: -26,
}).toDestination();
syncOscillatorParams();
syncPartials();

export const setOscillatorType = (type: OscillatorType) => {
  store.set(state.oscillatorType, type);
  oscillator.type = getOscillatorFullType(type, store.get(state.carrierType));
  syncOscillatorParams();
  syncPartials();
};

export const setCarrierType = (type: CarrierType) => {
  store.set(state.carrierType, type);
  oscillator.type = getOscillatorFullType(store.get(state.oscillatorType), type);
  syncOscillatorParams();
  syncPartials();
};

export const setPartial = (index: number, value: number) => {
  const partials =
    oscillator.partials.length === 0 ? new Array(16).fill(0) : [...oscillator.partials];
  partials[index] = value;
  oscillator.partials = partials;
  store.set(state.partials, partials);
};

export const setModulationType = (type: ModulationType) => {
  oscillator.modulationType = type;
  store.set(state.modulationType, type);
};

export const setHarmonicity = (harmonicity: number) => {
  store.set(state.harmonicity, harmonicity);
  syncOscillatorParams();
};

export const setModulationIndex = (modulationIndex: number) => {
  store.set(state.modulationIndex, modulationIndex);
  syncOscillatorParams();
};

export const setSpread = (spread: number) => {
  store.set(state.spread, spread);
  syncOscillatorParams();
};

export const setCount = (count: number) => {
  store.set(state.count, count);
  syncOscillatorParams();
};

export const play = () => {
  oscillator.start();
};

export const pause = () => {
  oscillator.stop();
};

export const getOscillatorSamples = () => {
  const options = oscillator.get();

  // we play the oscillator for a very short time at volume 0
  return Tone.Offline(() => {
    const clone = new Tone.OmniOscillator(options);
    clone.frequency.value = 200;
    clone.detune.value = 0;
    clone.volume.value = 0;
    clone.toDestination().start(0).stop(0.005);
  }, 0.005);
};
