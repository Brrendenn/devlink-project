"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext"; // Use the new context
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Palette, Image as ImageIcon } from "lucide-react";
import { saveProfileDetails } from "@/lib/api";
import { LivePreview } from "@/components/LivePreview";

export const dynamic = 'force-dynamic';

export default function ProfileEditorPage() {
  const { user, token } = useAuth();
  const { profile, setProfile, links, isLoading } = useDashboard();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!token) return;
    setIsSaving(true);
    try {
      await saveProfileDetails(profile, token);
      toast("Profile Saved!", {description: "Your profile has been updated." });
    } catch (e) {
      console.error('Failed to save profile.', e);
      toast("Save failed!", {description: "Could not save your profile."});
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save Profile"}
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile picture. Paste an image URL below.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
              <Input 
                placeholder="https://..." 
                value={profile.imageUrl}
                onChange={(e) => setProfile({ ...profile, imageUrl: e.target.value })}
                disabled={isSaving}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Page Theme</CardTitle>
            <CardDescription>Choose a theme for your public profile page.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Palette className="h-6 w-6 text-muted-foreground" />
              <select 
                value={profile.theme} 
                onChange={(e) => setProfile({ ...profile, theme: e.target.value })}
                className="w-full p-2 border rounded-md bg-transparent dark:bg-slate-800"
                disabled={isSaving}
              >
                <option value="light">Simple Light</option>
                <option value="dark">Simple Dark</option>
                <option value="gradient-purple">Gradient Purple</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:block">
        <LivePreview user={user} links={links} profile={profile} />
      </div>
    </div>
  );
}