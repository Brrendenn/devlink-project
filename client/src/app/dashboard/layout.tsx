"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { DashboardProvider } from '@/context/DashboardContext'; 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  const tabs = [
    { name: 'Links', href: '/dashboard' },
    { name: 'Profile', href: '/dashboard/profile' },
  ];

  return (
    <DashboardProvider>
      <div className="w-full text-left">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="border-b">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  pathname === tab.href
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                )}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="pt-6">
          {children}
        </div>
      </div>
    </DashboardProvider>
  )
}