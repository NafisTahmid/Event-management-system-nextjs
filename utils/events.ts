
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

export const deleteBookedEvent = async (event_id: string) => {
  const currentUser = getCurrentUser();
  const users = getUsers();

  // 1. Update the user's bookedEvents
  const updatedUsers = users.map((user) => {
    if (user.email === currentUser.email) {
      return {
        ...user,
        bookedEvents: user.bookedEvents?.filter((id) => id !== event_id),
      };
    }
    return user;
  });

  // Save to localStorage
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // 2. Update the event itself - remove user from bookedBy and decrease bookedSlots
  const events = await getEvents(); // fetch all events from /api/events
  const updatedEvent = events.find((event) => event.id === event_id);

  if (updatedEvent) {
    updatedEvent.bookedBy = updatedEvent.bookedBy?.filter(email => email !== currentUser.email);
    updatedEvent.bookedSlots = (Number(updatedEvent.bookedSlots) - 1).toString();

    // 3. Update the event in the backend
    await fetch(`/api/events/${updatedEvent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvent),
    });
  }

};

export const getUserBookings = () => {
  const currentUser = getCurrentUser();
  const users = getUsers();
  const foundUser = users.find((user) => user.email === currentUser.email);
  if(foundUser) {
    return foundUser.bookedEvents;
  }
  return null;
}

// Get events helper function
const getEvents = async (): Promise<Event[]> => {
  const res = await fetch(`/api/events`);
  const data = await res.json();
  return data;
};

export const getAllUserEvents = async (): Promise<Event[]> => {
  const currentUser = getCurrentUser();
  const events = await getEvents();
  const userEvents = events.filter(event =>
    event.bookedBy?.includes(currentUser?.email)
  );
  return userEvents;
};