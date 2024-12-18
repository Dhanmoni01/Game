import React, { useState, useEffect } from "react";
import "./RollDice.css";

export default function RollDice() {
  const images = [
    "./assets/images/Demo1.jpg",
    "./assets/images/Demo2.jpg",
    "./assets/images/Demo3.jpg",
    "./assets/images/Demo4.jpg",
    "./assets/images/Demo5.jpg",
    "./assets/images/Demo6.jpg",
  ];

  const [currentImages, setCurrentImages] = useState(images);
  const [rolling, setRolling] = useState(false);
  const [imageUsage, setImageUsage] = useState(
    images.reduce((acc, img) => ({ ...acc, [img]: 0 }), {})
  );
  const [rollCount, setRollCount] = useState(0); // Track the number of rolls
  const [audio] = useState(new Audio("./assets/music/audio.mp3"));

  useEffect(() => {
    if (rolling) {
      audio.play(); // Play audio when rolling starts
    } else {
      audio.pause(); // Pause audio when rolling ends
      audio.currentTime = 0; // Reset audio to start
    }
  }, [rolling, audio]);

  const rollDice = () => {
    setRolling(true); // Start rolling animation

    setTimeout(() => {
      let newImages;
      const updatedUsage = { ...imageUsage };

      if (rollCount === 5) {
        // Force all images to appear once on the 6th roll
        newImages = [...images];
      } else {
        // Select a pair
        const imagesCopy = [...images];
        const pairImageIndex = Math.floor(Math.random() * imagesCopy.length);
        const pairImage = imagesCopy.splice(pairImageIndex, 1)[0];

        // Shuffle remaining images and pick 4 unique ones
        const shuffledImages = imagesCopy.sort(() => Math.random() - 0.5);
        const uniqueImages = shuffledImages.slice(0, 4);

        // Combine pair and unique images, shuffle their positions
        newImages = [...uniqueImages, pairImage, pairImage].sort(
          () => Math.random() - 0.5
        );

        // Update usage counts for this roll
        newImages.forEach((img) => {
          updatedUsage[img] += 1;
        });
      }

      // Reset usage after 6 rolls
      if (rollCount === 5) {
        for (const key in updatedUsage) {
          updatedUsage[key] = 0;
        }
        setRollCount(0); // Reset roll count
      } else {
        setRollCount(rollCount + 1); // Increment roll count
      }

      setImageUsage(updatedUsage);
      setCurrentImages(newImages);
      setRolling(false); // Stop rolling animation
    }, 6000); // Match animation duration
  };

  const handleReset = () => {
    setCurrentImages(images);
    setImageUsage(images.reduce((acc, img) => ({ ...acc, [img]: 0 }), {}));
    setRollCount(0);
  };

  return (
    <div>
      <div className="dice-container">
        {currentImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Demo ${idx + 1}`}
            className={`dice ${rolling ? "rolling" : ""}`}
          />
        ))}
      </div>
      <button onClick={rollDice} disabled={rolling}>
        {rolling ? "Rolling..." : "🎲 Roll Dice"}
      </button>
      <button onClick={handleReset} disabled={rolling}>
        🔄 Reset
      </button>
    </div>
  );
}
