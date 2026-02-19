import { HTMLAttributes, ReactNode, forwardRef } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "narrow" | "wide" | "fluid" | "textCenter";
  children: ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const base = "container";
    const variantClass = {
      default: "",
      narrow: "container--narrow",
      wide: "container--wide",
      fluid: "container--fluid",
      textCenter: "container--text-center",
    }[variant];

    return (
      <div
        ref={ref}
        className={`${base} ${variantClass} ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;