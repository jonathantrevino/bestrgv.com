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
  }
  searchParams: { page?: string }
}

export async function generateMetadata({ params, searchParams }: CategoryProps) {
  const { category } = await params;
  return {
    title: `Top ${unslugify(category)} in RGV | BestRGV`,
    description: `Looking for the best ${unslugify(category)} in the Rio Grande Valley? Explore top-rated services, and local favorites.`,
    keywords: `best ${unslugify(category)} in RGV, RGV ${unslugify(category)} services, top ${unslugify(category)} businesses, local ${unslugify(category)} in RGV`
  }
}

const page = async ({ params, searchParams }: CategoryProps) => {
  const { category } = await params;
  const page = await searchParams?.page ? searchParams.page : '1';


  console.log(page)
  const res = await getListing(slugToUnderscore(category), null, Number(page))
  console.log(res)

  if (!res.listings || res.listings.length === 0) return (<div>
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
