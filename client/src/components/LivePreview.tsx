import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LinkCard } from "./LinkCard";

interface User {
  username: string;
}

interface Link {
  title: string;
  url: string;
}

interface Profile {
  imageUrl: string;
  theme: string;
}

interface LivePreviewProps {
  user: User | null;
  links: Link[];
  profile: Profile;
}

export const LivePreview = ({ user, links, profile }: LivePreviewProps) => {
  const themeClasses = {
    light: "bg-gray-100 text-gray-900",
    dark: "bg-gray-900 text-white",
    "gradient-purple":
      "bg-gradient-to-br from-purple-600 to-indigo-700 text-white",
  };

  const pageThemeClass =
    themeClasses[profile.theme as keyof typeof themeClasses] ||
    themeClasses.light;

  return (
    <div className="sticky top-24 w-96 h-[600px] bg-white dark:bg-slate-900 border-[14px] border-gray-800 dark:border-gray-700 rounded-[40px] shadow-2xl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5 bg-gray-800 dark:border-gray-700 rounded-b-xl"></div>
      <div
        className={cn(
          "w-full h-full overflow-y-auto p-4 rounded-[26px]",
          pageThemeClass
        )}
      >
        <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6 pt-8">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={
                  profile.imageUrl ||
                  `https://avatar.vercel.sh/${user?.username}.png`
                }
              />
              <AvatarFallback>
                {user?.username?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">@{user?.username}</h1>
          </div>

          <div className="w-full space-y-4 mt-4">
            {links.length > 0 ? (
              links.map((link, index) => (
                <LinkCard key={index} title={link.title} url={link.url} />
              ))
            ) : (
              <p className="text-center text-sm opacity-70 pt-8">
                Your links will appear here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
