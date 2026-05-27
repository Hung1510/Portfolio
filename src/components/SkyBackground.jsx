import { useEffect, useState } from "react";

export const SkyBackground = () => {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    generateClouds();

    const handleResize = () => {
      generateClouds();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateClouds = () => {
    const numberOfClusters = Math.floor(window.innerWidth / 300);
    const newClouds = [];

    for (let i = 0; i < numberOfClusters; i++) {
      const clusterX = (i / numberOfClusters) * 100 + (Math.random() * 5 - 2.5);
      const clusterY = Math.random() * 40 + 5;
      const numCloudsInCluster = Math.floor(Math.random() * 3) + 3; // 3–5 mây

      for (let j = 0; j < numCloudsInCluster; j++) {
        newClouds.push({
          id: `${i}-${j}`,
          size: Math.random() * 80 + 120, // 120–200px
          x: Math.min(100, Math.max(0, clusterX + Math.random() * 6 - 3)),
          y: clusterY + Math.random() * 2 - 1,
          delay: Math.random() * 10, // delay max 10s
          duration: Math.random() * 60 + 60, // 60–120s → chậm, giống thực
          opacity: Math.random() * 0.3 + 0.4, // 0.4–0.7 dịu mắt hơn
          scale: Math.random() * 0.3 + 0.9,
        });
      }
    }

    setClouds(newClouds);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-b from-white to-blue-200">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="cloud animate-cloud"
          style={{
            width: cloud.size + "px",
            height: cloud.size * 0.5 + "px",
            left: cloud.x + "%",
            top: cloud.y + "%",
            animationDelay: cloud.delay + "s",
            animationDuration: cloud.duration + "s",
            opacity: cloud.opacity,
            transform: `scale(${cloud.scale})`,
          }}
        />
      ))}
    </div>
  );
};
