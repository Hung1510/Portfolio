import { useEffect, useState } from "react";

type Star = {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  animationDuration: number;
};

type Meteor = {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
};

export const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    generateStars();

    const resize = () => generateStars();
    window.addEventListener("resize", resize);

    // start meteor spawning loop
    spawnMeteorLoop();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );

    const newStars: Star[] = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      });
    }

    setStars(newStars);
  };

  const spawnMeteor = () => {
    const meteor: Meteor = {
      id: Date.now() + Math.random(),
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 15,
      duration: Math.random() * 2 + 3,
    };

    // add new meteor
    setMeteors((prev) => [...prev, meteor]);

    // remove after animation finishes
    setTimeout(() => {
      setMeteors((prev) =>
        prev.filter((m) => m.id !== meteor.id)
      );
    }, meteor.duration * 1000);
  };

  const spawnMeteorLoop = () => {
    const loop = () => {
      spawnMeteor();

      // random next spawn
      const next = Math.random() * 2000 + 1000;

      setTimeout(loop, next);
    };

    loop();
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: `${meteor.size * 60}px`,
            height: `${meteor.size * 2}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDuration: `${meteor.duration}s`,
          }}
        />
      ))}
    </div>
  );
};