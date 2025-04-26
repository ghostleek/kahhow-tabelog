import Link from "next/link"
import { MapPin, Calendar, DollarSign, ThumbsUp } from "lucide-react"

interface Restaurant {
  id: string
  name: string
  tags: string[]
  visitDate: string
  price: number
  address: string
  comments: string
  country: string
  recommend: string
  image: string
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`} className="group">
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md p-4 h-[220px] flex flex-col">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-serif text-lg font-medium text-gray-900 line-clamp-1 group-hover:text-gray-700">
            {restaurant.name}
          </h3>
          <VerdictIcon recommendation={restaurant.recommend} />
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          {restaurant.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-3 flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-3 w-3" />
          <span className="line-clamp-1">{restaurant.address}</span>
        </div>

        <div className="mb-4 flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            <span>{restaurant.visitDate}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-1 h-3 w-3" />
            <span>{restaurant.price}/pax</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mt-auto">{restaurant.comments}</p>
      </div>
    </Link>
  )
}

function VerdictIcon({ recommendation }: { recommendation: string }) {
  const isHigh = recommendation === "Highly recommend"

  const className = `inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium border ${
    isHigh
      ? "bg-green-50 text-green-700 border-green-200"
      : recommendation === "Recommend"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-gray-50 text-gray-700 border-gray-200"
  }`

  return (
    <span className={className}>
      <ThumbsUp className="h-4 w-4" />
      {isHigh && <ThumbsUp className="h-4 w-4" />}
    </span>
  )
}
