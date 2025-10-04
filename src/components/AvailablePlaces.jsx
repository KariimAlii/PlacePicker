import Places from "./Places.jsx";
import {useEffect, useState} from "react";
import ErrorPage from "./ErrorPage.jsx";
import {sortPlacesByDistance} from "../loc.js";

//! using async is not allowed for component functions
export default function AvailablePlaces({ onSelectPlace }) {
    //! Fetching Data : Data State , Loading State , Error State
    const [availablePlaces, setAvailablePlaces] = useState([])
    const [isFetching, setIsFetching] = useState([])
    const [error, setError] = useState()
    //! Available Places needs to be fetched from backend
    //! This Effect will be executed once after the execution of component function
    useEffect(() => {
        async function fetchPlaces() {
            setIsFetching(true);
            try {
                const response = await fetch('http://localhost:3000/places');
                const data = await response.json();
                if(!response.ok) {
                    //! ok : success status code 200 , 300
                    //! otherwise : failure code 400 , 500
                    throw new Error('failed to fetch places')
                }

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const sortedPlaces = sortPlacesByDistance(
                            data.places,
                            position.coords.latitude,
                            position.coords.longitude
                        );

                        setAvailablePlaces(sortedPlaces);
                        setIsFetching(false);
                    }
                );
            } catch (err) {
                setError(err);
                setIsFetching(false);
            }
        }

        fetchPlaces();
    }, [])


    if(error) {
        return (
            <ErrorPage
                title="An error occured!.."
                message={error.message}
            />
        )
    }
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