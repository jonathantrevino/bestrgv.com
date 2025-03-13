import React, { cache } from 'react'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import ListingPreview from '@/app/components/listing/ListingPreview'
import Filters from '@/app/components/Filters'
import { fetchListings } from '@/app/data/listing'
import { slugToUnderscore, unslugify } from '@/app/lib'
import { unstable_cacheLife } from 'next/cache'

const getListing = cache(fetchListings);


interface CategoryProps {
  params: {
    category: string;
    city: string;
  }
}

const page = async ({ params }: CategoryProps) => {
  const { category, city } = await params;

  const res = await getListing(slugToUnderscore(category), unslugify(city))

  if (!res.listings || res.listings.length === 0)
    return (
      <div>
        <Nav />
        <main className='px-5 sm:px-10 pb-32'>
          <Filters />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[35px]'>
          </div>

        </main>
        <Footer />
      </div>
    )

  const listings = res.listings


  return (
    <div>
      <Nav />
      <main className='px-5 sm:px-10 pb-32'>
        <Filters />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[35px]'>
          {listings.map((listing: any, index: number) =>
            <ListingPreview key={index} listing={listing} />
          )}
        </div>

      </main>
      <Footer />
    </div>
  )
}

export default page
