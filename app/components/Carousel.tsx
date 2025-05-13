"use client";

import events from "@/data/events.json";
import { useEffect, useState } from "react";
import Link from "next/link";

const Carousel = () => {
  const topEvents = events.sort((a, b) => b.rating - a.rating).slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % topEvents.length;
        window.location.hash = `#slide${newIndex}`;
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [topEvents.length]);

  return (
    <div className="carousel w-full rounded-lg bg-white md:h-[450px]">
      {topEvents.map((event, index) => (
        <div
          key={event.id}
          id={`slide${index}`}
          className="carousel-item relative w-full"
        >
          <img
            src={event.image}
            className="w-[600px] h-[350px] mx-auto rounded-xl object-cover mt-12"
            alt={event.title}
          />

          <h6 className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white font-bold text-xl bg-blue-700/50 px-4 py-2 rounded">
            <Link href={`/events/event-details/${event.id}`}>
              {event.title}
            </Link>
          </h6>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a
              href={`#slide${
                (index - 1 + topEvents.length) % topEvents.length
              }`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#slide${(index + 1) % topEvents.length}`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
