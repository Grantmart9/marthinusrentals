"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getPropertyById, getAllProperties } from "@/data/properties";
import { Property, BookingFormData } from "@/types";
import { PropertyCard } from "@/components/PropertyCard";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Button } from "@/components/ui/button";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Booking form state
  const [bookingData, setBookingData] = useState<BookingFormData>({
    checkIn: "",
    checkOut: "",
    guests: 2,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  useEffect(() => {
    const loadProperty = async () => {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const propertyId = params.id as string;
      const foundProperty = getPropertyById(propertyId);

      if (foundProperty) {
        setProperty(foundProperty);

        // Get similar properties (excluding current property)
        const allProperties = getAllProperties();
        const similar = allProperties
          .filter((p) => p.id !== propertyId)
          .slice(0, 3);
        setSimilarProperties(similar);
      }

      setIsLoading(false);
    };

    if (params.id) {
      loadProperty();
    }
  }, [params.id]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the booking data to an API
    console.log("Booking data:", bookingData);
    alert("Booking functionality would be implemented here!");
  };

  const handleInputChange = (
    field: keyof BookingFormData,
    value: string | number
  ) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The property you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.push("/properties")}>
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Marthinus Rentals
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/properties"
                  className="text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Properties
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Contact
                </Link>
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Admin
                </Link>
              </div>
            </div>

            <MobileNavigation currentPath="/properties" />
          </div>
        </div>
      </nav>

      {/* Image Gallery */}
      <div className="relative h-96 md:h-[500px]">
        <Image
          src={property.images[selectedImageIndex].url}
          alt={property.images[selectedImageIndex].alt}
          fill
          className="object-cover"
        />

        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={() =>
                setSelectedImageIndex((prev) =>
                  prev === 0 ? property.images.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              ←
            </button>
            <button
              onClick={() =>
                setSelectedImageIndex((prev) =>
                  prev === property.images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              →
            </button>

            {/* Image Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === selectedImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <p className="text-gray-600">
                    {property.location.city}, {property.location.state},{" "}
                    {property.location.country}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-yellow-500 text-xl">⭐</span>
                    <span className="text-xl font-semibold">
                      {property.rating}
                    </span>
                    <span className="text-gray-600">
                      ({property.reviewCount} reviews)
                    </span>
                  </div>
                  {property.host.isSuperhost && (
                    <div className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded inline-block">
                      SUPERHOST
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex items-center space-x-6 text-gray-600 mb-6">
                <span>{property.capacity.guests} guests</span>
                <span>{property.capacity.bedrooms} bedrooms</span>
                <span>{property.capacity.beds} beds</span>
                <span>{property.capacity.bathrooms} bathrooms</span>
              </div>
            </motion.div>

            {/* Host Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg p-6 mb-6"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={property.host.avatar}
                  alt={property.host.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    Hosted by {property.host.name}
                  </h3>
                  <p className="text-gray-600">
                    Host since{" "}
                    {new Date(property.host.joinedDate).getFullYear()} •
                    {property.host.responseRate}% response rate • Responds{" "}
                    {property.host.responseTime}
                  </p>
                  <p className="text-gray-600">
                    Languages: {property.host.languages.join(", ")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg p-6 mb-6"
            >
              <h2 className="text-xl font-semibold mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg p-6 mb-6"
            >
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {getAmenityIcon(amenity.icon)}
                    </span>
                    <span className="text-gray-700">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Thumbnail Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold mb-4">Property Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-32 rounded-lg overflow-hidden ${
                      index === selectedImageIndex ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="sticky top-8"
            >
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold">
                      ${property.pricing.baseRate}
                    </span>
                    <span className="text-gray-600"> / night</span>
                  </div>
                </div>

                {!showBookingForm ? (
                  <Button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 mb-4"
                    size="lg"
                  >
                    Reserve
                  </Button>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Check-in
                        </label>
                        <input
                          type="date"
                          value={bookingData.checkIn}
                          onChange={(e) =>
                            handleInputChange("checkIn", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Check-out
                        </label>
                        <input
                          type="date"
                          value={bookingData.checkOut}
                          onChange={(e) =>
                            handleInputChange("checkOut", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Guests
                      </label>
                      <select
                        value={bookingData.guests}
                        onChange={(e) =>
                          handleInputChange("guests", parseInt(e.target.value))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {Array.from(
                          { length: property.capacity.guests },
                          (_, i) => i + 1
                        ).map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={bookingData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={bookingData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <input
                      type="email"
                      placeholder="Email"
                      value={bookingData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />

                    <input
                      type="tel"
                      placeholder="Phone"
                      value={bookingData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />

                    <textarea
                      placeholder="Special requests (optional)"
                      value={bookingData.specialRequests}
                      onChange={(e) =>
                        handleInputChange("specialRequests", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      Complete Booking
                    </Button>
                  </form>
                )}

                {/* Price Breakdown */}
                <div className="border-t pt-4 mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>${property.pricing.baseRate} × nights</span>
                    <span>${property.pricing.baseRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>${property.pricing.cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>${property.pricing.serviceFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>${property.pricing.taxes}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t">
                    <span>Total</span>
                    <span>
                      $
                      {property.pricing.baseRate +
                        property.pricing.cleaningFee +
                        property.pricing.serviceFee +
                        property.pricing.taxes}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((similarProperty) => (
                <PropertyCard
                  key={similarProperty.id}
                  property={similarProperty}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Helper function to get amenity icons
function getAmenityIcon(iconName: string): string {
  const iconMap: { [key: string]: string } = {
    wifi: "📶",
    kitchen: "🍳",
    washer: "👕",
    dryer: "💨",
    air_conditioning: "❄️",
    heating: "🔥",
    pool: "🏊",
    hot_tub: "♨️",
    gym: "💪",
    bbq: "🍖",
    fireplace: "🔥",
    tv: "📺",
    sound_system: "🔊",
    smoke_alarm: "🚨",
    carbon_monoxide_alarm: "⚠️",
    free_parking: "🅿️",
    beachfront: "🏖️",
    waterfront: "🌊",
    ski_in_out: "🎿",
    workspace: "💻",
  };

  return iconMap[iconName] || "✨";
}
