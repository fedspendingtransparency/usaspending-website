/**
 * TableSection.jsx
 */

import React from "react";
import PropTypes from "prop-types";
import ResultsTableContainer from "../../../../containers/search/newResultsView/ResultsTableContainer";

import TableDsm from "./TableDsm";

const propTypes = {
    subaward: PropTypes.bool
};

const TableSection = ({ subaward }) => {
    const wrapperProps = {
        sectionTitle: subaward ? 'Subaward Results' : 'Prime Award Results',
        dsmContent: <TableDsm subaward={subaward} />,
        sectionName: 'table'
    };

    return (
        <div id="search-page-component" className="awards">
            <ResultsTableContainer
                wrapperProps={wrapperProps}
                subaward={subaward} />
        </div>
    );
};

TableSection.propTypes = propTypes;
export default TableSection;
