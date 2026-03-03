import React, { useMemo } from "react";
import { Button } from "data-transparency-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const propTypes = { filterCount: PropTypes.number };

const BarHeaderBelow = ({ filterCount }) => {
    const image = useMemo(() => (<FontAwesomeIcon icon="window-restore" />), []);

    return (
        <div className="below-line">
            <h2
                className="header-title"
                id="top-filter-bar-title">
                {`${filterCount} Active Filter${filterCount !== 1 ? 's' : ''}:`}
            </h2>
            <Button
                onClick={() => console.log("Remove Selected Filters")}
                onKeyUp={() => console.log("Remove Selected Filters")}
                copy="Remove Selected Filters"
                buttonTitle="filter modal"
                buttonSize="sm"
                buttonType="text"
                backgroundColor="light"
                imageAlignment="right"
                image={image} />
            <Button
                onClick={() => console.log('Collapse Active Filters')}
                onKeyUp={() => console.log('Collapse Active Filters')}
                copy="Collapse Active Filters"
                buttonTitle="filter modal"
                buttonSize="sm"
                buttonType="text"
                backgroundColor="light"
                imageAlignment="right"
                image={image} />
        </div>
    );
};

BarHeaderBelow.propTypes = propTypes;
export default BarHeaderBelow;
