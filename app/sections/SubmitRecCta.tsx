import Link from 'next/link'
import React from 'react'

const SubmitRecCta = () => {
  return (
    <div className='bg-primary text-white rounded-md py-5 px-10 mx-5 sm:mx-10 flex justify-center my-32'>
      <div className='max-w-[980px] mx-auto flex flex-col items-center gap-6'>
        <div className='space-y-2'>
          <h2 className='text-[21px] md:text-[43px] font-bold md:font-medium text-center'>Have a Hidden Gem in Mind? Share It with Us!</h2>
          <p className='text-center !text-sm md:!text-lg'>Know of a cool spot in the RGV that we haven’t featured yet? Let us know! Whether it’s a café, a park, or an event space, your recommendation could help others discover something new.</p>
        </div>
        <Link href='/submit-recommendation' role='button' className='rounded-md bg-white text-primary px-3 py-2 text-lg md:text-xl'>Submit a Recommendation</Link>
      </div>
    </div>
  )
}

export default SubmitRecCta
