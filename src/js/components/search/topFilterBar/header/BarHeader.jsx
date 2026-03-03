import React from "react";
import PropTypes from "prop-types";

import BarHeaderAbove from "./BarHeaderAbove";
import BarHeaderBelow from "./BarHeaderBelow";

const propTypes = { filterCount: PropTypes.number };

const BarHeader = ({ filterCount }) => (
    <div className="search-top-filter-header advanced-search">
        <BarHeaderAbove />
        <BarHeaderBelow filterCount={filterCount} />
    </div>
);

BarHeader.propTypes = propTypes;
export default BarHeader;
