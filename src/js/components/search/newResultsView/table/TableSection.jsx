/**
 * TableSection.jsx
 */

import React from "react";
import PropTypes from "prop-types";
import ResultsTableContainer from "../../../../containers/search/newResultsView/ResultsTableContainer";

import PlaceholderComponent from "../PlaceholderComponent";
import TableDsm from "./TableDsm";

const propTypes = {
    awardTableHasLoaded: PropTypes.bool,
    subaward: PropTypes.bool
};

const TableSection = ({ awardTableHasLoaded, subaward }) => {
    const wrapperProps = {
        sectionTitle: 'Prime Award Results',
        dsmContent: <TableDsm subaward={subaward} />,
        sectionName: 'table'
    };

    return (
        <div id="search-page-component" className="awards">
            {awardTableHasLoaded ?
                <ResultsTableContainer
                    wrapperProps={wrapperProps}
                    subaward={subaward}
                    awardTableHasLoaded={awardTableHasLoaded} />
                :
                <PlaceholderComponent className="awards" />
            }
        </div>
    );
};

TableSection.propTypes = propTypes;
export default TableSection;
