import Places from "./Places.jsx";
import {useEffect, useState} from "react";

//! using async is not allowed for component functions
export default function AvailablePlaces({ onSelectPlace }) {
    const [availablePlaces, setAvailablePlaces] = useState([])
    //! Available Places needs to be fetched from backend
    //! This Effect will be executed once after the execution of component function
    useEffect(async () => {
        await fetch('http://localhost:3000/places')

    }, [])



    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    )
}