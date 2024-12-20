import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventSlider } from "./event-slider";

interface EventCardProps {
  title: string;
  description: string;
  status?: "upcoming" | "live" | "past";
  organizers: string[];
  images: string[];
  link?: string;
  reverse?: boolean;
}

export function EventCard({
  title,
  description,
  status = "upcoming",
  organizers,
  images,
  link,
  reverse = false,
}: EventCardProps) {
  const statusColors = {
    live: "bg-red-200 text-red-900",
    upcoming: "bg-green-200 text-green-900",
    past: "bg-gray-300 text-gray-900",
  };

  const variationStyles = reverse
    ? "border-l-8 border-blue-500"
    : "border-l-8 border-green-500";

  return (
    <section
      className={`py-12 ${reverse ? "" : "bg-blue-50"} ${variationStyles}`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse gap-8 ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Text Content */}
        <div className="w-full md:w-2/3 p-6">
          <div className="flex items-center mb-4">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <Badge
              variant="secondary"
              className={`ml-4 ${statusColors[status]} uppercase`}
            >
              {status}
            </Badge>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
          <h3 className="text-lg font-semibold text-gray-800">Organizers</h3>
          <ul className="text-gray-600 mb-8">
            {organizers.map((organizer, index) => (
              <li key={index} className="leading-6">
                {organizer}
              </li>
            ))}
          </ul>
          <Button
            asChild
            className={`${
              reverse ? "bg-blue-600" : "bg-green-600"
            } text-white px-6 py-2 rounded-md hover:opacity-90`}
          >
            <a href={link} target="_blank" rel="noreferrer">
              {status === "upcoming" ? "Register" : "Learn More"}
            </a>
          </Button>
        </div>

        {/* Image Slider */}
        <div className="w-full md:w-1/3 p-6">
          <EventSlider
            images={images || ["/placeholder.svg?height=250&width=400"]}
          />
        </div>
      </div>
    </section>
  );
}
