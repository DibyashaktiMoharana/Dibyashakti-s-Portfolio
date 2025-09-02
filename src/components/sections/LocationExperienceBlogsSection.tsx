import BentoCard from "../cards/BentoCard";
import ExperienceRotator from "../ExperienceRotator";
import BlogSkeleton from "../BlogSkeleton";
import RedirectButton from "../RedirectButton";
import { useRouter } from "next/navigation";

const LocationExperienceBlogsSection = () => {
  const router = useRouter();
  return (
    <div className="h-auto space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-2">
      {/* Mobile: Experience Card First (Most Important) */}
      <BentoCard
        classes="md:col-span-2 md:order-2 p-4 md:p-6 font-med min-h-32 md:min-h-auto"
        data-redirect="true"
        data-cursor-scale="true"
        onClick={() => router.push("/experience")}
      >
        <div className="flex items-center justify-between mb-2 md:mb-0">
          <p className="text-lg md:text-2xl font-deb text-white">Experience</p>
          <div className="hidden md:block">
            <RedirectButton size={20} />
          </div>
          <div className="block md:hidden">
            <RedirectButton size={20} />
          </div>
        </div>
        <ExperienceRotator />
      </BentoCard>

      {/* Mobile: Two-column layout for Location & Blogs */}
      <div className="grid grid-cols-2 gap-4 md:contents">
        {/* Location Card */}
        <BentoCard
          classes="md:col-span-1 md:order-1 aspect-square overflow-clip relative"
          padding="none"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent"></div>
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'url("/Map.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-center">
            <h3 className="text-white text-xs md:text-sm font-semibold drop-shadow-lg text-start font-deb">
              Vellore, India
            </h3>
          </div>
        </BentoCard>

        {/* Blogs Card */}
        <BentoCard
          classes="md:col-span-1 md:order-3 p-4 md:p-6 font-med aspect-square md:aspect-auto"
          data-redirect="true"
          data-cursor-scale="true"
          onClick={() => window.open("https://dlogs.vercel.app/", "_blank")}
        >
          <BlogSkeleton />
        </BentoCard>
      </div>
    </div>
  );
};

export default LocationExperienceBlogsSection;
