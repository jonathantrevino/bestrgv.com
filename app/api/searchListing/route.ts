import { categoryTableMap } from "@/app/lib/constants";
import supabase from "@/app/lib/supabase";
import { Database, Json } from "@/database.types";
import { NextRequest, NextResponse } from "next/server";

const extractShopName = (slug: string): string => {
  // Split the slug by underscores
  let parts = slug.split('_');

  // List of common direction indicators
  const directionIndicators = ["n", "s", "e", "w", "us"];

  // List of street types
  const streetTypes = ["rd", "st", "ave", "blvd", "dr", "ln", "way", "plaza", "court", "cir", "crescent", "business"];

  // List of phrases to remove (like "Main Office")
  const removePhrases = ["main", "office"];

  // Remove direction indicators
  parts = parts.filter(part => !directionIndicators.includes(part.toLowerCase()));

  // Remove the last part if it's a street type
  if (streetTypes.includes(parts[parts.length - 1]?.toLowerCase())) {
    parts.pop(); // Remove street type

    // Also remove the previous part (assumed to be the street name)
    if (parts.length > 1) {
      parts.pop();
    }
  }

  // Remove common phrases like "main" and "office"
  parts = parts.filter(part => !removePhrases.includes(part.toLowerCase()));

  // Capitalize words and reassemble the shop name
  return parts
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' ');
}





const unSlug = (slug: string): string => {
  return slug
    .replace(/_/g, ' ')  // Replace underscores with spaces
    .replace(/-/g, ' ')  // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase())  // Capitalize the first letter of each word
    .trim();
};


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || null
  const city = searchParams.get('city') || null
  const slug = searchParams.get('slug') || null

  console.log('IN API -----', category, city, slug)

  if (!category || !city || !slug) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  try {


    const tableName = categoryTableMap[category] as keyof Database['public']['Tables'];



    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('slug', slug)
      .eq('city', unSlug(city))
      .eq('category', unSlug(category))

    const shopName = extractShopName(slug);

    console.log('The shop name: ', shopName)

    const { data: additionalLocations, error: additionalError } = await supabase
      .from(tableName)
      .select('name,address,city,category,rating,reviewCount,category,slug')
      .ilike('name', `%${shopName}%`)  // Fetch locations with the same shop name
      .neq('slug', slug);    // Exclude the current location

    console.log(additionalLocations?.length || 0)

    if (error) {
      console.error('Database error: ', error)
      return NextResponse.json(
        { error: 'Database query failed' }, { status: 500 }
      );

    }

    return NextResponse.json({
      listing: data[0],
      additionalListings: additionalLocations || null
    }
    );

  } catch (error) {
    console.error(error)
  }
}
