import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import Oscillator from './Oscillator';
import WaveFormPicker from './WaveFormPicker';

@observer
class ModulationWaveFormPicker extends PureComponent {
  static propTypes = {
    oscillator: PropTypes.instanceOf(Oscillator).isRequired,
  };

  render() {
    const { oscillator } = this.props;
    return (
      <WaveFormPicker
        value={oscillator.modulationType}
        onSelect={type => oscillator.setModulationType(type)}
        legend="Modulation"
        hideCustom
      />
    );
  }
}

export default ModulationWaveFormPicker;
