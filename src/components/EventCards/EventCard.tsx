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
import { motion } from "framer-motion";
import CloseBtn from "../CloseBtn";
import { button } from "framer-motion/client";

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
            variant="outline"
            onClick={() => setShowImage(!showImage)}
            className={`${isPast
              ? "bg-gray-300 text-gray-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
          >
            {isPast ? "View Details" : (

              "View Details"
            )}
          </Button>
        </CardFooter>
      </Card>

      {showImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-hidden">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-8 rounded-lg flex flex-wrap  overflow-y-scroll jucstify-center items-center w-10/12 gap-4 h-[85vh] mt-8"
          >
            <Image
              src={event.image}
              alt={event.name}
              width={300}
              height={500}
              className="rounded-t-lg bg-blue-500 w-fit"
            />
            <div className="max-w-4xl px-8 py-10  rounded-lg shadow-xl flex-1">
              <h1 className="text-4xl font-bold text-center mb-4 text-yellow-400">🌟 ThinkTank IdeaThon 🌟</h1>

              <p className="text-lg text-center mb-4">
              &quot;Great ideas often start as <span className="italic text-blue-400">whispers of imagination</span>
                that only the brave can hear.&quot; 🌠
              </p>

              <div className="text-center">
                <p className="text-xl font-semibold mb-6">Wanna be brave??? <br />
                  <span className="text-3xl">【(ง •̀_•́)ง】</span>
                </p>

                <p className="text-lg mb-4">
                  This is your moment to take that <span className="text-pink-500 font-bold">leap of faith</span>,
                  explore different iterations of your concept, and refine it to the best it can be. ✅
                </p>

                <p className="text-lg mb-8">
                  <span className="font-bold">Kaizen</span> presents - <span className="text-green-400 font-bold">ThinkTank</span>,
                  our IdeaThon designed for all thinkers and creative minds! 💭 Whether it's a solution to a real-world problem
                  or an idea that could make everyday life better, share it with a like-minded community!
                </p>

                <p className="text-xl mb-8">So what are you waiting for? ⏳</p>

                <a target="_blank" href="https://unstop.com/o/TuZG3Vh?lb=Ec8wUTMd&utm_medium=Share&utm_source=shortUrl"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300">
                  Register Now 🚀
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

const PopUpContainer = ({ children, setShowImage, showImage }: { children: React.ReactNode, setShowImage: (showImage: boolean) => void, showImage: boolean }) => {
  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white p-4 rounded-[20px] w-full mx-4 flex flex-col items-center justify-center gap-4 z-[50]"
      >
        {children}
      </motion.div>
      <CloseBtn
        // handleClick={()=>{}}
        handleClick={() => setShowImage(!showImage)}
      />
    </>
  );
};

export default PopUpContainer;
