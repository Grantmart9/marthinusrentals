"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Property } from "@/types";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className = "" }: PropertyCardProps) {
  const primaryImage =
    property.images.find((img) => img.isPrimary) || property.images[0];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${className}`}
    >
      <div className="relative h-64">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-medium text-gray-900">
              {property.rating}
            </span>
          </div>
        </div>
        {property.host.isSuperhost && (
          <div className="absolute top-4 left-4">
            <div className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              SUPERHOST
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {property.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {property.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>
            {property.location.city}, {property.location.state}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{property.capacity.guests} guests</span>
            <span>{property.capacity.bedrooms} beds</span>
            <span>{property.capacity.bathrooms} baths</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {property.amenities.slice(0, 3).map((amenity) => (
              <div
                key={amenity.id}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                title={amenity.name}
              >
                <span className="text-xs">{getAmenityIcon(amenity.icon)}</span>
              </div>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-sm text-gray-500">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              R{property.pricing.baseRate.toLocaleString()}
            </span>
            <span className="text-gray-600 text-sm"> / night</span>
          </div>
          <Link href={`/properties/${property.id}`}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              View Details
            </Button>
          </Link>
        </div>

        <div className="mt-3 text-xs text-gray-500">
          <span>{property.reviewCount} reviews</span>
        </div>
      </div>
    </motion.div>
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
