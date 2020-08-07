import React from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';
import kGlobalConstants from 'GlobalConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CovidHomepageCookie } from './Header';

const propTypes = {
    closeBanner: PropTypes.func,
    triggerModal: PropTypes.func
};

export default class InfoBanner extends React.Component {
    constructor(props) {
        super(props);
        this.bannerClosed = this.bannerClosed.bind(this);
    }

    bannerClosed() {
        this.props.closeBanner('showInfoBanner', CovidHomepageCookie);
    }

    clickedBannerLink = () => {
        Analytics.event({
            category: 'Banner - Link',
            action: 'https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf'
        });
    }

    render() {
        const content = kGlobalConstants.CARES_ACT_RELEASED_2 ? (
        <>
            <div className="info-banner__alert-text">
                <p className="info-banner__title-text">New to USAspending: COVID-19 Spending Data</p>
                <p>
                    USAspending now has spending data from federal agencies related to the Coronavirus Aid, Relief, and Economic Security (CARES) Act and other COVID-19 appropriations.
                    <button onClick={this.props.triggerModal}> Learn more</button> about the new data and features, or <a href="#/disaster/covid-19">visit the profile page</a> to explore and download the data today!
                </p>
            </div>
            <button
                className="info-banner__close-button"
                title="Dismiss message"
                aria-label="Dismiss message"
                onClick={this.bannerClosed}>
                <FontAwesomeIcon size="lg" alt="Dismiss message" icon="times" />
            </button>
        </>
        ) :
            (
            <>
                <div className="info-banner__alert-text">
                    <p className="info-banner__title-text">New to USAspending: Preliminary COVID-19 Spending Data</p>
                    <p>
                        USAspending now has preliminary spending data from federal agencies related to the Coronavirus Aid, Relief, and Economic Security (CARES) Act and other COVID-19 appropriations.
                        <button onClick={this.props.triggerModal}> Learn more</button> about the new data and features, or check out <a href="#/disaster/covid-19">a preliminary version of the COVID-19 Spending profile page </a> to explore and download the data.
                    </p>
                </div>
                <button
                    className="info-banner__close-button"
                    title="Dismiss message"
                    aria-label="Dismiss message"
                    onClick={this.bannerClosed}>
                    <FontAwesomeIcon size="lg" alt="Dismiss message" icon="times" />
                </button>
            </>
            );

        return (
            <div className="info-banner">
                <div className="info-banner__content">
                    <span className="info-banner__info-circle">
                        <FontAwesomeIcon size="lg" icon="info-circle" />
                    </span>
                    {content}
                </div>
            </div>
        );
    }
}

InfoBanner.propTypes = propTypes;
