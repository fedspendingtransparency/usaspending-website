import { useEffect, useRef, useState, useCallback } from "react";
import { fetchBreakdown } from "helpers/explorerHelper";

const budgetCategories = [
    { name: "Medicare" },
    { name: "National Defense" },
    { name: "Social Security" },
    { name: "Transportation" },
    { name: "Agriculture" },
    { name: "Veterans Benefits and Services", label: "Veterans Benefits" },
    { name: "Energy" }, { name: "Net Interest" }
];

const selectRandomIndex = () => Math.floor(Math.random() * 10);

const useFetchBreakdown = (fy, period) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const request = useRef(null);
    const [budgetData, setBudgetData] = useState([]);
    const [budgetTotal, setBudgetTotal] = useState([]);
    const [randomIndex, setRandomIndex] = useState(0);

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
                const budgetDataArr = [];
                setBudgetTotal(res?.data?.total);
                res?.data?.results?.forEach((item) => {
                    const budgetCategoriesIndex = budgetCategories
                        .map((e) => e.name).indexOf(item.name);
                    if (budgetCategoriesIndex > -1) {
                        const name = 'label' in budgetCategories[budgetCategoriesIndex] ?
                            budgetCategories[budgetCategoriesIndex].label :
                            budgetCategories[budgetCategoriesIndex].name;
                        budgetDataArr.push({
                            name,
                            amount: item.amount
                        });
                    }
                });
                setRandomIndex(selectRandomIndex());
                setBudgetData(budgetDataArr);
                setLoading(false);
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
        budgetData, budgetTotal, randomIndex, error, loading
    };
};

export default useFetchBreakdown;
