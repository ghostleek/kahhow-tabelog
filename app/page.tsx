import { Search, Filter } from "lucide-react"
import Link from "next/link"
import { RestaurantCard } from "@/components/restaurant-card"
import { Hero } from "@/components/hero"
import { getRestaurants } from "@/lib/notion"

export default async function Home() {
  // Add error handling for the data fetching
  let restaurants = []

  try {
    // Fetch restaurants from Notion
    restaurants = await getRestaurants()
    restaurants = restaurants.filter(
      (r) => r.country === "Singapore"
    )
        const recommendationOrder = {
      "Highly recommend": 0,
      "Recommend": 1,
      "Do not recommend": 2,
    }
    restaurants.sort((a, b) => {
      return recommendationOrder[a.recommend] - recommendationOrder[b.recommend]
    })
    console.log("Successfully fetched restaurants:", restaurants.length)
    console.log("All countries:", restaurants.map((r) => `"${r.country}"`))
  } catch (error) {
    console.error("Failed to fetch restaurants:", error)
    // Provide fallback data if the fetch fails
    restaurants = [
      {
        id: "fallback-1",
        name: "Example Restaurant",
        tags: ["Example"],
        visitDate: "January 1, 2023",
        price: 15,
        address: "123 Example St, Singapore",
        comments: "This is a fallback example while we fix our database connection.",
        country: "Singapore",
        recommend: "Recommend",
      },
    ]
  }

  return (
    <main className="min-h-screen bg-white">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-900">Latest Reviews</h2>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search restaurants..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50">
              <Filter className="h-4 w-4 text-gray-700" />
            </button>
          </div>
        </div>


        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-6 md:mt-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No restaurants found. Please check your Notion connection.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="#"
            className="inline-block px-6 py-3 border border-gray-900 text-gray-900 font-medium text-sm rounded-full hover:bg-gray-900 hover:text-white transition-colors duration-200"
          >
            View All Reviews
          </Link>
        </div>
      </div>
    </main>
  )
}
