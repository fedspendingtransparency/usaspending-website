/**
 * TableSection.jsx
 */

import React from "react";
import PropTypes from "prop-types";
import ResultsTableContainer from "../../../../containers/search/newResultsView/ResultsTableContainer";

import TableDsm from "./TableDsm";

const propTypes = {
    subaward: PropTypes.bool,
    setTableLoaded: PropTypes.func
};

const TableSection = ({ subaward, setTableLoaded }) => {
    const wrapperProps = {
        sectionTitle: 'Prime Award Results',
        dsmContent: <TableDsm subaward={subaward} />,
        sectionName: 'table'
    };

    return (
        <div id="search-page-component" className="awards">
            <ResultsTableContainer
                wrapperProps={wrapperProps}
                subaward={subaward}
                setTableLoaded={setTableLoaded} />
        </div>
    );
};

TableSection.propTypes = propTypes;
export default TableSection;
