"use client";
import qaData from "@/data/qa.json";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  X,
  MessageCircle,
  Send,
  Loader2,
  ArrowDownCircleIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Event } from "@/utils/events";
import { useGeminiChat } from "../hooks/useGeminiChat";
import Image from "next/image";

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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatOpenTwo, setIsChatOpenTwo] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const [showChatIconTwo, setShowChatIconTwo] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);

  // For chatbot two
  const [inputTwo, setInputTwo] = useState("");
  const [messagesTwo, setMessagesTwo] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    // error,
    // stop,
    // reload,
  } = useGeminiChat();

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }

      if (window.scrollY < 100) {
        setShowChatIconTwo(true);
      } else {
        setShowChatIconTwo(false);
        setIsChatOpenTwo(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const toggleChatTwo = () => setIsChatOpenTwo(!isChatOpenTwo);

  const handleInputChangeTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTwo(e.target.value);
  };

  const handleSubmitTwo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTwo.trim()) return;

    const userMessage = inputTwo.trim();
    setMessagesTwo((prev) => [...prev, { role: "user", content: userMessage }]);

    setInputTwo("");

    const match = qaData.find(
      (qa) => qa.question.toLowerCase() === userMessage.toLowerCase()
    );

    const botResponse = match
      ? match.answer
      : "I'm sorry, I don't know the answer to that yet.";

    setTimeout(() => {
      setMessagesTwo((prev) => [...prev, { role: "ai", content: botResponse }]);
      // setMessagesTwo([...messagesTwo, {role:"ai", content:botResponse}]);
    }, 500);
  };

  return (
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
                  alt="event"
                  className="lg:h-72 md:h-48 w-full object-cover object-center"
                />
                <div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
                  <h2 className="text-yellow-600 font-medium mb-1 text-2xl">
                    {event.title}
                  </h2>
                  <p>
                    {event.description.split(" ").slice(0, 20).join(" ")}...
                  </p>
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
            </div>
          ))}
        </div>
      </div>

      {/* Floating Chat Button */}
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

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
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
                </Button>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-[300px] pr-4">
                  {messages.length === 0 && (
                    <div className="w-full mt-32 text-center text-gray-500 font-bold">
                      No messages yet.
                    </div>
                  )}
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2 ${
                        msg.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <strong>{msg.role === "user" ? "You" : "AI"}:</strong>{" "}
                      {msg.content}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-center items-center py-2">
                      <Loader2 className="animate-spin w-5 h-5 text-primary" />
                      <button onClick={stop} className="underline ml-2">
                        Abort
                      </button>
                    </div>
                  )}
                  {/* {error && (
                    <div className="flex justify-center items-center py-2 text-red-500">
                      An error occurred
                      <button onClick={reload} className="underline ml-2">
                        Retry
                      </button>
                    </div>
                  )} */}
                </ScrollArea>
              </CardContent>

              <CardFooter>
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1"
                    placeholder="Type your message here"
                  />
                  <Button
                    type="submit"
                    className="size-9"
                    disabled={isLoading}
                    size="icon"
                  >
                    <Send className="size-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating icon new */}
      <AnimatePresence>
        {showChatIconTwo && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className="fixed top-13 right-4 z-50"
          >
            <Button
              onClick={toggleChatTwo}
              className="rounded-full size-14 p-2 shadow-lg"
              ref={chatIconRef}
              size="icon"
            >
              {!isChatOpenTwo ? (
                <MessageCircle className="size-12" />
              ) : (
                <ArrowDownCircleIcon />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpenTwo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 right-4 z-50 w-[95%] md:w-[500px]"
          >
            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-lg font-medium">
                  Chat with Accelx AI
                </CardTitle>
                <Button
                  onClick={toggleChatTwo}
                  className="rounded-full size-14 p-2 shadow-lg"
                  size="icon"
                  variant="ghost"
                >
                  <X className="size-12" />
                </Button>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-[300px] pr-4">
                  {messagesTwo.length === 0 && (
                    <div className="w-full mt-32 text-center text-gray-500 font-bold">
                      No messages yet.
                    </div>
                  )}

                  {messagesTwo.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2 ${
                        msg.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <strong>{msg.role === "user" ? "You" : "AI"}:</strong>{" "}
                      {msg.content}
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>

              <CardFooter>
                <form
                  onSubmit={handleSubmitTwo}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    value={inputTwo}
                    onChange={handleInputChangeTwo}
                    className="flex-1"
                    placeholder="Type your message here"
                  />
                  <Button type="submit" className="size-9" size="icon">
                    <Send className="size-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
