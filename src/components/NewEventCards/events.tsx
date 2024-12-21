"use client";

import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { EventCard } from "./event-card";
import { LoadingSkeleton } from "./loading-skeleton";

interface Event {
  id: string;
  name: string;
  status: "upcoming" | "live" | "past";
  description: string;
  organizers: string[];
  images: string[];
  link: string;
}

interface Categories {
  Upcoming: Event[];
  Live: Event[];
  Past: Event[];
}

export function Events() {
  const [categories, setCategories] = useState<Categories>({
    Upcoming: [],
    Live: [],
    Past: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetch
    setTimeout(() => {
      setCategories({
        Upcoming: [],
        Live: [],
        Past: [
          {
            id: "0",
            name: "GSOC Webiniar",
            description:
              "Meet GSOC Member, and get to know the ins and outs of the Google Summer Of Code. An opportunity to get your doubts cleared and get a chance to know more about GSOC.",
            status: "past",
            organizers: [
              "Aakash Amod Rajput",
              "Krish Khanna",
              "Sreehitha Thati",
            ],
            images: ["/Events/GSOCwebinar.png", "/Events/GSOCwebinar.png"],
            link: "#",
          },
          {
            id: "1",
            name: "Portfolio Challenge",
            description:
              "Develop a Website Portfolio to showcase your skills, and get feedback from industry experts.",
            status: "past",
            organizers: [
              "Krish Khanna",
              "Sooraj Nambiar",
              "Nikhil Verma",
              "Sreehitha Thati",
            ],
            images: [
              "/Events/portfolioLeaderboard.jpg",
              "/Events/portfolioLeaderboard.jpg",
            ],
            link: "#",
          },
          {
            id: "2",
            name: "DSA Challenge I",
            description:
              "Tackle Challenging DSA Questions prepared by us, focused to leve up your thinking and logical skills.",
            status: "past",
            organizers: [
              "Aayush Singh",
              "Shivangi Bhartiya",
              "Sreehitha Thati",
              "Manisha",
              "Rianna Bansal",
            ],
            images: ["/Events/week1.jpg", "/Events/week1.jpg"],
            link: "#",
          },
          {
            id: "3",
            name: "DSA Challenge II",
            description:
              "Tackle Challenging DSA Questions prepared by us, focused to leve up your thinking and logical skills.",
            status: "past",
            organizers: [
              "Aayush Singh",
              "Shivangi Bhartiya",
              "Sreehitha Thati",
              "Manisha",
              "Rianna Bansal",
            ],
            images: ["/Events/week2.jpg", "/Events/week2.jpg"],
            link: "#",
          },
          {
            id: "4",
            name: "ThinkTank Ideathon",
            description:
              "Create an Innovative Solution to a Problem and win exciting prizes. Get a chance to work with Industry Professionals.",
            status: "past",
            organizers: [
              "Krish Khanna",
              "Sooraj Nambiar",
              "Aayush Singh",
              "Adista Nautiyal",
              "Shivangi Bhartiya",
            ],
            images: ["/Events/ThinkTank.png", "/Events/ThinkTankWinners.png"],
            link: "#",
          },
          {
            id: "5",
            name: "Cloud Computing Webinar (AWS, GCP, Azure, etc)",
            description:
              "Get Familiar with popular Cloud Computing Platforms and gain a chance to talk with industry professionals, and get to know more about Cloud computing in general.",
            status: "upcoming",
            organizers: [
              "Aayush Singh",
              "Shivang Shukla",
              "Shivangi Bhartiya",
              "Adista Nautiyal",
              "Sooraj Nambiar",
            ],
            images: ["/Events/CloudComputingWebinar.jpg"],
            link: "#",
          },
        ],
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl text-center">
          Events organized by our community
        </h1>
      </div>

      <div className="w-full py-12">
        <Tab.Group>
          <div className="px-4 sm:px-6 lg:px-8">
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-100 p-1 max-w-md mx-auto">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                    ${
                      selected
                        ? "bg-blue-500 text-white shadow"
                        : "text-gray-800 hover:bg-blue-300 hover:text-white"
                    }`
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels className="py-12">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              Object.values(categories).map((events, idx) => (
                <Tab.Panel key={idx}>
                  {events.length === 0 ? (
                    <h1 className="text-gray-700 text-center pt-8">
                      There are no such events. Come back later.
                      <br />
                      Till then have a look on our past events.
                    </h1>
                  ) : (
                    events
                      .slice()
                      .reverse()
                      .map((event: Event, index: number) => (
                        <EventCard
                          key={event.id}
                          reverse={index % 2 === 1}
                          title={event.name}
                          status={event.status}
                          description={event.description}
                          organizers={event.organizers}
                          link={event.link}
                          images={event.images}
                        />
                      ))
                  )}
                </Tab.Panel>
              ))
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
