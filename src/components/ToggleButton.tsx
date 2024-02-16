import React from 'react'
import Image from 'next/image'

/** ToggleButton renders a toggle button with icon and text dependent on the view
 * state of our map component (Map or List views).
 *
 * props:
 * - isMapView: boolean, state passed from MapView that tracks state of
 * the view between Map and List
 * - toggleView: function, used to trigger state change between views
 *
 * state: none
 *
 * MapView => ToggleButton
 */

type ToggleButtonProps = {
  isMapView: boolean
  toggleView: () => void
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isMapView,
  toggleView,
}) => {
  return (
    <div
      className={`bg-stone-800 flex items-center space-x-2 fixed right-4 p-1
        rounded-full top-24 px-4 py-2 shadow-lg focus:outline-visible`}
    >
      <button
        className={`flex`}
        onClick={toggleView}
        type="button"
        role="switch"
        aria-checked={isMapView}
        aria-label={isMapView ? 'Switch to list view' : 'Switch to map view'}
      >
        <span className={`text-gray-50 pr-2`}>
          {isMapView ? 'Show List' : 'Show Map'}
        </span>
        <Image
          src={isMapView ? './icons/listview.svg' : './icons/mapview.svg'}
          alt=""
          width={25}
          height={25}
        />
      </button>
    </div>
  )
}

export default ToggleButton
