import React from "react";

const Skeleton = ({
  variant = "text",
  width = "100%",
  height = "auto",
  className = "",
  count = 1,
  animate = true,
}) => {
  const baseClasses = `bg-gray-200 rounded ${animate ? "animate-pulse" : ""}`;

  const variants = {
    text: "h-4",
    title: "h-6",
    subtitle: "h-5",
    paragraph: "h-4",
    avatar: "h-10 w-10 rounded-full",
    button: "h-10 w-24 rounded-lg",
    card: "h-32 rounded-xl",
    image: "h-48 rounded-lg",
  };

  const heightClass = height !== "auto" ? `h-[${height}]` : variants[variant];
  const widthClass = width !== "100%" ? `w-[${width}]` : "w-full";

  const skeletonClasses = `
    ${baseClasses}
    ${heightClass}
    ${widthClass}
    ${className}
  `.trim();

  if (count === 1) {
    return <div className={skeletonClasses} />;
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={skeletonClasses} />
      ))}
    </div>
  );
};

// Pre-built skeleton components for common patterns
Skeleton.Card = ({ className = "" }) => (
  <div
    className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${className}`}
  >
    <div className="animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="h-8 bg-gray-200 rounded w-24"></div>
    </div>
  </div>
);

Skeleton.Dashboard = ({ className = "" }) => (
  <div className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
    <div className="animate-pulse">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

export default Skeleton;
