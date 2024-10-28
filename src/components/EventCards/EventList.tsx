import { EventCard } from "./EventCard";
import { Event } from "./EventData";

interface EventListProps {
  events: Event[];
  isPast?: boolean;
}

export function EventList({ events, isPast = false }: EventListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} isPast={isPast} />
      ))}
    </div>
  );
}
