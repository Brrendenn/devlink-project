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
import {
  PlusCircle,
  Trash2,
  Link as LinkIcon,
  Copy,
  Loader2,
} from "lucide-react";
import { getUserLinks, saveUserLinks } from "@/lib/api";
import { LivePreview } from "@/components/LivePreview";

interface Link {
  id: string;
  title: string;
  url: string;
}

export default function DashboardPage() {
  const { user, token, isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [links, setLinks] = useState<Link[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && token) {
      const fetchLinks = async () => {
        setIsFetching(true);
        try {
          const userLinks = await getUserLinks(token);
          const linksWithClientIds = userLinks.map((link: any) => ({
            ...link,
            id: `client-${Math.random()}`,
          }));
          setLinks(linksWithClientIds);
        } catch (error) {
          console.error("Failed to fetch links:", error);
          toast("Error", {
            description: "Could not fetch your links. Please try again.",
          });
        } finally {
          setIsFetching(false);
        }
      };
      fetchLinks();
    }
  }, [isAuthLoading, token, toast]);

  const handleAddLink = () => {
    const newLink = { id: `client-${Math.random()}`, title: "", url: "" };
    setLinks([...links, newLink]);
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleUpdateLink = (
    id: string,
    field: "title" | "url",
    value: string
  ) => {
    setLinks(
      links.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  const handleSaveChanges = async () => {
    if (!token) return;
    setIsSaving(true);
    try {
      const linksToSave = links.map(({ title, url }) => ({ title, url }));
      await saveUserLinks(linksToSave, token);
      toast("Changes Saved!", {
        description: "Your links have been updated successfully.",
      });
    } catch (error) {
      console.error("Failed to save links:", error);
      toast("Save Failed", {
        description: "Could not save your links. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const copyPublicLink = () => {
    if (!user) return;

    const publicUrl = `${window.location.origin}/${user.username}`;

    const textArea = document.createElement("textarea");
    textArea.value = publicUrl;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      toast("Copied to Clipboard!", {
        description: publicUrl,
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast("Copy Failed", {
        description: "Could not copy the link to your clipboard.",
      });
    }

    document.body.removeChild(textArea);
  };

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isAuthLoading, router]);

  if (isAuthLoading || !isLoggedIn) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleAddLink}
                disabled={isSaving}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Link
              </Button>
              <Button onClick={handleSaveChanges} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
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
                  <span className="font-mono text-sm">
                    {window.location.origin}/{user?.username}
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={copyPublicLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {isFetching ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : links.length > 0 ? (
              links.map((link) => (
                <Card key={link.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="flex-grow space-y-2">
                      <Input
                        placeholder="Link Title"
                        value={link.title}
                        onChange={(e) =>
                          handleUpdateLink(link.id, "title", e.target.value)
                        }
                      />
                      <Input
                        placeholder="URL (e.g., https://...)"
                        value={link.url}
                        onChange={(e) =>
                          handleUpdateLink(link.id, "url", e.target.value)
                        }
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteLink(link.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Alert>
                <PlusCircle className="h-4 w-4" />
                <AlertTitle>No links yet!</AlertTitle>
                <AlertDescription>
                  Click "Add New Link" to get started.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <div className="hidden lg:block">
          <LivePreview user={user} links={links} />
        </div>
      </div>
    );
  }
}
