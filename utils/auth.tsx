export interface User {
  email: string;
  password: string;
  bookedEvents?: string[];
}

export const getUsers = (): User[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("users") || "[]");
};

export const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const loginUser = (email: string, password: string): boolean => {
  const users = getUsers();
  const match = users.find((u) => u.email === email && u.password === password);
  if (match) {
    localStorage.setItem("currentUser", JSON.stringify(match));
    return true;
  }
  return false;
};

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;
  return JSON.parse(localStorage.getItem("currentUser") || "null");
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};

/** ✅ BOOK AN EVENT **/
export const bookEvent = (eventId: string): boolean => {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;

  const users = getUsers();

  const updatedUsers = users.map((user) => {
    if (user.email === currentUser.email) {
      const alreadyBooked = user.bookedEvents?.includes(eventId);
      const updatedUser = {
        ...user,
        bookedEvents: alreadyBooked
          ? user.bookedEvents
          : [...(user.bookedEvents || []), eventId],
      };

      // Update currentUser in localStorage
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      return updatedUser;
    }
    return user;
  });

  localStorage.setItem("users", JSON.stringify(updatedUsers));
  return true;
};

