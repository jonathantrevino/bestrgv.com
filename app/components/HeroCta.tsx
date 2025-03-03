import { ChevronDown } from 'lucide-react'
import React from 'react'

const HeroCta = () => {
  return (
    <div className='flex gap-7 flex-wrap'>
      <div className='border border-stroke rounded-md px-6 py-2 space-y-1 lg:flex-none flex-[1] lg:w-fit w-full text-sm lg:text-lg'>
        <p className='font-medium font-mono'>What</p>
        <button className='text-placeholder cursor-pointer flex justify-between gap-4 w-full'>
          <span className='max-w-[334px]  truncate'>
            Ex: restaurants, laundromats, coffee shops
          </span>
          <ChevronDown className='text-black shrink-0' />
        </button>
      </div>
      <div className='border border-stroke rounded-md px-6 py-2 space-y-1 lg:w-fit w-full text-sm lg:text-lg'>
        <p className='font-medium font-mono'>Where</p>
        <button className='text-placeholder cursor-pointer flex justify-between gap-4 w-full'>
          <span className='max-w-[334px] truncate'>
            Ex: McAllen, Edinburg
          </span>
          <ChevronDown className='text-black shrink-0' />
        </button>
      </div>
      <button className='bg-primary text-white py-[10px] px-[42px] rounded-md lg:flex-none flex-[1] text-lg'>Search</button>
    </div>
  )
}

export default HeroCta
