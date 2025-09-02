import { AWSIcon, JavaIcon, WebsocketIcon } from "./icons/SocialIcons";
import Skill from "./Skill";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
  SiGit,
  SiDocker,
  SiMongodb,
  SiPostgresql,
  SiNextdotjs,
  SiExpress,
} from "react-icons/si";

const AllSkills = () => {
  const allSkills = [
    { icon: <SiJavascript color="#F7DF1E" />, text: "JavaScript" },
    { icon: <SiTypescript color="#3178C6" />, text: "TypeScript" },
    { icon: <JavaIcon />, text: "Java" },
    { icon: <SiReact color="#61DAFB" />, text: "React" },
    { icon: <SiNextdotjs color="#000000" />, text: "Next.js" },
    { icon: <SiNodedotjs color="#339933" />, text: "Node.js" },
    { icon: <SiExpress color="#000000" />, text: "Express.js" },
    { icon: <SiMongodb color="#47A248" />, text: "MongoDB" },
    { icon: <SiPostgresql color="#336791" />, text: "PostgreSQL" },
    { icon: <SiTailwindcss color="#06B6D4" />, text: "Tailwind CSS" },
    { icon: <SiGit color="#F05032" />, text: "Git" },
    { icon: <SiDocker color="#2496ED" />, text: "Docker" },
    { icon: <AWSIcon />, text: "AWS" },
    { icon: <WebsocketIcon />, text: "Web Sockets" },
    { icon: <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">C</div>, text: "CrewAI" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {allSkills.map((skill, index) => (
        <Skill key={index} icon={skill.icon} text={skill.text} />
      ))}
    </div>
  );
};

export default AllSkills;
