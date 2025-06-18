import React, { useRef, useState } from "react";
import Modal from "./components/Modal";
import DeleteConfirmation from "./components/DeleteConfirmation";
import { AVAILABLE_PLACES } from "./data";
  
function App() {
    const modal = useRef();
    const selectedPlace = useRef();
    const [pickedPlaces, setPickedPlaces] = useState([]);

    function handleStartRemovePlace(id) {
        modal.current.open();
        selectedPlace.current = id;
    };

    function handleStopRemovePlace() {
        modal.current.close();
    };

    function handleSelectPlace(id) {
        setPickedPlaces((prevPickedPlaces) => {
            if (prevPickedPlaces.some((place) => place.id === id)) {
                return prevPickedPlaces;
            };
            const place = AVAILABLE_PLACES.find((place) => place.id === id);
            return [place, ...prevPickedPlaces];
        });
    };

    function handleRemovePlace() {
        setPickedPlaces((prevPickedPlaces) => 
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
        );
        modal.current.close();
    };


    return (
        <>
            <Modal ref={modal}>
                <DeleteConfirmation 
                    onCancel={handleStopRemovePlace}
                    onConfirm={handleRemovePlace}
                />
            </Modal>
        </>
    );
};

export default App;