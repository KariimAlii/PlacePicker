import {useEffect, useRef, useState} from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from "./loc.js";

function App() {
    const modal = useRef();
    const selectedPlace = useRef();
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [pickedPlaces, setPickedPlaces] = useState([]);

    // useEffect is executed after the component function execution finished
    // when you setAvailablePlaces => update state => re-execution of component
    // the useEffect will be re-executed if and only if one of its dependencies change
    useEffect(
        () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const sortedPlaces = sortPlacesByDistance(
                        AVAILABLE_PLACES,
                        position.coords.latitude,
                        position.coords.longitude
                    );

                    setAvailablePlaces(sortedPlaces);
                }
            );
        },
        [] // array of dependencies of this effect function
    )


    function handleStartRemovePlace(id) {
        modal.current.open();
        selectedPlace.current = id;
    }

    function handleStopRemovePlace() {
        modal.current.close();
    }

    function handleSelectPlace(id) {
        setPickedPlaces((prevPickedPlaces) => {
            if (prevPickedPlaces.some((place) => place.id === id)) {
                return prevPickedPlaces;
            }
            const place = AVAILABLE_PLACES.find((place) => place.id === id);
            return [place, ...prevPickedPlaces];
        });

        // It's a side effect but you can't use useEffect() here
        // because react hooks must be used directly on the top level of component function
        const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
        if(storedIds.indexOf(id) === -1) {
            localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));
        }
    }

    function handleRemovePlace() {
        setPickedPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
        );
        modal.current.close();
    }

    return (
        <>
            <Modal ref={modal}>
                <DeleteConfirmation
                    onCancel={handleStopRemovePlace}
                    onConfirm={handleRemovePlace}
                />
            </Modal>

            <header>
                <img src={logoImg} alt="Stylized globe" />
                <h1>PlacePicker</h1>
                <p>
                    Create your personal collection of places you would like to visit or
                    you have visited.
                </p>
            </header>
            <main>
                <Places
                    title="I'd like to visit ..."
                    fallbackText={'Select the places you would like to visit below.'}
                    places={pickedPlaces}
                    onSelectPlace={handleStartRemovePlace}
                />
                <Places
                    title="Available Places"
                    places={availablePlaces}
                    fallbackText="Sorting places by distance..."
                    onSelectPlace={handleSelectPlace}
                />
            </main>
        </>
    );
}

export default App;
