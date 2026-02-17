import { FormHTMLAttributes, ReactNode, forwardRef } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  children: ReactNode;
}

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <form ref={ref} className={`form ${className || ""}`} {...props}>
        {title && <h2 className="form__title">{title}</h2>}
        {children}
      </form>
    );
  }
);

Form.displayName = "Form";

export default Form;