/**
 * TrainingContent.jsx
 * Created by Nick Torres 06/22/22
 */

import React from 'react';

import * as redirectHelper from 'helpers/redirectHelper';

export default class TrainingContent extends React.Component {
    constructor(props) {
        super(props);

        this.clickedLink = this.clickedLink.bind(this);
    }

    clickedLink() {
        redirectHelper.showRedirectModal('https://github.com/fedspendingtransparency/usaspending-website/wiki');
    }
    render() {
        const trainingEmailBody = (
            `Thank you for your request for training on how to use the USAspending.gov website!\n\n` +
            `Please fill out the information below and we'll respond to your inquiry as soon as possible.\n\n` +
            `Please note that without the requested information below, your inquiry cannot be processed.\n\n` +
            `YOUR NAME: \n\n` +
            `YOUR ORGANIZATION: \n\n` +
            `NAME AND EMAIL ADDRESS FOR EACH PERSON WHO WOULD ATTEND THE TRAINING (MINIMUM 3 PEOPLE): \n\n` +
            `YOUR PRIMARY REASONS FOR USING USASPENDING.GOV (IN AS MUCH DETAIL AS POSSIBLE): \n\n` +
            `YOUR PRIMARY QUESTIONS ABOUT USASPENDING.GOV (IN AS MUCH DETAIL AS POSSIBLE): \n\n\n` +
            `Due to the volume of inquiries we receive, we may not be able to provide trainings for every request. However, we will be adding training materials to USAspending.gov and your input will help us create better content.`
        );

        return (
            <div
                className="about-section-wrapper"
                id="about-training">
                <h2 className="about-section-title">
                     Training
                </h2>
                <div className="about-section-content">
                    <p>
                        The USAspending.gov team is committed to helping audiences of all types learn more about our website&apos;s tools and data. If your organization would like to request training from us, please use the link below to send us an email. <span className="trainingContent__strong">A minimum of three participants is required.</span> Due to the number of requests we receive, we cannot guarantee that your organization will receive training.
                    </p>
                    <p>
                        Please fill out all the required information in the email template. Otherwise, we will not be able to process your request. Also, please note that we are only able to provide training on the website and its data. <span className="trainingContent__strong">We are unable to provide any information on specific government programs or funding opportunities.</span>
                        <a
                            className="trainingContent__email-anchor"
                            href={`mailto:usaspending.help@fiscal.treasury.gov?subject=Request%20for%20Training%20on%20USAspending.gov&body=${encodeURIComponent(trainingEmailBody)}`}>
                            {' '}Click here to send us an email requesting training for your organization.
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}

