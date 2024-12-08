"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Suspense,
} from "react";
import { MemberType } from "@/types";

// Define the context type
type TeamContextType = MemberType[] | null;

// Create the context
const TeamContext = createContext<TeamContextType>(null);

// Define the provider's props
interface TeamProviderProps {
  children: ReactNode;
}

// Create the provider
export const TeamProvider = ({ children }: TeamProviderProps) => {
  const [teamMembers, setTeamMembers] = useState<TeamContextType>(null);

  useEffect(() => {
    // Fetch team members only once
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/users");
        const data: MemberType[] = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <TeamContext.Provider value={teamMembers}>{children}</TeamContext.Provider>
  );
};

// Custom hook to use the context
export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
};

// Wrapper for fetching data with Suspense
export const TeamDataWrapper = ({ children }: { children: ReactNode }) => {
  const teamMembers = useTeam();

  if (!teamMembers) {
    // Return a Promise that Suspense will wait for
    throw new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000); // Simulate loading time
    });
  }

  return <>{children}</>;
};
