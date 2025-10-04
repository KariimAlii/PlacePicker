import {useCallback, useEffect, useRef, useState} from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from "./loc.js";
import AvailablePlaces from "./components/AvailablePlaces.jsx";


// Case 1 : You can use useEffect() but you don't need it
// because you need to execute this logic only once
// and you don't need the component function to be executed to execute this logic
const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];

const storedPlaces = storedIds
    .map(
        id => AVAILABLE_PLACES.find(place => place.id === id)
    );

function App() {
    const selectedPlace = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

    // useEffect is executed after the component function execution finished
    // when you setAvailablePlaces => update state => re-execution of component
    // the useEffect will be re-executed if and only if one of its dependencies change

    // Case 2 : You need to use useEffect() because your logic needs to be executed after component initialization
    // and you update some state that re-executes the component function
    // so that without useEffect() you will go into infinite loop
    useEffect(
        () => {
            // (AVAILABLE_PLACES) or any such values are not considered dependencies
            // useEffect() only cares about dependencies that will cause the component
            // function to re-execute again
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
        setIsModalOpen(true);
        selectedPlace.current = id;
    }

    function handleStopRemovePlace() {
        setIsModalOpen(false);
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

        // Case 3 : a side effect that can't use useEffect() hook
        // because useEffect() can only be used on the top level of component function
        const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
        if(storedIds.indexOf(id) === -1) {
            localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));
        }
    }

    // Using the useCallback Hook , this inner function handleRemovePlace is not recreated
    // every time the component functions gets re-executed
    const handleRemovePlace = useCallback(function handleRemovePlace() {
        setPickedPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
        );

        setIsModalOpen(false);

        // Case 4 : a side effect that can't use useEffect() hook
        // because useEffect() can only be used on the top level of component function
        const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
        localStorage.setItem(
            'selectedPlaces',
            JSON.stringify(
                storedIds.filter(id => id !== selectedPlace.current)
            )
        );
    }, [])


    return (
        <>
            <Modal open={isModalOpen}>
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
                <AvailablePlaces
                    onSelectPlace={handleSelectPlace}
                />
            </main>
        </>
    );
}

export default App;
