
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
import {getUsers, getCurrentUser, saveUser } from "@/utils/auth";

const EVENT_KEY = "events";


// Save a new event to localStorage
// export const saveEvent = (event: Event): void => {
//   const events = getEvents();
//   events.push(event);
//   saveEvents(events);
// };

// Save all events (overwrites existing)
export function saveEvents(events: Event[]): void {
  try {
    localStorage.setItem(EVENT_KEY, JSON.stringify(events));
  } catch (error) {
    console.error("Error saving events:", error);
  }
}

// Delete an event by ID
// export function deleteEvent(id: string): void {
//   const events = getEvents();
//   const updatedEvents = events.filter((event) => event.id !== id);
//   saveEvents(updatedEvents);
// }

// Update an existing event
export async function updateEvent(updatedEvent: Event): Promise<void> {
  const res = await fetch(`/api/events/${updatedEvent.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedEvent),
  });

  if (!res.ok) {
    throw new Error("Failed to update event");
  }
}
// export function getUserBookings(): Event[] {
//   if (typeof window === "undefined") return [];

//   const userData = localStorage.getItem("currentUser");
//   if (!userData) return [];

//   try {
//     const parsedUser = JSON.parse(userData) as { email: string; bookedEvents?: string[] };
//     const allEvents = getEvents();

//     // Find events that match the user's booked event IDs
//     const bookedEvents = (parsedUser.bookedEvents || [])
//       .map((id: string) => allEvents.find((event) => event.id === id))
//       .filter((event): event is Event => event !== undefined);
//     console.log(bookedEvents)

//     return bookedEvents;
//   } catch (error) {
//     console.error("Error parsing user bookings:", error);
//     return [];
//   }
// }

export async function bookEvent(event: Event) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  if (!currentUser || !currentUser.email) {
    alert("User not logged in.");
    return;
  }

  const userEmail = currentUser.email;

  if (Number(event.bookedSlots) >= Number(event.slots)) {
    alert("This event is fully booked.");
    return;
  }

  if (event.bookedBy?.includes(userEmail)) {
    alert("You have already booked this event.");
    return;
  }

  // 1. Update event
  const updatedEvent: Event = {
    ...event,
    bookedSlots: (Number(event.bookedSlots) + 1).toString(),
    bookedBy: [...(event.bookedBy || []), userEmail],
  };

  await updateEvent(updatedEvent);

  // 2. Update user
  const users = getUsers();
  const updatedUsers = users.map((user) => {
    if (user.email === userEmail) {
      return {
        ...user,
        bookedEvents: user.bookedEvents?.includes(event.id)
          ? user.bookedEvents
          : [...(user.bookedEvents || []), event.id],
      };
    }
    return user;
  });


  localStorage.setItem("users", JSON.stringify(updatedUsers));

  alert("✅ Successfully booked the event!");
}

export const deleteBookedEvent = (event_id: string) => {
  const user = getCurrentUser();
  if (user) {
    user.bookedEvents = user.bookedEvents.filter((id) => id !== event_id);
    console.log("Event deleted:", user.bookedEvents);
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.reload();
  }
};

export const getUserBookings = () => {
  const currentUser = getCurrentUser();
  const users = getUsers();
  const foundUser = users.find((user) => user.email === currentUser.email);
  if(foundUser) {
    return foundUser.bookedEvents.length;
  }
  return 0;
}
