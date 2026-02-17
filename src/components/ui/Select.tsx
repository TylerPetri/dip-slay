import {
  SelectHTMLAttributes,
  forwardRef,
} from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string | boolean;
  helperText?: string;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
  wrapperClassName?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      placeholder,
      options,
      className = '',
      wrapperClassName = '',
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : undefined;

    return (
      <div className={`form-group ${wrapperClassName}`.trim()}>
        {label && (
          <label className="block mb-1 text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}

        <div className={`select-wrapper ${hasError ? 'has-error' : ''}`}>
          <select
            ref={ref}
            value={value}
            onChange={onChange}
            className={`select ${hasError ? 'select--error' : ''} ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {helperText && !hasError && (
          <p className="mt-1 text-xs text-text-secondary">{helperText}</p>
        )}

        {errorMessage && (
          <p className="form-group__error mt-1 text-xs">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;