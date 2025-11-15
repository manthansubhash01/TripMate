import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay,FreeMode} from 'swiper/modules';
import 'swiper/css'
import { Link } from 'react-router-dom';
import Places from '../assets/PlacesConstant';
import Footer from '../components/Footer';
import { Calendar, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";


const HomePage = () => {
  const {isAuthenticated} = useAuth()
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/27375300/pexels-photo-27375300/free-photo-of-ulun-danu-beratan-temple.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="relative z-10 mr-18 flex items-center justify-end h-[80%] text-white text-center">
        <div>
          <h1 className="text-6xl font-bold mb-4">
            Discover the world with <br /> TripMate
          </h1>
          <p className="text-xl m-5">
            TripMate is your all-in-one travel planner built for dreamers and
            doers. <br /> Plan. Personalize. Pack.
          </p>
          <div>
            <Link
              to={isAuthenticated ? "/itinerary" : "/signup"}
              className="text-[#0F172A] font-bold bg-[#FFFFFF] hover:bg-[#c2c2c2] opacity-80 p-4 m-2 rounded-lg"
            >
              <span>Start Planning</span>
              <ArrowRight className="inline-block ml-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 h-100 -mt-25">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={30}
          // loop={true}
          speed={6000}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          className="w-full"
        >
          {Places.map((place, i) => (
            <SwiperSlide key={i} className="!w-120">
              <div
                className="flex items-end h-80 text-white p-0 rounded-xl text-center shadow-md bg-cover"
                style={{ backgroundImage: `url('${place.image}')` }}
              >
                <div>
                  <h3 className="text-[#0F172A] text-left text-m font-bold bg-[#FFFFFF] opacity-70 m-2 p-3 rounded-lg">
                    {`"${place.description}"`}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex p-20">
        <div>
          <p className="text-[#0F172A] bg-[#eaeaea] p-2 m-3 w-35 rounded-full">
            <Calendar className="inline-block h-5 mb-1" />
            Main Feature
          </p>
          <h1 className="text-[#0F172A] text-5xl font-bold m-3 mt-10 mb-10">
            AI-Powered Itinerary <br /> Generator
          </h1>
          <p className="m-3 mb-10 text-xl">
            Create personalized travel plans in seconds. Our intelligent
            itinerary generator analyzes your preferences, budget, and travel
            style to create the perfect day-by-day schedule with attractions,
            restaurants, and activities.
          </p>
          <ul className="m-3 text-lg list-disc list-inside text-gray-700 space-y-2">
            <li>Location-specific recommendations</li>
            <li>Day-by-day planning</li>
            <li>Customizable schedules</li>
            <li>Budget-friendly options</li>
          </ul>
        </div>
        <div>
          <div
            className="h-150 w-150 bg-cover shadow-2xl shadow-gray-900 "
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1689194581129-8d6bc190cb1a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
            }}
          ></div>
        </div>
      </div>
      <div className="bg-[#eeeeee] p-20 h-300">
        <h1 className="text-4xl text-center font-bold text-[#0F172A] m-3">
          Everything You Need For Perfect Travel
        </h1>
        <h3 className="text-lg text-center text-[#0F172A] mb-25">
          Our comprehensive set of tools makes planning your next adventure
          simple and enjoyable.
          <br /> From finding the best places to customizing your entire
          journey.
        </h3>
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="bg-[#fbfbfb] row-span-2 h-200 rounded-xl border-[#a3a3a3] border-1 p-10">
            <h1 className="text-3xl font-medium text-[#0F172A] mb-3">
              Interactive World Map
            </h1>
            <h2 className="text-lg text-[#414f6f] mb-15">
              Visualize your journey and unlock travel <br /> inspiration with
              every click.
            </h2>
            <p className="text-lg text-[#0F172A] mb-10">
              Discover the world at a glance. Zoom in, explore continents, and
              pick your dream destinations effortlessly.
            </p>
            <div className="flex justify-center">
              <div
                style={{
                  backgroundImage: `url("https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
                }}
                className="h-110 w-140 bg-cover"
              ></div>
            </div>
          </div>
          <div className="bg-[#fbfbfb] h-98 rounded-xl border-[#a3a3a3] border-1 p-7">
            <h1 className="text-3xl font-medium text-[#0F172A] mb-3">
              Packing Assistant
            </h1>
            <h2 className="text-lg text-[#414f6f] mb-4">
              Smart, location-based suggestions for stress-free packing.
            </h2>
            <div className='flex flex-row gap-4'>
            <img
              src="https://images.pexels.com/photos/7368269/pexels-photo-7368269.jpeg"
              className="h-60"
            />
            <p className="text-lg text-[#0F172A] m-7 mt-4">
              Get personalized packing lists based on your destination, travel
              dates, weather, and local customs. Travel light, travel right.
            </p>
            </div>

            {/* <p className="text-lg text-[#0F172A] mb-10">
              Get personalized packing lists based on your destination, travel
              dates, weather, and local customs. Travel light, travel right.
            </p> */}
          </div>
          <div className="bg-[#fbfbfb] h-98 rounded-xl border-[#a3a3a3] border-1 p-10">
            <h1 className="text-3xl font-medium text-[#0F172A] mb-3">
              Accommodation Suggestions
            </h1>
            <h2 className="text-lg text-[#414f6f] mb-15">
              Whether it's luxury or budget, we’ve got <br /> the best options
              for your journey.
            </h2>
            <p className="text-lg text-[#0F172A] mb-10">
              Browse handpicked hotels, hostels, and homestays. Filter by price,
              location, and vibe to find your perfect stay.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage