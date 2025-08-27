import { PrismaClient, PlaceType } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.ecoRating.deleteMany();
  await prisma.volunteerRegistration.deleteMany();
  await prisma.accommodation.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.conservationProject.deleteMany();

  // Create Accommodations
  const accommodations = [
    {
      name: "Treehouse Eco Lodge",
      location: "Ella, Sri Lanka",
      description:
        "Sustainable treehouse lodges built with reclaimed materials, powered by solar energy, and featuring rainwater harvesting systems. Each unit offers panoramic views of the surrounding forest.",
      energyEfficiency:
        "100% solar powered with LED lighting and energy monitoring systems",
      wasteManagement:
        "Zero-waste policy with composting and recycling programs",
      waterConservation: "Rainwater harvesting and greywater recycling systems",
      certifications: ["LEED Platinum", "Green Globe"],
      images: [
        "treehouse-exterior.jpg",
        "treehouse-interior.jpg",
        "treehouse-view.jpg",
      ],
      websiteUrl: "https://treehouseeco.com",
    },
    {
      name: "Coastal Eco Resort",
      location: "Tangalle, Sri Lanka",
      description:
        "Beachfront eco-resort featuring sustainable architecture and direct access to turtle nesting beaches. Committed to marine conservation and local community development.",
      energyEfficiency:
        "Hybrid solar-wind power system with smart climate control",
      wasteManagement: "Plastic-free zone with organic waste conversion",
      waterConservation: "Seawater desalination and water-efficient fixtures",
      certifications: ["Green Key", "Travelife Gold"],
      images: ["resort-aerial.jpg", "resort-beach.jpg", "resort-room.jpg"],
      websiteUrl: "https://coastalecoresort.com",
    },
    {
      name: "Mountain View Eco Cabins",
      location: "Nuwara Eliya, Sri Lanka",
      description:
        "Cozy eco-cabins nestled in the hills, constructed using sustainable materials and traditional building techniques. Perfect for nature lovers and hikers.",
      energyEfficiency: "Geothermal heating and cooling systems",
      wasteManagement: "Comprehensive recycling and composting program",
      waterConservation: "Spring water sourcing with usage monitoring",
      certifications: ["EarthCheck", "Sustainable Tourism Certified"],
      images: ["cabin-exterior.jpg", "cabin-interior.jpg", "mountain-view.jpg"],
      websiteUrl: "https://mountainviewcabins.com",
    },
    {
      name: "Riverside Glamping",
      location: "Kitulgala, Sri Lanka",
      description:
        "Luxury camping experience by the river with minimal environmental impact. Canvas tents on elevated platforms with modern eco-friendly amenities.",
      energyEfficiency: "Solar-powered lighting and charging stations",
      wasteManagement: "Leave No Trace principles and waste separation",
      waterConservation: "Low-flow fixtures and river water filtration",
      certifications: [
        "Eco Tourism Australia",
        "Sustainable Travel International",
      ],
      images: [
        "glamping-tent.jpg",
        "riverside-view.jpg",
        "camping-interior.jpg",
      ],
      websiteUrl: "https://riversideglamping.com",
    },
    {
      name: "Forest Canopy Lodge",
      location: "Sinharaja, Sri Lanka",
      description:
        "Immersive rainforest experience with elevated walkways and observation decks. Focus on wildlife conservation and rainforest preservation.",
      energyEfficiency: "Passive cooling design with solar backup",
      wasteManagement: "Biodegradable products and waste minimization",
      waterConservation:
        "Natural spring water and water conservation education",
      certifications: [
        "Rainforest Alliance",
        "Sri Lanka Tourism Eco Certification",
      ],
      images: [
        "canopy-lodge.jpg",
        "rainforest-view.jpg",
        "observation-deck.jpg",
      ],
      websiteUrl: "https://forestcanopylodge.com",
    },
  ];

  // Create Restaurants
  const restaurants = [
    {
      name: "Farm to Table",
      location: "Colombo 07, Sri Lanka",
      description:
        "Zero-waste restaurant serving organic, locally-sourced cuisine. On-site vegetable garden and partnerships with local organic farmers.",
      energyEfficiency:
        "Energy-efficient kitchen equipment and natural ventilation",
      wasteManagement: "Complete composting system and recycling program",
      waterConservation: "Water-efficient dishwashing and garden irrigation",
      certifications: ["Organic Certified", "Zero Waste International"],
      images: [
        "restaurant-interior.jpg",
        "garden-view.jpg",
        "food-plating.jpg",
      ],
      websiteUrl: "https://farmtotable.lk",
    },
    {
      name: "Ocean Harvest",
      location: "Galle, Sri Lanka",
      description:
        "Sustainable seafood restaurant committed to responsible fishing practices. Works directly with local fishing communities.",
      energyEfficiency: "LED lighting and energy-efficient cold storage",
      wasteManagement: "Seafood waste composting and plastic-free policy",
      waterConservation: "Rainwater collection for cleaning purposes",
      certifications: ["MSC Certified", "Friend of the Sea"],
      images: ["ocean-view.jpg", "seafood-display.jpg", "restaurant-deck.jpg"],
      websiteUrl: "https://oceanharvest.lk",
    },
    {
      name: "Green Spice Garden",
      location: "Kandy, Sri Lanka",
      description:
        "Traditional Sri Lankan cuisine using organic spices and vegetables from their own spice garden. Educational tours available.",
      energyEfficiency: "Solar water heating and natural cooling",
      wasteManagement: "Organic waste to fertilizer conversion",
      waterConservation: "Drip irrigation in spice garden",
      certifications: [
        "Organic Sri Lanka",
        "Sustainable Restaurant Association",
      ],
      images: ["spice-garden.jpg", "restaurant-view.jpg", "cooking-demo.jpg"],
      websiteUrl: "https://greenspicegarden.com",
    },
    {
      name: "Highland Organic Cafe",
      location: "Ella, Sri Lanka",
      description:
        "Mountain cafe specializing in organic tea and coffee. Sources directly from local plantations practicing sustainable agriculture.",
      energyEfficiency: "Energy-efficient brewing equipment",
      wasteManagement: "Coffee grounds recycling program",
      waterConservation: "Water recycling for plantation irrigation",
      certifications: ["Rainforest Alliance", "Organic Certified"],
      images: ["cafe-interior.jpg", "tea-plantation.jpg", "coffee-service.jpg"],
      websiteUrl: "https://highlandorganic.lk",
    },
    {
      name: "Native Kitchen",
      location: "Sigiriya, Sri Lanka",
      description:
        "Restaurant celebrating indigenous ingredients and traditional cooking methods. Supporting local farmers and indigenous communities.",
      energyEfficiency: "Traditional cooking methods with minimal energy use",
      wasteManagement: "Zero-waste kitchen practices",
      waterConservation: "Traditional water conservation methods",
      certifications: ["Slow Food Certified", "Indigenous Food Lab"],
      images: [
        "traditional-kitchen.jpg",
        "dining-area.jpg",
        "local-ingredients.jpg",
      ],
      websiteUrl: "https://nativekitchen.lk",
    },
  ];

  // Create Conservation Projects
  const conservationProjects = [
    {
      title: "Sea Turtle Conservation Program",
      description:
        "Join our effort to protect endangered sea turtle species. Activities include beach cleanup, nest protection, and hatchling release. Learn about marine conservation and turtle biology.",
      location: "Rekawa Beach, Sri Lanka",
      startDate: new Date("2025-09-01"),
      endDate: new Date("2025-12-31"),
      maxVolunteers: 20,
      pointsAwarded: 100,
      image: "turtle-conservation.jpg",
    },
    {
      title: "Rainforest Restoration Project",
      description:
        "Help restore degraded rainforest areas through tree planting, invasive species removal, and wildlife monitoring. Includes workshops on forest ecology.",
      location: "Sinharaja Forest Reserve, Sri Lanka",
      startDate: new Date("2025-10-15"),
      endDate: new Date("2026-03-31"),
      maxVolunteers: 30,
      pointsAwarded: 150,
      image: "rainforest-restoration.jpg",
    },
    {
      title: "Coral Reef Recovery Initiative",
      description:
        "Participate in coral reef rehabilitation through fragment cultivation and transplantation. Includes training in marine biology and underwater conservation techniques.",
      location: "Pigeon Island, Trincomalee",
      startDate: new Date("2025-11-01"),
      endDate: new Date("2026-02-28"),
      maxVolunteers: 15,
      pointsAwarded: 120,
      image: "coral-restoration.jpg",
    },
  ];

  // Insert data into database
  for (const accommodation of accommodations) {
    await prisma.accommodation.create({
      data: accommodation,
    });
  }

  for (const restaurant of restaurants) {
    await prisma.restaurant.create({
      data: restaurant,
    });
  }

  for (const project of conservationProjects) {
    await prisma.conservationProject.create({
      data: project,
    });
  }

  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
