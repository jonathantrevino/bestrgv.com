'use client'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import SelectDropdown from './SelectDropdown';
import { CATEGORIES, CITIES } from '../lib/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { slugify, unslugify } from '../lib';


const Filters = ({ totalPages }: { totalPages: number | null }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Track which dropdown is open
  const searchParams = useSearchParams()
  const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 1);
  const router = useRouter();
  const segments = usePathname().split('/').filter(Boolean)
  const length = segments.length;


  // default to coffee_shops for category if no category or city is selected
  const category = length >= 2 ? segments[1] : null;

  console.log(category)
  // check if 'category' is actually a city
  if (category && CITIES.some(city => city.toLowerCase() === unslugify(category))) {
    console.log('in cities')
    return <></>

  }

  const city = length === 3 ? segments[2] : null;
  const dropdownRefCategory = useRef<HTMLDivElement>(null); // Reference for dropdown container
  const dropdownRefCity = useRef<HTMLDivElement>(null); // Reference for dropdown container
  const dropdownRefOrder = useRef<HTMLDivElement>(null); // Reference for dropdown container

  // Handle opening and closing dropdown menus
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown((prevState) => (prevState === dropdown ? null : dropdown));
  };

  useEffect(() => {

    if (page >= 1) {

      router.push(`/discover${category ? `/${category}` : ''}/${city ? city : ''}${page > 1 ? `?page=${page}` : ''}`)

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
    const categoryPath = category ? `/${category}` : '/city';

    router.push(`/discover${categoryPath}/${slugifiedOption}`);

  }

  const onOrderChange = (selectedOption: any) => {

  }


  return (
    <div className='pb-8 pt-24 space-y-8'>
      {(category || city) &&
        <h1 className='text-[43px] font-medium font-nunito leading-none'>{category ? unslugify(category) : ''} in {city ? unslugify(city) : 'RGV'}</h1>
      }
      <div className='flex justify-between gap-5   md:flex-row flex-col'>
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
            <button className='cursor-pointer' onClick={() => setPage(page === 1 ? 1 : page - 1)}>
              <ChevronLeft />
            </button>
            <input placeholder={String(page)} className='w-[35px] h-[35px] border border-less-stroke rounded-md text-lg  text-center' onChange={(e) => setPage(Number(e.target.value) || page)} />
            <p className='!text-lg'>{totalPages}</p>
            <button className='cursor-pointer' onClick={() => setPage(page === Number(totalPages) ? totalPages : page + 1)}>
              <ChevronRight />
            </button>

          </div>
        }
      </div>
    </div>
  )

}

export default Filters
