import { useState, useEffect } from "react";

export function Advertisement() {
  const images = [
    "1.png",
    "2.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length); // Auto-slide every 3 seconds
    }, 6000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className="relative overflow-hidden sm:mt-5 md:mt-10 lg:mt-20">
      <div className="mb-4">
        <span className="text-3xl font-bold">
          Start your adventure now and enjoy exclusive vouchers that make your hike even more rewarding
        </span>
      </div>

      {/* Slider image */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-[20rem] sm:h-[15rem] md:h-[18rem] lg:h-[25rem] relative"
          >
            <img
              src={image}
              alt={`slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 p-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`block w-3 h-3 rounded-full ${
              activeIndex === index ? "bg-white" : "bg-white/50"
            } cursor-pointer`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
