'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Dropdown.module.scss';

type DropdownProps = {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
  width?: 'auto' | 'trigger';
  className?: string;
};

export default function Dropdown({
  trigger,
  children,
  align = 'right',
  width = 'auto',
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className={clsx(styles.dropdown, className)} ref={ref}>
      <div
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={clsx(
            styles.menu,
            align === 'left' ? styles.alignLeft : styles.alignRight,
            width === 'trigger' && styles.widthTrigger
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}