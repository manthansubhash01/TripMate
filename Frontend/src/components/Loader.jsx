import { motion } from "motion/react";
import { Plane } from "lucide-react"; // or use an SVG if needed

const text = "Crafting your itinerary...".split("");

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const planePathVariants = {
  animate: {
    x: [0, 50, 100, 120],
    y: [0, -30, -60, -80],
    rotate: [0, 10, 20, 30],
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

export default function TripMateLoader(props) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${props.height} bg-gradient-to-b from-sky-100 via-white to-gray-200 dark:from-gray-900 dark:to-gray-800 shadow-2xl shadow-zinc-700`}
    >
      <motion.div
        className="text-[#0F172A] mb-6"
        variants={planePathVariants}
        animate="animate"
      >
        <Plane size={48} />
      </motion.div>

      <motion.div
        className="flex space-x-1 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {text.map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
