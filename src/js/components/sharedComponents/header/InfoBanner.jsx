import React from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CovidHomepageCookie } from './Header';

const propTypes = {
    closeBanner: PropTypes.func
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
            action: 'https://datalab.usaspending.gov/americas-finance-guide/'
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
                        <div className="info-banner__title-text">
                            Coming to USAspending in July -- New Tools to Search and Display COVID-19 Spending Data:
                        </div>
                        Based on&nbsp;
                        <a
                            href="https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={this.clickedBannerLink}>
                            OMB Memo M-20-21
                        </a>
                        {/* <span className="info-banner__description-external-link">
                            <FontAwesomeIcon icon="external-link-alt" />
                        </span> */}
                        , Federal agencies will begin supplementing existing reporting of
                        spending related to the Coronavirus Aid, Relief, and Economic Security (CARES) Act, as
                        well as other COVID-19 appropriations in July 2020.
                        {/* <span className="info-banner__hyphen">-</span> */}
                        
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
