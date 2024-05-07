/**
 * TableSection.jsx
 */

import React from "react";
import PropTypes from "prop-types";
import ResultsTableContainer from "../../../../containers/search/table/ResultsTableContainer";

const propTypes = {
    awardTableHasLoaded: PropTypes.bool
};

const TableSection = ({ awardTableHasLoaded, subaward }) => (
    <div id="search-page-component" className="award">
        {awardTableHasLoaded && <ResultsTableContainer
            subaward={subaward}
            awardTableHasLoaded={awardTableHasLoaded}
        />}
    </div>
);

TableSection.propTypes = propTypes;
export default TableSection;
