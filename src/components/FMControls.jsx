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
            onChange={value => oscillator.setHarmonicity(parseFloat(value.toFixed(1)))}
            className={styles.controlItem}
            legendClassName={styles.controlItem}
            legend="Harmonicity"
            min={0.3}
            max={5}
            stepSize={0.1}
          />
          <CircleSlider
            value={oscillator.modulationIndex}
            onChange={value => oscillator.setModulationIndex(parseFloat(value.toFixed(1)))}
            className={styles.controlItem}
            legendClassName={styles.controlItem}
            legend="Modulation Index"
            min={0}
            max={5}
            stepSize={0.1}
          />
        </div>
      </FormControl>
    );
  }
}

export default FMControls;
