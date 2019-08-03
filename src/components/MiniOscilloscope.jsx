import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tone from 'tone';

import { reaction } from 'mobx';
import { observer } from 'mobx-react';

import Oscillator from './Oscillator';
import styles from './MiniOscilloscope.css';

import { scale } from '../util';

@observer
class MiniOscilloscope extends PureComponent {
  static propTypes = {
    oscillator: PropTypes.instanceOf(Oscillator).isRequired,
    color: PropTypes.string,
    style: PropTypes.string,
  };

  static defaultProps = {
    color: '#b4006f',
    style: null,
  };

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    const { oscillator } = this.props;
    this.cleanReaction = reaction(() => oscillator.partials, () => this.updateCanvas());
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  componentWillUnmount() {
    this.cleanReaction();
  }

  getOscillatorSamples = async (oscillator) => {
    const options = oscillator.get();

    // we play the oscillator for a very short time at volume 0
    return Tone.Offline(() => {
      const clone = new oscillator.constructor(options);
      clone.frequency.value = 200;
      clone.detune.value = 0;
      clone.volume.value = 0;
      clone.toMaster().start(0).stop(0.005);
    }, 0.005);
  }

  drawOscillatorSamples = (canvas, samples) => {
    const context = canvas.getContext('2d');
    const { color } = this.props;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    context.clearRect(0, 0, width, height);

    const max = 1.1;
    const min = -1.1;
    const lineWidth = 4;

    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.strokeStyle = color;

    context.beginPath();
    samples.forEach((v, i) => {
      const x = scale(i, 0, samples.length, lineWidth, width - lineWidth);
      const y = scale(v, max, min, 0, height - lineWidth);
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });

    context.stroke();
  }

  updateCanvas() {
    const { oscillator } = this.props;
    this.getOscillatorSamples(oscillator.getWrapped()).then((buffer) => {
      this.drawOscillatorSamples(this.canvas.current, buffer.toArray(0));
    });
  }

  render() {
    const { style } = this.props;
    const className = [styles.canvas, style].join(' ');
    return <canvas ref={this.canvas} className={className} />;
  }
}

export default MiniOscilloscope;
