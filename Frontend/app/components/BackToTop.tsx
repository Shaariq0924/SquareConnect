"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import "../styles/backtotop.css";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHero = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`back-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToHero}
      aria-label="Back to top"
      title="Go to top"
    >
      <ChevronUp size={24} />
    </button>
  );
}
