import React from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';
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
        return (
            <div className="info-banner">
                <div className="info-banner__content">
                    <span className="info-banner__info-circle">
                        <FontAwesomeIcon size="lg" icon="info-circle" />
                    </span>
                    <div className="info-banner__alert-text">
                        <h2 className="info-banner__title-text">New to USAspending: Official COVID-19 Response Data</h2>
                        <p>
                            USAspending now has official spending data from federal agencies related to the Coronavirus Aid, Relief, and Economic Security (CARES) Act and other COVID-19 response spending.
                            <button onClick={this.props.triggerModal}> Learn more</button> about the data and new features or <a href="/#/covid-19">visit the profile page to explore and download the data today!</a>
                        </p>
                    </div>
                    <button
                        className="info-banner__close-button"
                        title="Dismiss message"
                        aria-label="Dismiss message"
                        onClick={this.bannerClosed}>
                        <FontAwesomeIcon size="lg" alt="Dismiss message" icon="times" />
                    </button>
                </div>
            </div>
        );
    }
}

InfoBanner.propTypes = propTypes;
