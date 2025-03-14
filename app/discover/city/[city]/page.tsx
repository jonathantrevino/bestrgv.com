import { CategoryBtnDetailed } from '@/app/components/CategoryBtn';
import Footer from '@/app/components/Footer'
import Nav from '@/app/components/Nav'
import { unslugify } from '@/app/lib';
import { City, CITY_DATA } from '@/app/lib/constants';
import Image from 'next/image';
import React from 'react'

interface CityProps {
  params: {
    city: string;
  }
}

export async function generateMetadata({ params }: CityProps) {
  const { city } = await params

  const city_data = CITY_DATA[unslugify(city) as City];


  return {
    title: `Best Things to Do in ${city_data.title} | Top Attractions, Restaurants & Activities`,
    description: `Discover the top places to eat, shop, and visit in ${city_data.title}, top restaurants in ${city_data.title}, local shops in ${city_data.title}`,
    keywords: `things to do in ${city}, ${city} attractions, best restaurants in ${city}, hidden gems in ${city}`
  }
}

const page = async ({ params }: CityProps) => {
  const { city } = await params;

  const city_data = CITY_DATA[unslugify(city) as City]

  return (
    <div>
      <Nav />
      <main className='px-5 sm:px-10 pb-32'>
        <div className='pt-24 pb-32 space-y-4'>
          <div className='space-y-8'>
            <div className='space-y-2'>
              <h1 className='font-nunito text-[32px] font-medium'>Discover Things to Do in {unslugify(city)}</h1>
              <p className='!text-body'>Looking for the best attractions, restaurants, and activities in McAllen? Whether you're a local or just visiting, explore top-rated places to eat, outdoor adventures, nightlife, and hidden gems in this vibrant city</p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {city_data.categories.map((category, index) => {
                const Icon = category.icon
                return (
                  <CategoryBtnDetailed key={index} text={category.name} description={category.description} icon={<Icon size={22} />} redirect_link={category.redirect_url} />
                )
              }
              )}

            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>

  )
}

export default page
