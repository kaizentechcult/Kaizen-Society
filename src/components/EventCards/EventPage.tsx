"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EventList } from "./EventList";
import { eventData } from "./EventData";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="min-h-screen mt-12 bg-gray-100 text-gray-800 p-8">
      <main>
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Events organized by our community
        </h1>
        <Tabs defaultValue="upcoming" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid bg-gray-600 w-full grid-cols-3 mb-8">
            {["upcoming", "ongoing", "past"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                onClick={() => setActiveTab(tab)}
                className="
                   text-blue-100 hover:bg-gray-200 hover:text-black transition-colors duration-300 capitalize data-[state=active]:bg-blue-700 data-[state=active]:text-white"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="upcoming">
            {eventData.upcomingEvents.length > 0 ? (
              <EventList events={eventData.upcomingEvents} />
            ) : (
              <div className="text-center text-gray-600">
                <p>There are no upcoming events. Come back later.</p>
                <p>Till then have a look at our past events.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="ongoing">
            {eventData.ongoingEvents.length > 0 ? (
              <EventList events={eventData.ongoingEvents} />
            ) : (
              <div className="text-center text-gray-600">
                <p>There are no ongoing events at the moment.</p>
                <p>Check our upcoming events for future live sessions.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="past">
            {eventData.pastEvents.length > 0 ? (
              <EventList events={eventData.pastEvents} isPast={true} />
            ) : (
              <div className="text-center text-gray-600">
                <p>Past events will be displayed here.</p>
                <p>Stay tuned for updates on our event history.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
