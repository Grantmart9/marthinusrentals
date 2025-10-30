"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { MobileNavigation } from "@/components/MobileNavigation";
import { getAllProperties } from "@/data/properties";
import { Property, PropertyFilters } from "@/types";
import { Button } from "@/components/ui/button";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "newest">("rating");
  const [showFilters, setShowFilters] = useState(false);

  // Initialize properties
  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      const allProperties = getAllProperties();
      setProperties(allProperties);
      setFilteredProperties(allProperties);
      setIsLoading(false);
    };

    loadProperties();
  }, []);

  // Filter properties based on search params
  useEffect(() => {
    const filters: PropertyFilters = {};

    const location = searchParams.get("location");
    const guests = searchParams.get("guests");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    if (location) filters.location = location;
    if (guests) filters.guests = parseInt(guests);
    if (checkIn) filters.checkIn = checkIn;
    if (checkOut) filters.checkOut = checkOut;

    let filtered = [...properties];

    // Apply location filter
    if (filters.location) {
      const searchTerm = filters.location.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.location.city.toLowerCase().includes(searchTerm) ||
          property.location.state.toLowerCase().includes(searchTerm) ||
          property.location.country.toLowerCase().includes(searchTerm) ||
          property.title.toLowerCase().includes(searchTerm)
      );
    }

    // Apply guest capacity filter
    if (filters.guests) {
      filtered = filtered.filter(
        (property) => property.capacity.guests >= filters.guests!
      );
    }

    setFilteredProperties(filtered);
  }, [searchParams, properties]);

  // Sort properties
  const sortedProperties = useMemo(() => {
    const sorted = [...filteredProperties];

    switch (sortBy) {
      case "price":
        return sorted.sort((a, b) => a.pricing.baseRate - b.pricing.baseRate);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "newest":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return sorted;
    }
  }, [filteredProperties, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isLoading
              ? "Loading properties..."
              : `${sortedProperties.length} properties found`}
          </h2>
          {searchParams.get("location") && (
            <p className="text-gray-600">
              Showing results for &quot;{searchParams.get("location")}&quot;
            </p>
          )}
        </div>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <span>Filters</span>
            <span>🔧</span>
          </Button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="rating">Sort by Rating</option>
            <option value="price">Sort by Price</option>
            <option value="newest">Sort by Newest</option>
          </select>
        </div>
      </motion.div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Any Price</option>
                <option>$0 - $100</option>
                <option>$100 - $250</option>
                <option>$250 - $500</option>
                <option>$500+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Any Type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Cabin</option>
                <option>Villa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Any Amenities</option>
                <option>Pool</option>
                <option>WiFi</option>
                <option>Pet Friendly</option>
                <option>Gym</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
            >
              <div className="h-64 bg-gray-300"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Properties Grid */}
      {!isLoading && (
        <>
          {sortedProperties.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {sortedProperties.map((property) => (
                <motion.div key={property.id} variants={itemVariants}>
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No properties found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all available
                properties.
              </p>
              <Button
                onClick={() => (window.location.href = "/properties")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                View All Properties
              </Button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

export default function PropertiesPage() {
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

      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover amazing properties for your next adventure
            </p>
          </motion.div>

          <SearchBar />
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <PropertiesContent />
      </Suspense>
    </div>
  );
}
