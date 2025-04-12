"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function FilterBar() {
  const [activeLocation, setActiveLocation] = useState("all")
  const [activeCuisine, setActiveCuisine] = useState("all")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="space-y-2 w-full sm:w-auto">
          <h3 className="text-sm font-medium text-gray-700">Location</h3>
          <Tabs value={activeLocation} onValueChange={setActiveLocation} className="w-full">
            <TabsList className="grid grid-cols-4 h-8">
              <TabsTrigger value="all" className="text-xs px-2">
                All
              </TabsTrigger>
              <TabsTrigger value="sg" className="text-xs px-2">
                SG
              </TabsTrigger>
              <TabsTrigger value="london" className="text-xs px-2">
                London
              </TabsTrigger>
              <TabsTrigger value="tokyo" className="text-xs px-2">
                Tokyo
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-2 w-full sm:w-auto">
          <h3 className="text-sm font-medium text-gray-700">Cuisine</h3>
          <Tabs value={activeCuisine} onValueChange={setActiveCuisine} className="w-full">
            <TabsList className="grid grid-cols-5 h-8">
              <TabsTrigger value="all" className="text-xs px-1">
                All
              </TabsTrigger>
              <TabsTrigger value="thai" className="text-xs px-1">
                Thai
              </TabsTrigger>
              <TabsTrigger value="hawker" className="text-xs px-1">
                Hawker
              </TabsTrigger>
              <TabsTrigger value="vietnamese" className="text-xs px-1">
                Viet
              </TabsTrigger>
              <TabsTrigger value="indian" className="text-xs px-1">
                Indian
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="h-7 rounded-full text-xs px-3">
          Price: Any
        </Button>
        <Button variant="outline" size="sm" className="h-7 rounded-full text-xs px-3">
          Rating: Any
        </Button>
        <Button variant="outline" size="sm" className="h-7 rounded-full text-xs px-3">
          Date: Newest
        </Button>
      </div>
    </div>
  )
}
