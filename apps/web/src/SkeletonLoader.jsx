import React from "react";

// Custom Skeleton Component with Shimmer Animation
const SkeletonLoader = ({ width = "100%", height = "100%", borderRadius = "5px", style = {} }) => {
  const skeletonStyle = {
    width: width,
    height: height,
    borderRadius: borderRadius,
    ...style
  };

  return <div className="react-loading-skeleton" style={skeletonStyle}></div>;
};

export default SkeletonLoader;
