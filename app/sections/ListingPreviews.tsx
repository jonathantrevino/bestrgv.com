import Link from 'next/link'
import React, { ReactNode } from 'react'

const ListingPreviews = ({ heading, redirect_link, children }: { heading: string, redirect_link: string, children: ReactNode }) => {
  return (
    <div className='pt-24 px-5 sm:px-10 space-y-4'>
      <span className='flex justify-between gap-4 flex-wrap items-end'>
        <h2 className='text-[43px] font-medium font-nunito'>{heading}</h2>
        <Link href={redirect_link} className='text-placeholder text-xl relative bottom-3'>View all</Link>
      </span>
      <div>
        {children}
      </div>
    </div>
  )
}

export default ListingPreviews
