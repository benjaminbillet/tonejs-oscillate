import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import { CircleSlider as Slider } from 'react-circle-slider';

class CircleSlider extends PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    legend: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    legendClassName: PropTypes.string.isRequired,
  };

  render() {
    const { value, onChange, legend, className, legendClassName } = this.props;
    return (
      <div className={className}>
        <Slider
          value={value}
          size={150}
          min={0.3}
          max={5}
          stepSize={0.1}
          knobRadius={10}
          progressWidth={5}
          circleWidth={5}
          progressColor="#f50057"
          tooltipColor="#fff"
          shadow={false}
          onChange={onChange}
          showTooltip
        />
        <FormLabel component="legend" className={legendClassName}>{legend}</FormLabel>
      </div>
    );
  }
}

export default CircleSlider;
