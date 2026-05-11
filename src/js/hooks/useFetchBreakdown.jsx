import { useEffect, useRef, useState, useCallback } from "react";
import { fetchBreakdown } from "helpers/explorerHelper";

const selectRandomIndex = () => Math.floor(Math.random() * 10);

const useFetchBreakdown = (fy, period) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState([]);
    const [randomIndex, setRandomIndex] = useState(0);
    const request = useRef(null);

    const fetchData = useCallback((latestFy, latestPeriod) => {
        if (request.current) {
            request.current.cancel();
        }

        setError((state) => {
            if (state) return false;
        });
        setLoading((state) => {
            if (!state) return true;
        });

        const params = {
            type: "budget_function",
            filters: {
                fy: latestFy,
                period: latestPeriod
            }
        };

        request.current = fetchBreakdown(params);
        request.current.promise
            .then((res) => {
                setTotal(res?.data?.total);
                setData(res?.data?.results);
                setLoading(false);
                setRandomIndex(selectRandomIndex());
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (fy && period) {
            fetchData(fy, period);
        }
    }, [fy, period, fetchData]);

    return {
        data, total, randomIndex, error, loading
    };
};

export default useFetchBreakdown;
