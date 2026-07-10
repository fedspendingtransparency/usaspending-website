/**
 * TopFiveContainer.jsx
 * Created by Kevin Li 5/15/18
 */

import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

import TopFive from "components/sharedComponents/TopFive";
import useFetchSpendingBy from "./useFetchSpendingBy";

const propTypes = {
    type: PropTypes.string,
    category: PropTypes.string,
    agencyData: PropTypes.object
};

const TopFiveContainer = ({ category, type, agencyData }) => {
    const { overview, fy } = useSelector((state) => state.stateProfile);


    const { code, _totalAmount: total } = overview;

    const {
        parsedData, noResults, isLoading, error, dataParams
    } = useFetchSpendingBy(category, code, fy, type);

    return (
        <>
            {!noResults &&
                <TopFive
                    category={category}
                    results={parsedData}
                    total={total}
                    loading={isLoading}
                    error={error}
                    dataParams={dataParams}
                    agencyData={agencyData} />
            }
        </>
    );
};

TopFiveContainer.propTypes = propTypes;
export default TopFiveContainer;
