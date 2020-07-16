import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import styles from './WaveFormPicker.css';

const WAVEFORM_NAMES = ['Sine', 'Square', 'Sawtooth', 'Triangle', 'Custom'];
const WAVEFORMS = WAVEFORM_NAMES.map(v => v.toLowerCase());

class WaveFormPicker extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOf(WAVEFORMS).isRequired,
    onSelect: PropTypes.func.isRequired,
    legend: PropTypes.string,
    hideCustom: PropTypes.bool,
  };

  static defaultProps = {
    hideCustom: false,
    legend: null,
  };

  handleChange = (event) => {
    const { onSelect } = this.props;
    onSelect(event.target.value);
  }

  renderOptions = (options) => {
    const { hideCustom } = this.props;
    return options.map((option) => {
      if (hideCustom && option === 'Custom') {
        return null;
      }
      return (
        <FormControlLabel
          value={option.toLowerCase()}
          key={option.toLowerCase()}
          control={<Radio classes={{ root: styles.radioButton }} />}
          label={option}
        />
      );
    });
  }

  render() {
    const { value, legend } = this.props;

    let legendComponent = null;
    if (legend != null) {
      legendComponent = <FormLabel component="legend" className={styles.waveFormLegend}>{legend}</FormLabel>;
    }

    return (
      <div className={styles.waveFormContainer}>
        {legendComponent}
        <RadioGroup
          onChange={this.handleChange}
          value={value}
          className={styles.waveFormPicker}
        >
          {this.renderOptions(WAVEFORM_NAMES)}
        </RadioGroup>
      </div>
    );
  }
}

export default WaveFormPicker;
