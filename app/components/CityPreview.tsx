import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { slugify } from '../lib'

export const CityPreview = ({ title, image_url, alt, redirect_url }: { title: string, image_url: string, alt: string, redirect_url: string }) => {
  console.log(title, image_url)
  return (
    <Link href={redirect_url} className='space-y-2'>
      <div className='relative w-full aspect-square'>
        <Image src={image_url} className='object-cover' fill alt={alt} />
      </div>
      <h3 className='text-[24px] font-nunito'>{title}</h3>
    </Link>
  )
}

export const CityDetailed = ({ title, description, image_url, alt }: { title: string, description: string, image_url: string, alt: string }) => {
  return (
    <div className='space-y-2 flex gap-5'>
      <div className='flex-[0.4] w-full aspect-square relative'>
        <Image src={image_url} className='object-cover' fill alt={alt} />
      </div>
      <div className='flex-[0.6] w-full flex flex-col items-end pb-1'>
        <div>
          <h3 className='text-[24px] font-nunito'>{title}</h3>
          <p className='text-body'>{description}</p>
        </div>
        <Link href={`/discover/city/${slugify(title)}`} className='text-primary flex gap-2 items-center font-nunito font-medium'>Find the Best Places in {title} <ChevronRight /></Link>
      </div>
    </div>
  )
}
