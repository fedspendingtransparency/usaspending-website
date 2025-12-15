/**
 * AwardBreakdownContainer.jsx
 * Created by Lizzie Salita 5/16/18
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { reduce } from 'lodash-es';

import * as StateHelper from 'features/state/stateHelper';

import AwardBreakdownTreeMap from
    'components/state/visualizations/awardBreakdown/AwardBreakdownTreeMap';
import AwardBreakdownTable from
    'components/state/visualizations/awardBreakdown/AwardBreakdownTable';
import BaseAwardBreakdownRow from 'models/v2/state/BaseAwardBreakdownRow';
import { FlexGridCol } from "data-transparency-ui";

const propTypes = {
    fy: PropTypes.string,
    id: PropTypes.string,
    toggleState: PropTypes.bool
};

const AwardBreakdownContainer = ({ fy, id, toggleState }) => {
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    // const [inFlight, setInFlight] = useState(true);
    const [awardBreakdown, setAwardBreakdown] = useState([]);
    const [rows, setRows] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [hasNegatives, setHasNegatives] = useState(false);
    const [data, setData] = useState([]);
    const request = useRef(null);

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

        const newHasNegatives = positiveAmount > totalAmount;

        // Sort the results by amount
        const sortedResults = results.sort((rowA, rowB) =>
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
    }, [toggleState, totalAmount]);

    useEffect(() => {
        parseData(data);
    }, [data, parseData, toggleState]);

    useEffect(() => {
        if (!id || id === '' || !fy || fy === '') {
            // invalid ID or fiscal year
            return;
        }

        if (request.current) {
            // A request is currently in-flight, cancel it
            request.current.cancel();
        }

        request.current = StateHelper.fetchAwardBreakdown(id, fy);

        // setInFlight(true);

        request.current.promise
            .then((res) => {
                request.current = null;

                // setInFlight(false);
                setData(res.data);

                parseData(res.data);
            })
            .catch((err) => {
                request.current = null;

                // setInFlight(false);

                if (!isCancel(err)) {
                    console.log(err);
                }
            });
    }, [fy, id, parseData]);

    return (
        <FlexGridCol width={8} desktop={8} tablet={12} mobile={12}>
            <div className="state-section__viz award-breakdown" id="award">
                <div className="award-breakdown__content">
                    <AwardBreakdownTreeMap
                        activeFY={fy}
                        awardBreakdown={awardBreakdown}
                        totalAmount={totalAmount}
                        toggleState={toggleState} />
                    <AwardBreakdownTable
                        awardBreakdown={rows}
                        hasNegatives={hasNegatives}
                        toggleState={toggleState} />
                </div>
            </div>
        </FlexGridCol>
    );
};

AwardBreakdownContainer.propTypes = propTypes;
export default AwardBreakdownContainer;
