import Places from "./Places.jsx";
import {useState} from "react";

const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
    const [availablePlaces, setAvailablePlaces] = useState(places)
    //! Available Places needs to be fetched from backend
    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    )
}