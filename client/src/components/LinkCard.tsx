import { Link as LinkIcon } from "lucide-react";

interface LinkCardProps {
  title: string;
  url: string;
}

export const LinkCard = ({ title, url }: LinkCardProps) => {
  const getFaviconUrl = (url: string) => {
    try {
      const urlObject = new URL(url);
      return `https://www.google.com/s2/favicons?domain=${urlObject.hostname}&sz=32`;
    } catch (error) {
      return null;
    }
  };

  const favicon = getFaviconUrl(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full bg-gray-100 dark:bg-slate-800 hover:scale-105 transition-transform duration-200 ease-in-out p-4 rounded-lg flex items-center"
    >
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-4">
        {favicon ? (
          <img src={favicon} alt={`${title} favicon`} className="w-6 h-6" />
        ) : (
          <LinkIcon className="w-6 h-6 text-gray-500" />
        )}
      </div>
      <p className="flex-grow text-center font-semibold text-gray-800 dark:text-white">
        {title}
      </p>
    </a>
  );
};
