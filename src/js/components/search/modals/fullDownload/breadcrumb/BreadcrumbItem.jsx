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
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
    goToStep: PropTypes.func
};

const BreadcrumbItem = (props) => {
    // determine if the current step is in the past, present, or future
    const isPast = props.step < props.currentStep;
    const isActive = props.step === props.currentStep;
    const isFuture = props.step > props.currentStep;

    // determine what the next step is (the outer portion of the chevron needs to be shaded
    // for that)
    const nextStepIsPast = props.step + 1 < props.currentStep;
    const nextStepIsActive = props.step + 1 === props.currentStep;
    const nextStepIsFuture = props.step + 1 > props.currentStep;

    const isLast = props.step === props.totalSteps;

    let type = '';
    if (isActive) {
        type = 'active';
    }
    else if (isPast) {
        type = 'past';
    }

    let nextStep = '';
    if (isLast) {
    // we're hiding the arrow, so fill the div with the current step color
        nextStep = type;
    }
    else if (nextStepIsFuture) {
        nextStep = 'next-future';
    }
    else if (nextStepIsActive) {
        nextStep = 'next-active';
    }
    else if (nextStepIsPast) {
        nextStep = 'next-past';
    }

    let arrowColor = '';
    if (isLast) {
        arrowColor = 'hide';
    }
    else if (isActive) {
        arrowColor = 'active';
    }
    else if (isPast) {
        arrowColor = 'past';
    }

    return (
        <div className={`breadcrumb-item ${type}`}>
            <button
                className={`breadcrumb-content ${type}`}
                onClick={props.goToStep.bind(null, props.step)}
                disabled={isFuture || isActive || props.currentStep === props.totalSteps}
                title={`Step ${props.step}: ${props.title}`}
                aria-label={`Step ${props.step}: ${props.title}`}>
                <div className="breadcrumb-step">
                    Step {props.step}
                </div>
                <div className="breadcrumb-title">
                    {props.title}
                </div>
                <div className={`breadcrumb-arrow ${nextStep}`}>
                    <div className={`arrow ${arrowColor}`} />
                </div>
            </button>
        </div>
    );
};

BreadcrumbItem.propTypes = propTypes;

export default BreadcrumbItem;
