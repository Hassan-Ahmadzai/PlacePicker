import { useEffect, useRef, useState } from "react";

import Places from "./components/Places";
import { AVAILABLE_PLACES } from "./data";
import Modal from "./components/Modal";
import DeleteConfirmation from "./components/DeleteConfirmation";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc";


const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storedIds.map((id) =>
    AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
    const modal = useRef();
    const selectedPlace = useRef();
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const sortedPlaces = sortPlacesByDistance(
                AVAILABLE_PLACES,
                position.coords.latitude,
                position.coords.longitude,
            );
    
            setAvailablePlaces(sortedPlaces);  
        });
    }, []);

    function handleStartRemovePlace(id) {
        modal.current.open();
        selectedPlace.current = id;
    };

    function handleStopRemovePlace() {
        modal.current.close();
    };

    

    function handleRemovePlace() {
        setPickedPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
        );
        modal.current.close();

        const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
        localStorage.setItem(
            'selectedPlaces',
            JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
        );
    };

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
                    fallbackText={"Select the places you would like to visit below."}
                    places={pickedPlaces}
                    onSelectPlace={handleStartRemovePlace}
                />
                
                <Places
                    title="Available Places"
                    places={availablePlaces}
                    fallbackText="Sorting places by distance ..."
                    onSelectPlace={handleSelectPlace}
                />
            </main>
        </>
    );
};

export default App;
