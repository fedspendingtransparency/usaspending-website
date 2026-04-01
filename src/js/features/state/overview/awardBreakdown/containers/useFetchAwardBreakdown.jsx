/**
 * useFetchAwardBreakdown.jsx
 * Created by Andrea Blackwell 02/15/26
 */

import { useCallback, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAwardBreakdown } from 'apis/state';
import { reduce } from "lodash-es";
import BaseAwardBreakdownRow from "models/v2/state/BaseAwardBreakdownRow";

export const useFetchAwardBreakdown = (id, fy, toggleState) => {
    const [parsedData, setParsedData] = useState(null);

    const {
        data, isSuccess, isLoading, error
    } = useQuery({
        queryKey: [`awardBreakdownStateProfile${id}${fy}`],
        queryFn: () => fetchAwardBreakdown(id, fy).promise,
        enabled: !!id,
        staleTime: 60000
    });

    const parseData = useCallback((results) => {
        const amountType = toggleState ? "total_outlays" : "amount";
        // Sum all amounts in the returned award types
        const newTotalAmount = reduce(
            results,
            (sum, awardType) => sum + parseFloat(awardType[amountType]),
            0
        );

        // Sum only the positive amounts in the returned award types
        const positiveAmount = reduce(
            results,
            (sum, awardType) => {
                if (parseFloat(awardType.amount) >= 0) {
                    return sum + parseFloat(awardType[amountType]);
                }
                return sum;
            },
            0
        );

        const newHasNegatives = positiveAmount > newTotalAmount;

        // Sort the results by amount
        const sortedResults = results.sort((rowA, rowB) =>
            rowB[amountType] - rowA[amountType]
        );

        const newRows = sortedResults.map((result) => {
            const row = Object.create(BaseAwardBreakdownRow);
            row.populate(result);
            return row;
        });

        setParsedData({
            results,
            newRows,
            newTotalAmount,
            newHasNegatives
        });
    });

    useEffect(() => {
        if (isSuccess && Object.keys(data?.data).length > 0) {
            parseData(data?.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isSuccess]);

    return {
        parsedData, isSuccess, isLoading, error
    };
};

export default useFetchAwardBreakdown;
