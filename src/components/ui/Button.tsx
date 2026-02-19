import { 
  forwardRef, 
  ReactNode, 
  ButtonHTMLAttributes, 
  AnchorHTMLAttributes 
} from "react";
import { cn } from "@/lib/utils";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "outline" | "success" | "ghost";
  size?: "small" | "default" | "large";
  pill?: boolean;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButtonProps extends ButtonBaseProps {
  link?: false | undefined;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  link: true;
  href: string;
}

type ButtonProps = 
  | (ButtonAsButtonProps & ButtonHTMLAttributes<HTMLButtonElement>)
  | (ButtonAsLinkProps & AnchorHTMLAttributes<HTMLAnchorElement>);

type ButtonRef = 
  | HTMLButtonElement 
  | HTMLAnchorElement;

const Button = forwardRef<ButtonRef, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      pill = false,
      children,
      link = false,
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
      ghost: "",
    }[variant];

    const sizeClasses = {
      small: "btn--small",
      default: "",
      large: "btn--large",
    }[size];

    const pillClass = pill ? "btn--pill" : "";

    const combinedClasses = cn(
      baseClasses,
      variantClasses,
      sizeClasses,
      pillClass,
      className
    );

    if (link) {
      const { href, ...anchorProps } = props as ButtonAsLinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClasses}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    const { ...buttonProps } = props as ButtonAsButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClasses}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;