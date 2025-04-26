import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export interface Restaurant {
  id: string;
  name: string;
  tags: string[];
  visitDate: string;
  price: number;
  address: string;
  comments: string;
  country: string;
  recommend: string;
  recordMap?: ExtendedRecordMap; // only in getRestaurantById
}

export async function getRestaurants(): Promise<Restaurant[]> {
  if (!databaseId || !process.env.NOTION_API_KEY) {
    console.error("Missing Notion credentials");
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Visit Date",
          direction: "descending",
        },
      ],
    });

    const restaurants: Restaurant[] = [];

    for (const page of response.results) {
      try {
        const properties = page.properties as any;

        const name = properties?.Name?.title?.[0]?.plain_text || "Unnamed";
        const tags = properties?.Tags?.multi_select?.map((tag: any) => tag.name) || [];
        const visitDateRaw = properties?.["Visit Date"]?.date?.start || "";
        const price = properties?.["Price/pax"]?.number || 0;
        const address = properties?.Address?.rich_text?.[0]?.plain_text || "";
        const comments = properties?.Comments?.rich_text?.[0]?.plain_text || "";
        const country = properties?.Country?.select?.name || "";
        const recommend = properties?.["Recommend?"]?.select?.name || "";

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
        });
      } catch (error) {
        console.error("Error processing page:", error);
      }
    }

    return restaurants;
  } catch (error) {
    console.error("Error fetching restaurants from Notion:", error);
    return [];
  }
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    const properties = (page as any).properties;
    const notionClient = new NotionAPI();
    const recordMap = await notionClient.getPage(id);

    const name = properties?.Name?.title?.[0]?.plain_text || "Unnamed";
    const tags = properties?.Tags?.multi_select?.map((tag: any) => tag.name) || [];
    const visitDateRaw = properties?.["Visit Date"]?.date?.start || "";
    const price = properties?.["Price/pax"]?.number || 0;
    const address = properties?.Address?.rich_text?.[0]?.plain_text || "";
    const comments = properties?.Comments?.rich_text?.[0]?.plain_text || "";
    const country = properties?.Country?.select?.name || "";
    const recommend = properties?.["Recommend?"]?.select?.name || "";

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
      recordMap,
    };
  } catch (error) {
    console.error("Error fetching restaurant from Notion:", error);
    return null;
  }
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}
