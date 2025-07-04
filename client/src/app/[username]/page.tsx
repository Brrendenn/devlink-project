import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkCard } from '@/components/LinkCard';


interface Link {
  title: string;
  url: string;
}
interface ProfileData {
  username: string;
  links: Link[];
}

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return [];
}


export default async function UserProfilePage({ params }: { params: { username: string } }) {
  const { username } = await params;
  
  let data: ProfileData | null = null;

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/profile/${username}`;
    const res = await fetch(apiUrl, { cache: 'no-store' });

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
  }

  if (!data) {
    notFound();
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6 pt-8 animate-fade-in">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="w-24 h-24 border-4 border-white dark:border-slate-800 shadow-lg">
          <AvatarImage src={`https://avatar.vercel.sh/${data.username}.png`} />
          <AvatarFallback>{data.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          @{data.username}
        </h1>
      </div>
      
      <div className="w-full space-y-4">
        {data.links.length > 0 ? (
          data.links.map((link, index) => (
            <LinkCard key={index} title={link.title} url={link.url} />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            This user hasn't added any links yet.
          </p>
        )}
      </div>
    </div>
  );
}
