import React from "react";

const Card = ({
  children,
  variant = "default",
  padding = "md",
  className = "",
  hover = false,
  onClick,
  ...props
}) => {
  const baseClasses = "bg-white rounded-xl border transition-all duration-200";

  const variants = {
    default: "border-gray-200 shadow-sm",
    elevated: "border-gray-200 shadow-lg",
    interactive:
      "border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 cursor-pointer",
    outline: "border-gray-300 shadow-none hover:border-gray-400",
    gradient:
      "border-transparent bg-gradient-to-br from-primary-50 via-white to-secondary-50 shadow-sm",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const hoverEffects = hover ? "hover:scale-105 transform" : "";

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${paddings[padding]}
    ${hoverEffects}
    ${onClick ? "cursor-pointer" : ""}
    ${className}
  `.trim();

  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

// Card Sub-components
Card.Header = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

Card.Title = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

Card.Description = ({ children, className = "" }) => (
  <p className={`text-gray-600 ${className}`}>{children}</p>
);

Card.Content = ({ children, className = "" }) => (
  <div className={`${className}`}>{children}</div>
);

Card.Footer = ({ children, className = "" }) => (
  <div className={`mt-6 pt-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

export default Card;
