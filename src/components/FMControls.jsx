import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { observer } from 'mobx-react';

import Oscillator from './Oscillator';
import ModulationWaveFormPicker from './ModulationWaveFormPicker';
import CircleSlider from './CircleSlider';

import styles from './FMControls.css';

@observer
class FMControls extends PureComponent {
  static propTypes = {
    oscillator: PropTypes.instanceOf(Oscillator).isRequired,
  };

  render() {
    const { oscillator } = this.props;
    return (
      <FormControl>
        <ModulationWaveFormPicker oscillator={oscillator} />
        <div className={styles.controlsContainer}>
          <CircleSlider
            value={oscillator.harmonicity}
            onChange={value => oscillator.setHarmonicity(value.toFixed(1))}
            className={styles.controlItem}
            legendClassName={styles.controlItem}
            legend="Harmonicity"
          />
          <CircleSlider
            value={oscillator.modulationIndex}
            onChange={value => oscillator.setModulationIndex(value)}
            className={styles.controlItem}
            legendClassName={styles.controlItem}
            legend="Modulation Index"
          />
        </div>
      </FormControl>
    );
  }
}

export default FMControls;
