import React from "react";
import { motion } from "framer-motion";

// --- Data Store for Unique Zodiac Styles ---
const ZODIAC_STYLES = {
  Aries: { colors: ["#FF4848", "#FF7D29"], glow: "#FF4848" },
  Taurus: { colors: ["#00B8A9", "#59C3C3"], glow: "#00B8A9" },
  Gemini: { colors: ["#FFD700", "#FFF700"], glow: "#FFD700" },
  Cancer: { colors: ["#C0C0C0", "#F5F5F5"], glow: "#C0C0C0" },
  Leo: { colors: ["#FFAC33", "#FFD43A"], glow: "#FFAC33" },
  Virgo: { colors: ["#3D550C", "#81B622"], glow: "#81B622" },
  Libra: { colors: ["#F76B8A", "#FFC0CB"], glow: "#F76B8A" },
  Scorpio: { colors: ["#581845", "#900C3F"], glow: "#900C3F" },
  Sagittarius: { colors: ["#4A148C", "#8E24AA"], glow: "#8E24AA" },
  Capricorn: { colors: ["#4E342E", "#795548"], glow: "#795548" },
  Aquarius: { colors: ["#00A8E8", "#00FFFF"], glow: "#00A8E8" },
  Pisces: { colors: ["#1A759F", "#76C893"], glow: "#1A759F" },
};

// --- Data Store for Bold, Filled Zodiac Glyphs ---
const ZODIAC_GLYPHS = {
  Aries: () => (
    <path d="M60 25C60 40 40 40 40 25C40 10 60 10 60 25ZM50 40V80M35 80H65" />
  ),
  Taurus: () => (
    <path d="M50 80C70 80 80 65 80 50C80 35 70 20 50 20C30 20 20 35 20 50C20 65 30 80 50 80ZM50 50C60 50 65 40 65 30M50 50C40 50 35 40 35 30" />
  ),
  Gemini: () => <path d="M30 20V80M70 20V80M20 30H80M20 70H80" />,
  Cancer: () => (
    <path d="M25 35C25 20 40 20 40 35C40 50 25 50 25 35ZM75 65C75 80 60 80 60 65C60 50 75 50 75 65Z" />
  ),
  Leo: () => (
    <path d="M50 20C30 20 20 40 20 60C20 80 40 80 50 80C60 80 80 70 80 50C80 30 60 45 60 45" />
  ),
  Virgo: () => (
    <path d="M20 20V80H35V50M35 50L50 80M50 80V20H65V80M65 80L80 50V80" />
  ),
  Libra: () => <path d="M20 80H80M20 65H80M30 50C30 35 70 35 70 50" />,
  Scorpio: () => (
    <path d="M20 20V80H35V50M35 50L50 80M50 80V20H65V50M85 70L65 50L85 50" />
  ),
  Sagittarius: () => <path d="M20 80L80 20M50 20H80V50M20 50H50" />,
  Capricorn: () => (
    <path d="M20 50L40 20L60 50V80M60 50C60 30 80 30 80 50C80 70 60 70 60 50Z" />
  ),
  Aquarius: () => (
    <path d="M20 40L35 60L50 40L65 60L80 40M20 60L35 80L50 60L65 80L80 60" />
  ),
  Pisces: () => (
    <path d="M20 20C20 50 80 50 80 20M20 80C20 50 80 50 80 80M50 20V80" />
  ),
};

// A reusable component for the twinkling particle effect
const Particles = ({ count = 20, glowColor }) => (
  <g>
    {Array.from({ length: count }).map((_, i) => (
      <motion.circle
        key={i}
        cx={Math.random() * 80 + 10}
        cy={Math.random() * 80 + 10}
        r={Math.random() * 0.8 + 0.2}
        fill={glowColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: Math.random() * 2 + 1,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </g>
);

export const ZodiacIcon = ({ signName, ...props }) => {
  const style = ZODIAC_STYLES[signName];
  const Glyph = ZODIAC_GLYPHS[signName];

  if (!style || !Glyph) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
        />
      </svg>
    );
  }
  const gradientId = `grad-${signName}`;

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={style.colors[0]} />
          <stop offset="100%" stopColor={style.colors[1]} />
        </linearGradient>
        <filter id={`glow-${signName}`}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        </filter>
      </defs>

      {/* Pulsing background glow */}
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill={style.glow}
        style={{ filter: `url(#glow-${signName})` }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dark background circle */}
      <circle cx="50" cy="50" r="45" fill="#111122" />

      {/* Twinkling Particles */}
      <Particles glowColor={style.glow} />

      {/* The Glyph */}
      <motion.g
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
      >
        <Glyph />
      </motion.g>

      {/* Animated Outer Ring */}
      <motion.circle
        cx="50"
        cy="50"
        r="48"
        fill="transparent"
        stroke={style.glow}
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "circOut" }}
      />

      {/* Apply fill and stroke to the glyph */}
      <style jsx>{`
        g path {
          fill: url(#${gradientId});
          stroke: white;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      `}</style>
    </motion.svg>
  );
};
