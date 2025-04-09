/**
 * TableSection.jsx
 */

import React from "react";
import PropTypes from "prop-types";
import ResultsTableContainer from "../../../../containers/search/newResultsView/ResultsTableContainer";

import TableDsm from "./TableDsm";

const propTypes = {
    subaward: PropTypes.bool,
    tabData: PropTypes.object,
    hash: PropTypes.string,
    spendingLevel: PropTypes.string
};

const TableSection = ({
    subaward, tabData, hash, spendingLevel
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
        dsmContent: <TableDsm subaward={subaward} />,
        sectionName: 'table'
    };

    return (
        <div id="search-page-component" className="awards">
            <ResultsTableContainer
                tabData={tabData}
                wrapperProps={wrapperProps}
                subaward={subaward}
                hash={hash} />
        </div>
    );
};

TableSection.propTypes = propTypes;
export default TableSection;
