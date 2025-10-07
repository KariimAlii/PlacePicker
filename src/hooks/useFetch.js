//! React Rule => Functions starting with (use) are hooks
//! You need to name the function starting with (use)
//!
//! Any React Hook must be called
//! --- (1) at the top level of React function component
//! --- (2) at a custom React Hook function
//! It can't be nested inside if condition or callback ... etc
import {useEffect} from "react";
import {fetchAvailablePlaces} from "../proxies.js";
import {sortPlacesByDistance} from "../loc.js";

export default function useFetch() {
    //! You can use other hooks inside your custom hook
    useEffect(() => {
        async function fetchPlaces() {
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
}