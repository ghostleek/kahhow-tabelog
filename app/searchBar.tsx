import { getRestaurants } from "@/lib/notion";

interface SearchPageProps {
  searchParams: { q?: string }; // mark q as optional
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams.q || "").toLowerCase().trim();

  if (!query) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Please enter a search query.</h1>
      </main>
    );
  }

  const restaurants = await getRestaurants();

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(query)
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Results for: <span className="text-gray-600">{query}</span>
      </h1>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((restaurant) => (
            <div key={restaurant.id} className="border p-4 rounded-md">
              <h2 className="text-lg font-semibold">{restaurant.name}</h2>
              <p className="text-gray-500 text-sm">{restaurant.address}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No restaurants found.</p>
      )}
    </main>
  );
}
