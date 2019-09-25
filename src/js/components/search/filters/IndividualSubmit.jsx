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

const defaultProps = {
    onKeyDown: () => {}
};

const IndividualSubmit = (props) => (
    <button
        className={props.className}
        disabled={props.disabled}
        onClick={props.onClick}
        title={props.label}
        aria-label={props.label}
        onKeyDown={props.onKeyDown}
        {...props.accessibility}>
        <div className="icon">
            <Search alt={props.label} />
        </div>
    </button>
);

IndividualSubmit.propTypes = propTypes;
IndividualSubmit.defaultProps = defaultProps;

export default IndividualSubmit;
