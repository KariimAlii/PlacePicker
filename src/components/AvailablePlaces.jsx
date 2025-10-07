import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx";
import useFetch from "../hooks/useFetch.js";
import {fetchAvailablePlaces} from "../proxies.js";

//! using async is not allowed for component functions
export default function AvailablePlaces({ onSelectPlace }) {

    //! Any State Change happens inside your hook will directly affect the parent component that uses that hook
    const {isFetching, fetchedData: availablePlaces, error} = useFetch(fetchAvailablePlaces)


    if(error) {
        return (
            <ErrorPage
                title="An error occured!.."
                message={error.message}
            />
        )
    }
    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={isFetching}
            loadingText="Fetch places data ...."
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    )
}