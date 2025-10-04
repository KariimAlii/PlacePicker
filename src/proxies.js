export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const data = await response.json();
    if(!response.ok) {
        //! ok : success status code 200 , 300
        //! otherwise : failure code 400 , 500
        throw new Error('failed to fetch places')
    }
    return data.places;
}

export async function updateUserPlaces(placeIds) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify(placeIds),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = response.json();

    if(!response.ok) {
        //! ok : success status code 200 , 300
        //! otherwise : failure code 400 , 500
        throw new Error('failed to update user places')
    }

    return data.message;
}