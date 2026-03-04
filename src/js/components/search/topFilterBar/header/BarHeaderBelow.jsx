import React, { useMemo } from "react";
import { Button } from "data-transparency-ui";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    filterCount: PropTypes.number,
    expandedFilters: PropTypes.bool,
    setExpandedFilters: PropTypes.func
};

const BarHeaderBelow = ({ filterCount, expandedFilters, setExpandedFilters }) => {
    /* TODO: change these icons to font awesome 7 */
    const closeIcon = useMemo(() => (<FontAwesomeIcon icon="times" />), []);
    const chevronIcon = useMemo(() => (
        <FontAwesomeIcon icon={expandedFilters ? "chevron-up" : "chevron-down"} />
    ), [expandedFilters]);

    const removeOnClick = () => console.log("Remove Selected Filters");
    const collapseOnClick = () => setExpandedFilters((prevState) => !prevState);

    return (
        <div className="below-line">
            <h2
                className="header-title"
                id="top-filter-bar-title">
                {`${filterCount} Active Filter${filterCount !== 1 ? 's' : ''}:`}
            </h2>
            <div className="filter-buttons">
                <Button
                    onClick={removeOnClick}
                    onKeyUp={removeOnClick}
                    copy="Remove Selected Filters"
                    buttonTitle="filter modal"
                    buttonSize="sm"
                    buttonType="text"
                    backgroundColor="light"
                    imageAlignment="right"
                    image={closeIcon} />
                <Button
                    onClick={collapseOnClick}
                    onKeyUp={collapseOnClick}
                    copy={`${expandedFilters ? "Collapse" : "Expand"} Active Filters`}
                    buttonTitle="filter modal"
                    buttonSize="sm"
                    buttonType="text"
                    backgroundColor="light"
                    imageAlignment="right"
                    image={chevronIcon} />
            </div>
        </div>
    );
};

BarHeaderBelow.propTypes = propTypes;
export default BarHeaderBelow;
