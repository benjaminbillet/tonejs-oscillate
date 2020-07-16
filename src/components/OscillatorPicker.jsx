import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { observer } from 'mobx-react';

import Oscillator from './Oscillator';
import styles from './OscillatorPicker.css';


@observer
class OscillatorPicker extends PureComponent {
  static propTypes = {
    oscillator: PropTypes.instanceOf(Oscillator).isRequired,
  };

  handleChange = (event) => {
    const { oscillator } = this.props;
    oscillator.setOscillatorType(event.target.value);
  }

  renderOptions = (options) => {
    return options.map((option) => (
      <FormControlLabel
        value={option.toLowerCase()}
        key={option.toLowerCase()}
        control={<Radio classes={{ root: styles.radioButton }} />}
        label={option}
      />
    ));
  }

  render() {
    const { oscillator } = this.props;
    return (
      <FormControl>
        <RadioGroup
          onChange={this.handleChange}
          value={oscillator.oscillatorType}
          className={styles.oscillatorPicker}
        >
          {this.renderOptions(['Basic', 'AM', 'FM', 'Fat'])}
        </RadioGroup>
      </FormControl>
    );
  }
}

export default OscillatorPicker;
