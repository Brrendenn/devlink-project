import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { euclid } from "@/lib/fonts";
import { ThemeProvider } from "@/components/Theme-provider";

export const metadata: Metadata = {
  title: "DevLink",
  description: "Your developer link hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${euclid.variable} font-sans`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-800">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="container mx-auto flex-grow py-8 px-4">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
