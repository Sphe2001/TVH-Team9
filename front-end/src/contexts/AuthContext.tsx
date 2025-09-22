import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "municipality_admin" | "police_admin" | "field_officer";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    const mockUsers: Record<string, User> = {
      "admin@municipality.gov": {
        id: "1",
        name: "Municipality Admin",
        email: "admin@municipality.gov",
        role: "municipality_admin",
      },
      "police@department.gov": {
        id: "2",
        name: "Police Admin",
        email: "police@department.gov",
        role: "police_admin",
      },
      "officer@police.gov": {
        id: "3",
        name: "Field Officer",
        email: "officer@police.gov",
        role: "field_officer",
      },
    };

    if (mockUsers[email] && password === "password123") {
      setUser(mockUsers[email]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
