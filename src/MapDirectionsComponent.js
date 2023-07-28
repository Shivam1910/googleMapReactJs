import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const MapDirectionsComponent = ({ origin, destination, apiKey }) => {
    const [directions, setDirections] = useState(null);

    useEffect(() => {
        const directionsOptions = {
            destination: destination,
            origin: origin,
            travelMode: 'DRIVING'
        };

        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(directionsOptions, (response, status) => {
            if (status === 'OK') {
                setDirections(response);
            } else {
                console.error('Directions request failed with status: ', status);
            }
        });
    }, [origin, destination]);

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap mapContainerStyle={containerStyle} center={destination} zoom={15}>
                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapDirectionsComponent;

// googleMapsApiKey: 'AIzaSyBZdcYAlXtyh5nHIaFvnFVXG8A6Kkx69lA',