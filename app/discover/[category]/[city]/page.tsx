import React, { cache } from 'react'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import ListingPreview from '@/app/components/listing/ListingPreview'
import Filters from '@/app/components/Filters'
import { fetchListings } from '@/app/data/listing'
import { slugToUnderscore, unslugify } from '@/app/lib'

const getListing = cache(fetchListings);


interface CategoryProps {
  params: {
    category: string;
    city: string;
  }
  searchParams: { page?: string }

}

export async function generateMetadata({ params, searchParams }: CategoryProps) {
  const { category, city } = await params;

  return {
    title: `Best ${unslugify(category)} in ${unslugify(city)}, RGV | BestRGV`,
    description: `Find the best ${unslugify(category)} in ${unslugify(city)}, RGV.`,
    keywords: `best ${unslugify(category)} in ${unslugify(city)}, top ${unslugify(category)} in ${unslugify(city)} RGV, local ${unslugify(category)}`,
  }
}

const page = async ({ params, searchParams }: CategoryProps) => {
  const { category, city } = await params;
  const page = searchParams?.page ? searchParams.page : '1';

  const res = await getListing(slugToUnderscore(category), unslugify(city), Number(page))

  if (!res.listings || res.listings.length === 0)
    return (
      <div>
        <Nav />
        <main className='px-5 sm:px-10 pb-32'>
          <Filters totalPages={null} />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[35px]'>
          </div>

        </main>
        <Footer />
      </div>
    )

  const listings = res.listings
  const totalPages = res.totalPages


  return (
    <div>
      <Nav />
      <main className='px-5 sm:px-10 pb-32'>
        <Filters totalPages={totalPages} />
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
