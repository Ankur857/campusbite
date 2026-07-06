"use client";

import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

import {
  ProfileHero,
  PersonalTab,
  AddressesTab,
  PaymentsTab,
  PreferencesTab,
} from "./components";

export default function ProfilePage() {
  const { userId } = useAuth();
  const { user: clerkUser } = useUser();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [payments] = useState([]);

  const [draft, setDraft] = useState<any>(null);
  const [editing, setEditing] = useState(false);

  const [prefs, setPrefs] = useState({
    orderUpdates: true,
    promos: false,
    newsletter: true,
    vegOnly: false,
  });

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          
          // Auto-fill from Clerk if profile is empty
          if (!data.name || data.name === '') {
            const clerkName = clerkUser?.fullName || clerkUser?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || '';
            const clerkPhone = clerkUser?.phoneNumbers?.[0]?.phoneNumber || '';
            
            setDraft({
              ...data,
              name: clerkName,
              phone: clerkPhone,
            });
            
            // Auto-save the filled profile
            if (clerkName) {
              const saveRes = await fetch("/api/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: clerkName,
                  phone: clerkPhone,
                }),
              });
              
              if (saveRes.ok) {
                const saved = await saveRes.json();
                setUser(saved);
                setDraft(saved);
                toast.success("Profile auto-filled from your account");
              }
            }
          } else {
            setDraft(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, clerkUser]);

  const handleSave = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: draft.name,
          phone: draft.phone,
          bio: draft.bio,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setUser(updated);
        setDraft(updated);
        setEditing(false);
        toast.success("Profile updated");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF6EE] p-6 flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FBF6EE] p-6 flex items-center justify-center">
        <p className="text-lg text-gray-500">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF6EE] p-6 ">
      <div className="max-w-4xl mx-auto">

        {/* HERO */}
        <ProfileHero user={user} />

        {/* TABS */}
        <Tabs defaultValue="personal">

          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="prefs">Prefs</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalTab
              draft={draft}
              setDraft={setDraft}
              editing={editing}
              setEditing={setEditing}
              onSave={handleSave}
            />
          </TabsContent>

          <TabsContent value="addresses">
            <AddressesTab
              addresses={addresses}
              setAddresses={setAddresses}
            />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentsTab payments={payments} />
          </TabsContent>

          <TabsContent value="prefs">
            <PreferencesTab prefs={prefs} setPrefs={setPrefs} />
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}