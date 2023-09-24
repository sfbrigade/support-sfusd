import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

type ZoomControlsProps = {
  onZoomIn: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onZoomOut: () => void;
  disableZoomOut: boolean;
};

const ZoomControls: React.FC<ZoomControlsProps> = ({
  onZoomIn,
  onZoomOut,
  disableZoomOut,
}) => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col bg-white rounded shadow">
      <button
        onClick={onZoomIn}
        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-t text-xl"
      >
        <FaPlus />
      </button>
      <button
        onClick={onZoomOut}
        disabled={disableZoomOut}
        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-b text-xl"
      >
        <FaMinus />
      </button>
    </div>
  );
};

export default ZoomControls;
