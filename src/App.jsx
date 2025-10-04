import {useCallback, useRef, useState} from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import {updateUserPlaces} from "./proxies.js";




function App() {
    const selectedPlace = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pickedPlaces, setPickedPlaces] = useState([]);




    function handleStartRemovePlace(id) {
        setIsModalOpen(true);
        selectedPlace.current = id;
    }

    function handleStopRemovePlace() {
        setIsModalOpen(false);
    }

    async function handleSelectPlace(selectedPlace) {
        //! Problem : Optimistic Updating
        setPickedPlaces((prevPickedPlaces) => {
            if(!prevPickedPlaces) {
                prevPickedPlaces = [];
            }
            if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
                return prevPickedPlaces;
            }
            return [selectedPlace, ...prevPickedPlaces];
        });

        try {
            await updateUserPlaces([selectedPlace, ...pickedPlaces]);
        } catch (err) {
            //! Solution : If something went wrong => we rollback the optimistic update
            setPickedPlaces(pickedPlaces);
        }

    }

    // Using the useCallback Hook , this inner function handleRemovePlace is not recreated
    // every time the component functions gets re-executed
    const handleRemovePlace = useCallback(function handleRemovePlace() {
        setPickedPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
        );

        setIsModalOpen(false);


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
