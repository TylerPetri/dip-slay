'use client';

import { useUIStore } from '@/stores/uiStore';
import clsx from 'clsx';
import styles from './ToastContainer.module.scss';

export default function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            styles.toast,
            toast.variant === 'success' && styles.success,
            toast.variant === 'error' && styles.error,
            toast.variant === 'info' && styles.info
          )}
        >
          {toast.message}
          <button onClick={() => removeToast(toast.id)}>×</button>
        </div>
      ))}
    </div>
  );
}