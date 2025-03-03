import Image from 'next/image'
import React from 'react'

const FindWhatYouNeed = () => {
  return (
    <div className='mt-2'>
      <div className="relative w-full">
        <Image
          className="w-full h-auto"
          src="/rgv-buildings.webp"
          width={1440}
          height={263}
          alt="rgv buildings backdrop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white to-white/0"></div>
      </div>
      <div className='max-w-[1024px] mx-auto bg-white relative -top-[90px] p-8 space-y-9'>
        <h2 className='text-[32px] font-medium'>3 Steps to Find What You Need</h2>
        <div className='flex md:flex-row flex-col gap-8'>
          <div className='flex gap-3 items-end'>
            <p className='!text-[43px] relative top-[14px] text-less-important'>1.</p>
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold'>What are you looking for?</h3>
              <p className='text-sm text-body'>Define your search--whether it's a cafe, shop, or scenic spot.</p>
            </div>
          </div>
          <div className='flex gap-3 items-end'>
            <p className='!text-[43px] relative top-[14px] text-less-important'>2.</p>
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold'>Pick a Location</h3>
              <p className='text-sm text-body'>Choose where in the Rio Grande Valley you want to explore.</p>
            </div>
          </div>
          <div className='flex gap-3 items-end'>
            <p className='!text-[43px] relative top-[14px] text-less-important'>3.</p>
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold'>Find What You Need</h3>
              <p className='text-sm text-body'>Browse our curated list of top spots in the area.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FindWhatYouNeed
