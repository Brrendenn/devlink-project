import {
  Link as LinkIcon,
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Dribbble,
  Youtube,
} from "lucide-react";
import React from "react";

interface LinkCardProps {
  title: string;
  url: string;
}

const getIconForUrl = (url: string): React.ComponentType<{ className?: string }> => {
  if (url.includes("github.com")) {
    return Github;
  }
  if (url.includes("twitter.com") || url.includes("x.com")) {
    return Twitter;
  }
  if (url.includes("instagram.com")) {
    return Instagram;
  }
  if (url.includes("linkedin.com")) {
    return Linkedin;
  }
  if (url.includes("dribbble.com")) {
    return Dribbble;
  }
  if (url.includes("youtube.com")) {
    return Youtube;
  }
  // Default fallback icon
  return LinkIcon;
};

export const LinkCard = ({ title, url }: LinkCardProps) => {
  // We call our new function to get the correct icon component.
  const Icon = getIconForUrl(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full bg-gray-200 dark:bg-gray-600 hover:scale-105 transition-transform duration-200 ease-in-out p-4 rounded-lg flex items-center group"
    >
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-4">
        <Icon className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-blue-500 transition-colors" />
      </div>
      <p className="flex-grow text-center font-semibold text-gray-800 dark:text-white">
        {title}
      </p>
    </a>
  );
};
