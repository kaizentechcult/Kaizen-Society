import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Event } from "./EventData";
import { useState } from "react";
// import { div } from "framer-motion/client";

interface EventCardProps {
  event: Event;
  isPast?: boolean;
}

export function EventCard({ event, isPast = false }: EventCardProps) {
  const [showImage, setShowImage] = useState<boolean>(false);
  return (
    <>
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <Image
          src={event.image}
          alt={event.name}
          width={300}
          height={200}
          onClick={() => setShowImage(!showImage)}
          className="rounded-t-lg object-contain bg-blue-500 w-full h-48"
          />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2 text-gray-800">
          {event.name}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {event.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-gray-50 rounded-b-lg">
        <div className="text-sm text-gray-600">
          {event.date} | {event.time}
        </div>
        
        <Button
        onClick={() => setShowImage(!showImage)}
          variant="outline"
          className={`${
            isPast
            ? "bg-gray-300 text-gray-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          >
            
          {isPast ? "View Details" :
          <a href="https://unstop.com/o/TuZG3Vh?lb=Ec8wUTMd&utm_medium=Share&utm_source=shortUrl">Register</a> }
          {/* View Details */}
        </Button>
      </CardFooter>
    </Card>

    {/* {showImage && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
         <Image
          src={event.image}
          alt={event.name}
          width={300}
          height={200}
          className="rounded-t-lg object-contain bg-blue-500"
          />
      </div>
    )} */}
          </>
  );
}
