import { HTMLAttributes, ReactNode, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "border";
  children: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const base = "card";
    const variantClass = variant === "border" ? "card--border" : "";

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

Card.displayName = "Card";

const CardHeader = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={`card__header ${className || ""}`}>{children}</div>
);

const CardBody = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={`card__body ${className || ""}`}>{children}</div>
);

const CardFooter = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={`card__footer ${className || ""}`}>{children}</div>
);

export { Card, CardHeader, CardBody, CardFooter };