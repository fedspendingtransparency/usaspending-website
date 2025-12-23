import { useCallback, useEffect, useRef, useState } from "react";
import { isCancel } from "axios";

// https://tkdodo.eu/blog/why-you-want-react-query

/**
 * useQueryTemp
 * - a custom hook for handling simple data fetching with data, loading, and error states
 * @returns {object} An object containing a fetchData function, as well as the data, loading, and error states
 */
const useQueryTemp = (callbackFunc = () => {}) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const requestRef = useRef(null);

    const fetchData = useCallback((request, params = null) => {
        setLoading(true);
        setError(false);

        if (requestRef.current) requestRef.current.cancel();

        requestRef.current = request(params);

        requestRef.current.promise
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.error('Query error:', err);
                    setError(true);
                    setData(undefined);
                }
            })
            .finally(() => {
                setLoading(false);
                requestRef.current = null;
            });
    }, []);

    useEffect(() => {
        if (data) {
            callbackFunc(data);
        }
    }, [data, callbackFunc]);

    return {
        loading, error, data, fetchData
    };
};

export default useQueryTemp;
