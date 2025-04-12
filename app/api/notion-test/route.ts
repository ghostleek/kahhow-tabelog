import { NextResponse } from "next/server"
import { getRestaurants } from "@/lib/notion"

export async function GET() {
  try {
    // Log environment variables (without revealing full values)
    console.log("API_KEY exists:", !!process.env.NOTION_API_KEY)
    console.log("DATABASE_ID exists:", !!process.env.NOTION_DATABASE_ID)

    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing environment variables",
          apiKeyExists: !!process.env.NOTION_API_KEY,
          databaseIdExists: !!process.env.NOTION_DATABASE_ID,
        },
        { status: 500 },
      )
    }

    // Fetch restaurants from Notion
    const restaurants = await getRestaurants()

    // Return just the first 3 for testing
    return NextResponse.json({
      success: true,
      count: restaurants.length,
      restaurants: restaurants.slice(0, 3),
    })
  } catch (error) {
    console.error("Error in Notion test API:", error)
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
        stack: (error as Error).stack,
      },
      { status: 500 },
    )
  }
}
