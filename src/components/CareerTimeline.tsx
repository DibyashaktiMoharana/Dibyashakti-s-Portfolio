import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

interface Experience {
  position: string;
  company: string;
  duration: string;
  employmentType: string;
  companyUrl: string;
  description: string;
}

interface CareerTimelineProps {
  experiences: Experience[];
}

const CareerTimeline = ({ experiences }: CareerTimelineProps) => {
  // Parse dates and calculate positions
  const parseDate = (dateStr: string) => {
    const parts = dateStr.split(" - ");
    const startDate = parts[0];
    const endDate = parts[1] || "Present";

    // Convert to Date objects (simplified parsing)
    const parseMonthYear = (str: string) => {
      if (str === "Present") return new Date();
      const [month, year] = str.split(" ");
      const monthMap: { [key: string]: number } = {
        January: 0,
        Jan: 0,
        February: 1,
        Feb: 1,
        March: 2,
        Mar: 2,
        April: 3,
        Apr: 3,
        May: 4,
        June: 5,
        Jun: 5,
        July: 6,
        Jul: 6,
        August: 7,
        Aug: 7,
        September: 8,
        Sep: 8,
        October: 9,
        Oct: 9,
        November: 10,
        Nov: 10,
        December: 11,
        Dec: 11,
      };
      return new Date(parseInt(year), monthMap[month] || 0);
    };

    return {
      start: parseMonthYear(startDate),
      end: parseMonthYear(endDate),
    };
  };

  // Timeline start date: Jan 2023
  const timelineStart = new Date(2024, 0); // January 2024
  const timelineEnd = new Date(); // Present

  const totalDuration = timelineEnd.getTime() - timelineStart.getTime();

  // Calculate positions for each experience
  const experienceMarkers = experiences.map((exp, index) => {
    const dates = parseDate(exp.duration);
    const startPosition =
      ((dates.start.getTime() - timelineStart.getTime()) / totalDuration) * 100;
    const endPosition =
      ((dates.end.getTime() - timelineStart.getTime()) / totalDuration) * 100;

    return {
      ...exp,
      index,
      startPosition: Math.max(0, Math.min(100, startPosition)),
      endPosition: Math.max(0, Math.min(100, endPosition)),
      midPosition: Math.max(
        0,
        Math.min(100, (startPosition + endPosition) / 2)
      ),
    };
  });

  // Format timeline dates
  const formatTimelineDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="relative">
      {/* Timeline Labels */}
      <div className="flex justify-between text-xs text-gray-400 font-reg mb-4">
        <span>{formatTimelineDate(timelineStart)}</span>
        <span>{formatTimelineDate(timelineEnd)}</span>
      </div>

      {/* Timeline Line */}
      <div className="relative h-3 mb-8">
        <div className="absolute inset-0 bg-gray-600 rounded-full"></div>

        {/* Experience Markers */}
        {experienceMarkers.map((marker) => (
          <div key={marker.index} className="relative">
            {/* Experience Range Bar */}

            {/* Invisible larger hover area */}
            <div
              className="absolute w-12 h-12 cursor-pointer z-10 flex items-center justify-center"
              style={{
                left: `${marker.midPosition}%`,
                top: "50%",
                transform: "translateX(-50%) translateY(-50%)",
              }}
              data-tooltip-id={`timeline-tooltip-${marker.index}`}
            >
              {/* Visible orange pin */}
              <motion.div
                className="w-5 h-5 bg-orange-500 rounded-full border-2 border-orange-300 shadow-lg pointer-events-none"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* React Tooltip with Custom UI */}
            <Tooltip
              id={`timeline-tooltip-${marker.index}`}
              place="top"
              style={{
                backgroundColor: "transparent",
                padding: 0,
                border: "none",
                borderRadius: 0,
                boxShadow: "none",
              }}
              render={() => (
                <div className="bg-[#2a2a2a]/90 backdrop-blur-sm border border-[#404040] rounded-lg p-3 shadow-xl">
                  <div className="space-y-1">
                    <h4 className="text-white font-deb text-sm">
                      {marker.position}
                    </h4>
                    <p className="text-blue-400 font-sb text-sm">
                      {marker.company}
                    </p>
                  </div>
                </div>
              )}
            />
          </div>
        ))}
      </div>

      {/* Timeline Stats */}
      <div className="flex justify-center">
        <div className="text-center">
          <span className="text-gray-400 font-reg text-sm">
            Professional Journey:{" "}
            {Math.ceil(
              (timelineEnd.getTime() - timelineStart.getTime()) /
              (1000 * 60 * 60 * 24 * 365 * 12)
            )}{" "}
            Years
          </span>
        </div>
      </div>
    </div>
  );
};

export default CareerTimeline;
