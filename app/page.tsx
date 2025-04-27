import { Hero } from "@/components/hero";
import { getRestaurants } from "@/lib/notion";
import { HomeClient } from "@/components/home-client";

export const revalidate = 60;

export default async function HomePage() {
  const restaurants = await getRestaurants();

  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <HomeClient restaurants={restaurants} />
    </main>
  );
}
