//! React Rule => Functions starting with (use) are hooks
//! You need to name the function starting with (use)
//!
//! Any React Hook must be called
//! --- (1) at the top level of React function component
//! --- (2) at a custom React Hook function
//! It can't be nested inside if condition or callback ... etc
import {useEffect, useState} from "react";

export default function useFetch(fetchFn, initialValue) {
    //! You can use other hooks inside your custom hook
    //!
    //! Any State Change happens inside your hook will directly affect the parent component that uses that hook
    const [fetchedData, setFetchedData] = useState(initialValue)
    const [isFetching, setIsFetching] = useState()
    const [error, setError] = useState()
    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setFetchedData(data);
            } catch (err) {
                setError({ message : err.message || 'Failed to fetch data.'});
            }
            setIsFetching(false);
        }

        fetchData();
    }, [fetchFn])

    //! You can group outputs into an array or an object , it's up to you
    return {
        isFetching,
        fetchedData,
        error
    }
}