"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { SignOutButton } from "@clerk/nextjs";

/* ---------------- HERO ---------------- */

export function ProfileHero({ user }: any) {
  return (
    <Card className="mb-6 p-6 rounded-2xl border bg-white shadow-sm">
      <div className="flex items-start justify-between">
        
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {user.name}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {user.email}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-orange-600">
            <span className="px-2 py-1 rounded-full bg-orange-50 border border-orange-100">
              {user.loyaltyTier}
            </span>
            <span>•</span>
            <span>{user.loyaltyPoints} pts</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-end gap-2">
          <SignOutButton>
            <button className="px-4 py-2 text-sm font-medium bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-lg hover:opacity-90 transition">
              Logout
            </button>
          </SignOutButton>

          <p className="text-[10px] text-gray-400">
            See you again 👋
          </p>
        </div>
      </div>
    </Card>
  );
}

/* ---------------- PERSONAL TAB ---------------- */

export function PersonalTab({
    draft,
    setDraft,
    editing,
    setEditing,
    onSave,
}: any) {
    return (
        <Card className="p-6 rounded-2xl space-y-4">
            <div className="grid gap-3">
                <Input
                    value={draft.name}
                    disabled={!editing}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    className="h-11"
                    placeholder="Full name"
                />

                <Input
                    value={draft.email}
                    disabled={!editing}
                    onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                    className="h-11"
                    placeholder="Email address"
                />

                <Input
                    value={draft.phone}
                    disabled={!editing}
                    onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                    className="h-11"
                    placeholder="Phone number"
                />

                <textarea
                    className="w-full min-h-[90px] border rounded-xl p-3 text-sm bg-white disabled:bg-gray-50"
                    disabled={!editing}
                    value={draft.bio}
                    onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                    placeholder="Tell something about yourself..."
                />
            </div>

            <div className="flex justify-end gap-2 pt-2">
                {editing ? (
                    <>
                        <Button
                            onClick={onSave}
                            className="bg-black text-white hover:bg-black/80"
                        >
                            Save changes
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button onClick={() => setEditing(true)}>Edit profile</Button>
                )}
            </div>
        </Card>
    );
}

/* ---------------- ADDRESSES TAB ---------------- */

export function AddressesTab({ addresses, setAddresses }: any) {
    const remove = (id: string) => {
        setAddresses(addresses.filter((a: any) => a.id !== id));
    };

    const makeDefault = (id: string) => {
        setAddresses(
            addresses.map((a: any) => ({
                ...a,
                isDefault: a.id === id,
            }))
        );
    };

    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {addresses.map((a: any) => (
                <Card
                    key={a.id}
                    className="p-4 rounded-2xl border hover:shadow-sm transition"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-sm">{a.label}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {a.line}, {a.city} - {a.pin}
                            </p>
                        </div>

                        {a.isDefault && (
                            <span className="text-[10px] px-2 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
                                Default
                            </span>
                        )}
                    </div>

                    <div className="flex gap-2 mt-4">
                        {!a.isDefault && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => makeDefault(a.id)}
                            >
                                Make default
                            </Button>
                        )}

                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => remove(a.id)}
                        >
                            Remove
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
}

/* ---------------- PAYMENTS TAB ---------------- */

export function PaymentsTab({ payments }: any) {
    return (
        <div className="grid gap-4">
            {payments.map((p: any) => (
                <Card
                    key={p.id}
                    className="p-4 rounded-2xl border hover:shadow-sm transition"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium text-sm">{p.label}</p>
                            <p className="text-xs text-gray-500">{p.detail}</p>
                        </div>

                        {p.isDefault && (
                            <span className="text-[10px] px-2 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100">
                                Default
                            </span>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
}

/* ---------------- PREFS TAB ---------------- */

export function PreferencesTab({ prefs, setPrefs }: any) {
    return (
        <Card className="p-5 rounded-2xl space-y-4">
            {Object.keys(prefs).map((key) => (
                <div
                    key={key}
                    className="flex items-center justify-between py-2 border-b last:border-none"
                >
                    <div>
                        <p className="text-sm font-medium capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                        </p>
                        <p className="text-xs text-gray-500">
                            Manage {key.toLowerCase()} settings
                        </p>
                    </div>

                    <Switch
                        checked={prefs[key]}
                        onCheckedChange={(val) =>
                            setPrefs({ ...prefs, [key]: val })
                        }
                    />
                </div>
            ))}
        </Card>
    );
}