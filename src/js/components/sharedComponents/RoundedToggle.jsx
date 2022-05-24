/**
 * RoundedToggle.jsx
 * created by Nick Torres 5/5/2022
 */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string
};

const RoundedToggle = ({
    label
}) => (
    <div className="rounded-toggle__wrapper">
        <p className="rounded-toggle__label">{label}</p>
        <label className="rounded-toggle__switch">
            <input type="checkbox" />
            <span className="rounded-toggle__slider rounded-toggle__round" />
        </label>
    </div>
);

RoundedToggle.propTypes = propTypes;
export default RoundedToggle;
