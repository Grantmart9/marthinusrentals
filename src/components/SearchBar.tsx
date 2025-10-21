"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Custom Date Picker Component
function DatePicker({
  label,
  value,
  onChange,
  placeholder,
  minDate,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  minDate?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    onChange(date);
    setIsOpen(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return placeholder;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const currentDate = minDate ? new Date(minDate) : new Date(today);
    const days = [];

    // Add previous month days if needed
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const startDay = startDate.getDay();

    for (let i = 0; i < startDay; i++) {
      const prevDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        -startDay + i + 1
      );
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: true,
      });
    }

    // Add current month days
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate === date.toISOString().split("T")[0];

      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected,
        isDisabled: date < (minDate ? new Date(minDate) : today),
      });
    }

    return days;
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left bg-white"
      >
        <span className={selectedDate ? "text-gray-900" : "text-gray-500"}>
          {formatDate(selectedDate)}
        </span>
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          📅
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 w-72">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => {
                  const currentDate = selectedDate
                    ? new Date(selectedDate)
                    : new Date();
                  currentDate.setMonth(currentDate.getMonth() - 1);
                  setSelectedDate(currentDate.toISOString().split("T")[0]);
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                ←
              </button>
              <span className="font-medium">
                {new Date(selectedDate || new Date()).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              </span>
              <button
                type="button"
                onClick={() => {
                  const currentDate = selectedDate
                    ? new Date(selectedDate)
                    : new Date();
                  currentDate.setMonth(currentDate.getMonth() + 1);
                  setSelectedDate(currentDate.toISOString().split("T")[0]);
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((dayInfo, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    !dayInfo.isDisabled &&
                    handleDateSelect(dayInfo.date.toISOString().split("T")[0])
                  }
                  disabled={dayInfo.isDisabled}
                  className={`p-2 text-sm rounded-md ${
                    dayInfo.isSelected
                      ? "bg-blue-600 text-white"
                      : dayInfo.isToday
                      ? "bg-blue-100 text-blue-600"
                      : dayInfo.isDisabled
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {dayInfo.date.getDate()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}

export function SearchBar() {
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(searchData).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSearch}
      className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Where
          </label>
          <input
            type="text"
            placeholder="Search destinations"
            value={searchData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Check-in Date */}
        <DatePicker
          label="Check in"
          value={searchData.checkIn}
          onChange={(value) => handleInputChange("checkIn", value)}
          placeholder="Select date"
        />

        {/* Check-out Date */}
        <DatePicker
          label="Check out"
          value={searchData.checkOut}
          onChange={(value) => handleInputChange("checkOut", value)}
          placeholder="Select date"
          minDate={searchData.checkIn || new Date().toISOString().split("T")[0]}
        />

        {/* Guests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guests
          </label>
          <select
            value={searchData.guests}
            onChange={(e) => handleInputChange("guests", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num.toString()}>
                {num} {num === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          type="submit"
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
        >
          Search Properties
        </Button>
      </div>
    </motion.form>
  );
}
