import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkCard } from "./LinkCard";

interface User {
  username: string;
}

interface Link {
  title: string;
  url: string;
}

interface LivePreviewProps {
  user: User | null;
  links: Link[];
}

export const LivePreview = ({ user, links }: LivePreviewProps) => {
  return (
    <div className="sticky top-24 w-full h-[600px] bg-white dark:bg-slate-900 border-[14px] border-gray-800 dark:border-gray-700 rounded-[40px] shadow-2xl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5 bg-gray-800 dark:border-gray-700 rounded-b-xl"></div>
      <div className="w-full h-full overflow-y-auto bg-gray-50 dark:bg-slate-950 p-4 rounded-[26px]">
        <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6 pt-8">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24 border-4 border-white dark:border-slate-800 shadow-lg">
              <AvatarImage
                src={`https://avatar.vercel.sh/${user?.username}.png`}
              />
              <AvatarFallback>
                {user?.username?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              @{user?.username}
            </h1>
          </div>

          <div className="w-full space-y-4 mt-4">
            {links.length > 0 ? (
              links.map((link, index) => (
                <LinkCard key={index} title={link.title} url={link.url} />
              ))
            ) : (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-8">
                Your links will appear here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
