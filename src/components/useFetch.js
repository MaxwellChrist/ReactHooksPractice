import { useState, useEffect } from "react";

const useFetch = (uri) => {
    //if we get the data
    const [data, setData] = useState()
    // if the data isn't available yet but is loading
    const[loading, setLoading] = useState(true)
    // if there's an error
    const [error, setError] = useState()

    useEffect(() => {
        if(!uri) return
        fetch(uri)
        .then((data) => data.json())
        .then(setData)
        .then(() => setLoading(false))
        .catch(setError)
    }, [uri])

    return {loading, data, error}
}

export default useFetch