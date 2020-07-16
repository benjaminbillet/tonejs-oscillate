// import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import FormControl from '@material-ui/core/FormControl';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import ParticlesBg from 'particles-bg';

// import Oscillator from './Oscillator';
// import ModulationWaveFormPicker from './ModulationWaveFormPicker';

// class BubblyBackground extends PureComponent {
//   static propTypes = {
//     className: PropTypes.string,
//     children: PropTypes.node,
//   };

//   static defaultProps = {
//     className: null,
//     children: null,
//   };


//   render() {
//     let config = {
//       num: [2, 4],
//       rps: 0.1,
//       radius: [40, 100],
//       life: [1.5, 3],
//       v: [0.2, 0.3],
//       tha: [-10, 10],
//       alpha: [0.2, 0],
//       scale: [0.1, 0.4],
//       position: 'all',
//       color: ['#b4006f'],
//       cross: 'dead',
//       // emitter: 'follow',
//       random: 1,
//     };

//     if (Math.random() > 0.85) {
//       config = Object.assign(config, {
//         onParticleUpdate: (ctx, particle) => {
//           ctx.beginPath();
//           ctx.rect(
//             particle.p.x,
//             particle.p.y,
//             particle.radius * 2,
//             particle.radius * 2
//           );
//           ctx.fillStyle = particle.color;
//           ctx.fill();
//           ctx.closePath();
//         },
//       });
//     }

//     const { className, children } = this.props;
//     return (
//       <div className={className}>
//         <ParticlesBg type="custom" config={config} bg />
//         {children}
//       </div>
//     );
//   }
// }

// export default BubblyBackground;
