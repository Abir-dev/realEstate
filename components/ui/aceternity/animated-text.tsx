'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  animationType?: 'wave' | 'bounce' | 'gradient' | 'typewriter';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = '',
  animationType = 'wave' 
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  // Different animation styles
  const animations = {
    wave: {
      initial: { y: 0 },
      animate: (i: number) => ({
        y: [0, -10, 0],
        transition: {
          delay: i * 0.05,
          duration: 0.5,
          repeat: 0,
          ease: "easeInOut",
          type: "tween" // Explicitly set to tween to handle multiple keyframes
        }
      })
    },
    bounce: {
      initial: { y: 0, opacity: 0 },
      animate: (i: number) => ({
        y: [20, 0],
        opacity: [0, 1],
        transition: {
          delay: i * 0.07,
          duration: 0.6,
          ease: "backOut",
          type: "tween" // Explicitly set to tween to handle multiple keyframes
        }
      })
    },
    gradient: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.8 } }
    },
    typewriter: {
      initial: { width: 0 },
      animate: { width: "100%", transition: { duration: 1.5, ease: "easeOut" } }
    }
  };

  const renderText = () => {
    switch (animationType) {
      case 'gradient':
        return (
          <motion.div
            initial={animations.gradient.initial}
            animate={animations.gradient.animate}
            className={className}
          >
            {text}
          </motion.div>
        );
      
      case 'typewriter':
        return (
          <div className="flex overflow-hidden">
            <motion.div
              initial={animations.typewriter.initial}
              animate={animations.typewriter.animate}
              className={`${className} whitespace-nowrap overflow-hidden`}
            >
              {text}
            </motion.div>
          </div>
        );
      
      // Wave and bounce animations (character by character)
      default:
        return (
          <div className={`flex ${className}`}>
            {text.split('').map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                initial={animations[animationType].initial}
                animate={animations[animationType].animate(index)}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        );
    }
  };

  return (
    <div ref={textRef}>
      {renderText()}
    </div>
  );
};

export default AnimatedText;