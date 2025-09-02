"use client";
import WholeProject from "../../components/WholeProject";
import CustomCursor from "../../components/CustomCursor";
import Container from "../../components/cards/Container";
import BackgroundVideo from "../../components/BackgroundVideo";
import MiniMusicPlayer from "../../components/MiniMusicPlayer";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RecentWorkPage() {
  const router = useRouter();
  const projects = [
    {
      id: 1,
      title: "FinSage, IBM Client Engineering",
      image: "/projects/finsage.png",
      description:
        "Led FastApi, CrewAI and LLM integrations using IBM watsonx.ai, enabling real-time credit usage insights and milestone-based offers - boosted engagement by ~25% in PoC.",
      githubUrl: "https://github.com/DibyashaktiMoharana/FinSage",
      liveUrl: "",
      technologies: [
        "FastAPI",
        "CrewAI",
        "IBM watsonx.ai",
        "Python",
        "React",
        "TypeScript",
      ],
    },
    {
      id: 2,
      title: "Track N Trash",
      image: "/projects/trackntrash.png",
      description:
        "Engineered a real-time waste detection system using Python and OpenCV, delivering sub-200 millisecond response times for identifying trash overflow in bins.",
      githubUrl: "https://github.com/Track-N-Trash-Tech",
      liveUrl: "",
      technologies: ["Python", "OpenCV", "Machine Learning", "Computer Vision"],
    },
    {
      id: 3,
      title: "ACMOne App, ACM-VIT",
      image: "/projects/acmone.png",
      description:
        "Created a non-code solution for efficient management using React Native and FastAPI, collaborating with 15 developers. Deployed successful integrations with three third-party APIs, optimizing backend controller models to streamline data processing, improved data retrieval speed by 50% and facilitated real-time updates for over 200+ users.",
      githubUrl: "",
      liveUrl: "https://acmone.acmvit.in/",
      technologies: [
        "React Native",
        "FastAPI",
        "Python",
        "REST APIs",
        "Mobile Development",
      ],
    },
    {
      id: 4,
      title: "Cryptic Hunt Backend, ACM-VIT",
      image: "/projects/cryptichunt.png",
      description:
        "Developed using Go fiber and Gorm to handle 1200+ concurrent users with security measures, and efficient database management. Deployed after rigorous unit and integration testing on cloud platforms, achieving 95% test coverage with CI/CD pipelines and maintained 99.9% uptime, guaranteeing reliability.",
      githubUrl: "",
      liveUrl: "https://cryptichunt.acmvit.in/",
      technologies: [
        "Go",
        "Fiber",
        "Gorm",
        "PostgreSQL",
        "Docker",
        "CI/CD",
        "Cloud Deployment",
      ],
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <BackgroundVideo />
      <CustomCursor />
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: {
              filter: "blur(10px)",
              transform: "translateY(10%)",
              opacity: 0,
            },
            visible: {
              filter: "blur(0)",
              transform: "translateY(0)",
              opacity: 1,
            },
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="space-y-6"
        >
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-deb text-white">Recent Works</h1>
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 px-4 py-2 border border-[#aaaaaa] rounded-lg text-[#aaaaaa] hover:text-white hover:border-[#404040] transition-all duration-200 font-deb text-sm tracking-[0.2em]"
              >
                ← BACK
              </button>
            </div>
            <p className="text-gray-400 font-reg">
              A collection of my latest projects and experiments
            </p>
          </div>

          <div className="space-y-6">
            {projects.map((project) => (
              <WholeProject
                key={project.id}
                title={project.title}
                image={project.image}
                description={project.description}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                technologies={project.technologies}
              />
            ))}
          </div>
        </motion.div>
      </Container>
      <MiniMusicPlayer />
    </div>
  );
}
