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
  bookedBy?: string[]; // Array of user emails
}

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
export function updateEvent(updatedEvent: Event): void {
  const events = getEvents();
  const index = events.findIndex((e) => e.id === updatedEvent.id);
  if (index !== -1) {
    events[index] = updatedEvent;
    saveEvents(events);
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