import { useState, useEffect } from "react";

export function Advertisement() {
  const images = [
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
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
            <span className="text-3xl font-bold">Start your adventure now and enjoy exclusive vouchers that make your hike even more rewarding</span>
        </div>

      {/*Slider image*/}
      <div
        className="flex transition-all duration-1000 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 h-[20rem]">
            <img
              src={image}
              alt={`slide ${index + 1}`}
              className="h-full w-full object-cover"
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
