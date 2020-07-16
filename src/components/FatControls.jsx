import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import Oscillator from './Oscillator';
import CircleSlider from './CircleSlider';

import styles from './FatControls.css';

@observer
class FatControls extends PureComponent {
  static propTypes = {
    oscillator: PropTypes.instanceOf(Oscillator).isRequired,
  };

  render() {
    const { oscillator } = this.props;
    return (
      <div className={styles.controlsContainer}>
        <CircleSlider
          value={oscillator.spread}
          onChange={value => oscillator.setSpread(value)}
          className={styles.controlItem}
          legendClassName={styles.controlItem}
          legend="Spread"
        />
        <CircleSlider
          value={oscillator.count}
          onChange={value => oscillator.setCount(value)}
          className={styles.controlItem}
          legendClassName={styles.controlItem}
          legend="Count"
        />
      </div>
    );
  }
}

export default FatControls;
