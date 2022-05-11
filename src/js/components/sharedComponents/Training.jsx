/**
 * Training.jsx
 * Created by Nick Torres 4/14/22
 **/

import React from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';
import { faCaretRight, faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const propTypes = {
    pageName: PropTypes.string.isRequired
};

const Training = (pageName) => {
    const body = (
        `Thank you for your request for training on how to use the USAspending.gov website!\n\n` +
        `Please fill out the information below and we'll respond to your inquiry as soon as possible.\n\n` +
        `Please note that without the requested information below, your inquiry cannot be processed.\n\n` +
        `YOUR NAME: \n\n` +
        `YOUR ORGANIZATION: \n\n` +
        `NUMBER OF PEOPLE WHO WOULD ATTEND TRAINING: \n\n` +
        `YOUR PRIMARY REASONS FOR USING USASPENDING.GOV: \n\n` +
        `YOUR PRIMARY QUESTIONS ABOUT USASPENDING.GOV: \n\n\n` +
        `Due to the volume of inquiries received, we may not be able to provide trainings for every request. However, we will be adding training materials to USAspending.gov and your input will help us create better content.`
    );
    const trackLink = () => Analytics.event({
        category: pageName,
        action: 'Link',
        label: 'sign-up'
    });

    return (
        <div className="training">
            <div className="training__icon">
                <FontAwesomeIcon icon={faLaptop} />
            </div>
            <div className="training__callout">
                     Request training from us!&nbsp;
            </div>
            <div className="training__message">
                Receive customized training&nbsp;
            </div>
            <div className="training__message">
                on how to use USAspending.gov
            </div>
            <a
                className="training__link"
                href={`mailto:usaspending.help@fiscal.treasury.gov?subject=Request%20for%20Training%20on%20USAspending.gov&body=${encodeURIComponent(body)}`}
                onClick={trackLink}>
                     Sign Up
                <FontAwesomeIcon icon={faCaretRight} />
            </a>
        </div>
    );
};

Training.PropTypes = propTypes;
export default Training;
