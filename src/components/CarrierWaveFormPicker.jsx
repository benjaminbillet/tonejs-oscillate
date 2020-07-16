import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import Oscillator from './Oscillator';
import WaveFormPicker from './WaveFormPicker';

@observer
class CarrierWaveFormPicker extends PureComponent {
  static propTypes = {
    oscillator: PropTypes.instanceOf(Oscillator).isRequired,
  };

  render() {
    const { oscillator } = this.props;
    return (
      <WaveFormPicker
        value={oscillator.carrierType}
        onSelect={type => oscillator.setCarrierType(type)}
      />
    );
  }
}

export default CarrierWaveFormPicker;
