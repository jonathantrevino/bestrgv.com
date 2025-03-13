'use client'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import SelectDropdown from './SelectDropdown';
import { CATEGORIES, CITIES } from '../lib/constants';
import { usePathname, useRouter } from 'next/navigation';
import { slugify, unslugify } from '../lib';


const Filters = ({ totalPages }: { totalPages: number | null }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Track which dropdown is open
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const segments = usePathname().split('/').filter(Boolean)
  const length = segments.length;

  console.log(segments, length)
  // default to coffee_shops for category if no category or city is selected
  const category = length >= 2 ? segments[1] : null;
  const city = length === 3 ? segments[2] : null;
  console.log(category, city)
  const dropdownRefCategory = useRef<HTMLDivElement>(null); // Reference for dropdown container
  const dropdownRefCity = useRef<HTMLDivElement>(null); // Reference for dropdown container
  const dropdownRefOrder = useRef<HTMLDivElement>(null); // Reference for dropdown container

  // Handle opening and closing dropdown menus
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown((prevState) => (prevState === dropdown ? null : dropdown));
  };

  useEffect(() => {

    if (page > 1) {

      router.push(`/discover${category ? `/${category}` : ''}/${city ? city : ''}`)

    }

  }, [page])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the dropdown
      if (
        (dropdownRefCategory.current && !dropdownRefCategory.current.contains(event.target as Node)) &&
        (dropdownRefCity.current && !dropdownRefCity.current.contains(event.target as Node))
        //(dropdownRefOrder.current && !dropdownRefOrder.current.contains(event.target as Node))
      ) {
        setOpenDropdown(null); // Close dropdown if click is outside both
      }
    };

    // Attach event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onCategoryChange = (selectedOption: any) => {

    const slugifiedOption = slugify(selectedOption);
    const cityPath = city ? `/${city}` : '';

    router.push(`/discover/${slugifiedOption}${cityPath}`);
  }

  const onCityChange = (selectedOption: any) => {
    const slugifiedOption = slugify(selectedOption);
    const categoryPath = category ? `/${category}` : '';

    router.push(`/discover${categoryPath}/${slugifiedOption}`);

  }

  const onOrderChange = (selectedOption: any) => {

  }


  return (
    <div className='flex justify-between gap-5 pt-24 pb-8 md:flex-row flex-col'>
      <div className='flex gap-6 flex-wrap flex-[1] w-full'>
        <div className='md:w-fit w-full' ref={dropdownRefCategory}>

          <div className='flex justify-between border border-stroke text-placeholder px-6 py-3 rounded-md flex-[1] w-full md:w-[225px] min-w-[150px] relative cursor-pointer' role='button' onClick={() => setOpenDropdown('category')}>
            {category ? unslugify(category) : 'Category'} <ChevronDown />
            {openDropdown === 'category' &&
              <SelectDropdown options={CATEGORIES} onChange={onCategoryChange} top={64} />
            }

          </div>
        </div>
        <div className='md:w-fit w-full' ref={dropdownRefCity} >

          <div className='flex justify-between border border-stroke text-placeholder px-6 py-3 flex-[1] rounded-md md:w-[250px] relative cursor-pointer' role='button' onClick={() => setOpenDropdown('city')}>
            {city ? unslugify(city) : 'City'} <ChevronDown />
            {openDropdown === 'city' &&
              <SelectDropdown options={CITIES} onChange={onCityChange} top={64} />
            }

          </div>
        </div>
        {/*
        <div ref={dropdownRefOrder} >
          <div className='flex justify-between border border-stroke text-placeholder px-6 py-3 rounded-md w-full md:w-[225px] relative cursor-pointer' role='button' onClick={() => setOpenDropdown('order')}>
            Recently Added <ChevronDown />
            {openDropdown === 'order' &&
              <SelectDropdown options={['Recently Added', 'Highest Rating', 'Lowest Rating']} onChange={onOrderChange} top={64} />
            }
          </div>
        </div>*/}
      </div>
      {totalPages &&
        <div className='shrink flex gap-4 items-center'>
          <button onClick={() => setPage(page === 1 ? 1 : page - 1)}>
            <ChevronLeft />
          </button>
          <input className='w-[35px] h-[35px] border border-less-stroke rounded-md text-lg  text-center' />
          <p className='!text-lg'>{totalPages}</p>
          <button onClick={() => setPage(page === Number(totalPages) ? totalPages : page + 1)}>
            <ChevronRight />
          </button>

        </div>
      }
    </div>
  )

}

export default Filters
