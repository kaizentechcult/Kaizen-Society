export interface Event {
  id: number;
  name: string;
  description: string;
  image: string;
  date: string;
  time: string;
}

export const eventData = {
  upcomingEvents: [
    {
      id: 4,
      name: "THINKTANK IDEATHON",
      description:
        "Join industry experts in a hands-on ideathon as they build a REST API from scratch, exploring essential backend concepts.",
      image: "/Events/ideathonPoster.jpg",
      date: "2024-10-30",
      time: "Now Live",
    },
  ],
  ongoingEvents: [
    {
      id: 5,
      name: "THINKTANK IDEATHON",
      description:
        "Join industry experts in a hands-on ideathon as they build a REST API from scratch, exploring essential backend concepts.",
      image: "/Events/ideathonPoster.jpg",
      date: "2024-10-30",
      time: "Now Live",
    },
  ],
  pastEvents: [
    {
      id: 3,
      name: "Daily DSA Week 3",
      description:
        "Daily DSA question for the week, to develop thinking skills and problem-solving strategies.",
      image: "/Events/portfolioLeaderboard.jpg",
      date: "2024-09-15",
      time: "10:00 - 21:00",
    },
    {
      id: 6,
      name: "Portfolio Challenge",
      description:
        "Develop a Website Portfolio to showcase your skills, and get feedback from industry experts.",
      image: "/Events/portfolioLeaderboard.jpg",
      date: "2024-10-01",
      time: "10:00 - 7:00",
    },
    {
      id: 2,
      name: "Daily DSA Week 2",
      description:
        "Daily DSA question for the week, to develop thinking skills and problem-solving strategies.",
      image: "/Events/portfolioLeaderboard.jpg",
      date: "2024-09-08",
      time: "10:00 - 21:00",
    },
    {
      id: 1,
      name: "Daily DSA Week 1",
      description:
        "Daily DSA question for the week, to develop thinking skills and problem-solving strategies.",
      image: "/Events/portfolioLeaderboard.jpg",
      date: "2024-09-01",
      time: "10:00 - 21:00",
    },
  ],
};
