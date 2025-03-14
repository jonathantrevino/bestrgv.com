import { ChevronUp, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='space-y-16 px-5 sm:px-10 py-3'>
      <div className='flex justify-between lg:flex-row flex-col gap-8'>
        <div className='space-y-6'>
          <div className='space-y-2'>
            <Image src='/wordmark.svg' width={100} height={18} alt='bestrgv wordmark' />
            <p className='!text-sm text-body'>Discover the best in RGV</p>
          </div>
          <div className='flex gap-2 text-sm text-less-important'><Mail /> team@bestrgv.com</div>
        </div>
        <div className='flex gap-16 sm:flex-row flex-col gap-y-4'>
          <div className='space-y-4'>
            <h4 className='!text-lg'>Categories</h4>
            <span className='flex flex-col gap-2 !text-sm text-body'>
              <Link href='/discover/coffee-shops' className='w-fit'>Coffee Shops</Link>
            </span>
          </div>
          <div className='space-y-4'>
            <h4 className='!text-lg'>Cities</h4>
            <span className='flex flex-col gap-2 !text-sm text-body'>
              <Link href='/discover/city/edinburg' className='w-fit'>Edinburg</Link>
              <Link href='/discover/city/mcallen' className='w-fit'>McAllen</Link>
              <Link href='/discover/city/mcallen' className='w-fit'>Pharr</Link>
              <Link href='/discover/city/mcallen' className='w-fit'>Mission</Link>
              <Link href='/discover/city/mcallen' className='w-fit'>San Juan</Link>
            </span>
          </div>
          <div className='space-y-4'>
            <h4 className='!text-lg'>Contribute</h4>
            <span className='flex flex-col gap-2 !text-sm text-body'>
              {/*<Link href='/add-business' className='!text-success w-fit'>Add Your Business</Link>*/}
              <Link href='/submit-recommendation' className='w-fit'>Submit a Recommendation</Link>
            </span>
          </div>
        </div>
      </div>
      <div className='text-less-important text-sm flex justify-between'>
        <p className='!text-sm'>2025 &copy; bestrgv. All rights reserved</p>
        <button className='text-sm flex justify-center gap-2 items-center'>Back to Top <ChevronUp /></button>
      </div>
    </footer>
  )
}

export default Footer
