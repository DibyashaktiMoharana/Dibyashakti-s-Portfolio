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
    title: "Tum Ho Toh",
    artist: "Vishal Mishra",
    audioUrl:
      "https://aac.saavncdn.com/598/55a75f7dd5eb4ff90d8c46ba727912ae_320.mp4",
    albumArt:
      "https://c.saavncdn.com/485/Barbaad-From-Saiyaara-Hindi-2025-20250610140401-500x500.jpg",
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
  {
    id: "4",
    title: "Jaan le gayi",
    artist: "Sonu Nigam & Vishal Dadlani",
    audioUrl:
      "https://aac.saavncdn.com/251/f888f80dbed47f96d350b1e3514a253e_320.mp4",
    albumArt:
      "https://c.saavncdn.com/251/Bhoomi-2024-Hindi-2025-20250107194901-500x500.jpg",
  },
  {
    id: "5",
    title: "Bhala paye tate re",
    artist: "Kuldeep Pattanaik",
    audioUrl:
      "https://aac.saavncdn.com/251/f888f80dbed47f96d350b1e3514a253e_320.mp4",
    albumArt:
      "https://c.saavncdn.com/875/Bhala-Paaye-Tate-Re-Oriya-2022-20220706170811-500x500.jpg",
  },
 {
    id: "6",
    title: "A thousand years",
    artist: "Christina Perri",
    audioUrl:
      "https://aac.saavncdn.com/912/3d068ce7502fc7d4bb839d8ed98fc9eb_320.mp4",
    albumArt:
      "https://c.saavncdn.com/912/A-Thousand-Years-English-2011-20200822053427-500x500.jpg",
  },
];
