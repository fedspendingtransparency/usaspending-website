/**
 * Training.jsx
 * Created by Nick Torres 4/14/22
 **/

import React from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';
import { Envelope, CaretRight } from 'components/sharedComponents/icons/Icons';


const propTypes = {
    pageName: PropTypes.string.isRequired
};

const Training = (pageName) => {
    const body = (
        "Thank you for your request for training on how to use the USAspending.gov website!%0A%0A" +
        "Please fill out the information below and we'll respond to your inquiry as soon as possible.%0A%0A" +
        "Due to the volume of inquiries received, we may not be able to provide trainings for every request.%0A%0A" +
        "YOUR NAME: %0A%0A" +
        "YOUR ORGANIZATION: %0A%0A" +
        "NUMBER OF PEOPLE WHO WOULD ATTEND TRAINING: %0A%0A" +
        "YOUR PRIMARY REASONS FOR USING USASPENDING.GOV: %0A%0A" +
        "YOUR PRIMARY QUESTIONS ABOUT USASPENDING.GOV: "
    );
    const trackLink = () => Analytics.event({
        category: pageName,
        action: 'Link',
        label: 'sign-up'
    });

    return (
        <div className="training">
            <div className="training__icon">
                <Envelope />
            </div>
            <div className="training__callout">
                     Request training from us!&nbsp;
            </div>
            <div className="training__message">
                     Receive customized training on how to use USAspending.gov
            </div>
            <a
                className="training__link"
                href={`mailto:join-usaspending@lists.fiscal.treasury.gov?subject=Request%20for%20Training%20on%20USAspending.gov&body=${body}`}
                onClick={trackLink}>
                     Sign Up
                <CaretRight />
            </a>
        </div>
    );
};

Training.PropTypes = propTypes;
export default Training;
