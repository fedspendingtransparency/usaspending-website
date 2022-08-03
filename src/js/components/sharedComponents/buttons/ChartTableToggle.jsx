/**
 * ChartTableToggle.jsx
 * Created by Brian Petway 08/02/22
 */

import React from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    active: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    leftIcon: PropTypes.string.isRequired,
    rightIcon: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    changeView: PropTypes.func
};

const defaultProps = {
    disabled: false
};

const ChartTableToggle = ({
    active,
    value,
    label,
    leftIcon,
    rightIcon,
    disabled,
    changeView
}) => {
    let activeClass = '';
    if (active === label) {
        activeClass = ' active';
    }
    const buttonClick = () => {
        changeView(label);
    };

    return (
        <div className="chart-table-toggle" >
            <button
                className={`toggle-button${activeClass}`}
                value="chart"
                title="chart"
                aria-label="chart"
                onClick={buttonClick}
                disabled={disabled}>
                <FontAwesomeIcon size="lg" icon={leftIcon} />
            </button>
            <button
                className={`toggle-button${activeClass}`}
                value="table"
                title="table"
                aria-label="table"
                onClick={buttonClick}
                disabled={disabled}>
                <FontAwesomeIcon size="lg" icon={rightIcon} />
            </button>
        </div>
    );
};

ChartTableToggle.propTypes = propTypes;
ChartTableToggle.defaultProps = defaultProps;
export default ChartTableToggle;
