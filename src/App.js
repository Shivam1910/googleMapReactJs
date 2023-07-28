import React, { useState } from 'react';
import MapDirectionsComponent from './MapDirectionsComponent';
import axios from 'axios';

const App = () => {
  const [origin, setOrigin] = useState({ lat: 27.237696, lng: 77.838142 }); // Set initial origin coordinates
  const [destination, setDestination] = useState({ lat: 26.922070, lng: 75.778885 }); // Set initial destination coordinates

  const handleOriginChange = async (event) => {
    const { name, value } = event.target;
    // Use the Google Maps Geocoding API to get the coordinates for the entered city name
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: value,
        key: 'AIzaSyBZdcYAlXtyh5nHIaFvnFVXG8A6Kkx69lA', // Replace with your actual API key
      },
    });

    const location = response.data.results[0]?.geometry?.location;
    if (location) {
      setOrigin((prevOrigin) => ({
        ...prevOrigin,
        [name]: location.lat,
      }));
    }
  };

  const handleDestinationChange = async (event) => {
    const { name, value } = event.target;
    // Use the Google Maps Geocoding API to get the coordinates for the entered city name
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: value,
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your actual API key
      },
    });

    const location = response.data.results[0]?.geometry?.location;
    if (location) {
      setDestination((prevDestination) => ({
        ...prevDestination,
        [name]: location.lat,
      }));
    }
  };

  return (
    <div>
      <h1>Google Maps Directions and View</h1>
      <div>
        <label>Origin City:</label>
        <input type="text" name="lat" value={origin.lat} onChange={handleOriginChange} />
        <label>Destination City:</label>
        <input type="text" name="lng" value={origin.lng} onChange={handleDestinationChange} />
      </div>
      <div>
        <label>Destination City:</label>
        <input type="text" name="lat" value={destination.lat} onChange={handleOriginChange} />
        <label>Destination City:</label>
        <input type="text" name="lng" value={destination.lng} onChange={handleDestinationChange} />
      </div>
      <MapDirectionsComponent
        origin={origin}
        destination={destination}
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} // Replace with your actual API key
      />
    </div>
  );
};

export default App;
