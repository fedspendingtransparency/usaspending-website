/**
 * IndividualSubmit.jsx
 * Created by Kevin Li 12/7/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Search } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    label: PropTypes.string,
    accessibility: PropTypes.object,
    onKeyDown: PropTypes.func
};

const IndividualSubmit = ({
    className,
    disabled,
    onClick,
    label,
    accessibility,
    onKeyDown = () => {}
}) => (
    <button
        className={className}
        disabled={disabled}
        onClick={onClick}
        title={label}
        aria-label={label}
        onKeyDown={onKeyDown}
        {...accessibility}>
        <div className="icon">
            <Search alt={label} />
        </div>
    </button>
);

IndividualSubmit.propTypes = propTypes;

export default IndividualSubmit;
