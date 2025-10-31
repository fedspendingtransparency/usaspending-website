/**
 * TableSection.jsx
 */

import React from "react";
import PropTypes from "prop-types";
import ResultsTableContainer from "../../../../containers/search/resultsView/ResultsTableContainer";

import TableDsm from "./TableDsm";

const propTypes = {
    tabData: PropTypes.object,
    hash: PropTypes.string,
    spendingLevel: PropTypes.string
};

const TableSection = ({
    tabData, hash, spendingLevel
}) => {
    const sectionTitle = () => {
        switch (spendingLevel) {
            case 'awards': return 'Prime Award Results';
            case 'subawards': return 'Subaward Results';
            default: return 'Transaction Results';
        }
    };

    const wrapperProps = {
        sectionTitle: sectionTitle(),
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
