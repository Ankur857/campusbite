"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

import {
  ProfileHero,
  PersonalTab,
  AddressesTab,
  PaymentsTab,
  PreferencesTab,
} from "./components";

import {
  initialUser,
  initialAddresses,
  initialPayments,
} from "@/data/profileData";

export default function ProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [payments] = useState(initialPayments);

  const [draft, setDraft] = useState(initialUser);
  const [editing, setEditing] = useState(false);

  const [prefs, setPrefs] = useState({
    orderUpdates: true,
    promos: false,
    newsletter: true,
    vegOnly: false,
  });

  const handleSave = () => {
    setUser(draft);
    setEditing(false);
    toast.success("Profile updated");
  };

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