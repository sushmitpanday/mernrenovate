import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const LocationSelector = ({ onLocationSelect }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      autoComplete: true,
      autoCompleteDelay: 250,
      searchLabel: 'Enter address...',
    });

    map.addControl(searchControl);
    
    // Yahan event listener sahi hona chahiye
    map.on('geosearch/showlocation', (e) => {
      onLocationSelect(e.location);
    });

    return () => map.removeControl(searchControl);
  }, [map, onLocationSelect]);

  return null;
};
export default LocationSelector;