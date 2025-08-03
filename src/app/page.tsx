"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Event Type
type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string;
  tier: "free" | "silver" | "gold" | "platinum";
};

const tierOrder = ["free", "silver", "gold", "platinum"] as const;

export default function HomePage() {
  const { user } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [tierFilter, setTierFilter] = useState<string | null>(null);

  const userTier = (user?.publicMetadata?.tier as "free" | "silver" | "gold" | "platinum") || "free";

  useEffect(() => {
    if (!user) return;

    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        setEvents(data);
      }

      setLoading(false);
    };

    fetchEvents();
  }, [user, userTier]);

  const filteredEvents = tierFilter
    ? events.filter((event) => event.tier === tierFilter)
    : events;

  const isLocked = (eventTier: Event["tier"]): boolean => {
    return tierOrder.indexOf(eventTier) > tierOrder.indexOf(userTier);
  };

  if (!user) return <div className="p-8">Loading user...</div>;

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome, {user.firstName}!</h1>
      <p className="mb-4">
        Your Tier: <strong className="capitalize">{userTier}</strong>
      </p>

      <label htmlFor="tier" className="block text-sm font-medium text-gray-700 mb-1">
        Simulate Tier Upgrade:
      </label>
      <select
        id="tier"
        defaultValue={userTier}
        className="p-2 border rounded-md mb-6"
        onChange={async (e) => {
          const newTier = e.target.value;

          try {
            const res = await fetch("/api/update-tier", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user?.id,
                tier: newTier,
              }),
            });

            if (!res.ok) throw new Error("Failed to update tier");

            alert(`Tier updated to ${newTier.toUpperCase()} 🎉`);
            window.location.reload();
          } catch (err) {
            alert("Tier update failed.");
            console.error("API error:", err);
          }
        }}
      >
        <option value="free">Free</option>
        <option value="silver">Silver</option>
        <option value="gold">Gold</option>
        <option value="platinum">Platinum</option>
      </select>

      {/* Tier Filter Buttons */}
      <div className="flex gap-2 mb-6">
        
          <button
            className={`px-3 py-1 rounded-full border text-sm font-medium ${
              tierFilter === null ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setTierFilter(null)}
          >
            All
          </button>
        
        {tierOrder.slice(0, tierOrder.indexOf(userTier) + 1).map((tier) => (
          <button
            key={tier}
            className={`px-3 py-1 rounded-full border text-sm font-medium ${
              tierFilter === tier ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setTierFilter(tier)}
          >
            {tier.charAt(0).toUpperCase() + tier.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const locked = isLocked(event.tier);
            return (
              <div
                key={event.id}
                className="relative bg-white shadow-md rounded-lg p-4 transition duration-300 group"
              >
                <div
                  className={`absolute inset-0 rounded-lg z-10 flex items-center justify-center text-sm font-semibold text-gray-700 bg-white/70 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none ${
                    locked ? "block" : "hidden"
                  }`}
                >
                  Upgrade to {event.tier.toUpperCase()} to access this
                </div>
                <div
                  className={`relative z-0 ${locked ? "blur-sm opacity-60 pointer-events-none" : ""}`}
                >
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h2 className="text-xl font-semibold mt-2">{event.title}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(event.event_date).toLocaleDateString()}
                  </p>
                  <p className="mt-1">{event.description}</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full text-white
                      ${event.tier === "free"
                        ? "bg-green-500"
                        : event.tier === "silver"
                        ? "bg-gray-500"
                        : event.tier === "gold"
                        ? "bg-yellow-500"
                        : "bg-purple-700"}`}
                  >
                    {event.tier.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
