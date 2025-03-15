import React from 'react'
import Image from 'next/image'
import HeroCta from '../components/HeroCta'
import { Coffee, Utensils } from 'lucide-react'
import { CategoryBtn } from '../components/CategoryBtn'

const Hero = () => {
  return (
    <div className='px-5 sm:px-10'>
      <div className='space-y-8 pt-24 pb-16'>
        <div className='space-y-3'>
          <h1 className='font-semibold text-[28px] sm:text-[48px] lg:text-[72px] flex gap-2 sm:gap-4 items-center leading-none font-nunito'>Discover the Best in <span><Image src='/icon.svg' className='h-[24px] w-[60px] sm:h-[44px] sm:w-[100px] lg:w-[173px] lg:h-full lg:pb-2' width='173' height='63' alt='bestrgv logo' /></span></h1>
          <p className='text-sm sm:text-base lg:text-xl text-body'>Uncover the Heart of South Texas: Find Great Places to Stay, Eat, Shop, and Visit.</p>
        </div>
        <HeroCta />
      </div>
      <div className='space-y-5'>
        <p className='text-less-important text-sm'>
          or by these categories
        </p>
        <div className='flex gap-6 flex-wrap'>
          {/*<CategoryBtn text="Restaraunts" icon={<Utensils />} redirect_link={'/restaraunts'} />*/}
          <CategoryBtn text="Coffee Shops" icon={<Coffee />} redirect_link={'/discover/coffee-shops'} />
        </div>
      </div>
    </div>
  )
}

export default Hero
