import React from "react";
import Image from "next/image";

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
  isMapView: boolean;
  toggleView: () => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isMapView,
  toggleView,
}) => {
  return (
    <label className="relative inline-block h-[32px] w-[200px] rounded-md bg-[#d0d0d0]">
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-around">
        <p className="flex items-center justify-center gap-1">
          <Image
            src={"/icons/location-icon.png"}
            alt=""
            width={16}
            height={16}
          />
          Map
        </p>
        <p className="flex items-center justify-center gap-1">
          <Image src={"/icons/list-icon.png"} alt="" width={16} height={16} />
          List
        </p>
      </div>
      <input
        type="checkbox"
        onClick={toggleView}
        className="h-0 w-0 opacity-0"
        aria-checked={isMapView}
      />
      <span className="slider absolute left-[3px] top-[2px] flex h-[calc(90%-1px)] w-[calc(50%-3px)] cursor-pointer items-center justify-center rounded-md bg-[#f0f0f0] transition duration-300">
        <Image
          src={isMapView ? "/icons/location-icon.png" : "/icons/list-icon.png"}
          alt=""
          width={16}
          height={16}
        />
        {isMapView ? "Map" : "List"}
      </span>
    </label>
  );
};

export default ToggleButton;
