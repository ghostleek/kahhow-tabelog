"use client";

import { useState } from "react";
import { RestaurantCard } from "@/components/restaurant-card";
import { Restaurant } from "@/lib/notion";
import { motion, AnimatePresence } from "framer-motion";

const filterOptions = [
  { label: "Hawker", tag: "Hawker" },
  { label: "Alcohol", tag: "🥂" },
  { label: "Dessert", tag: "Dessert" },
];

export function HomeClient({ restaurants }: { restaurants: Restaurant[] }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilter = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "filter_click", {
        event_category: "Filter",
        event_label: filter,
      });
    }
  };

  const clearFilters = () => {
    setActiveFilter(null);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "filter_click", {
        event_category: "Filter",
        event_label: "Clear Filters",
      });
    }
  };

  // ✨ BASE FILTERS
  const baseFilteredRestaurants = restaurants
    .filter((r) => r.country?.toLowerCase() === "singapore")
    .filter((r) => r.recommend !== "Do not recommend");

  // ✨ APPLY DYNAMIC FILTER (Hawker, Alcohol, Dessert)
  const dynamicallyFilteredRestaurants = baseFilteredRestaurants.filter((r) => {
    if (!activeFilter) return true;

    const activeTag = filterOptions.find((opt) => opt.label === activeFilter)?.tag;
    return activeTag ? r.tags.includes(activeTag) : true;
  });

  // ✨ SORT AFTER FILTERING
  const recommendationOrder = {
    "Highly recommend": 0,
    "Recommend": 1,
    "Do not recommend": 2,
  };

  dynamicallyFilteredRestaurants.sort((a, b) => {
    const aOrder = recommendationOrder[a.recommend] ?? 99;
    const bOrder = recommendationOrder[b.recommend] ?? 99;
    return aOrder - bOrder;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap gap-2 mb-8 items-center">
        {filterOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => handleFilter(option.label)}
            className={`px-4 py-2 rounded-full text-sm ${
              activeFilter === option.label
                ? "bg-gray-900 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {option.label}
          </button>
        ))}

        <AnimatePresence>
          {activeFilter && (
            <motion.button
              onClick={clearFilters}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-gray-600 underline hover:text-gray-800 ml-4"
            >
              Clear Filters
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {dynamicallyFilteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {dynamicallyFilteredRestaurants.map((restaurant) => (
            <motion.div
                key={restaurant.slug}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
            >
                <RestaurantCard restaurant={restaurant} />
            </motion.div>
            ))}
        </div>
        ) : (
        <div className="text-center py-12">
            <p className="text-gray-500">No restaurants found. Try another filter!</p>
        </div>
        )}

    </div>
  );
}
