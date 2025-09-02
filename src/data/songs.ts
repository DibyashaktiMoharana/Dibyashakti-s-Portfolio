export interface Song {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  albumArt: string;
}

export const SONGS: Song[] = [
  {
    id: "1",
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    audioUrl:
      "https://aac.saavncdn.com/915/ac73938eb6ed3d2dffa1b88e7eacc34d_320.mp4",
    albumArt:
      "https://c.saavncdn.com/915/I-Wanna-Be-Yours-Violin-Unknown-2023-20250108075659-500x500.jpg",
  },
  {
    id: "2",
    title: "Saiyaara",
    artist: "Shreya Ghoshal",
    audioUrl:
      "https://aac.saavncdn.com/598/e1e3878162e9a9436b99695f3ec43509_320.mp4",
    albumArt:
      "https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-500x500.jpg",
  },
  {
    id: "3",
    title: "Barbaad",
    artist: "Jubin Nautiyal",
    audioUrl:
      "https://aac.saavncdn.com/485/ffaf79d073d9e3e1da31176e87ff21f1_320.mp4",
    albumArt:
      "https://c.saavncdn.com/485/Barbaad-From-Saiyaara-Hindi-2025-20250610140401-500x500.jpg",
  },
];
