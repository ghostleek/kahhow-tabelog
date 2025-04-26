import { RestaurantCard } from "@/components/restaurant-card"
import { Hero } from "@/components/hero"
import { getRestaurants, Restaurant } from "@/lib/notion"

export default async function Home() {
  let restaurants: Restaurant[] = []

  try {
    restaurants = await getRestaurants()

    restaurants = restaurants.filter(
      (r) => r.country?.toLowerCase() === "singapore"
    )

    const recommendationOrder = {
      "Highly recommend": 0,
      "Recommend": 1,
      "Do not recommend": 2,
    }

    restaurants.sort((a, b) => {
      const aOrder = recommendationOrder[a.recommend] ?? 99
      const bOrder = recommendationOrder[b.recommend] ?? 99
      return aOrder - bOrder
    })

    console.log("Successfully fetched restaurants:", restaurants.length)
  } catch (error) {
    console.error("Failed to fetch restaurants:", error)
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
      </div>
    </main>
  )
}
