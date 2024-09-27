import React, { createContext, useState, useContext } from 'react';
import { School } from '@/types/school';

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
