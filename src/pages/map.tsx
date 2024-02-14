import React, { useEffect, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import schools from '../data/schools'
import SchoolCard from '../components/SchoolCardMap'
import MapList from '@/components/MapList'
import MapboxMap from '@/components/MapboxMap'
import ToggleButton from '@/components/ToggleButton'

export interface School {
  name: string
  lat?: number
  lng?: number
  description?: string
  img?: string
}

const Map = () => {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)
  // probably need to rename this state isList for toggle of map or list component
  const [isList, setIsList] = useState(false)

  const handleToggle = () => {
    setIsList(!isList)
  }
  return (
    <div className="flex flex-col md:flex-row relative w-full h-[calc(100vh-80px)]">
      <div>
        <ToggleButton isMapView={!isList} toggleView={handleToggle} />
      </div>
      <div className="w-full h-1/6 md:w-1/2 md:h-full flex justify-center items-center">
        {selectedSchool && (
          <div className="hidden md:block">
            {' '}
            {/* Hide SchoolCard on screens smaller than md */}
            <SchoolCard school={selectedSchool} />
          </div>
        )}
        {!selectedSchool && (
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-4xl font-bold mb-4">Select a School</h1>
            <p className="text-lg mb-4">
              Click on a {isList ? 'school' : 'marker '} to view more
              information.
            </p>
          </div>
        )}
      </div>
      {isList ? (
        <MapList setSelectedSchool={setSelectedSchool} />
      ) : (
        <MapboxMap setSelectedSchool={setSelectedSchool} />
      )}
    </div>
  )
}

export default Map
