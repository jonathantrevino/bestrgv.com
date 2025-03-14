import supabase from "@/app/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const tables = ["coffee_shops"];
  let allListings: any[] = [];

  for (const table of tables) {
    const { data, error } = await supabase.from(table as "coffee_shops").select("slug, category, city");
    if (error) {
      console.error(`Error fetching ${table}:`, error);
      continue;
    }
    if (data) {
      const formattedData = data.map((item) => ({
        category: item.category,
        city: item.city,
        slug: item.slug,
      }));
      allListings = allListings.concat(formattedData);
    }
  }

  return NextResponse.json({ allListings }, { status: 200 });

}
