import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "success" | "ghost";
  size?: "small" | "default" | "large";
  pill?: boolean;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      pill = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = "btn";

    const variantClasses = {
      primary: "btn--primary",
      secondary: "btn--secondary",
      outline: "btn--outline",
      success: "btn--success",
      ghost: "", // TODO: add ghost style if needed
    }[variant];

    const sizeClasses = {
      small: "btn--small",
      default: "",
      large: "btn--large",
    }[size];

    const pillClass = pill ? "btn--pill" : "";

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses,
          sizeClasses,
          pillClass,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;