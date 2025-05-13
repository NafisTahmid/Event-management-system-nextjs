// "use client"; // Needed for stateful components in Next.js 13+

// import events from "@/data/events.json";
// import Image from "next/image";
// import { useState, useEffect } from "react";

// const Carousel = () => {
//   const topEvents = events.sort((a, b) => b.rating - a.rating).slice(0, 3);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? topEvents.length - 1 : prevIndex - 1
//     );
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === topEvents.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   function automatedChange = (index) => {
//     return `#slide${(index + 1) % topEvents.length}`;
//      const interval = setInterval(automatedChange(index), 5000);
//      return () => clearInterval(interval);
//   };

//   // useEffect(() => {
//   //   const interval = setInterval(automagedChange(index), 5000);
//   //   return () => clearInterval(interval);
//   // }, []);
//   // #slide${(index + 1) % topEvents.length

//   return (
//     // <div className="carousel w-full relative bg-white rounded-lg md:h-[450px] sm:h=[300px]">
//     //   {topEvents.map((tEvent, index) => (
//     //     <div
//     //       key={tEvent.id}
//     //       className={`pt-6 pb-8 carousel-item relative w-full transition-opacity duration-500 ease-in-out ${
//     //         index === currentIndex ? "block" : "hidden"
//     //       }`}
//     //     >
//     //       <img
//     //         src={tEvent.image}
//     //         alt={tEvent.title}
//     //         // width={1200}
//     //         // height={600}
//     //         className="w-[600px] h-[350px] mx-auto rounded-xl object-cover"
//     //       />

//     //       {/* Overlay Text */}
//     //       <h6 className="absolute bottom-25 left-1/2 -translate-x-1/2 text-white font-bold text-xl bg-black/50 px-4 py-2 rounded">
//     //         {tEvent.title}
//     //       </h6>

//     //       <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
//     //         <button onClick={prevSlide} className="btn btn-circle">
//     //           ❮
//     //         </button>
//     //         <button onClick={nextSlide} className="btn btn-circle">
//     //           ❯
//     //         </button>
//     //       </div>
//     //     </div>
//     //   ))}
//     // </div>
//     <div className="carousel w-full rounded-lg bg-white md:h-[450px]">
//       {topEvents.map((event, index) => (
//         <div
//           key={event.id}
//           id={`slide${index}`}
//           className="carousel-item relative w-full"
//         >
//           <img
//             src={event.image}
//             className="w-[600px] h-[350px] mx-auto rounded-xl object-cover mt-12"
//             alt={event.title}
//           />
//           <h6 className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white font-bold text-xl bg-blue-700/50 px-4 py-2 rounded">
//             {event.title}
//           </h6>
//           <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
//             <a
//               href={`#slide${
//                 (index - 1 + topEvents.length) % topEvents.length
//               }`}
//               className="btn btn-circle"
//             >
//               ❮
//             </a>
//             <a
//               href={`#slide${(index + 1) % topEvents.length}`}
//               className="btn btn-circle"
//             >

//             </a>
//             <a href={() => automatedChange(index)} className="btn btn-circle">❯</a>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Carousel;
"use client";

import events from "@/data/events.json";
import { useEffect, useState } from "react";

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
            {event.title}
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
