/**
 * TableSection.jsx
 */

import React from "react";
import PropTypes from "prop-types";
import ResultsTableContainer from "../../../../containers/search/newResultsView/ResultsTableContainer";
import { DsmWrapper } from "../DsmWrapper";

const propTypes = {
    awardTableHasLoaded: PropTypes.bool,
    subaward: PropTypes.bool
};

const TableSection = ({ awardTableHasLoaded, subaward }) => {
    const wrapperProps = {
        sectionTitle: 'Prime Award Results',
        dsmContent: <DsmWrapper
            heading={"Prime Award Results:  What's included in this view of the data?"}
            description="Use the map below to break down spending by state, county, or congressional district." />
    };

    return (
        <div id="search-page-component" className="award">
            {awardTableHasLoaded && <ResultsTableContainer
                wrapperProps={wrapperProps}
                subaward={subaward}
                awardTableHasLoaded={awardTableHasLoaded} />}
        </div>
    );
};

TableSection.propTypes = propTypes;
export default TableSection;
