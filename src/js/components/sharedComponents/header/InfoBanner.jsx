import React from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { twentyNineteenFiscalDataCookie } from './Header';

const propTypes = {
    closeBanner: PropTypes.func
};

export default class InfoBanner extends React.Component {
    constructor(props) {
        super(props);
        this.bannerClosed = this.bannerClosed.bind(this);
    }

    bannerClosed() {
        this.props.closeBanner('showInfoBanner', twentyNineteenFiscalDataCookie);
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
                            Updated with FY 2019 Data - Your Guide to America&#39;s Finances
                        </div>
                        Your Guide provides a snapshot of 2019 Fiscal Year revenue,
                        spending, deficit, debt, along with data for download.
                        <span className="info-banner__hyphen">-</span>
                        <a
                            href="https://datalab.usaspending.gov/americas-finance-guide/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={this.clickedBannerLink}>
                        https://datalab.usaspending.gov/americas-finance-guide/
                        </a>
                        <span className="info-banner__description-external-link">
                            <FontAwesomeIcon icon="external-link-alt" />
                        </span>
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
