export interface Event {
  id: string;
  title: string;
  category: string;
  description: string;
  rating: string;
  price: string;
  discount:string;
  date: string;
  image?: string; 
  slots: string,
  bookedSlots: string,
  bookedBy?: string[]; // Array of user emails
}
import {getUsers} from "@/utils/auth";

const EVENT_KEY = "events";

// Safely get all events from localStorage
export const getEvents = (): Event[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(EVENT_KEY);
    return stored ? (JSON.parse(stored) as Event[]) : [];
  } catch (error) {
    console.error("Error parsing events from localStorage:", error);
    return [];
  }
};

// Save a new event to localStorage
export const saveEvent = (event: Event): void => {
  const events = getEvents();
  events.push(event);
  saveEvents(events);
};

// Save all events (overwrites existing)
export function saveEvents(events: Event[]): void {
  try {
    localStorage.setItem(EVENT_KEY, JSON.stringify(events));
  } catch (error) {
    console.error("Error saving events:", error);
  }
}

// Delete an event by ID
export function deleteEvent(id: string): void {
  const events = getEvents();
  const updatedEvents = events.filter((event) => event.id !== id);
  saveEvents(updatedEvents);
}

// Update an existing event
export async function updateEvent(updatedEvent: Event): Promise<void> {
  const events = await getEvents(); // assuming it fetches from API or localStorage
  const index = events.findIndex((e) => e.id === updatedEvent.id); // ❌ no need to await
  if (index !== -1) {
    events[index] = updatedEvent;

    // First update on the server
    const res = await fetch(`/api/events/${updatedEvent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvent),
    });

    if (!res.ok) {
      console.error("Failed to update event on server");
      return;
    }

    // Then update locally (if you're also storing in localStorage)
    saveEvents(events);
  } else {
    console.warn("Event not found for update");
  }
}

export function getUserBookings(): Event[] {
  if (typeof window === "undefined") return [];

  const userData = localStorage.getItem("currentUser");
  if (!userData) return [];

  try {
    const parsedUser = JSON.parse(userData) as { email: string; bookedEvents?: string[] };
    const allEvents = getEvents();

    // Find events that match the user's booked event IDs
    const bookedEvents = (parsedUser.bookedEvents || [])
      .map((id: string) => allEvents.find((event) => event.id === id))
      .filter((event): event is Event => event !== undefined);
    console.log(bookedEvents)

    return bookedEvents;
  } catch (error) {
    console.error("Error parsing user bookings:", error);
    return [];
  }
}

export async function bookEvent(event: Event, userEmail: string) {
  if (Number(event.bookedSlots) >= Number(event.slots)) {
    alert("This event is fully booked.");
    return;
  }

  if (event.bookedBy?.includes(userEmail)) {
    alert("You have already booked this event.");
    return;
  }

  // 1. Update event info
  event.bookedSlots = (Number(event.bookedSlots) + 1).toString();
  event.bookedBy = [...(event.bookedBy || []), userEmail];

  // 2. Update event in storage and API
  await updateEvent(event);
  await fetch(`/api/events/${event.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  // 3. Update the user's bookedEvents
  const users = getUsers();
  const updatedUsers = users.map((user) => {
    if (user.email === userEmail) {
      const alreadyBooked = user.bookedEvents?.includes(event.id);
      const updatedUser = {
        ...user,
        bookedEvents: alreadyBooked
          ? user.bookedEvents
          : [...(user.bookedEvents || []), event.id],
      };
      // Update currentUser in localStorage too
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      return updatedUser;
    }
    return user;
  });

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  alert("✅ Successfully booked the event!");
}
