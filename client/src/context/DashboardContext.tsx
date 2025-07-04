"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";
import { getUserLinks, getProfileDetails } from "@/lib/api";

interface Link {
  id: string;
  title: string;
  url: string;
}

interface Profile {
  imageUrl: string;
  theme: string;
}

interface DashboardContextType {
  links: Link[];
  profile: Profile;
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  isLoading: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const [links, setLinks] = useState<Link[]>([]);
  const [profile, setProfile] = useState<Profile>({
    imageUrl: "",
    theme: "light",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const fetchInitialData = async () => {
        setIsLoading(true);
        try {
          const [userLinks, profileDetails] = await Promise.all([
            getUserLinks(token),
            getProfileDetails(token),
          ]);

          const linksWithClientIds = Array.isArray(userLinks)
            ? userLinks.map((link: { title: string; url: string }) => ({
                ...link,
                id: `client-${Math.random()}`,
              }))
            : [];
          setLinks(linksWithClientIds);

          setProfile({
            imageUrl: profileDetails.imageUrl || "",
            theme: profileDetails.theme || "light",
          });
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchInitialData();
    }
  }, [token]);

  return (
    <DashboardContext.Provider
      value={{ links, profile, setLinks, setProfile, isLoading }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
