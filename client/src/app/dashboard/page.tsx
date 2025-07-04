// 1. Replace the content of: client/src/app/dashboard/page.tsx (Links Page)

"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext"; // Use the new context
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "motion/react";
import { PlusCircle, Trash2, Loader2, Link as LinkIcon, Copy } from "lucide-react";
import { saveUserLinks } from "@/lib/api";
import { LivePreview } from "@/components/LivePreview";

export default function LinksEditorPage() {
  const { user, token } = useAuth();
  const { links, setLinks, profile, isLoading } = useDashboard();
  const [isSaving, setIsSaving] = useState(false);

  const handleAddLink = () => {
    setLinks((prev) => [
      ...prev,
      { id: `client-${Math.random()}`, title: "", url: "" },
    ]);
  };

  const handleDeleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleLinkChange = (
    id: string,
    field: "title" | "url",
    value: string
  ) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link))
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
      toast("Save Failed", { description: "Could not save your links." });
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
      document.execCommand('copy');
      toast("Copied to Clipboard!", {description: publicUrl });
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1 }}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-end items-center mb-6">
            <Button onClick={handleSaveChanges} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <Card className="mb-6">
          <CardHeader><CardTitle className="text-lg">Your Public Link</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="flex items-center gap-2 text-muted-foreground">
                <LinkIcon className="h-4 w-4" />
                <span className="font-mono text-sm">{window.location.origin}/{user?.username}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={copyPublicLink}><Copy className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Customize your links</h2>
            <Button
              variant="outline"
              onClick={handleAddLink}
              disabled={isSaving}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Link
            </Button>
          </div>
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
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
                          handleLinkChange(link.id, "title", e.target.value)
                        }
                      />
                      <Input
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) =>
                          handleLinkChange(link.id, "url", e.target.value)
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
                  Click &quot;Add New Link&quot; to get started.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        <div className="hidden lg:block">
          <LivePreview user={user} links={links} profile={profile} />
        </div>
      </div>
    </motion.div>
  );
}
