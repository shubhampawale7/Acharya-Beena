import React from "react";

// Vite handles these imports, ensuring the paths are always correct.
import stars from "../../assets/images/stars.png";
import twinkling from "../../assets/images/twinkling.png";
import clouds from "../../assets/images/clouds.png"; // <-- 1. Import the clouds image

const AnimatedBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-black">
      {/* Layer 1: The distant, slow-moving stars */}
      <div
        className="absolute top-0 left-0 w-[200%] h-full bg-transparent bg-repeat"
        style={{
          backgroundImage: `url(${stars})`,
          backgroundSize: "1000px 1000px",
          animation: "move-stars-back 250s linear infinite",
        }}
      />
      {/* Layer 2: The twinkling stars (moves faster) */}
      <div
        className="absolute top-0 left-0 w-[200%] h-full bg-transparent bg-repeat"
        style={{
          backgroundImage: `url(${twinkling})`,
          backgroundSize: "1000px 1000px",
          animation: "move-twink-back 200s linear infinite",
        }}
      />
      {/* --- 2. ADD THIS NEW CLOUDS LAYER --- */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-transparent bg-repeat opacity-40"
        style={{
          backgroundImage: `url(${clouds})`,
          backgroundSize: "cover",
          animation: "move-clouds-back 175s linear infinite",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
