export interface User {
    email: string;
    password: string;
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
  