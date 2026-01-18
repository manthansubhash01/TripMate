import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
import Places from "../assets/PlacesConstant";
import Footer from "../components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import HeroSection from "../components/HeroSection";
import { motion } from "motion/react";

const revealFromBottom = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const revealFromCenterRight = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const revealFromTop = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="relative w-full bg-white">
      <HeroSection />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: { opacity: 0, y: 80 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut", staggerChildren: 0.2 },
          },
        }}
        className="flex flex-col lg:flex-row p-6 sm:p-10 md:p-16 lg:p-20 gap-8 sm:gap-12 lg:gap-20 items-center"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -80 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.9, ease: "easeOut" },
            },
          }}
          className="flex-1"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-[#0F172A] bg-[#eaeaea] p-2 px-4 w-fit rounded-full inline-flex items-center gap-2 text-sm"
          >
            <Calendar className="h-4 w-4" />
            Main Feature
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-[#0F172A] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-6"
          >
            AI-Powered Itinerary <br className="hidden sm:block" /> Generator
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mb-8 text-sm sm:text-base md:text-lg text-gray-700"
          >
            Create personalized travel plans in seconds. Our intelligent
            itinerary generator analyzes your preferences, budget, and travel
            style to create the perfect day-by-day schedule with attractions,
            restaurants, and activities.
          </motion.p>

          <motion.ul
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="text-base sm:text-lg list-disc list-inside text-gray-700 space-y-2"
          >
            {[
              "Location-specific recommendations",
              "Day-by-day planning",
              "Customizable schedules",
              "Budget-friendly options",
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex-1 w-full max-w-md lg:max-w-none"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="h-64 sm:h-80 md:h-96 lg:h-150 w-full bg-cover shadow-2xl shadow-gray-900 rounded-2xl"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1689194581129-8d6bc190cb1a?q=80&w=3270&auto=format&fit=crop")`,
            }}
          />
        </motion.div>
      </motion.div>

      <div className="bg-[#eeeeee] p-6 sm:p-10 md:p-16 lg:p-20 min-h-300">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-[#0F172A] mb-4">
          Everything You Need For Perfect Travel
        </h1>
        <h3 className="text-sm sm:text-base md:text-lg text-center text-[#0F172A] mb-12 sm:mb-16 md:mb-20 max-w-3xl mx-auto px-4">
          Our comprehensive set of tools makes planning your next adventure
          simple and enjoyable. From finding the best places to customizing your
          entire journey.
        </h3>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
        >
          <motion.div
            variants={revealFromBottom}
            style={{ transformOrigin: "bottom" }}
            className="bg-[#fbfbfb] lg:row-span-2 rounded-2xl border-[#a3a3a3] border p-8 sm:p-10 md:p-12 overflow-hidden flex flex-col min-h-[500px] lg:min-h-[600px]"
          >
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0F172A] mb-3">
                Interactive World Map
              </h1>
              <h2 className="text-base sm:text-lg text-[#414f6f] mb-4">
                Visualize your journey and unlock travel inspiration with every
                click.
              </h2>
              <p className="text-sm sm:text-base text-[#0F172A] leading-relaxed">
                Discover the world at a glance. Zoom in, explore continents, and
                pick your dream destinations effortlessly.
              </p>
            </div>
            <div className="flex-1 flex items-end justify-center min-h-[280px] sm:min-h-[320px] lg:min-h-0">
              <div
                style={{
                  backgroundImage: `url("https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
                }}
                className="w-full h-full rounded-xl bg-cover bg-center shadow-lg"
              ></div>
            </div>
          </motion.div>

          <motion.div
            variants={revealFromCenterRight}
            style={{ transformOrigin: "left center" }}
            className="bg-[#fbfbfb] rounded-2xl border-[#a3a3a3] border p-8 sm:p-10 overflow-hidden flex flex-col min-h-[280px] lg:min-h-[290px]"
          >
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F172A] mb-3">
                Packing Assistant
              </h1>
              <h2 className="text-base sm:text-lg text-[#414f6f]">
                Smart, location-based suggestions for stress-free packing.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 flex-1">
              <div className="w-full sm:w-1/2 flex-shrink-0">
                <img
                  src="https://images.pexels.com/photos/7368269/pexels-photo-7368269.jpeg"
                  className="w-full h-56 sm:h-full object-cover rounded-xl shadow-md"
                  alt="Packing"
                />
              </div>
              <div className="flex items-center">
                <p className="text-sm sm:text-base text-[#0F172A] leading-relaxed">
                  Get personalized packing lists based on your destination,
                  travel dates, weather, and local customs. Travel light, travel
                  right.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={revealFromTop}
            style={{ transformOrigin: "top" }}
            className="bg-[#fbfbfb] rounded-2xl border-[#a3a3a3] border p-8 sm:p-10 overflow-hidden flex flex-col min-h-[280px] lg:min-h-[290px]"
          >
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F172A] mb-3">
                Expense Tracker
              </h1>
              <h2 className="text-base sm:text-lg text-[#414f6f]">
                Keep your budget on track with real-time expense monitoring and
                insights.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 flex-1">
              <div className="w-full sm:w-1/2 flex-shrink-0">
                <img
                  src="https://images.pexels.com/photos/4475523/pexels-photo-4475523.jpeg"
                  className="w-full h-56 sm:h-full object-cover rounded-xl shadow-md"
                  alt="Expense tracking"
                />
              </div>
              <div className="flex items-center">
                <p className="text-sm sm:text-base text-[#0F172A] leading-relaxed">
                  Track every penny spent on your journey. Categorize expenses,
                  support multiple currencies, and get spending summaries to
                  stay within budget.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-white p-6 sm:p-10 md:p-16 lg:p-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-[#0F172A] mb-4">
          What Travelers Say
        </h1>
        <p className="text-base sm:text-lg text-center text-[#7F7F7F] mb-10 sm:mb-15">
          Join thousands of happy travelers who trust TripMate
        </p>
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="w-full"
        >
          <SwiperSlide>
            <div className="bg-[#F9FBFC] p-8 rounded-2xl shadow-lg h-80 flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
              <div>
                <div className="flex mb-4">
                  <span className="text-yellow-400 text-2xl">★★★★★</span>
                </div>
                <p className="text-[#0F172A] text-lg mb-6">
                  "TripMate made planning my European trip so easy! The AI
                  itinerary was spot-on and saved me hours of research."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                <div>
                  <p className="font-bold text-[#0F172A]">Sarah Johnson</p>
                  <p className="text-sm text-[#7F7F7F]">Paris, France</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#F9FBFC] p-8 rounded-2xl shadow-lg h-80 flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
              <div>
                <div className="flex mb-4">
                  <span className="text-yellow-400 text-2xl">★★★★★</span>
                </div>
                <p className="text-[#0F172A] text-lg mb-6">
                  "The expense tracker is a game-changer! I stayed within budget
                  and knew exactly where my money was going throughout my trip."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                <div>
                  <p className="font-bold text-[#0F172A]">Michael Chen</p>
                  <p className="text-sm text-[#7F7F7F]">Tokyo, Japan</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#F9FBFC] p-8 rounded-2xl shadow-lg h-80 flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
              <div>
                <div className="flex mb-4">
                  <span className="text-yellow-400 text-2xl">★★★★★</span>
                </div>
                <p className="text-[#0F172A] text-lg mb-6">
                  "Love the packing assistant! Never forgot anything important
                  again. It even reminded me about adapters I would have
                  forgotten."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-red-500"></div>
                <div>
                  <p className="font-bold text-[#0F172A]">Emma Williams</p>
                  <p className="text-sm text-[#7F7F7F]">Bali, Indonesia</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#F9FBFC] p-8 rounded-2xl shadow-lg h-80 flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
              <div>
                <div className="flex mb-4">
                  <span className="text-yellow-400 text-2xl">★★★★★</span>
                </div>
                <p className="text-[#0F172A] text-lg mb-6">
                  "Best travel planning app I've used! The interactive map
                  helped me discover hidden gems I wouldn't have found
                  otherwise."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500"></div>
                <div>
                  <p className="font-bold text-[#0F172A]">David Martinez</p>
                  <p className="text-sm text-[#7F7F7F]">Barcelona, Spain</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
