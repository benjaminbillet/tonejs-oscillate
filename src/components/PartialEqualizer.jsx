import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import { observer } from 'mobx-react';

import Oscillator from './Oscillator';
import styles from './PartialEqualizer.css';

@observer
class PartialEqualizer extends Component {
  static propTypes = {
    size: PropTypes.number,
    oscillator: PropTypes.instanceOf(Oscillator).isRequired,
  };

  static defaultProps = {
    size: 16,
  };

  onSlide = (index, e, value) => {
    const { oscillator } = this.props;
    oscillator.setPartial(index, value);
  }

  renderSliders() {
    const { size, oscillator } = this.props;
    return new Array(size).fill().map((_, index) => (
      <Slider
        className={styles.slider}
        key={index}
        orientation="vertical"
        min={-1}
        max={1}
        step={0.1}
        valueLabelDisplay="auto"
        valueLabelFormat={x => x.toFixed(1)}
        value={oscillator.partials[index] || 0}
        onChange={(event, value) => this.onSlide(index, event, value)}
      />
    ));
  }

  render() {
    const marks = [
      { value: -1, label: '-1' },
      { value: 0, label: '0' },
      { value: 1, label: '1' },
    ];
    const classes = {
      thumb: styles.hiddenThumb,
      markLabelActive: styles.markLabelActive,
      markLabel: styles.markLabel,
    };
    return (
      <div className={styles.equalizer}>
        {this.renderSliders()}
        <Slider
          classes={classes}
          disabled
          orientation="vertical"
          min={-1}
          max={1}
          marks={marks}
          defaultValue={-1}
        />
      </div>
    );
  }
}

export default PartialEqualizer;
