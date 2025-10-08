import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx";
import useFetch from "../hooks/useFetch.js";
import {fetchAvailablePlaces} from "../proxies.js";
import {sortPlacesByDistance} from "../loc.js";
import {useEffect} from "react";

//! using async is not allowed for component functions
export default function AvailablePlaces({ onSelectPlace }) {

    //! Any State Change happens inside your hook will directly affect the parent component that uses that hook
    const {
        isFetching,
        fetchedData: availablePlaces,
        setFetchedData: setAvailablePlaces,
        error
    } = useFetch(fetchAvailablePlaces, [])

    useEffect(() => {
        if (availablePlaces.length === 0) return;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const sortedPlaces = sortPlacesByDistance(
                    availablePlaces,
                    position.coords.latitude,
                    position.coords.longitude
                );

                setAvailablePlaces(sortedPlaces);
            },
            (err) => {
                console.error("Could not get location:", err.message);
            }
        );
    }, [availablePlaces, setAvailablePlaces]);

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