import React from 'react'
import Nav from '../components/Nav'
import { CityDetailed } from '../components/CityPreview'
import Footer from '../components/Footer'

const page = () => {
  return (
    <div>
      <Nav />
      <main className='px-5 sm:px-10'>
        <div className='space-y-8 pt-24 pb-32'>
          <div className=''>

            <h1 className='font-nunito text-[32px] font-medium'>Cities in the Rio Grande Valley</h1>
            <p className='text-body'>BestRGV showcases cities across the Rio Grande Valley, highlighting what makes each one unique. Explore local culture, dining, events, and attractions in communities big and small, and find the best places to visit in every corner of the RGV.</p>
          </div>

          <div className='grid grid-cols-1 gap-5'>

            <CityDetailed title='Mcallen' description="Founded in 1904, McAllen, Texas, is a growing city known for its mild winters, proximity to Mexico, and thriving oil and gas industry. With a low cost of living, walkable downtown, and vibrant shopping and nightlife scenes, it' s a cultural hub offering a unique blend of attractions and activities." image_url='/mcallen_convention_center_at_night.webp' alt='Night time view of McAllen Convention Center' />
            <CityDetailed title='Edinburg' description="Founded as the county seat of Hidalgo County, Edinburg, Texas, is the second-largest city in the county and the third-largest in the Rio Grande Valley. With a population of over 100,000, it' s part of the McAllen–Edinburg–Mission metropolitan area and home to the University of Texas Rio Grande Valley's main campus." image_url='/downtown_edinburg.webp' alt='Day time view of downtown Edinburg' />

            <CityDetailed
              title='Pharr'
              description="Pharr is a gateway to international trade and a community-focused city in the Rio Grande Valley. With a strong agricultural background, local parks, and expanding business opportunities, Pharr is a welcoming place to explore and call home."
              image_url='/pharr_building_daytime.webp'
              alt='A view of Pharr, Texas'
            />

            <CityDetailed
              title='Mission'
              description="Mission, Texas, is known for its rich agricultural roots and strong sense of community. Home to the National Butterfly Center and a variety of outdoor attractions, it’s a city that perfectly blends nature, history, and modern development."
              image_url='/mission_texas_city_daytime.webp'
              alt='A nature-filled view of Mission, Texas'
            />

            <CityDetailed
              title='San Juan'
              description="San Juan is a city steeped in tradition, most notably as the home of the Basilica of Our Lady of San Juan del Valle. Its strong community, expanding dining scene, and cultural significance make it a must-visit location in the Rio Grande Valley."
              image_url='/san_juan_city_daytime.webp'
              alt='A view of the Basilica in San Juan, Texas'
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default page
