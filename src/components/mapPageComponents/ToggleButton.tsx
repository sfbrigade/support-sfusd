import React from "react";
import Image from "next/image";
import Button from "../shared/Button";

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
    <Button
      onClick={toggleView}
      style="Customize"
      className="fixed right-4 top-24 flex bg-stone-800"
      role="switch"
      aria-checked={isMapView}
      aria-label={isMapView ? "Switch to list view" : "Switch to map view"}
    >
      <span className={`pr-2 text-gray-50`}>
        {isMapView ? "Show List" : "Show Map"}
      </span>
      <Image
        src={isMapView ? "./icons/listview.svg" : "./icons/mapview.svg"}
        alt=""
        width={25}
        height={25}
      />
    </Button>
  );
};

export default ToggleButton;
