import { observable, action } from 'mobx';
import Tone from 'tone';

export default class Oscillator {
  @observable
  carrierType = 'sine';

  @observable
  oscillatorType = 'basic';

  @observable
  modulationType = 'square';

  @observable
  partials = [];

  @observable
  frequency = 440;

  @observable
  harmonicity = 1;

  @observable
  modulationIndex = 2;

  @observable
  spread = 20;

  @observable
  count = 3;

  constructor() {
    this.oscillator = new Tone.OmniOscillator({
      type: this.getInternalType(),
      frequency: this.frequency,
      volume: -26,
    }).toMaster();
    this.resetOscillator();
  }

  start() {
    this.oscillator.start();
  }

  stop() {
    this.oscillator.stop();
  }

  @action
  setCarrierType(type) {
    this.carrierType = type;
    this.oscillator.type = this.getInternalType();
    this.partials = this.oscillator.partials;
  }

  @action
  setOscillatorType(type) {
    this.oscillatorType = type;
    this.resetOscillator();
  }

  @action
  setModulationType(type) {
    this.modulationType = type;
    this.oscillator.modulationType = type;
    this.resetOscillator();
  }

  @action
  setPartial(index, value) {
    this.oscillator.partials[index] = value;
    this.oscillator.partials = this.oscillator.partials;
    this.partials = this.oscillator.partials;
    this.type = 'custom';
  }

  @action
  setHarmonicity(harmonicity) {
    if (this.oscillator.harmonicity.value === harmonicity) {
      return;
    }
    this.oscillator.harmonicity.value = harmonicity;
    this.resetOscillator();
  }

  @action
  setModulationIndex(modulationIndex) {
    if (this.oscillator.modulationIndex.value === modulationIndex) {
      return;
    }
    this.oscillator.modulationIndex.value = modulationIndex;
    this.resetOscillator();
  }

  @action
  setSpread(spread) {
    if (this.oscillator.spread === spread) {
      return;
    }
    this.oscillator.spread = spread;
    this.resetOscillator();
  }

  @action
  setCount(count) {
    if (this.oscillator.count === count) {
      return;
    }
    this.oscillator.count = count;
    this.resetOscillator();
  }

  @action
  setFrequency(frequency) {
    this.oscillator.frequency = frequency;
    this.frequency = frequency;
  }

  @action
  resetOscillator() {
    this.oscillator.type = this.getInternalType();
    this.partials = this.oscillator.partials;
    this.harmonicity = (this.oscillator.harmonicity || { value: this.harmonicity }).value;
    this.modulationIndex = (this.oscillator.modulationIndex || { value: this.modulationIndex }).value;
    this.spread = this.oscillator.spread || this.spread;
    this.count = this.oscillator.count || this.count;
    this.frequency = this.oscillator.frequency || this.frequency;
  }

  getInternalType() {
    let type = this.carrierType;
    if (this.oscillatorType !== 'basic') {
      type = this.oscillatorType + type;
    }
    return type;
  }

  getWrapped() {
    return this.oscillator;
  }
}
