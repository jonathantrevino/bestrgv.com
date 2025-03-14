import { categoryTableMap, CITIES } from "@/app/lib/constants";
import supabase from "@/app/lib/supabase";
import { Database } from "@/database.types";
import { NextRequest, NextResponse } from "next/server";

// Utility function to capitalize each word
const capitalizeWords = (str: string) => {
  return str
    .split(' ') // Split the string by spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(' '); // Join the words back together
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const category = searchParams.get('category') || null;
  const city = searchParams.get('city') || null;
  const page = Number(searchParams.get('page')) || null;


  if (!category || !page) {
    return NextResponse.json(
      { error: 'No Category or page' }, { status: 500 }
    );

  }



  // use category name as table
  const tableName = category as keyof Database['public']['Tables'];
  const startRange = (page - 1) * 12;
  const endRange = page * 12 - 1;
  let query;
  if (page > 1) {
    query = supabase
      .from(tableName)
      .select('*', { count: 'exact' })
      .range(startRange, endRange)
      .limit(12)

  } else {
    query = supabase
      .from(tableName)
      .select('*', { count: 'exact' })
      .limit(12)
  }

  if (city) {
    console.log('in city')
    query = query.eq('city', city); // Example column 'city'
  }


  const { data, error, count } = await query
  if (error) {
    console.error('Database error: ', error)
    return NextResponse.json(
      { error: 'Database query failed' }, { status: 500 }
    );

  }
  const totalPages = count ? Math.ceil(count / 12) : 0
  console.log(count, totalPages)

  return NextResponse.json({
    listings: data,
    totalPages,
  }
  );

}
