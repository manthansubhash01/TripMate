import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Places from "../assets/PlacesConstant";

const AUTO_NEXT_TIME = 7000;
const CARD_WIDTH = 220;
const CARD_GAP = 22;
const CARD_SPACING = CARD_WIDTH * 0.8;

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [typedName, setTypedName] = useState("");

  const { isAuthenticated } = useAuth();

  const backgroundIndex = (index - 1 + Places.length) % Places.length;
  const heroPlace = Places[backgroundIndex];

  useEffect(() => {
    if (!heroPlace?.name) return;

    setTypedName("");
    let i = 0;
    const title = heroPlace.name;

    const interval = setInterval(() => {
      i += 1;
      setTypedName(title.slice(0, i));
      if (i >= title.length) {
        clearInterval(interval);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [heroPlace.name]);

  useEffect(() => {
    if (!Places.length) return;

    const timer = setInterval(
      () =>
        setIndex((i) => {
          const next = i + 1;
          return next >= Places.length ? 0 : next;
        }),
      AUTO_NEXT_TIME
    );
    return () => clearInterval(timer);
  }, []);

  const visibleCards = Array.from(
    { length: Math.min(4, Places.length) },
    (_, offset) => {
      const placeIndex = (index + offset) % Places.length;
      return {
        place: Places[placeIndex],
        placeIndex,
        offset,
      };
    }
  );

  return (
    <section className="relative h-screen  w-full overflow-hidden bg-black">
      {Places.map((place, i) => (
        <motion.div
          key={place.image}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${place.image})` }}
          animate={{
            opacity: i === backgroundIndex ? 1 : 0,
            scale: i === backgroundIndex ? 1 : 1.04,
          }}
          transition={{
            opacity: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 4, ease: "linear" },
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      ))}

      <div className="relative z-10 flex h-full items-center px-10 md:px-20 max-w-3xl">
        <motion.div
          key={heroPlace.name}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-white"
        >
          <motion.p
            className="uppercase tracking-[0.25em] text-xs md:text-sm opacity-80"
            initial={{ opacity: 0, y: -8, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.25em" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {heroPlace.speciality}
          </motion.p>

          <motion.h1
            className="mt-3 text-9xl md:text-7xl  font-extrabold leading-tight drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            {typedName}
          </motion.h1>

          <motion.p
            key={heroPlace.description}
            className="mt-4 max-w-md text-sm md:text-base opacity-90 drop-shadow"
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {heroPlace.description}
          </motion.p>

          <motion.div
            className="mt-8 inline-flex"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to={isAuthenticated ? "/itinerary" : "/signup"}
              className="inline-flex items-center gap-2 rounded-full bg-white/90 px-8 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-black/40 transition hover:bg-white"
            >
              <span>
                {isAuthenticated ? "Plan your trip" : "Start planning"}
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center z-20 md:inset-auto md:right-16 md:top-1/2 md:-translate-y-1/2 md:block">
        <div className="relative h-[260px] w-[420px] md:h-[360px]">
          {visibleCards.map(({ place, placeIndex, offset }) => {
            const x = offset * CARD_SPACING;
            const scale = 1 - offset * 0.08;
            const opacity = 1 - offset * 0.18;
            const zIndex = 20 - offset;

            return (
              <motion.div
                key={place.name + placeIndex}
                className="absolute inset-y-0 left-0 h-full w-[230px] cursor-pointer overflow-hidden rounded-2xl shadow-2xl shadow-black/40 will-change-transform"
                style={{
                  backgroundImage: `url(${place.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex,
                }}
                animate={{ x, scale, opacity }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                whileHover={{ scale: scale + 0.03 }}
                onClick={() => setIndex(placeIndex)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                  <p className="text-[11px] uppercase tracking-[0.2em] opacity-70">
                    {place.speciality}
                  </p>
                  <p className="mt-1 text-sm font-semibold line-clamp-1">
                    {place.name}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
