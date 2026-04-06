/**
 * AwardBreakdownContainer.jsx
 * Created by Lizzie Salita 5/16/18
 */

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, FlexGridCol, GenericMessage, LoadingMessage } from "data-transparency-ui";
import { reduce } from "lodash-es";
import BaseAwardBreakdownRow from "models/v2/state/BaseAwardBreakdownRow";

import AwardBreakdownTreeMap from '../treemap/AwardBreakdownTreeMap';
import AwardBreakdownTable from '../AwardBreakdownTable';
import useFetchAwardBreakdown from "./useFetchAwardBreakdown";

const propTypes = {
    fy: PropTypes.string,
    id: PropTypes.string,
    toggleState: PropTypes.bool
};

const AwardBreakdownContainer = ({ fy, id, toggleState }) => {
    const [awardBreakdown, setAwardBreakdown] = useState([]);
    const [rows, setRows] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [hasNegatives, setHasNegatives] = useState(false);

    const {
        data, isSuccess, isLoading, error
    } = useFetchAwardBreakdown(id, fy);

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
        const sortedResults = results?.sort((rowA, rowB) =>
            rowB[amountType] - rowA[amountType]
        );

        const newRows = sortedResults.map((result) => {
            const row = Object.create(BaseAwardBreakdownRow);
            row.populate(result);
            return row;
        });

        setAwardBreakdown(results);
        setRows(newRows);
        setTotalAmount(newTotalAmount);
        setHasNegatives(newHasNegatives);
    });

    useEffect(() => {
        if (isSuccess && data) {
            const toggleType = toggleState ? "total_outlays" : "amount";
            dataByAwardType([...data.data], toggleType);
        }
    }, [isSuccess, data, toggleState, dataByAwardType]);

    return (
        <FlexGridCol width={8} desktop={8} tablet={12} mobile={12}>
            { isLoading && <LoadingMessage /> }
            { error && <ErrorMessage /> }
            { !isLoading && (awardBreakdown.length === 0 || totalAmount === 0) && <GenericMessage title="No Results" description="This award doesn't contain outlay data." className="no-results" />}
            <div className="state-section__viz award-breakdown" id="award">
                <div className="award-breakdown__content">
                    { !isLoading && !error && (awardBreakdown.length > 0 && totalAmount > 0) && (
                        <>
                            <AwardBreakdownTreeMap
                                activeFY={fy}
                                awardBreakdown={awardBreakdown}
                                totalAmount={totalAmount}
                                toggleState={toggleState} />
                            <AwardBreakdownTable
                                awardBreakdown={rows}
                                hasNegatives={hasNegatives}
                                toggleState={toggleState} />
                        </>
                    )}
                </div>
            </div>
        </FlexGridCol>
    );
};

AwardBreakdownContainer.propTypes = propTypes;
export default AwardBreakdownContainer;
