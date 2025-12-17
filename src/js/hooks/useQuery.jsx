import { useCallback, useRef, useState } from "react";
import { isCancel } from "axios";

// https://tkdodo.eu/blog/why-you-want-react-query
const useQuery = () => {
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

    return {
        loading, error, data, fetchData
    };
};

export default useQuery;
