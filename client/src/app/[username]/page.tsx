import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkCard } from "@/components/LinkCard";
import { cn } from "@/lib/utils";

interface Link {
  title: string;
  url: string;
}

interface ProfileData {
  username: string;
  imageUrl: string | null;
  links: Link[];
  theme: string | null;
}

type UserProfilePageProps = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { username } = params;

  let data: ProfileData | null = null;

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/profile/${username}`;
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
  }

  if (!data) {
    notFound();
  }

  const themeClasses = {
    light: "bg-gray-100 text-gray-900",
    dark: "bg-gray-900 text-white",
    "gradient-purple":
      "bg-gradient-to-br from-purple-600 to-indigo-700 text-white",
  };

  const pageThemeClass =
    themeClasses[data.theme as keyof typeof themeClasses] || themeClasses.light;

  return (
    <div className="w-full flex-grow flex items-center justify-center p-4">
      <div 
        className={cn(
          "w-96 max-w-md mx-auto flex flex-col items-center gap-6 rounded-2xl p-6 md:p-8 shadow-xl",
          pageThemeClass
        )}
      >
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24 border-4 border-white/50 shadow-lg">
            <AvatarImage src={data.imageUrl || `https://avatar.vercel.sh/${data.username}.png`} />
            <AvatarFallback>{data.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">
            @{data.username}
          </h1>
        </div>
        <div className="w-full space-y-4">
          {data.links.length > 0 ? (
            data.links.map((link, index) => (
              <LinkCard key={index} title={link.title} url={link.url} />
            ))
          ) : (
            <p className="text-center opacity-70">
              This user hasn&apos;t added any links yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
