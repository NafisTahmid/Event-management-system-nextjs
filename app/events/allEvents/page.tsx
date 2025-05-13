"use client";
import events from "@/data/events.json";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { MdNavigateNext } from "react-icons/md";
import { FcPrevious } from "react-icons/fc";

const ITEMS_PER_PAGE = 3;

const AllEventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredEvents, setFilteredEvents] = useState(events);

  // Get unique categories
  const categories = ["All", ...new Set(events.map((event) => event.category))];

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = filteredEvents.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? events
        : events.filter((event) => event.category === selectedCategory);

    setFilteredEvents(filtered);
    setCurrentPage(0);
  }, [selectedCategory, events]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-end">
          <form className="mb-6 mt-20 ms-10">
            <label className="block mb-2 font-medium">Select Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedCategory(value);
                // const filtered =
                //   value === "All"
                //     ? events
                //     : events.filter((event) => event.category === value);
                // setFilteredEvents(filtered);
              }}
              className="p-2 border border-gray-300 rounded mr-4"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </form>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-10">
            Events ({selectedCategory.toUpperCase()})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-105 transition duration-300"
              >
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    {event.description.length > 100
                      ? event.description.slice(0, 100) + "..."
                      : event.description}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">📅 {event.date}</p>

                  <Link href={`/events/event-details/${event.id}`}>
                    <span className="inline-block bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                      View Details
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center mt-6 space-x-2"
        previousLabel={
          <span>
            <FcPrevious className="mt-2" size={20} />
          </span>
        }
        // nextLabel="Next →"
        nextLabel={
          <span>
            <MdNavigateNext className="mt-2" size={20} />
          </span>
        }
        pageClassName="px-3 py-1 border rounded"
        activeClassName="bg-blue-500 text-white"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </>
  );
};

export default AllEventsPage;
