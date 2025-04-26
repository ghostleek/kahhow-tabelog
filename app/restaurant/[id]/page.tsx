import NotionRendererWrapper from "@/components/NotionRendererWrapper";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRestaurantById } from "@/lib/notion";
import { notFound } from "next/navigation";
import { ShareButton } from "@/components/ShareButton";


const flagEmojiToCountry: Record<string, string> = {
  "🇨🇳": "Chinese",
  "🇮🇳": "Indian",
  "🇯🇵": "Japanese",
  "🇰🇷": "Korean",
  "🇮🇹": "Italian",
  "🇻🇳": "Vietnamese",
  "🇹🇭": "Thai",
  // Add more if needed
};

export default async function RestaurantPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const restaurant = await getRestaurantById(id);

  if (!restaurant) {
    notFound();
  }


  return (
    <main className="min-h-screen bg-white">
      <div className="relative h-[25vh] w-full bg-[#6B4423]">
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-white mb-2 md:mb-4 hover:underline text-sm"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              All reviews
            </Link>

            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-2">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              {restaurant.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
                >
                  {tag}
                </span>
              ))}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  restaurant.recommend === "Highly recommend"
                    ? "bg-green-50 text-green-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {restaurant.recommend}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-white text-sm"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">

        <div className="lg:w-2/3">
          <div className="flex items-center justify-between mb-4 md:mb-6">
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="font-serif text-2xl font-medium text-gray-900 mb-4">
              Review
            </h2>
              <p>{restaurant.comments}</p>
              {restaurant.recordMap ? (
                <NotionRendererWrapper recordMap={restaurant.recordMap} />
              ) : restaurant.comments ? (
                <p className="text-gray-700">{restaurant.comments}</p>
              ) : (
                <p className="text-gray-400 italic">No review available yet.</p>
              )}
          </div>
          
          <ShareButton
            title={restaurant.name}
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/restaurant/${params.id}`}
          />
        </div>


          <div className="lg:w-1/3">
            <div className="sticky top-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h2 className="font-serif text-xl font-medium text-gray-900 mb-4">
                Info
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">{restaurant.address}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.tags.map((tag) => {
                      const displayText = flagEmojiToCountry[tag] || tag;
                      return (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800"
                        >
                          {displayText}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </h3>
                  <p className="text-gray-600">
                    ${restaurant.price} per person
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Visited On
                  </h3>
                  <p className="text-gray-600">{restaurant.visitDate}</p>
                </div>
                <div className="pt-4 space-y-2">
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      restaurant.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full">Open Google Maps</Button>
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex items-center text-black hover:underline text-sm"
                  >
                    <ArrowLeft className="mr-1 h-3 w-3 text-black" />
                    All reviews
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
