import { RestaurantCard } from "@/components/restaurant-card";
import { Hero } from "@/components/hero";
import { getRestaurants, Restaurant } from "@/lib/notion";
import { HomeClient } from "@/components/home-client"; // 👈 import client part here

export const revalidate = 60; // ✅ server-only ok

export default async function HomePage() {
  const restaurants = await getRestaurants();

  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <HomeClient restaurants={restaurants} />
    </main>
  );
}
