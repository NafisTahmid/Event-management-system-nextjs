"use client";

import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { getEvents, deleteEvent, Event } from "@/utils/events";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { Input } from "@/app/components/ui/input";
import { ScrollArea } from "@/app/components/ui/scroll-area";

import {
  X,
  MessageCircle,
  Send,
  Loader2,
  ArrowDownCircleIcon,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/client";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error,
  } = useChat({ api: "/api/gemini" });

  useEffect(() => {
    const fetchedEvents = getEvents();
    // async function fetchEvents() {
    //   const res = await fetch("/api/events");
    //   const allEvents = await res.json();
    // }
    setEvents(fetchedEvents);

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        deleteEvent(id);
        setEvents(getEvents());
        router.push("/events");
      }
    } else {
      alert("Failed to delete");
    }
  };

  const handleEdit = (id: string) => {
    console.log(id);
    router.push(`/events/${id}/edit`);
  };

  return (
    // <section className="md:h-full flex items-center text-gray-600">
    //   <h1 className="text-4xl font-bold text-center mb-10">Available Events</h1>

    //   <div className="flex flex-wrap justify-center gap-8">
    //     {events.map((event) => (
    //       <div key={event.id} className="card w-80 bg-base-100 shadow-xl">
    //         <figure>
    //           <img
    //             src={event.image || "/default-event.jpg"}
    //             alt={event.title}
    //             className="w-80 object-cover"
    //           />
    //         </figure>
    //         <div className="card-body">
    //           <Link href={`/events/event-details/${event.id}`}>
    //             <h2 className="card-title">{event.title}</h2>
    //           </Link>
    //           <p className="text-sm text-gray-500">{event.date}</p>
    //           <p>{event.description}</p>
    //           <div className="card-actions justify-end mt-4">
    //             <button
    //               className="btn btn-warning btn-sm"
    //               onClick={() => handleEdit(event.id)}
    //             >
    //               Edit
    //             </button>
    //             <button
    //               className="btn btn-error btn-sm"
    //               onClick={() => handleDelete(event.id)}
    //             >
    //               Delete
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </section>
    <section className="md:h-full flex items-center text-gray-600">
      <div className="container px-5 py-10 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl text-yellow-700 font-semibold pb-2">
            Accelx Recent Events
          </h1>
          <h5 className="text-base md:text-lg text-indigo-700 mb-1">
            See our recent Events
          </h5>
        </div>
        <div className="flex flex-wrap m-4">
          {events.map((event) => (
            <div key={event.id} className="p-4 sm:w-1/2 lg:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  src={event.image}
                  alt="image"
                  className="lg:h-72 md:h-48 w-full object-cover object-center"
                />
                <div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
                  <h2 className="text-yellow-600 font-medium mb-1 text-2xl">
                    {event.title}
                  </h2>
                  <p>{event.description.split(" ").slice(1, 5).join(" ")}...</p>
                  <div className="flex items-center flex-wrap">
                    <Link
                      href={`/events/event-details/${event.id}`}
                      className="text-yellow-600 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chatbot icon */}
      <div className="flex flex-col min-h-screen">
        <AnimatePresence>
          {showChatIcon && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-4 right-4 z-50"
            >
              <Button
                onClick={toggleChat}
                className="rounded-full size-14 p-2 shadow-lg"
                ref={chatIconRef}
                size="icon"
              >
                {!isChatOpen ? (
                  <MessageCircle className="size-12" />
                ) : (
                  <ArrowDownCircleIcon />
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 1, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[500px]"
            >
              <Card className="border-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-medium">
                    Chat with Accelx AI
                  </CardTitle>
                  <Button
                    onClick={toggleChat}
                    className="rounded-full size-14 p-2 shadow-lg"
                    size="icon"
                    variant="ghost"
                  >
                    <X className="size-12" />
                    <span className="sr-only">Close chat</span>
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="w-full mt-32 text-gray-500 items-center justify-center flex gap-3 text-black font-bold">
                      No messages yet.
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <form
                    onSubmit={handleSubmit}
                    className="flex w-full items-center space-x-2"
                  >
                    <input
                      value={input}
                      onChange={handleInputChange}
                      className="flex-1"
                      placeholder="Type your message here"
                    />
                  </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
