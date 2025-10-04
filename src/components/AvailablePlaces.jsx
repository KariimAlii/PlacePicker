import Places from "./Places.jsx";
import {useState} from "react";

//! using async is not allowed for component functions
export default async function AvailablePlaces({ onSelectPlace }) {
    const [availablePlaces, setAvailablePlaces] = useState([])
    //! Available Places needs to be fetched from backend
    const response = await fetch('http://localhost:3000/places')


    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    )
}