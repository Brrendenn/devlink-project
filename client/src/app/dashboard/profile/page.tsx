"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Palette, Image as ImageIcon } from "lucide-react";


export default function ProfilePage() {
  const { user, token } = useAuth();

  const [imageUrl, setImageUrl] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!token) return;
    setIsSaving(true);
    try {
      console.log("Saving profile:", { imageUrl, selectedTheme });
      toast("Profile Saved!", {description: "Your profile has been updated." });
    } catch (error) {
      console.error("Failed to save profile:", error);
      toast("Save Failed", {description: "Could not save your profile."});
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            Update your profile picture. Paste an image URL below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
            <Input 
              placeholder="https://..." 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Page Theme</CardTitle>
          <CardDescription>
            Choose a theme for your public profile page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Palette className="h-6 w-6 text-muted-foreground" />
            <select 
              value={selectedTheme} 
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-slate-800"
            >
              <option value="light">Simple Light</option>
              <option value="dark">Simple Dark</option>
              <option value="gradient-purple">Gradient Purple</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSaving ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
}