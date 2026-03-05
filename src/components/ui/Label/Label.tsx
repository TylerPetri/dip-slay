import clsx from 'clsx';
import styles from './Label.module.scss';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ className, children, ...props }: LabelProps) {
  return (
    <label className={clsx(styles.label, className)} {...props}>
      {children}
    </label>
  );
}