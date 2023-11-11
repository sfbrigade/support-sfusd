import React from 'react';

/** ToggleButton renders a toggle button with styling and text dependent on the view
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
    isMapView, toggleView
}) => {
    return (
        <div className={`bg-${isMapView ? 'white' : 'blue-600'} flex items-center space-x-2
        fixed right-4 p-1 rounded-xl md:hidden top-24 px-3 py-2 shadow-lg focus:outline-none`}>
            <span className={`text-${isMapView ? 'black' : 'white'}`}>Map</span>
            <label
                className={`bg-${isMapView ? 'purple-600' : 'pink-600'} cursor-pointer rounded-full
                w-14 h-8 flex items-center p-1 relative `}
                role="switch"
                aria-checked={isMapView}
                onClick={toggleView}
            >
                <span
                    className={`${isMapView ? 'left-1' : 'right-1'}
                    absolute inline-block w-6 h-6 bg-white rounded-full shadow-md transform
                    transition-transform ease-in-out duration-300`}>
                </span>
            </label>
            <span className={`text-${isMapView ? 'black' : 'white'}`}>List</span>
        </div>

        // <div
        //     onClick={toggleView}
        //     className={`fixed right-4 p-1 rounded-full bg-white flex items-center md:hidden top-24
        //     ${isMapView ?
        //             ""
        //             :
        //             "md:flex md:items-end md:justify-end md:bottom-4"
        //         }`}
        // >
        //    <p>{isMapView? "List View" : "Map View"}</p>
        //     <div
        //         className={`flex items-center justify-center w-8 h-8
        //         ${isMapView ?
        //                 "bg-black"
        //                 :
        //                 ""
        //             } rounded-full`}
        //     >
        //         {/* <MdMap className="text-white text-lg" /> */}
        //     </div>
        //     <div
        //         className={`flex items-center justify-center w-8 h-8
        //         ${isMapView ?
        //                 ""
        //                 :
        //                 "bg-black"
        //             } rounded-full`}
        //     >
        //         {/* <MdViewList className="text-white text-lg" /> */}
        //     </div>
        // </div>
    );
};


export default ToggleButton;