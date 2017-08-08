/**
 * BreadcrumbItem.jsx
 * Created by Kevin Li 8/7/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    type: PropTypes.string,
    step: PropTypes.number,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    nextActive: PropTypes.bool,
    goToStep: PropTypes.func
};

const BreadcrumbItem = (props) => {
    let active = '';
    if (props.active) {
        active = 'active';
    }

    let nextActive = '';
    if (props.nextActive) {
        nextActive = 'next-active';
    }

    let notMid = '';
    if (props.type === 'last') {
        notMid = 'hide';
    }

    return (
        <div className={`breadcrumb-item ${active}`}>
            <button
                className="breadcrumb-content"
                onClick={props.goToStep.bind(null, props.step)}
                disabled={props.disabled}
                title={`Step ${props.step}: ${props.title}`}
                aria-label={`Step ${props.step}: ${props.title}`}>
                <div className="breadcrumb-step">
                    Step {props.step}
                </div>
                <div className="breadcrumb-title">
                    {props.title}
                </div>
                <div className={`breadcrumb-arrow ${nextActive}`}>
                    <div className={`arrow ${notMid} ${active}`} />
                </div>
            </button>
        </div>
    );
};

BreadcrumbItem.propTypes = propTypes;

export default BreadcrumbItem;
