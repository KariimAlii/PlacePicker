import Places from "./Places.jsx";
import {useEffect, useState} from "react";
import ErrorPage from "./ErrorPage.jsx";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../proxies.js";
import useFetch from "../hooks/useFetch.js";

//! using async is not allowed for component functions
export default function AvailablePlaces({ onSelectPlace }) {
    //! Fetching Data : Data State , Loading State , Error State
    const [availablePlaces, setAvailablePlaces] = useState([])
    const [isFetching, setIsFetching] = useState([])
    const [error, setError] = useState()
    //! Available Places needs to be fetched from backend
    //! This Effect will be executed once after the execution of component function

    useFetch()


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