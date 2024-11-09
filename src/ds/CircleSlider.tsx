import * as React from 'react';
import clsx from 'clsx';

import styles from './CircleSlider.module.css';

/** CONSTANTS */

const DEG_360 = 2 * Math.PI;
const DEG_270 = (3 / 2) * Math.PI;
const DEG_180 = Math.PI;
const DEG_90 = Math.PI / 2;

/** HELPERS */

const clamp = (x: number, min: number, max: number) => Math.min(Math.max(x, min), max);

const mapRange = (x: number, inLow: number, inHigh: number, outLow: number, outHigh: number) => {
  if (x === Infinity || x === -Infinity) return x;
  return ((x - inLow) * (outHigh - outLow)) / (inHigh - inLow) + outLow;
};

const countDecimals = (value: number) => {
  if (Math.floor(value) !== value) {
    return value.toString().split('.')[1].length || 0;
  }
  return 0;
};

const valueToAngle = (value: number, min: number, max: number) => {
  const angle = mapRange(value, min, max, 0, DEG_360);

  // we subtract a small value to distinguish 0 degrees from 360 degrees
  if (angle > 0.00001) {
    return angle - 0.00001;
  }

  return angle;
};

/** PROPS INTERFACES */

interface CircleSliderProps {
  size?: number;
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  handleRadius?: number;
  classNames?: {
    rail?: string;
    track?: string;
    handle?: string;
    label?: string;
  };
  continuous?: boolean;
}

interface RailProps {
  radius: number;
  cx: number;
  cy: number;
  className?: string;
}

interface HandleProps {
  radius: number;
  cx: number;
  cy: number;
  className?: string;
}

interface TrackProps {
  radius: number;
  cx: number;
  cy: number;
  angle: number;
  className?: string;
}

interface LabelProps {
  cx: number;
  cy: number;
  className?: string;
  children: React.ReactNode;
}

/** SUB-COMPONENTS */

function Rail({ radius, cx, cy, className }: RailProps) {
  return <circle className={clsx(styles.rail, className)} r={radius} cx={cx} cy={cy} />;
}

function Track({ radius, cx, cy, className, angle }: TrackProps) {
  const direction = angle < DEG_270 ? 0 : 1;
  const x = cx + radius * Math.cos(angle);
  const y = cy + radius * Math.sin(angle);

  const points = [];
  points.push('M' + cx);
  points.push(cy + radius);
  points.push('A');
  points.push(radius);
  points.push(radius);
  points.push(0);
  points.push(direction);
  points.push(1);
  points.push(x);
  points.push(y);
  const pathDef = points.join(' ');

  return <path className={clsx(styles.track, className)} d={pathDef} />;
}

function Handle({ radius, cx, cy, className }: HandleProps) {
  return <circle className={clsx(styles.handle, className)} r={radius} cx={cx} cy={cy} />;
}

function Label({ cx, cy, className, children }: LabelProps) {
  return (
    <text x={cx} y={cy} className={clsx(styles.label, className)}>
      {children}
    </text>
  );
}

/** MAIN COMPONENT */

export function CircleSlider({
  size = 180,
  value = 0,
  step = 1,
  min = 0,
  max = 100,
  handleRadius = 10,
  classNames = {},
  onChange = () => {},
  continuous = true,
}: CircleSliderProps) {
  const isDragging = React.useRef(false); // isDragging won't have impact on the rendering, so we can use a ref
  const svgRef = React.useRef<SVGSVGElement>(null);

  // we determine the initial angle by mapping the value from range [min, max] to [0, 2π]
  const safeValue = clamp(value, min, max);
  const [angle, setAngle] = React.useState(valueToAngle(safeValue, min, max));

  // center of the rail in the svg coordinate system
  const centerX = size / 2;
  const centerY = size / 2;

  // radius of the rail
  const radius = size / 2 - handleRadius;

  // angle of the track (= filled part of the rail)
  const trackAngle = angle + DEG_90;

  // center of the handle
  const handleX = centerX + radius * Math.cos(trackAngle);
  const handleY = centerY + radius * Math.sin(trackAngle);

  // maximum number of increments between min and max, according to step
  const maxIncrements = 1 + Math.trunc((max - min) / step);
  const angleIncrement = DEG_360 / maxIncrements;

  const handleMouseMove = React.useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      if (!isDragging.current || !svgRef.current) {
        return;
      }

      const bbox = svgRef.current.getBoundingClientRect();
      const width = bbox.width;
      const center = width / 2;
      const relativeX = event.clientX - bbox.left;
      const relativeY = event.clientY - bbox.top;

      const angleBetweenTwoVectors = Math.atan2(relativeY - center, relativeX - center);
      const newAngle = (angleBetweenTwoVectors + DEG_270) % DEG_360;

      if (Math.abs(newAngle - angle) >= DEG_180) {
        return;
      }
      const currentStep = Math.round(newAngle / angleIncrement);
      const newValue = parseFloat(
        clamp(min + currentStep * step, min, max).toFixed(countDecimals(step)),
      );
      if (continuous) {
        setAngle(newAngle);
      }
      if (newValue === safeValue) {
        return;
      }
      if (!continuous) {
        setAngle(valueToAngle(newValue, min, max));
      }
      onChange(newValue);
    },
    [svgRef, isDragging, angle, safeValue, min, max, step, size, continuous, onChange],
  );

  const handleMouseUp = React.useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      isDragging.current = false;
    },
    [isDragging],
  );

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      event.preventDefault();
      isDragging.current = true;
    },
    [isDragging],
  );

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <svg
      ref={svgRef}
      width={`${size}px`}
      height={`${size}px`}
      viewBox={`0 0 ${size} ${size}`}
      onMouseDown={handleMouseDown}
      style={{
        boxSizing: 'border-box',
      }}
    >
      <g>
        <Rail radius={radius} cx={centerX} cy={centerY} className={classNames.rail} />
        <Track
          radius={radius}
          angle={trackAngle}
          cx={centerX}
          cy={centerY}
          className={classNames.track}
        />
        <Handle radius={handleRadius} cx={handleX} cy={handleY} className={classNames.handle} />
        <Label cx={centerX} cy={centerY} className={classNames.label}>
          {safeValue}
        </Label>
      </g>
    </svg>
  );
}
