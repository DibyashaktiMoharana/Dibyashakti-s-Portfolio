import React from "react";

interface SkillProps {
  icon: React.ReactNode;
  text: string;
}

const Skill = ({ icon, text }: SkillProps) => {
  return (
    <div
      className="
        inline-flex items-center gap-3 px-5 py-3 rounded-full
        text-white font-med text-base justify-center
        transition-all duration-200 ease-in-out
        hover:scale-105 cursor-pointer select-none
        bg-[#2a2a2a]/80 backdrop-blur-sm
      "
    >
      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
        {icon}
      </span>
      <span className="text-sm leading-0">{text}</span>
    </div>
  );
};

export default Skill;
