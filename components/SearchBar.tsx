"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

// Simulate a list of restaurant names (later you can fetch dynamically!)
const restaurantNames = [
  "Kallang Claypot Lala",
  "Newton Food Centre",
  "Chili Crab House",
  "Katong Laksa",
  "Tiong Bahru Bakery",
  "Lau Pa Sat Satay",
];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setQuery("");
      setFilteredSuggestions([]); // Clear suggestions after search
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = restaurantNames.filter((name) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery("");
    setFilteredSuggestions([]);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="relative flex-grow md:w-64">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search restaurants..."
          value={query}
          onChange={handleChange}
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
      </form>

      {filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          {filteredSuggestions.map((suggestion, idx) => (
            <li
              key={idx}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
