import { Check } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Checklist = ({ title, paragraph }: { title: string, paragraph: string }) => {
  return (
    <div className='flex gap-2 items-center'>
      <Check className='text-success shrink-0' />
      <div>
        <p className='font-medium'>{title} <span className='text-less-important font-normal'>- {paragraph}</span></p>
      </div>
    </div>
  )
}

const WhyBestRgv = () => {
  return (
    <div className='pt-32 px-5 sm:px-10 flex xl:flex-row flex-col gap-5 gap-y-10'>
      <div className='flex flex-[0.5] flex-col gap-6 items-start'>
        <h2 className='flex  text-[32px] font-medium'>Why <Image src='/wordmark.svg' width={177} height={31} alt='bestrgv wordmark' />?</h2>
        <div>

          <p className='text-body'>At BestRGV, we help you explore the best of the Rio Grande Valley. Whether you're a local or visitor, discover vibrant culture, music, cafes, parks, eateries, and more through our directory of hidden gems.</p>
          <br />
          <p className='text-body'>We make it easy to explore the heart of the region, one listing at a time. With BestRGV, finding your next favorite spot is just a few clicks away!</p>

        </div>
        <Checklist title={'Discover Local Gems'} paragraph={'We bring you a curated selection of RGV’s best spots, from the artsy to the adventurous.'} />
        <Checklist title={'Explore Social & Cultural Hotspots'} paragraph={' Get a taste of the Valley’s vibrant culture, from art galleries to music venues.'} />
        <Checklist title={'Stay Up-to-Date'} paragraph={'With our frequently updated listings, you’ll always find something new to experience.'} />
      </div>
      <Image src='/rgv-highway.webp' className='flex-[0.5] mx-auto' width={664} height={442} alt='rio grande valley highway' />
    </div>
  )
}

export default WhyBestRgv
