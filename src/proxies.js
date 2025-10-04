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