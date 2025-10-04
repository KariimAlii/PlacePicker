import Places from "./Places.jsx";
import {useEffect, useState} from "react";

//! using async is not allowed for component functions
export default function AvailablePlaces({ onSelectPlace }) {
    const [availablePlaces, setAvailablePlaces] = useState([])
    const [isFetching, setIsFetching] = useState([])
    //! Available Places needs to be fetched from backend
    //! This Effect will be executed once after the execution of component function
    useEffect(() => {
        async function fetchPlaces() {
            setIsFetching(true);
            const response = await fetch('http://localhost:3000/places');
            const data = await response.json();
            setAvailablePlaces(data.places);
            setIsFetching(false);
        }

        fetchPlaces();
    }, [])



    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={isFetching}
            loadingText="Fetch places data ...."
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    )
}