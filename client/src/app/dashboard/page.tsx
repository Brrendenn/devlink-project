"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { PlusCircle, Trash2, Link as LinkIcon, Copy } from "lucide-react";

interface Link {
    id: string;
    title: string;
    url: string;
}

export default function DashboardPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  const [links, setLinks] = useState<Link[]>([
    { id: "1", title: "My Portfolio", url: "[https://my-portfolio.com](https://my-portfolio.com)" },
    { id: "2", title: "GitHub Profile", url: "[https://github.com/my-username](https://github.com/my-username)" },
  ]);

  const handleAddLink = () => {
    const newLink = { id: crypto.randomUUID(), title: "", url: ""};
    setLinks([...links, newLink]);
  }

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  }

  const handleUpdateLink = (id: string, field: 'title' | 'url', value: string) => {
    setLinks(links.map(link => link.id === id ? { ...link, [field]: value } : link))
  }

  const handleSaveChanges = () => {
    console.log("Saving links:", links);
    toast("Changes saved!", {
        description: "Your links have been updated successfully.",
    });
  }

  const copyPublicLink = () => {
    const publicUrl = 'https://devlink.pro/username';
    navigator.clipboard.writeText(publicUrl);
    toast("Copied to Clipboard!", {
        description: publicUrl,
    });
  }

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
    <div className="w-full max-w-4xl text-left">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleAddLink}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Link
          </Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Your Public Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
            <div className="flex items-center gap-2 text-muted-foreground">
              <LinkIcon className="h-4 w-4" />
              {/* TODO: Replace with dynamic username */}
              <span className="font-mono text-sm">devlink.pro/username</span>
            </div>
            <Button variant="ghost" size="icon" onClick={copyPublicLink}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {links.length > 0 ? (
          links.map((link) => (
            <Card key={link.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-grow space-y-2">
                  <Input 
                    placeholder="Link Title (e.g., My Portfolio)" 
                    value={link.title}
                    onChange={(e) => handleUpdateLink(link.id, 'title', e.target.value)}
                  />
                  <Input 
                    placeholder="URL (e.g., https://...)" 
                    value={link.url}
                    onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)}
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteLink(link.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          // --- EMPTY STATE ---
          <Alert>
            <PlusCircle className="h-4 w-4" />
            <AlertTitle>No links yet!</AlertTitle>
            <AlertDescription>
              Click "Add New Link" to get started and build your public profile.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
  }

  return (
    <div className="text-center">
      <p>Redirecting to login...</p>
    </div>
  );
}
