import { useEffect, useRef, useState } from "react";
import { isCancel } from "axios";

// https://tkdodo.eu/blog/why-you-want-react-query
const useQuery = ({ request }) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const requestRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            setLoading(true);
            setError(false);
        }

        if (requestRef.current) requestRef.current.cancel();

        requestRef.current = request;

        requestRef.current.promise
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch');
                }
                return res.json();
            })
            .then((res) => {
                if (isMounted) setData(res);
            })
            .catch((err) => {
                if (!isCancel(err) && isMounted) {
                    console.error('Query error:', err);
                    setError(true);
                    setData(undefined);
                }
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [request]);

    return { loading, error, data };
};

export default useQuery;
