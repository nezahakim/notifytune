import React from "react";

export const Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  size = "md",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline:
      "bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500 border border-gray-300",
  };
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
