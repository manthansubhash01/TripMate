const Places = [
  {
    name: "Paris",
    speciality: "Eiffel Tower",
    image:
      "https://images.unsplash.com/photo-1566902145833-0475c9f1a1bf?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Toast under the Eiffel Tower and stroll through Parisian art and charm.",
  },
  {
    name: "Rome",
    speciality: "Colosseum",
    image:
      "https://images.pexels.com/photos/3892129/pexels-photo-3892129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Walk ancient roads where gladiators once fought and emperors ruled.",
  },
  {
    name: "New York",
    speciality: "Statue of Liberty",
    image:
      "https://images.pexels.com/photos/9091096/pexels-photo-9091096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Catch the skyline, cross Times Square, and feel the buzz of NYC energy.",
  },
  {
    name: "Tokyo",
    speciality: "Anime culture",
    image:
      "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Zip through neon-lit streets where samurai legacy meets futuristic vibes.",
  },
  {
    name: "Bali",
    speciality: "Beach paradise",
    image:
      "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Catch golden sunsets and spiritual serenity on Bali’s dreamy shores.",
  },
  {
    name: "London",
    speciality: "Big Ben",
    image:
      "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "From Tower Bridge to Big Ben, ride through history on a red bus.",
  },
  {
    name: "Barcelona",
    speciality: "Gaudí architecture",
    image:
      "https://images.pexels.com/photos/16841065/pexels-photo-16841065/free-photo-of-aerial-view-of-the-plaza-of-spain-in-barcelona-spain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Marvel at Gaudí’s dreamlike creations and feel the rhythm of Catalonia.",
  },
  {
    name: "Dubai",
    speciality: "Burj Khalifa",
    image:
      "https://images.pexels.com/photos/3763190/pexels-photo-3763190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Touch the sky atop Burj Khalifa and shop in golden souks below.",
  },
  {
    name: "Istanbul",
    speciality: "Hagia Sophia",
    image:
      "https://images.pexels.com/photos/27822004/pexels-photo-27822004/free-photo-of-ortakoy-cami.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Breathe in the spices, domes, and echoes of empires past.",
  },
  {
    name: "Singapore",
    speciality: "Marina Bay Sands",
    image:
      "https://images.pexels.com/photos/11777894/pexels-photo-11777894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Swim in the sky at Marina Bay and dine in a garden of the future.",
  },
  {
    name: "Sydney",
    speciality: "Opera House",
    image:
      "https://images.pexels.com/photos/5707602/pexels-photo-5707602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Catch waves at Bondi and an opera beside the sails by the sea.",
  },
  {
    name: "Cairo",
    speciality: "Pyramids",
    image:
      "https://images.pexels.com/photos/15127306/pexels-photo-15127306/free-photo-of-pyramids-and-sphinx-statue-in-desert.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Stand in awe before the pyramids and whisper to the Sphinx.",
  },
  {
    name: "Rio de Janeiro",
    speciality: "Christ the Redeemer",
    image:
      "https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Dance through samba streets beneath Christ the Redeemer’s arms.",
  },
  {
    name: "Amsterdam",
    speciality: "Canals",
    image:
      "https://images.pexels.com/photos/14419918/pexels-photo-14419918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Glide through winding canals past tulips and timeless townhouses.",
  },
  {
    name: "Venice",
    speciality: "Gondolas",
    image:
      "https://images.pexels.com/photos/7806257/pexels-photo-7806257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Sail the serenade-filled canals of a city floating on romance.",
  },
  {
    name: "Bangkok",
    speciality: "Street food",
    image:
      "https://images.pexels.com/photos/19078371/pexels-photo-19078371/free-photo-of-tourists-in-front-of-the-royal-pantheon-at-the-temple-of-the-emerald-buddha.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Feast on spicy street eats and golden temples glowing at dusk.",
  },
  {
    name: "Cape Town",
    speciality: "Table Mountain",
    image:
      "https://images.pexels.com/photos/3770287/pexels-photo-3770287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Rise above oceans and vineyards with Table Mountain views.",
  },
  {
    name: "Lisbon",
    speciality: "Tram 28",
    image:
      "https://images.pexels.com/photos/9253/sea-city-landscape-sky.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Ride vintage trams through sunlit hills and cobbled streets.",
  },
  {
    name: "San Francisco",
    speciality: "Golden Gate Bridge",
    image:
      "https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Cross the Golden Gate into a world of fog, tech, and hippie trails.",
  },
  {
    name: "Munich",
    speciality: "Oktoberfest",
    image:
      "https://images.pexels.com/photos/19727167/pexels-photo-19727167/free-photo-of-a-snowy-mountain-with-trees-and-snow-covered-ground.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Raise a stein and dance through Bavarian traditions and cheers.",
  },
  {
    name: "Edinburgh",
    speciality: "Castle",
    image:
      "https://images.pexels.com/photos/18398625/pexels-photo-18398625/free-photo-of-view-of-a-castle.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
    description:
      "Climb through cobbled stories to the castle that watches the mist.",
  },
  {
    name: "Mexico",
    speciality: "Zócalo",
    image:
      "https://images.pexels.com/photos/17453663/pexels-photo-17453663/free-photo-of-folklore-mexican-dancers-in-town-square.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Celebrate colors, culture, and history in the beating heart of Mexico.",
  },
  {
    name: "Reykjavik",
    speciality: "Northern Lights",
    image:
      "https://images.pexels.com/photos/31430640/pexels-photo-31430640/free-photo-of-northern-lights-over-snowy-lapland-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Chase the aurora across icy fjords and volcanic dreams.",
  },
  {
    name: "Colombo",
    speciality: "Seaside charm",
    image:
      "https://images.pexels.com/photos/30858001/pexels-photo-30858001/free-photo-of-silhouette-of-kite-flyers-at-colombo-seaside.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Stroll breezy shores and feel Sri Lanka’s coastal rhythm unfold.",
  },
  {
    name: "Jaipur",
    speciality: "Pink City",
    image:
      "https://images.pexels.com/photos/29624142/pexels-photo-29624142/free-photo-of-amber-fort-s-elegant-architectural-details-in-jaipur.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Wander through palaces bathed in pink and painted with royalty.",
  },
  {
    name: "Agra",
    speciality: "Taj Mahal",
    image:
      "https://images.pexels.com/photos/28762053/pexels-photo-28762053/free-photo-of-majestic-view-of-the-taj-mahal-in-agra.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Witness the Taj glow in marble, where love stands eternal.",
  },
  {
    name: "Beijing",
    speciality: "Great Wall",
    image:
      "https://images.pexels.com/photos/19872/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Climb the Great Wall and echo the footsteps of dynasties.",
  },
  {
    name: "Shanghai",
    speciality: "Skyline",
    image:
      "https://images.pexels.com/photos/17856377/pexels-photo-17856377/free-photo-of-oriental-pearl-tower-in-shanghai.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Zoom into tomorrow in China’s pulsing powerhouse of lights.",
  },
  {
    name: "Doha",
    speciality: "Modern architecture",
    image:
      "https://images.pexels.com/photos/2239422/pexels-photo-2239422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Skyscrapers meet sand dunes in Qatar’s futuristic capital",
  },
  {
    name: "Moscow",
    speciality: "Red Square",
    image:
      "https://images.pexels.com/photos/6000331/pexels-photo-6000331.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
    description: "From Red Square to the Kremlin, dive into Russian grandeur",
  },
];


export default Places