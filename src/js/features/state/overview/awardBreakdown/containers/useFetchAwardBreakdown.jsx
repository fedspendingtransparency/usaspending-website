/**
 * useFetchAwardBreakdown.jsx
 * Created by Andrea Blackwell 02/15/26
 */

import { useCallback, useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from "@tanstack/react-query";
import { fetchAwardBreakdown } from 'apis/state';
import { reduce } from "lodash-es";
import BaseAwardBreakdownRow from "models/v2/state/BaseAwardBreakdownRow";

export const useFetchAwardBreakdown = (id, fy, toggleState) => {
    const [parsedData, setParsedData] = useState(null);
    const [parsedDataOutlays, setParsedDataOutlays] = useState(null);

    const {
        data, isSuccess, isLoading, error
    } = useQuery({
        queryKey: [`awardBreakdownStateProfile${id}${fy}`],
        queryFn: () => fetchAwardBreakdown(id, fy).promise,
        enabled: !!id,
        staleTime: 60000
    });

    const dataByAwardType = useCallback((results, amountType) => {
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

        return ({
            results,
            newRows,
            newTotalAmount,
            newHasNegatives
        });
    });

    const parseData = useCallback((results) => {
        // Sum all amounts in the returned award types
        const withOutlays = dataByAwardType(results, "total_outlays");
        setParsedDataOutlays(withOutlays);
        const withoutOutlays = dataByAwardType(results, "amount");
        setParsedData(withoutOutlays);
    });

    useEffect(() => {
        if (isSuccess && Object.keys(data?.data).length > 0) {
            parseData(data?.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isSuccess, toggleState]);

    return {
        parsedData, parsedDataOutlays, isSuccess, isLoading, error
    };
};

export default useFetchAwardBreakdown;
