import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './LiveDot.module.scss'

type LiveDotProps = {
  count?: number;
  label?: string;
  pulsing?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

export default function LiveDot({
  count,
  label = 'Live',
  pulsing = true,
  className,
  ...rest
}: LiveDotProps) {
  return (
    <span className={clsx(styles.liveIndicator, className)} {...rest}>
      {count !== undefined && <strong>{count}</strong>}
      {count !== undefined && ' '}
      <span className={clsx(styles.dot, pulsing && styles.pulsing)} />
      {label && ` ${label}`}
    </span>
  );
}