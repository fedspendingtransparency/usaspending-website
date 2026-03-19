/**
 * AwardBreakdownContainer.jsx
 * Created by Lizzie Salita 5/16/18
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, FlexGridCol, GenericMessage, LoadingMessage } from "data-transparency-ui";

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
        parsedData, isSuccess, isLoading, error
    } = useFetchAwardBreakdown(id, fy, toggleState);


    useEffect(() => {
        if (isSuccess && parsedData) {
            setAwardBreakdown(parsedData?.results);
            setRows(parsedData?.newRows);
            setTotalAmount(parsedData?.newTotalAmount);
            setHasNegatives(parsedData?.newHasNegatives);
        }
    }, [isSuccess, parsedData]);

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
