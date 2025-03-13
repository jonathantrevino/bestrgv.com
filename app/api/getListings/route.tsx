import { categoryTableMap } from "@/app/lib/constants";
import supabase from "@/app/lib/supabase";
import { Database } from "@/database.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const category = searchParams.get('category') || null;
  const city = searchParams.get('city') || null;
  console.log(searchParams)


  // if category not specified, use a combination of tables?
  if (!category) {
    return NextResponse.json(
      { error: 'No Category' }, { status: 500 }
    );

  }
  // use category name as table
  else {
    const tableName = category as keyof Database['public']['Tables'];

    let query = supabase
      .from(tableName)
      .select('*', { count: 'exact' })
      .limit(12)

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

    return NextResponse.json({
      listings: data,
      totalPages,
    }
    );
  }

}
