import { slugify } from '@/app/lib';
import { BASE_URL } from '@/app/sitemap';
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ListingPreview = ({ listing }: { listing: any }) => {
  const category = slugify(listing.category)
  const city = slugify(listing.city)

  const slug = `${BASE_URL}/discover/${category}/${city}/${listing.slug}`
  return (
    <div>
      <div className="relative w-full" style={{ aspectRatio: '1.71' }}>
        <Image
          src={listing.image}
          className="object-cover rounded-md"
          layout="fill" // Automatically takes up the size of the parent container
          alt={`${listing.name} building`}
        />
      </div>
      <div className='p-2 space-y-3'>

        <Link href={`${BASE_URL}/discover/${slugify(listing.category)}`} className='cursor-pointer hover:text-primary text-sm text-less-important'>{listing.category}</Link>
        <Link href={slug} className='hover:text-primary w-fit'>

          <h2 className='text-lg font-medium w-fit'>{listing.name}</h2>
        </Link>
        <p className="!text-sm leading-8 text-body max-h-[63px] sm:max-h-[134px]  overflow-hidden relative line-clamp-4">
          {listing.description}
          <span className='bg-gradient-to-t from-white to-transparent w-full absolute bottom-0 left-0 h-[20px]'></span>
        </p>
        <span className='flex items-center gap-1'>
          <Star className='text-primary' fill='#E65C00' size={24} />
          <p className='text-sm'>{listing.rating}</p>
        </span>
      </div>

    </div>
  )
}

export default ListingPreview
