import React from "react";

// Vite handles these imports, ensuring the paths are always correct.
import stars from "../../assets/images/star.png";
import clouds from "../../assets/images/cloud.png";

const AnimatedBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-black overflow-hidden">
      {/* Layer 1: The distant, slow-moving stars */}
      <div
        className="absolute top-0 left-0 w-[200%] h-full bg-transparent bg-repeat"
        style={{
          backgroundImage: `url(${stars})`,
          backgroundSize: "1000px 1000px",
          animation: "move-stars-back 250s linear infinite alternate",
        }}
      />
      {/* Layer 2: The drifting clouds/nebula */}
      <div
        className="absolute top-0 left-0 w-[200%] h-full bg-transparent bg-repeat opacity-40"
        style={{
          backgroundImage: `url(${clouds})`,
          backgroundSize: "1000px 1000px",
          animation: "move-clouds-back 175s linear infinite alternate",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
