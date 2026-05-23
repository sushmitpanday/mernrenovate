import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const LocationSelector = ({ onLocationSelect }) => {
  return (
    <div className="location-selector-container">
      <GooglePlacesAutocomplete
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} // Vite mein 'VITE_' prefix use hota hai
        autocompletionRequest={{
          componentRestrictions: { country: ['au'] }, // Australia restriction
          types: ['geocode'],
        }}
        selectProps={{
          placeholder: 'Search your suburb or postcode...',
          onChange: (value) => {
            console.log("Selected Location:", value);
            onLocationSelect(value);
          },
        }}
      />
    </div>
  );
};

export default LocationSelector;