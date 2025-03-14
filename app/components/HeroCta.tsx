'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import SelectDropdown from './SelectDropdown';
import { CATEGORIES, CITIES } from '../lib/constants';
import { useRouter } from 'next/navigation';
import { slugify } from '../lib';

const HeroCta = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Track which dropdown is open
  const [what, setWhat] = useState<string | null>(null)
  const [where, setWhere] = useState<string | null>(null)
  const router = useRouter()
  const dropdownRefWhat = useRef<HTMLDivElement>(null); // Reference for dropdown container
  const dropdownRefWhere = useRef<HTMLDivElement>(null); // Reference for dropdown container

  // Handle navigate based on selected "what" and "where"
  const handleNavigate = () => {
    let path = '/discover'; // Default path

    // Add "what" if it's set
    if (what) {
      path += `/${slugify(what)}`;
    }

    // Add "where" if it's set
    if (where) {
      if (!what) {
        path += `/city/${slugify(where)}`;
      } else {
        path += `/${slugify(where)}`
      }
    }

    // Navigate to the constructed path
    router.push(path);
  };

  // Handle opening and closing dropdown menus
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown((prevState) => (prevState === dropdown ? null : dropdown));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the dropdown
      if (
        (dropdownRefWhat.current && !dropdownRefWhat.current.contains(event.target as Node)) &&
        (dropdownRefWhere.current && !dropdownRefWhere.current.contains(event.target as Node))
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
  const onWhatChange = (selectedOption: any) => {
    setWhat(selectedOption);
    setOpenDropdown(null);
  }
  const onWhereChange = (selectedOption: any) => {
    setWhere(selectedOption);
    setOpenDropdown(null);
  }

  return (
    <div className='flex gap-7 flex-wrap'>
      {/* "What" dropdown */}
      <div
        className='relative border border-stroke rounded-md px-6 py-2 space-y-1 lg:flex-none flex-[1] lg:w-fit w-full text-sm lg:text-lg'
        ref={dropdownRefWhat}
        onClick={(e) => e.stopPropagation()}
      >
        <p className='font-medium font-mono'>What</p>
        <button
          className='text-placeholder cursor-pointer flex justify-between gap-4 w-full'
          onClick={() => toggleDropdown('what')}
        >
          <span className='max-w-[334px] truncate'>
            {what ?
              what
              :
              'Ex: restaurants, laundromats, coffee shops'
            }
          </span>
          <ChevronDown className='text-black shrink-0' />
        </button>

        {/* Dropdown Menu for "What" */}
        {openDropdown === 'what' && (
          <SelectDropdown options={CATEGORIES} onChange={onWhatChange} top={104} />
        )}
      </div>

      {/* "Where" dropdown */}
      <div
        className='border border-stroke rounded-md px-6 py-2 space-y-1 lg:w-fit w-full text-sm lg:text-lg relative'
        ref={dropdownRefWhere}
        onClick={(e) => e.stopPropagation()}
      >
        <p className='font-medium font-mono'>Where</p>
        <button
          className='text-placeholder cursor-pointer flex justify-between gap-4 w-full'
          onClick={() => toggleDropdown('where')}
        >
          <span className='max-w-[334px] truncate'>
            {where ? where :
              'Ex: McAllen, Edinburg'
            }
          </span>
          <ChevronDown className='text-black shrink-0' />
        </button>

        {/* Dropdown Menu for "Where" */}
        {openDropdown === 'where' && (
          <SelectDropdown options={CITIES} onChange={onWhereChange} top={104} />
        )}
      </div>

      {/* Search button */}
      <button className='bg-primary text-white py-[10px] px-[42px] rounded-md lg:flex-none flex-[1] text-lg cursor-pointer' onClick={handleNavigate}>
        Search
      </button>
    </div>
  )
}

export default HeroCta;

