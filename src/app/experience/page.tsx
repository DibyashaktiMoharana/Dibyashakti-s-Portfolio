"use client";
import ExperienceCard from "../../components/ExperienceCard";
import CareerTimeline from "../../components/CareerTimeline";
import CustomCursor from "../../components/CustomCursor";
import Container from "../../components/cards/Container";
import BackgroundVideo from "../../components/BackgroundVideo";
import MiniMusicPlayer from "../../components/MiniMusicPlayer";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ExperiencePage() {
  const router = useRouter();
  const experiences = [
    {
      position: "Client Engineering Intern",
      company: "IBM",
      duration: "June 2025 - August 2025",
      employmentType: "Internship",
      companyUrl: "https://ibm.com",
      description:
        "Collaborated with 20+ AI and Platform Engineers to build enterprise-grade PoCs tailored for BFSI clients, including HDFC.\nEngaged directly with stakeholders to gather requirements, demo PoCs, iterate on feedback, and pitch solutions—contributing to deal closures.\nDeveloped automation tools to optimize cloud deployed processes minimizing repetitive workflows.",
    },
    {
      position: "Summer IT Intern",
      company: "Indian Railways",
      duration: "June 2024 - July 2024",
      employmentType: "Internship",
      companyUrl: "https://indianrailways.gov.in",
      description:
        "Implemented efficient solutions, resulting in a 45% improvement in complaint management systems.\nLed a team of 12 to revamp the customer support system, streamlining processes and resolving 100+ customer tickets.",
    },
  ];

  const pageVariants = {
    hidden: { filter: "blur(10px)", transform: "translateY(10%)", opacity: 0 },
    visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
  };

  const pageTransition = { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const };

  return (
    <div className="min-h-screen py-8">
      <BackgroundVideo />
      <CustomCursor />
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={pageVariants}
          transition={pageTransition}
          className="space-y-8"
        >
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-deb text-white">Experience</h1>
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 px-4 py-2 border border-[#aaaaaa] rounded-lg text-[#aaaaaa] hover:text-white hover:border-[#404040] transition-all duration-200 font-deb text-sm tracking-[0.2em]"
              >
                ← BACK
              </button>
            </div>
            <p className="text-gray-400 font-reg">
              My professional journey and work experience
            </p>
          </div>
          <div className="mb-8 p-6 bg-[#2a2a2a]/80 backdrop-blur-sm rounded-2xl">
            <h3 className="text-lg font-deb text-white mb-6">
              Career Timeline
            </h3>
            <CareerTimeline experiences={experiences} />
          </div>

          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} {...exp} />
          ))}
        </motion.div>
      </Container>
      <MiniMusicPlayer />
    </div>
  );
}
