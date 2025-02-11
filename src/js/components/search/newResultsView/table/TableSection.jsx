/**
 * TableSection.jsx
 */

import React from "react";
import PropTypes from "prop-types";
import ResultsTableContainer from "../../../../containers/search/newResultsView/ResultsTableContainer";

import TableDsm from "./TableDsm";

const propTypes = {
    subaward: PropTypes.bool,
    tabData: PropTypes.object
};

const TableSection = ({ subaward, tabData }) => {
    const wrapperProps = {
        sectionTitle: subaward ? 'Subaward Results' : 'Prime Award Results',
        dsmContent: <TableDsm subaward={subaward} />,
        sectionName: 'table'
    };

    return (
        <div id="search-page-component" className="awards">
            <ResultsTableContainer
                tabData={tabData}
                wrapperProps={wrapperProps}
                subaward={subaward} />
        </div>
    );
};

TableSection.propTypes = propTypes;
export default TableSection;
