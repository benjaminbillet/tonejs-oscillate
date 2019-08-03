import { observable, action } from 'mobx';
import Tone from 'tone';

export default class Oscillator {
  @observable
  type = 'sine';

  @observable
  partials = [];

  @observable
  frequency = 440;

  constructor() {
    this.oscillator = new Tone.Oscillator({
      type: this.type,
      frequency: this.frequency,
    }).toMaster();
    this.partials = this.oscillator.partials;
  }

  start() {
    this.oscillator.start();
  }

  stop() {
    this.oscillator.stop();
  }

  @action
  setType(type) {
    this.oscillator.type = type;
    this.type = type;
    this.partials = this.oscillator.partials;
  }

  @action
  setPartial(index, value) {
    this.oscillator.partials[index] = value;
    this.oscillator.partials = this.oscillator.partials;
    this.partials = this.oscillator.partials;
    this.type = 'custom';
  }

  @action
  setFrequency(frequency) {
    this.oscillator.frequency = frequency;
    this.frequency = frequency;
  }

  getWrapped() {
    return this.oscillator;
  }
}
