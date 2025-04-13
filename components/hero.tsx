import { Search } from "lucide-react"

export function Hero() {
  return (
    <div className="relative bg-[#6B4423] text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-2 md:mb-4">Kahhow's 食べログ</h1>
          <p className="text-base md:text-lg text-gray-200 mb-4 md:mb-6 max-w-2xl">
            Reviews of food places in Singapore I've paid for and recommend
          </p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or locations..."
              className="pl-10 pr-4 py-2 w-full rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
