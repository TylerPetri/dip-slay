import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    const hasError = !!error;
    const errorClass = hasError ? "input--error" : "";

    return (
      <input
        ref={ref}
        className={`input ${errorClass} ${className || ""}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;