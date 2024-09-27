import React, { createContext, useState, useContext } from 'react';
import { School } from '@/types/school';

/**
 * MapContext: Manages state for the map view and school card so that if the user
 * clicks on a school card, then clicks the back button to return to the map view,
 * they are returned to the same place on the map that they were at when they
 * clicked on the school card originally whether in map or list view and with
 * correct school selected.
 *
 * Props:
 *  - isMapView: boolean indicating whether the map view is currently active
 *  - selectedSchool: School object representing the currently selected school
 *  - setIsMapView: function to set the isMapView state (toggle between map and list view)
 *  - setSelectedSchool: function to set the selectedSchool state (show/hide school card)     
 */ 

interface MapContextType {
  isMapView: boolean;
  selectedSchool: School | null;
  setIsMapView: (isMap: boolean) => void;
  setSelectedSchool: (school: School | null) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMapView, setIsMapView] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  return (
    <MapContext.Provider value={{ isMapView, selectedSchool, setIsMapView, setSelectedSchool }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};
