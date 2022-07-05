/**
 * TrainingContent.jsx
 * Created by Nick Torres 06/22/22
 */

import React from 'react';
import ExternalLink from 'components/sharedComponents/ExternalLink';

export default class TrainingContent extends React.Component {
    render() {
        return (
            <div
                className="about-section-wrapper"
                id="about-training">
                <h2
                    className="about-section-title"
                    id="about__training-jump">
                     Training
                </h2>
                <div className="about-section-content">
                    <p>
                        The USAspending.gov team is committed to helping audiences of all types learn more about our website&apos;s tools and data. If your organization would like to request training from us, please use the link below to submit a request. <span className="trainingContent__strong">A minimum of three participants is required.</span> Due to the number of requests we receive, we cannot guarantee that your organization will receive training.
                    </p>
                    <p>
                        Please fill out all the required information on the training request form. Otherwise, we will not be able to process your request. Also, please note that we are only able to provide training on the website and its data. <span className="trainingContent__strong">We are unable to provide any information on specific government programs or funding opportunities. </span>
                        <ExternalLink url="https://www.surveymonkey.com/r/YK963LJ">Click here to request training for your organization.</ExternalLink>
                    </p>
                </div>
            </div>
        );
    }
}

