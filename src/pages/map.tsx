import React, { useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
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
  const [isMap, setIsMap] = useState(true)

  const setToggle = () => {
    setIsMap(!isMap)
  }
  return (
    <div className="flex flex-col relative w-full h-[calc(100vh-80px)]">
      <div className="flex mt-16 justify-center">
        <ToggleButton isMapView={isMap} toggleView={setToggle} />
      </div>
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full h-1/6 md:w-1/2 md:h-full flex justify-center items-center">
          {selectedSchool && (
            <div className="hidden md:block">
              {' '}
              {/* Hide SchoolCard on screens smaller than md */}
              <SchoolCard school={selectedSchool} />
            </div>
          )}
          {!selectedSchool && (
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold mb-4">Select a School</h1>
              <p className="text-lg mb-4">
                Click on a {isMap ? 'school' : 'marker '} to view more
                information.
              </p>
            </div>
          )}
        </div>
        {isMap ? (
          <MapboxMap setSelectedSchool={setSelectedSchool} />
        ) : (
          <MapList setSelectedSchool={setSelectedSchool} />
        )}
      </div>
    </div>
  )
}

export default Map
