// src/components/common/AnimatedNumber.jsx

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  // useSpring adds a smooth, "bouncy" feel to the animation
  const springValue = useSpring(motionValue, {
    duration: 3000,
    stiffness: 100,
    damping: 50,
  });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    // This updates the displayed number as the spring animates
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString();
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
};

export default AnimatedNumber;
