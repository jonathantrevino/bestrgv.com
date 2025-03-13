'use client'
import React, { useState } from 'react'
import { slugify } from '../lib';

interface SelectDropdownProps {
  options: string[]; // List of options to show in the dropdown
  onChange: (selectedOption: string) => void; // Callback when an option is selected
  defaultValue?: string; // Optional default value for the dropdown
  top: number;
}

const SelectDropdown = ({ options, onChange, defaultValue, top }: SelectDropdownProps) => {


  console.log('dropdown')
  const handleClick = (selectedOption: string) => {
    onChange(selectedOption); // Trigger the onChange callback passed as a prop
  };

  return (
    <div className={`flex flex-col gap-2 items-start justify-start absolute bg-white border border-stroke  rounded-md left-0 w-full shadow-md p-4 z-20 select-none`} style={{ top: top }}>
      {options.map((option, index) =>
        <button className='hover:bg-less-stroke w-full text-start p-2 rounded-md cursor-pointer' key={index} onClick={(e) => { e.stopPropagation(); handleClick(option); }}>{option}</button>
      )}</div>
  )
}

export default SelectDropdown
