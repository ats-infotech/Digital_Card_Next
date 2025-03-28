'use client'
import React, { useEffect, useRef } from "react";

const ConsoleText = ({ className }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const words = ["For Your", "IT Field", "Needs!"];
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 300;
    let eraseSpeed = 150;

    const animate = () => {
      const currentWord = words[wordIndex];
      let displayText = isDeleting
        ? currentWord.substring(0, letterIndex - 1)
        : currentWord.substring(0, letterIndex + 1);
      if (textRef.current) {
        textRef.current.innerHTML = displayText;
      } else {
        window.location.reload()
      }

      if (!isDeleting && displayText === currentWord) {
        isDeleting = true;
        typingSpeed = 2000;
      } else if (isDeleting && displayText === "") {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 300;
      }

      letterIndex = isDeleting ? letterIndex - 1 : letterIndex + 1;
      let speed = isDeleting ? eraseSpeed : typingSpeed;

      setTimeout(animate, speed);
    };

    animate();
  }, []);

  return (
    <div className={className}>
      <span ref={textRef}></span>
    </div>
  );
};

export default ConsoleText;
