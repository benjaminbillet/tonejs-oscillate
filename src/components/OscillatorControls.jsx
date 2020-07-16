import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import Oscillator from './Oscillator';
import PartialEqualizer from './PartialEqualizer';
import CarrierWaveFormPicker from './CarrierWaveFormPicker';
import AMControls from './AMControls';
import FMControls from './FMControls';
import FatControls from './FatControls';

import styles from './OscillatorControls.css';

@observer
class OscillatorControls extends PureComponent {
  static propTypes = {
    oscillator: PropTypes.instanceOf(Oscillator).isRequired,
  };

  render() {
    const { oscillator } = this.props;

    let additionalControls = null;
    if (oscillator.oscillatorType === 'am') {
      additionalControls = <AMControls oscillator={oscillator} />;
    } else if (oscillator.oscillatorType === 'fm') {
      additionalControls = <FMControls oscillator={oscillator} />;
    } else if (oscillator.oscillatorType === 'fat') {
      additionalControls = <FatControls oscillator={oscillator} />;
    }

    return (
      <div className={styles.content}>
        <div className={styles.panel}>
          <CarrierWaveFormPicker oscillator={oscillator} />
          <PartialEqualizer oscillator={oscillator} size={16} />
        </div>
        { additionalControls }
      </div>
    );
  }
}

export default OscillatorControls;
