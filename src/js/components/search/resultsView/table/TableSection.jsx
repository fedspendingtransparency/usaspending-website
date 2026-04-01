/**
 * TableSection.jsx
 */

import React from "react";
import PropTypes from "prop-types";
import ResultsTableContainer from "containers/search/resultsView/ResultsTableContainer";

import TableDsm from "./TableDsm";

const propTypes = {
    tabData: PropTypes.object,
    hash: PropTypes.string,
    spendingLevel: PropTypes.string
};

const TableSection = ({
    tabData, hash, spendingLevel
}) => {
    const sectionTitle = spendingLevel === "awards" ? 'Prime Award Results' : 'Subaward Results';

    const wrapperProps = {
        sectionTitle,
        dsmContent: <TableDsm spendingLevel={spendingLevel} />,
        sectionName: 'table'
    };

    return (
        <div id="search-page-component" className="awards">
            <ResultsTableContainer
                tabData={tabData}
                wrapperProps={wrapperProps}
                hash={hash}
                spendingLevel={spendingLevel} />
        </div>
    );
};

TableSection.propTypes = propTypes;
export default TableSection;
