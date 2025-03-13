import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('address') || null

  if (!address) return NextResponse.json({ error: 'Missing address' }, { status: 400 })

  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address + ", USA")}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
  const geocodeResponse = await fetch(geocodeUrl);
  if (!geocodeResponse.ok) {
    console.error(`Error: ${geocodeResponse.status} - ${geocodeResponse.statusText}`);
    const errorText = await geocodeResponse.text();
    console.error(errorText);
    return;
  }
  const geocodeData = await geocodeResponse.json();

  const { lat, lng } = geocodeData.results[0].geometry.location;
  return NextResponse.json({ lon: lng, lat }, { status: 200 })

}
