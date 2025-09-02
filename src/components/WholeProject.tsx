import Image from "next/image";
import { GithubIcon, WebLinkIcon } from "./icons/SocialIcons";

interface WholeProjectProps {
  title: string;
  image: string;
  subTitle?: string;
  description?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[];
}

const WholeProject = ({
  title,
  image,
  subTitle,
  description,
  githubUrl,
  liveUrl,
  technologies = [],
}: WholeProjectProps) => {
  // Determine primary URL for tile click
  const primaryUrl = liveUrl || githubUrl;
  const hasUrls = githubUrl || liveUrl;

  const handleTileClick = () => {
    if (primaryUrl) {
      window.open(primaryUrl, "_blank");
    }
  };

  return (
    <div
      className={`w-full bg-[#1c1c1d]/80 backdrop-blur-sm rounded-2xl border-[2px] border-[#303030] overflow-hidden transition-all duration-300 ${hasUrls
        ? 'hover:border-[#555555] hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer'
        : ''
        }`}
      onClick={hasUrls ? handleTileClick : undefined}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Left side - Image */}
        <div className="aspect-video md:aspect-auto relative min-h-[230px] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="w-full h-full object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right side - Project Details */}
        <div className="p-6 flex flex-col justify-center space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-deb text-white">
              {title} {subTitle && <p className="text-gray-400">{subTitle}</p>}
            </h2>
            <div className="flex gap-3">
              {githubUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent tile click
                    window.open(githubUrl, "_blank");
                  }}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
                  title="View on GitHub"
                >
                  <GithubIcon size={20} />
                </button>
              )}
              {liveUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent tile click
                    window.open(liveUrl, "_blank");
                  }}
                  className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 hover:scale-110 transition-all duration-200 backdrop-blur-sm border border-purple-500/30 hover:border-purple-500/50"
                  title="View Live Demo"
                >
                  <WebLinkIcon size={20} />
                </button>
              )}
            </div>
          </div>

          {description && (
            <p className="text-gray-300 font-reg text-sm leading-relaxed">
              {description}
            </p>
          )}

          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#2a2a2a]/80 backdrop-blur-sm text-gray-300 text-xs rounded-full font-med"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {hasUrls && (
            <div className="flex items-center gap-2 text-gray-400 text-xs font-med">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Click anywhere to view {liveUrl ? 'live demo' : 'source code'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WholeProject;
