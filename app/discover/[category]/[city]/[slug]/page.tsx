import Footer from '@/app/components/Footer'
import Nav from '@/app/components/Nav'
import { fetchListing } from '@/app/data/listing';
import { BASE_URL } from '@/app/sitemap';
import { Ban, Check, ChevronRight, Flag, Navigation, Pin, Share, Star } from 'lucide-react';
import { slugify, unslugify } from '@/app/lib';
import { GetServerSideProps, Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { cache } from 'react'
import LocationMap from '@/app/components/LocationMap';

const getListing = cache(fetchListing);

interface Listing {
  category: string;
  city: string;
  slug: string;
}

interface ListingProps {
  params: Promise<{
    category: string;
    city: string;
    slug: string;
  }>
}

export async function generateStaticParams() {
  const response = await fetch(`${BASE_URL}/api/getAllListings`);
  const { allListings }: { allListings: Listing[] } = await response.json();
  return allListings.map((listing) => (
    {
      params: { slug: listing.slug, category: listing.category, city: listing.city }
    }
  ))

}

export async function generateMetadata({ params }: ListingProps): Promise<Metadata> {
  const { category, city, slug } = await params

  const { listing: results, additionalListings: additionalResults } = await getListing(category, city, slug)

  // get 3 features from middle
  let features = JSON.parse(results.features)

  if (features.length > 3) {

    const midIndex = Math.floor(features.length / 3) - Math.floor(3 / 2);
    features = features.slice(midIndex, midIndex + 3);

  }

  console.log(features)
  return {
    title: `${unslugify(slug)} - Best ${unslugify(category)} in ${unslugify(city)} | BestRGV`,
    description: `Looking for the best ${unslugify(category)} in ${unslugify(city)}? Visit ${unslugify(slug)} for ${results.features} Located at [Address], it's a must-visit spot for locals and visitors alike!`
  }

}


// Function to display the star rating (rounded to the nearest whole number)
const displayStarRating = (rating: number) => {
  // Round the rating to the nearest whole number and return an array of filled stars
  const roundedRating = Math.round(rating);
  return Array(roundedRating).fill(1); // Return an array with filled stars (1 for each)
};

function extractStreetName(address: string): string {
  // Check if it's the specific exception street
  if (address.includes("U.S. Business 83")) {
    return address.split(',')[0].trim();  // Return the street part before the comma (i.e., the full address minus city/state)
  }

  // Regular expression to match the street address while removing the number and keeping directions
  const regex = /^[0-9]+\s([A-Za-z0-9\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Place|Pl|Court|Ct|Terrace|Ter|Square|Sq|Circle|Cir)?)/;
  // Match the address with the regex
  const match = address.match(regex);

  console.log(match)

  // If match is found, return the street name part (second group from the match)
  return match ? match[1].trim() : '';
}

const parseOpenHours = (openHours: string) => {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const openHoursObj: { [key: string]: string } = {};

  // Replace non-breaking spaces and trim the input
  openHours = openHours.replace(/\u00A0/g, ' ').trim(); // Replace non-breaking spaces (U+00A0)
  openHours = openHours.replace(/\.? Hide open hours for the week$/, '').trim();


  // Split the input data by semicolons to get each day's open hours entry
  const days = openHours.split(";");

  console.log(openHours)


  // Process each day's entry
  days.forEach(day => {
    // Trim whitespace and ensure no extra characters are left
    const trimmedDay = day.trim();

    // Skip entries that are "Closed"
    if (trimmedDay.toLowerCase().includes("closed")) {
      return;
    }

    // Use regex to extract the day and the hours
    const match = trimmedDay.match(/^(\w+),\s*(.*)$/);

    if (match) {
      const dayName = match[1].trim();  // e.g. "Monday"
      const hours = match[2].trim();    // e.g. "5 AM to 8 PM"

      // Check if the day is valid and map the result, excluding "Closed" or similar values
      if (weekDays.includes(dayName) && hours.trim() !== "") {
        openHoursObj[dayName] = hours.trim();
      } else {
        console.log(`Skipping day: ${dayName} with hours: ${hours}`);
      }
    } else {
      console.log(`No match for entry: "${trimmedDay}"`);
    }
  });

  return openHoursObj;
};


function parseTime(timeStr: string) {
  console.log(`Parsing time: "${timeStr}"`);

  // Replace all types of spaces (regular and non-breaking) with a standard space
  timeStr = timeStr.replace(/\s+/g, ' ').trim();

  console.log(`After normalizing spaces: "${timeStr}"`);

  // Split by space to extract the hour and period (AM/PM)
  const parts = timeStr.split(' ');

  console.log(`Split parts:`, parts);

  if (parts.length < 2) {
    console.error(`Invalid time format: "${timeStr}"`);
    return NaN;
  }

  let [time, period] = parts;
  let [hoursStr, minutesStr] = time.split(':'); // Split to extract hours and minutes if present
  let hours = Number(hoursStr);

  // Handle minutes, default to 0 if no minutes are provided
  let minutes = minutesStr ? Number(minutesStr) : 0;

  console.log(`Hours extracted: ${hours}, Minutes extracted: ${minutes}, Period extracted: ${period}`);

  // Handle AM/PM conversion
  if (period === 'PM' && hours !== 12) {
    hours += 12; // PM, but not 12 PM
  }
  if (period === 'AM' && hours === 12) {
    hours = 0; // 12 AM should be 0 hours
  }

  console.log(`Final hours: ${hours}, Final minutes: ${minutes}`);

  // Return the timestamp
  const timestamp = new Date().setHours(hours, minutes, 0, 0);
  console.log(`Generated timestamp: ${timestamp}`);

  return timestamp;
}



// Function to format time in 12-hour format with AM/PM
function formatTimeTo12Hour(hour: number, minute: number) {
  let period = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12; // Adjust for midnight and noon
  const formattedMinute = minute < 10 ? `0${minute}` : minute;
  return `${hour}:${formattedMinute} ${period}`;
}


// Function to check if the business is open or closed
function checkBusinessHours(openHours: any) {
  const today = new Date();
  const currentDay = today.toLocaleString('en-us', { weekday: 'long' });
  const currentTime = today.getTime();


  console.log(currentDay, currentTime)
  const hours = openHours[currentDay];
  if (!hours) {
    console.log('No hours available for today.');
    return { status: 'Closed', nearest: null };
  }

  const [openTimeStr, closeTimeStr] = hours.split(' to ');
  const openTime = parseTime(openTimeStr);
  const closeTime = parseTime(closeTimeStr);


  console.log(currentTime)
  console.log(openTime, closeTime)
  // Check if the business is open
  if (
    openTime <= currentTime && currentTime < closeTime

  ) {
    // Business is open, tell the nearest closing time
    const closingTime = new Date(closeTime);
    const closingHour = closingTime.getHours();
    const closingMinute = closingTime.getMinutes();
    const closingFormattedTime = formatTimeTo12Hour(closingHour, closingMinute);
    console.log(`The business is open. It will close at ${closingFormattedTime}.`);
    return { status: 'Open', nearest: closingFormattedTime }
  } else {
    // Business is closed, tell the nearest opening time
    const openingTime = new Date(openTime);
    const openingHour = openingTime.getHours();
    const openingMinute = openingTime.getMinutes();
    const openingFormattedTime = formatTimeTo12Hour(openingHour, openingMinute);
    return { status: 'Closed', nearest: openingFormattedTime }
  }
}


const page = async ({ params }: ListingProps) => {
  const { category, city, slug } = await params
  const { listing: results, additionalListings: additionalResults } = await getListing(category, city, slug)

  const currentTime = new Date();
  const hours = currentTime.getHours(); // 0-23 (24-hour format)
  const minutes = currentTime.getMinutes(); // 0-59

  console.log(`Current time: ${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`);

  // Cleaning Listing Data
  const rating = Math.round(results.rating) || 0;
  const starClasses = displayStarRating(rating);
  const streetName = extractStreetName(results.address)
  const openHours = parseOpenHours(results.openTime)


  const { status, nearest } = checkBusinessHours(openHours)


  return (
    <div>
      <Nav />
      <main className='pt-8 pb-32'>
        <section>
          <div className='w-full min-h-[800px] xs:min-h-[603px] md:min-h-[500px]  lg:min-h-[473px] xl:min-h-[403px] relative overflow-hidden'>
            <div className='absolute top-0 z-10 py-6 px-5 sm:px-10 flex md:flex-row flex-col gap-5'>
              <div className='max-w-[300] max-h-[300px] w-full h-full  aspect-square bg-less-important opacity-30 rounded-md shrink-0'></div>
              <div className=''>
                <h1 className='text-white font-nunito text-[18px] sm:text-[28px] lg:text-[43px] font-bold sm:font-medium'>{results.name} - {streetName}</h1>
                <span className=''>
                  {/* Display the stars */}
                  <div className='flex gap-1 mt-3'>
                    <span className='flex gap items-center'>
                      {starClasses.map((_, index) => (
                        <Star key={index} stroke='#E65C00' fill='#E65C00' />
                      ))}
                    </span>
                    <p className='text-white font-nunito !text-lg font-medium flex gap-1'>
                      {results.rating}
                      <span className='text-less-important'>/ 5</span>
                    </p>
                  </div>
                </span>
                <p className='text-white !text-sm leading-6 pt-3'>{results.description}</p>
                <div className='flex gap-2 text-white  font-semibold items-center pt-3'>
                  <div className='relative'>
                    <div className={`w-[10px] h-[10px] animate-ping rounded-full ${status === 'Open' ? 'bg-success' : 'bg-fail'}`}></div>
                    <div className={`absolute top-0 w-[10px] h-[10px] rounded-full ${status === 'Open' ? 'bg-success' : 'bg-fail'}`}></div>
                  </div>
                  <p className='!text-sm'>{status}</p>
                  {nearest ?
                    <>
                      &bull;
                      <p className='!text-sm'>{status === 'Closed' ? 'Opens' : 'Closes'} {nearest}</p>
                    </>
                    :
                    <>
                      &bull;
                      <p className='!text-sm'>Times not available</p>
                    </>
                  }
                </div>
              </div>
            </div>
            <Image quality={100} className='object-cover' src={results.image} fill alt={`${results.name} - ${category} in ${city}`} />
            <div className='absolute top-0 left-0 h-full w-full bg-[#323131] opacity-95'></div>
          </div>
        </section>
        <div className='px-5 sm:px-10 flex gap-5 lg:flex-row flex-col-reverse'>
          <div className='w-full space-y-6'>
            <section className='w-full h-fit border border-stroke p-6 relative lg:-top-8 bg-white space-y-5'>
              <h2 className='font-nunito font-medium text-[24px]'>
                Find {results.name}
              </h2>
              <div className='flex gap-6 items-start xl:flex-row flex-col'>
                <LocationMap address={results.address} />
                <div className='flex gap-2 items-start flex-[1] w-full'>
                  <span className=''><Navigation size={18} /></span>
                  <div className='space-y-4 w-full flex-auto'>
                    <div>
                      <h3 className='font-nunito text-[18px] relative bottom-1'>{results.address}</h3>
                      <Link href='' className='flex gap-2 items-center text-primary font-nunito font-medium w-fit'>Get Directions <span className='text-less-important'><ChevronRight size={16} /></span></Link>
                    </div>
                    {additionalResults.length > 0 &&
                      <div className='space-y-3'>
                        <h3 className='font-nunito text-[18px] relative font-medium'>Other Locations:</h3>
                        <div className='w-full space-y-3'>

                          {additionalResults.map((result: any, index: number) =>
                            <div className='' key={index}>
                              <h4>{result.name} - {result.category}</h4>
                              <p className='!text-sm text-body'>{result.address}</p>
                              <div className='flex justify-between gap-3 flex-wrap'>
                                <div className='flex gap-1'>
                                  <span className='flex gap items-center'>
                                    {displayStarRating(Math.round(result.rating)).map((_, index) =>
                                      <Star key={index} stroke='#E65C00' fill='#E65C00' size={16} />
                                    )}
                                  </span>
                                  <p className='font-nunito !text-sm font-medium flex gap-1'>
                                    {result.rating}
                                    <span className='text-less-important'>/ 5</span>
                                  </p>
                                </div>
                                <Link href={`${BASE_URL}/discover/${slugify(result.category)}/${slugify(result.city)}/${result.slug}`} className='text-primary flex gap-2 items-center font-nunito font-medium'>View More <ChevronRight className='text-less-important' size={16} /></Link>
                              </div>

                            </div>
                          )}
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </section>
            <section className='w-full h-fit border border-stroke p-6 relative lg:-top-8 bg-white space-y-5'>
              <h2 className='font-nunito font-medium text-[24px]'>
                Features for {results.name}
              </h2>
              <div className='flex flex-wrap gap-2'>
                {JSON.parse(results.features).map((feature: string, index: number) =>
                  <div key={index} className={`p-2 bg-less-stroke flex gap-2 items-center md:text-base text-xs sm:text-sm`}>{feature.includes('Available') ? <Check className='text-success' size={18} /> : <Ban className='text-fail' size={18} />}{feature.replace(/^(Available|Not available) - /, '')}</div>
                )}
              </div>
            </section>
          </div>
          <aside className='mt-5 lg:max-w-[255px] w-full space-y-8'>
            <div className='space-y-3'>
              <button className='rounded-md w-full justify-center flex gap-3 text-[color:#8A3700] border border-[color:#8A3700] py-2 px-4'><Share /> Share this listing</button>
              <button className='rounded-md w-full justify-center flex gap-3 text-body border border-body py-2 px-4'><Flag /> Report listing</button>
            </div>
            <div className='space-y-8 lg:flex-col flex-row-reverse justify-end flex gap-8 flex-wrap gap-y-0'>
              {results.website &&
                <div className='space-y-6'>
                  <h4 className='font-nunito font-medium text-lg'>Contact Information</h4>
                  <ul>
                    {results.website &&
                      <li><a rel='nofollow' href={results.website.startsWith('http') ? results.website : `https://${results.website}`} className='flex gap-2 items-center'><Image className='pt-2' width={35} height={35} src={`/website-icon.svg`} alt='website icon badge' /> {results.website}</a></li>
                    }
                  </ul>
                </div>
              }
              {results.openTime &&
                <div className='space-y-6'>
                  <h4 className='font-nunito font-medium text-lg'>Company Hours</h4>
                  <ul>
                    {Object.entries(openHours).map(([day, hours]) => (
                      <li key={day} className='text-body text-lg'>
                        <span className='font-nunito font-medium'>{day}</span> - {hours}
                      </li>
                    ))}
                  </ul>
                </div>
              }
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default page
