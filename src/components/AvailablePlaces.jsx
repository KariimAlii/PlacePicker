import Places from "./Places.jsx";
import {useEffect, useState} from "react";
import ErrorPage from "./ErrorPage.jsx";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../proxies.js";

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
            //! const [availablePlaces, setAvailablePlaces] = useState([])
            //! ESLint: React Hook "useState" is called in function "fetchPlaces"
            //! that is neither a React function component nor a custom React Hook function.
            //! React component names must start with an uppercase letter.
            //! React Hook names must start with the word "use".(react-hooks/ rules-of-hooks
            setIsFetching(true);
            try {
                const places = await fetchAvailablePlaces();

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const sortedPlaces = sortPlacesByDistance(
                            places,
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