import Link from 'next/link'
import React from 'react'

export const CategoryBtn = ({ text, icon, redirect_link }: { text: string, icon: React.ReactNode, redirect_link: string }) => {
  return (
    <Link href={redirect_link} className='px-4 py-8 w-fit flex justify-center items-center flex-col border border-less-stroke rounded-md gap-3 text-[18px] hover:text-white hover:bg-primary'>{icon} {text}</Link>
  )
}

export const CategoryBtnDetailed = ({ text, icon, redirect_link, description }: { text: string, icon: React.ReactNode, redirect_link: string, description: string }) => {
  return (
    <Link href={redirect_link} className='px-4 py-8 w-full  border border-less-stroke rounded-md gap-3 text-[18px] hover:text-white hover:bg-primary space-y-2 group'>
      <div className='flex gap-2 items-center !text-xl font-nunito font-semibold'>
        {icon} {text}
      </div>
      <p className='!text-sm group-hover:!text-white text-body'>{description}</p>
    </Link>
  )
}

