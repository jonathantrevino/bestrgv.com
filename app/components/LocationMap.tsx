'use client'
import {
  useJsApiLoader,
  InfoWindowF,
  MarkerF,
  GoogleMap
} from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import { fetchMapLocation } from '../data/listing'

const LocationMap = ({ address }: { address: string }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: ["places"],
  })
  const [position, setPosition] = useState<{ lat: any, lon: any } | null>(null)

  useEffect(() => {
    console.log('ran')
    getLocation()
  }, [])

  async function getLocation() {
    const locationResponse = await fetchMapLocation(address)
    setPosition({ lat: locationResponse.lat, lon: locationResponse.lon })

  }


  if (!isLoaded) return (<div className='max-w-[500px] max-h-[190px] w-full h-[190px] bg-less-important opacity-10 shrink-0'></div>)
  console.log(position)
  if (!position) return <div>Not Found...</div>

  return <Map lat={position.lat} lon={position.lon} />
}

const Map = ({ lat, lon }: { lat: any, lon: any }) => {
  return (
    <div className='max-w-[500px] max-h-[190px] w-full h-[190px] bg-less-important shrink-0'>
      <GoogleMap mapContainerStyle={{ 'width': '100%', height: '190px', maxWidth: '500px' }} center={{ lat: lat, lng: lon }} zoom={14}>
        <MarkerF position={{ lat: lat, lng: lon }} />
      </GoogleMap>
    </div>
  )

}

export default LocationMap
