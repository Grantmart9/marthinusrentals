import { Property, Amenity, Availability } from "@/types";

// Sample amenities data
export const sampleAmenities: Amenity[] = [
  // Essentials
  { id: "wifi", name: "WiFi", icon: "wifi", category: "internet" },
  { id: "kitchen", name: "Kitchen", icon: "kitchen", category: "kitchen" },
  { id: "washer", name: "Washer", icon: "washer", category: "essentials" },
  { id: "dryer", name: "Dryer", icon: "dryer", category: "essentials" },
  {
    id: "air_conditioning",
    name: "Air conditioning",
    icon: "air_conditioning",
    category: "essentials",
  },
  { id: "heating", name: "Heating", icon: "heating", category: "essentials" },
  {
    id: "workspace",
    name: "Dedicated workspace",
    icon: "workspace",
    category: "essentials",
  },

  // Features
  { id: "pool", name: "Pool", icon: "pool", category: "features" },
  { id: "hot_tub", name: "Hot tub", icon: "hot_tub", category: "features" },
  { id: "gym", name: "Gym", icon: "gym", category: "features" },
  { id: "bbq", name: "BBQ grill", icon: "bbq", category: "features" },
  {
    id: "fireplace",
    name: "Fireplace",
    icon: "fireplace",
    category: "features",
  },

  // Location
  {
    id: "beachfront",
    name: "Beachfront",
    icon: "beachfront",
    category: "location",
  },
  {
    id: "waterfront",
    name: "Waterfront",
    icon: "waterfront",
    category: "location",
  },
  {
    id: "ski_in_out",
    name: "Ski-in/Ski-out",
    icon: "ski_in_out",
    category: "location",
  },

  // Safety
  {
    id: "smoke_alarm",
    name: "Smoke alarm",
    icon: "smoke_alarm",
    category: "safety",
  },
  {
    id: "carbon_monoxide_alarm",
    name: "Carbon monoxide alarm",
    icon: "carbon_monoxide_alarm",
    category: "safety",
  },
  {
    id: "first_aid_kit",
    name: "First aid kit",
    icon: "first_aid_kit",
    category: "safety",
  },

  // Entertainment
  { id: "tv", name: "TV", icon: "tv", category: "entertainment" },
  {
    id: "sound_system",
    name: "Sound system",
    icon: "sound_system",
    category: "entertainment",
  },
  {
    id: "game_console",
    name: "Game console",
    icon: "game_console",
    category: "entertainment",
  },

  // Parking
  {
    id: "free_parking",
    name: "Free parking",
    icon: "free_parking",
    category: "features",
  },
  {
    id: "ev_charger",
    name: "EV charger",
    icon: "ev_charger",
    category: "features",
  },

  // Accessibility
  {
    id: "wheelchair_accessible",
    name: "Wheelchair accessible",
    icon: "wheelchair_accessible",
    category: "accessibility",
  },
  {
    id: "elevator",
    name: "Elevator",
    icon: "elevator",
    category: "accessibility",
  },
];

// Generate availability data for the next 90 days
const generateAvailability = (
  basePrice: number,
  isAvailable: boolean = true
): Availability[] => {
  const availability: Availability[] = [];
  const today = new Date();

  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Make some dates unavailable (weekends are more expensive, some dates booked)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const randomUnavailable = Math.random() < 0.15; // 15% chance of being unavailable

    availability.push({
      date: date.toISOString().split("T")[0],
      available: isAvailable && !randomUnavailable,
      price: isWeekend ? basePrice * 1.2 : basePrice,
      minimumStay: isWeekend ? 2 : 1,
    });
  }

  return availability;
};

// Sample properties data
export const sampleProperties: Property[] = [
  {
    id: "beachfront-villa",
    title: "Luxury Beachfront Villa with Private Pool",
    description:
      "Experience paradise in this stunning beachfront villa featuring panoramic ocean views, a private infinity pool, and direct beach access. Perfect for families or couples seeking a luxurious coastal getaway.",
    location: {
      address: "123 Ocean Drive",
      city: "Malibu",
      state: "California",
      country: "United States",
      coordinates: {
        lat: 34.0259,
        lng: -118.7798,
      },
    },
    images: [
      {
        id: "beachfront-1",
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        alt: "Beachfront villa exterior with ocean view",
        isPrimary: true,
        caption: "Stunning oceanfront villa with private pool",
      },
      {
        id: "beachfront-2",
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        alt: "Living room with ocean view",
        isPrimary: false,
        caption: "Spacious living area with panoramic views",
      },
      {
        id: "beachfront-3",
        url: "https://images.unsplash.com/photo-1584132915807-fd0608e96355?w=800&h=600&fit=crop",
        alt: "Master bedroom",
        isPrimary: false,
        caption: "Luxurious master suite",
      },
      {
        id: "beachfront-4",
        url: "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&h=600&fit=crop",
        alt: "Private pool and patio",
        isPrimary: false,
        caption: "Private infinity pool overlooking the ocean",
      },
      {
        id: "beachfront-5",
        url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        alt: "Modern kitchen",
        isPrimary: false,
        caption: "Fully equipped modern kitchen",
      },
    ],
    amenities: sampleAmenities.filter((amenity) =>
      [
        "wifi",
        "kitchen",
        "washer",
        "dryer",
        "air_conditioning",
        "heating",
        "pool",
        "beachfront",
        "bbq",
        "tv",
        "sound_system",
        "smoke_alarm",
        "carbon_monoxide_alarm",
        "free_parking",
      ].includes(amenity.id)
    ),
    pricing: {
      baseRate: 8100,
      currency: "ZAR",
      cleaningFee: 2700,
      serviceFee: 810,
      taxes: 900,
      seasonalRates: [
        {
          startDate: "2024-06-01",
          endDate: "2024-08-31",
          rate: 9900,
          minimumStay: 3,
        },
        {
          startDate: "2024-12-20",
          endDate: "2025-01-05",
          rate: 10800,
          minimumStay: 4,
        },
      ],
      minimumStay: 2,
      maximumStay: 14,
    },
    capacity: {
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      beds: 4,
    },
    availability: generateAvailability(8100),
    rating: 4.9,
    reviewCount: 127,
    host: {
      id: "host-1",
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      isSuperhost: true,
      responseRate: 98,
      responseTime: "within an hour",
      joinedDate: "2019-03-15",
      languages: ["English", "Spanish"],
    },
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "mountain-cabin",
    title: "Cozy Mountain Cabin with Hot Tub",
    description:
      "Escape to this charming mountain cabin nestled in the pines. Features a private hot tub, stone fireplace, and breathtaking mountain views. Ideal for a romantic getaway or family retreat.",
    location: {
      address: "456 Pine Ridge Road",
      city: "Aspen",
      state: "Colorado",
      country: "United States",
      coordinates: {
        lat: 39.1911,
        lng: -106.8175,
      },
    },
    images: [
      {
        id: "cabin-1",
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        alt: "Mountain cabin exterior in winter",
        isPrimary: true,
        caption: "Rustic mountain cabin surrounded by pine trees",
      },
      {
        id: "cabin-2",
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        alt: "Cozy living room with fireplace",
        isPrimary: false,
        caption: "Warm and inviting living space with stone fireplace",
      },
      {
        id: "cabin-3",
        url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=800&h=600&fit=crop",
        alt: "Rustic bedroom",
        isPrimary: false,
        caption: "Comfortable bedroom with mountain views",
      },
      {
        id: "cabin-4",
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        alt: "Private hot tub",
        isPrimary: false,
        caption: "Private hot tub under the stars",
      },
      {
        id: "cabin-5",
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        alt: "Mountain views from deck",
        isPrimary: false,
        caption: "Spectacular mountain views from the deck",
      },
    ],
    amenities: sampleAmenities.filter((amenity) =>
      [
        "wifi",
        "kitchen",
        "washer",
        "dryer",
        "heating",
        "workspace",
        "hot_tub",
        "fireplace",
        "bbq",
        "tv",
        "smoke_alarm",
        "carbon_monoxide_alarm",
        "free_parking",
        "ski_in_out",
      ].includes(amenity.id)
    ),
    pricing: {
      baseRate: 5040,
      currency: "ZAR",
      cleaningFee: 1800,
      serviceFee: 504,
      taxes: 630,
      seasonalRates: [
        {
          startDate: "2024-12-01",
          endDate: "2025-03-31",
          rate: 6300,
          minimumStay: 2,
        },
        {
          startDate: "2024-07-01",
          endDate: "2024-08-31",
          rate: 5760,
          minimumStay: 2,
        },
      ],
      minimumStay: 2,
      maximumStay: 10,
    },
    capacity: {
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      beds: 3,
    },
    availability: generateAvailability(5040),
    rating: 4.8,
    reviewCount: 89,
    host: {
      id: "host-2",
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isSuperhost: true,
      responseRate: 95,
      responseTime: "within 2 hours",
      joinedDate: "2018-11-22",
      languages: ["English", "Mandarin"],
    },
    createdAt: "2023-02-20T10:00:00Z",
    updatedAt: "2024-02-20T10:00:00Z",
  },
];

// Helper function to get property by ID
export const getPropertyById = (id: string): Property | undefined => {
  return sampleProperties.find((property) => property.id === id);
};

// Helper function to get all properties
export const getAllProperties = (): Property[] => {
  return sampleProperties;
};

// Helper function to get featured properties (for homepage)
export const getFeaturedProperties = (): Property[] => {
  return sampleProperties.slice(0, 2);
};
