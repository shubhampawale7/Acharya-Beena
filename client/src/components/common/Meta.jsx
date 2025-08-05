import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Acharya Beena | Astrologer",
  description: "Expert Vedic astrology, Vastu, and numerology consultations.",
  keywords:
    "astrology, vedic astrology, vastu, numerology, horoscope, acharya beena",
};

export default Meta;
