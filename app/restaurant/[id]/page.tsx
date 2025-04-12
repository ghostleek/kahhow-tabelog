import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, DollarSign, ArrowLeft, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getRestaurantById } from "@/lib/notion"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

export default async function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = await getRestaurantById(params.id)

  if (!restaurant) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="relative h-[25vh] w-full bg-[#6B4423]">
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Link href="/" className="inline-flex items-center text-white mb-2 md:mb-4 hover:underline text-sm">
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to all reviews
            </Link>
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-2">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-white text-sm">
              <div className="flex items-center">
                <MapPin className="mr-1 h-3 w-3" />
                <span className="line-clamp-1">{restaurant.address}</span>
              </div>
              <span className="hidden sm:inline text-white/60">•</span>
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                <span>Visited: {restaurant.visitDate}</span>
              </div>
              <span className="hidden sm:inline text-white/60">•</span>
              <div className="flex items-center">
                <DollarSign className="mr-1 h-3 w-3" />
                <span>${restaurant.price}/pax</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex flex-wrap items-center gap-2">
                {restaurant.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
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

              <Button variant="outline" size="sm" className="gap-1 h-8 text-xs">
                <Share2 className="h-3 w-3" />
                Share
              </Button>
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="font-serif text-2xl font-medium text-gray-900 mb-4">Review</h2>
              {restaurant.fullReview ? <MDXRemote source={restaurant.fullReview} /> : <p>{restaurant.comments}</p>}
            </div>

            {restaurant.dishes && restaurant.dishes.length > 0 && (
              <div className="mb-12">
                <h2 className="font-serif text-2xl font-medium text-gray-900 mb-6">Dishes Tried</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {restaurant.dishes.map((dish) => (
                    <div key={dish.name} className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                      <div className="relative h-48 w-full">
                        <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">{dish.name}</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                            <span className="text-sm text-gray-700">{dish.rating}/5</span>
                          </div>
                          <span className="text-sm text-gray-700">${dish.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h2 className="font-serif text-xl font-medium text-gray-900 mb-4">Restaurant Info</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Address</h3>
                  <p className="text-gray-600">{restaurant.address}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Cuisine</h3>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Price Range</h3>
                  <p className="text-gray-600">${restaurant.price} per person</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Visited On</h3>
                  <p className="text-gray-600">{restaurant.visitDate}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Verdict</h3>
                  <p
                    className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                      restaurant.recommend === "Highly recommend"
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {restaurant.recommend}
                  </p>
                </div>

                <div className="pt-4">
                  <Button className="w-full">Get Directions</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
