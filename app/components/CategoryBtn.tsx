import Link from 'next/link'
import React from 'react'

const CategoryBtn = ({ text, icon, redirect_link }: { text: string, icon: React.ReactNode, redirect_link: string }) => {
  return (
    <Link href={redirect_link} className='px-4 py-8 w-fit flex justify-center items-center flex-col border border-less-stroke rounded-md gap-3 text-[18px] hover:text-white hover:bg-primary'>{icon} {text}</Link>
  )
}

export default CategoryBtn
