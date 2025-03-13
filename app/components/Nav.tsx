'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu } from 'lucide-react'
import SubmitRecCta from '../sections/SubmitRecCta'

const DropdownContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='absolute bg-white border border-less-stroke right-0 rounded-md shadow-md px-6 py-4 space-y-2 w-max z-50'>{children}</div>
  )
}

const Nav = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(1024);

  const hambugerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (hambugerRef.current && !hambugerRef.current.contains(event.target as Node)) {
        setOpen(false); // Close state if clicked outside the container
      }
    };

    // Listen for click events on the document
    document.addEventListener('click', handleClickOutside);


    // Check if window is defined (client-side check)
    if (typeof window !== 'undefined') {
      // Initialize the window width
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, []);

  useEffect(() => {
    if (windowWidth > 1024) {
      setOpen(false);
    }
  }, [windowWidth]);

  return (
    <nav className='px-5 sm:px-10 py-3 flex justify-between items-center'>
      <div className='flex gap-6 items-center'>
        <Link href='/'>
          <Image src='/wordmark.svg' width='100' height='18' alt='wordmark bestrgv logo' />
        </Link>
        <div className='lg:flex hidden gap-5 text-xl leading-[150%] font-open'>
          <Link href='/discover'>Discover</Link>
          <div className='group relative'>
            <Link href='/top-picks' className='flex gap-1 items-center'>Top Picks <ChevronDown /></Link>
            <div className='group-hover:block hidden'>
              <DropdownContainer>
                <Link href='/top-picks/restaraunts' className='flex gap-1 items-center'>Restaraunts</Link>
                <Link href='/top-picks/coffee-shops' className='flex gap-1 items-center'>Coffee Shops</Link>
              </DropdownContainer>
            </div>
          </div>
          <Link href='/blog'>Blog</Link>
          <Link href='/about-us'>About Us</Link>
        </div>
      </div>
      <div className='flex gap-6 lg:gap-0 items-center'>
        <Link href='/submit-recommendation' className='bg-primary px-3 py-2 rounded-md text-white sm:block hidden'>Submit Recommendation</Link>
        <div ref={hambugerRef} className='relative'>
          <button className='lg:hidden block cursor-pointer' onClick={() => setOpen(!open)}><Menu /></button>
          {open &&
            <DropdownContainer>
              <div className='flex flex-col gap-2 w-full'>
                <Link href='/discover'>Discover</Link>
                <Link href='/top-picks'>Top Picks</Link>
                <Link href='/blog'>Blog</Link>
                <Link href='/about-us'>About Us</Link>
              </div>
              <Link href='/submit-recommendation' className='bg-primary px-3 py-2 sm:text-base text-sm rounded-md text-white sm:hidden block'>Submit Recommendation</Link>
            </DropdownContainer>
          }
        </div>
      </div>
    </nav>
  )
}

export default Nav
