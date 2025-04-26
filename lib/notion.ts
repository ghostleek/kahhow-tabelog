import { Client } from "@notionhq/client"
import { NotionAPI } from "notion-client";

// Initialize Notion client with error handling
let notion: Client
try {
  notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })
} catch (error) {
  console.error("Failed to initialize Notion client:", error)
  // Create a dummy client to prevent undefined errors
  notion = {} as Client
}

const databaseId = process.env.NOTION_DATABASE_ID
const blocks = await notion.blocks.children.list({ block_id: id });

const fullReview = blocks.results
  .map((block: any) => {
    if (block.type === "paragraph") {
      return block.paragraph.rich_text.map((t: any) => t.plain_text).join("");
    } else if (block.type === "image") {
      const file = block.image;
      const url =
        file.type === "external" ? file.external.url : file.file.url;
      return `<img src="${url}" alt="Image" style="margin-top:1rem; border-radius:0.5rem; max-width:100%"/>`;
    }
    return "";
  })
  .filter(Boolean)
  .join("\n\n");

export interface Restaurant {
  fullReview: any
  id: string
  name: string
  tags: string[]
  visitDate: string
  price: number
  address: string
  comments: string
  country: string
  recommend: string
  recordMap?: ExtendedRecordMap;
}

export async function getRestaurants(): Promise<Restaurant[]> {
  if (!databaseId) {
    console.error("NOTION_DATABASE_ID is not defined")
    return []
  }

  if (!process.env.NOTION_API_KEY) {
    console.error("NOTION_API_KEY is not defined")
    return []
  }

  try {
    // Query the database
    const response = await notion.databases.query({
      database_id: databaseId as string,
      sorts: [
        {
          property: "Visit Date",
          direction: "descending",
        },
      ],
    })

    // Process the results without using Promise.all to simplify
    const restaurants: Restaurant[] = []

    for (const page of response.results) {
      try {
        const properties = page.properties as any

        // Extract properties with safe fallbacks
        const name = properties?.Name?.title?.[0]?.plain_text || "Unnamed"
        const tags = properties?.Tags?.multi_select?.map((tag: any) => tag.name) || []
        const visitDateRaw = properties?.["Visit Date"]?.date?.start || ""
        const price = properties?.["Price/pax"]?.number || 0
        const address = properties?.Address?.rich_text?.[0]?.plain_text || ""
        const comments = properties?.Comments?.rich_text?.[0]?.plain_text || ""
        const country = properties?.Country?.select?.name || ""
        const recommend = properties?.["Recommend?"].select?.name || ""

        restaurants.push({
          id: page.id,
          name,
          tags,
          visitDate: formatDate(visitDateRaw),
          price,
          address,
          comments,
          country,
          recommend,
          recordMap,
        })
      } catch (pageError) {
        console.error("Error processing page:", pageError)
        // Continue with other pages even if one fails
      }
    }

    return restaurants
  } catch (error) {
    console.error("Error fetching restaurants from Notion:", error)
    return []
  }
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  if (!process.env.NOTION_API_KEY) {
    console.error("NOTION_API_KEY is not defined")
    return null
  }

  try {
    // Get the page
    const notionClient = new NotionAPI();
    const page = await notion.pages.retrieve({ page_id: id })
    const properties = page.properties as anyrecordMap
    const recordMap = await notionClient.getPage(id);

    // Extract basic properties with safe fallbacks
    const name = properties?.Name?.title?.[0]?.plain_text || "Unnamed"
    const tags = properties?.Tags?.multi_select?.map((tag: any) => tag.name) || []
    const visitDateRaw = properties?.["Visit Date"]?.date?.start || ""
    const price = properties?.["Price/pax"]?.number || 0
    const address = properties?.Address?.rich_text?.[0]?.plain_text || ""
    const comments = properties?.Comments?.rich_text?.[0]?.plain_text || ""
    const country = properties?.Country?.select?.name || ""
    const recommend = properties?.["Recommend?"]?.select?.name || ""

    return {
      id,
      name,
      tags,
      visitDate: formatDate(visitDateRaw),
      price,
      address,
      comments,
      country,
      recommend,
      fullReview,
    }
  } catch (error) {
    console.error("Error fetching restaurant from Notion:", error)
    return null
  }
}

// Helper function to format dates
function formatDate(dateString: string): string {
  if (!dateString) return ""

  try {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    }

    return date.toLocaleDateString("en-US", options)
  } catch (error) {
    console.error("Error formatting date:", error)
    return dateString // Return the original string if formatting fails
  }
}
