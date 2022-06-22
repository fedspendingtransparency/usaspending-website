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
        return (
            <div
                className="about-section-wrapper"
                id="about-training">
                <h2 className="about-section-title">
                     Training
                </h2>
                <div className="about-section-content">
                    <p>
                    The USAspending.gov team is committed to helping audiences of all types learn more about our website&apos;s tools and data. If your organization would like to request training from us, please use the link below to send us an email. <span className="training__strong">A minimum of three participants is required.</span> Due to the number of requests we receive, we cannot guarantee that your organization will receive training.
                        <a
                            href="mailto:join-usaspending@lists.fiscal.treasury.gov?subject=Yes!%20I'd%20like%20to%20receive%20updates.">
                             sign up here
                        </a>. Previous Release Notes are available&nbsp;
                        <button
                            className="usa-button-link"
                            role="link"
                            onClick={this.clickedLink}>
                             here
                        </button>.
                    </p>
                    <p>
                        Please fill out all the required information in the email template. Otherwise, we will not be able to process your request. Also, please note that we are only able to provide training on the website and its data. <span className="training__strong">We are unable to provide any information on specific government programs or funding opportunities.</span> [Click here to send us an email requesting training for your organization.]
                    </p>
                </div>
            </div>
        );
    }
}

