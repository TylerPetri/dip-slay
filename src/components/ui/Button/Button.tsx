import { ComponentPropsWithoutRef, ElementType } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonVariant = 'slayer' | 'watcher' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

type Props<C extends ElementType> = {
  as?: C;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & ComponentPropsWithoutRef<C>;

export default function Button<C extends ElementType = 'button'>({
  as,
  variant = 'slayer',
  size = 'medium',
  className,
  children,
  ...props
}: Props<C>) {
  const Component = as || 'button';

  return (
    <Component
      className={clsx(
        styles.btn,
        styles[`variant--${variant}`],
        styles[`size--${size}`],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}