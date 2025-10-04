import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
    //! Available Places needs to be fetched from backend
    return (
        <Places
            title="Available Places"
            places={[]}
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    )
}