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
      image: "/Events/portfolioLeaderboard.jpg",
      date: "2024-10-30",
      time: "Now Live",
    },
  ],
  pastEvents: [
    {
      id: 3,
      name: "Daily DSA Week 3",
      description:
        "Wrap up Week 3 of Daily DSA with advanced topics such as greedy algorithms, backtracking, and problem-solving strategies.",
      image: "/Events/portfolioLeaderboard.jpg",
      date: "2024-09-15",
      time: "09:00 - 17:00",
    },
    {
      id: 6,
      name: "Portfolio Challenge",
      description:
        "Discover the best practices to make websites more accessible to all users and enhance user experience.",
      image: "/Events/portfolioLeaderboard.jpg",
      date: "2024-10-01",
      time: "10:00 - 13:00",
    },
    {
      id: 2,
      name: "Daily DSA Week 2",
      description:
        "Continue with Week 2 of Daily DSA, focusing on trees, graphs, and dynamic programming concepts.",
      image: "/Events/portfolioLeaderboard.jpg",
      date: "2024-09-08",
      time: "09:00 - 17:00",
    },
    {
      id: 1,
      name: "Daily DSA Week 1",
      description:
        "Kick off Week 1 of Daily DSA with a full-day event covering core data structures like arrays, linked lists, and stacks.",
      image: "/Events/portfolioLeaderboard.jpg",
      date: "2024-09-01",
      time: "09:00 - 17:00",
    },
  ],
};
