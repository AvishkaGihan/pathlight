import React from "react";

const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-full";

  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary-100 text-primary-800",
    secondary: "bg-secondary-100 text-secondary-800",
    success: "bg-secondary-100 text-secondary-800",
    warning: "bg-warning-100 text-warning-800",
    error: "bg-error-100 text-error-800",
    accent: "bg-accent-100 text-accent-800",
    outline: "border border-gray-300 text-gray-700 bg-white",
    solid: "bg-gray-800 text-white",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim();

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;
