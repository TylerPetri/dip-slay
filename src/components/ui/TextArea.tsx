import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean | string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    const hasError = !!error;
    const errorClass = hasError ? "input--error" : "";

    return (
      <textarea
        ref={ref}
        className={`textarea ${errorClass} ${className || ""}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;