import Link from "next/link";

const EventCard = ({ event }) => {
  return (
    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-64 object-cover object-center"
      />
      <div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
        <h2 className="text-yellow-600 font-medium mb-1 text-2xl">
          {event.title}
        </h2>
        <p>{event.description.split(" ").slice(0, 20).join(" ")}...</p>
        <div className="flex items-center flex-wrap">
          <Link
            href={`/events/event-details/${event.id}`}
            className="text-yellow-600 inline-flex items-center"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
