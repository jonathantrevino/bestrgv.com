import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Filters from '../components/Filters'


export async function generateMetadata() {
  return {
    title: 'Explore the Best Businesses in RGV | BestRGV',
    description: 'Find top-rated businesses, restaurants, and services across the Rio Grande Valley. Browse by category and city.'
  }
}

const page = async () => {
  return (
    <div>
      <Nav />
      <main className='px-5 sm:px-10 pb-32 min-h-screen'>
        <div className='w-fit pt-24'>
          <h1 className='text-xl font-nunito text-[28px]  md:text-[43px] leading-none font-semibold'>Discover Your Next Favorite Place</h1>
          <p className='text-body'>Select a category or city below to start your search for listings of places in the <span className='font-medium'>Rio Grande Valley</span>.</p>
        </div>
        <div className='relative -top-12'>
          <Filters totalPages={null} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default page
