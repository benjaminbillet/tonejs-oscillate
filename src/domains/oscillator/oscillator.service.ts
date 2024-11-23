import { getDefaultStore } from 'jotai';
import * as Tone from 'tone';

import * as state from './oscillator.state';
import {
  AnyOscillator,
  CarrierType,
  ModulationType,
  OmniOscillatorType,
  OscillatorType,
} from './oscillator.type';

class OscillatorService {
  private readonly oscillator: Tone.OmniOscillator<AnyOscillator>;
  private readonly store: ReturnType<typeof getDefaultStore>;

  constructor() {
    this.store = getDefaultStore();
    this.oscillator = new Tone.OmniOscillator({
      type: this.getOscillatorFullType(
        this.store.get(state.oscillatorType),
        this.store.get(state.carrierType),
      ),
      frequency: 440,
      volume: -26,
    }).toDestination();
    this.syncOscillatorParams();
    this.syncPartials();
  }

  setOscillatorType(type: OscillatorType) {
    this.store.set(state.oscillatorType, type);
    this.oscillator.type = this.getOscillatorFullType(type, this.store.get(state.carrierType));
    this.syncOscillatorParams();
    this.syncPartials();
  }

  setCarrierType(type: CarrierType) {
    this.store.set(state.carrierType, type);
    this.oscillator.type = this.getOscillatorFullType(this.store.get(state.oscillatorType), type);
    this.syncOscillatorParams();
    this.syncPartials();
  }

  setPartial(index: number, value: number) {
    const partials =
      this.oscillator.partials.length === 0 ? new Array(16).fill(0) : [...this.oscillator.partials];
    partials[index] = value;
    this.oscillator.partials = partials;
    this.store.set(state.partials, partials);
  }

  setModulationType(type: ModulationType) {
    this.oscillator.modulationType = type;
    this.store.set(state.modulationType, type);
  }

  setHarmonicity(harmonicity: number) {
    this.store.set(state.harmonicity, harmonicity);
    this.syncOscillatorParams();
  }

  setModulationIndex(modulationIndex: number) {
    this.store.set(state.modulationIndex, modulationIndex);
    this.syncOscillatorParams();
  }

  setSpread(spread: number) {
    this.store.set(state.spread, spread);
    this.syncOscillatorParams();
  }

  setCount(count: number) {
    this.store.set(state.count, count);
    this.syncOscillatorParams();
  }

  play() {
    this.oscillator.start();
  }

  pause() {
    this.oscillator.stop();
  }

  getOscillatorSamples() {
    const options = this.oscillator.get();

    // we play the oscillator for a very short time at volume 0
    return Tone.Offline(() => {
      const clone = new Tone.OmniOscillator(options);
      clone.frequency.value = 200;
      clone.detune.value = 0;
      clone.volume.value = 0;
      clone.toDestination().start(0).stop(0.005);
    }, 0.005);
  }

  private getOscillatorFullType(oscillatorType: OscillatorType, carrierType: CarrierType) {
    let type: OmniOscillatorType = carrierType;
    if (oscillatorType !== 'basic') {
      type = `${oscillatorType}${type}`;
    }
    return type;
  }

  private syncPartials() {
    const carrierType = this.store.get(state.carrierType);
    if (carrierType === 'custom') {
      const partials = this.store.get(state.partials);
      this.oscillator.partials = partials.length === 0 ? new Array(16).fill(0) : partials;
    }
  }

  private syncOscillatorParams() {
    const oscillatorType = this.store.get(state.oscillatorType);
    if ((oscillatorType === 'am' || oscillatorType === 'fm') && this.oscillator.harmonicity) {
      this.oscillator.harmonicity.value = this.store.get(state.harmonicity);
    }

    if (oscillatorType === 'fm' && this.oscillator.modulationIndex) {
      this.oscillator.modulationIndex.value = this.store.get(state.modulationIndex);
    }

    if (oscillatorType === 'fat') {
      this.oscillator.spread = this.store.get(state.spread);
      this.oscillator.count = this.store.get(state.count);
    }
  }
}

export const oscillatorService = new OscillatorService();
