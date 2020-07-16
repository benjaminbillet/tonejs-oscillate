import React, { PureComponent } from 'react';
import { StylesProvider } from '@material-ui/styles';

import styles from './App.css';

import MiniOscilloscope from './components/MiniOscilloscope';
import Oscillator from './components/Oscillator';
import PlayPauseButton from './components/PlayPauseButton';
import OscillatorControls from './components/OscillatorControls';
import OscillatorPicker from './components/OscillatorPicker';

class WavyBackground extends PureComponent {
  render() {
    return <div className={styles.wavyBackground} />;
  }
}

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.oscillator = new Oscillator();
  }

  render() {
    return (
      <StylesProvider injectFirst>
        <WavyBackground />
        <div className={styles.container}>
          <div className={styles.content}>
            <PlayPauseButton source={this.oscillator} />
            <OscillatorPicker oscillator={this.oscillator} />
            <MiniOscilloscope oscillator={this.oscillator} />
            <OscillatorControls oscillator={this.oscillator} />
          </div>
        </div>
      </StylesProvider>
    );
  }
}
