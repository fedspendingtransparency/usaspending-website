import React from 'react';
import PropTypes from 'prop-types';
import { InfoCircle, Close } from 'components/sharedComponents/icons/Icons';
import Analytics from 'helpers/analytics/Analytics';

const propTypes = {
    closeBanner: PropTypes.func
};

const clickedBannerLink = (route) => {
    Analytics.event({
        category: 'Banner - Link',
        action: route
    });
};

export default class InfoBanner extends React.Component {
    render() {
        return (
            <div className="info-banner">
                <div className="info-banner__content">
                    <div className="info-banner__alert-icon">
                        <i className="usa-da-icon">
                            <InfoCircle alt="Information" />
                        </i>
                    </div>
                    <div className="info-banner__alert-text">
                        <div className="info-banner__title-text">
                            Welcome to the new USAspending.gov!
                        </div>
                        We will continue to improve the data quality and display on a rolling basis.
                        Questions? Check out our&nbsp;
                        <a
                            href="#/about"
                            onClick={clickedBannerLink.bind(null, '/about')}>
                            About
                        </a> page for important information on the data and authoritative sources
                        or join the conversation on our&nbsp;
                        <a
                            href="https://usaspending-help.zendesk.com/hc/en-us/community/topics"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={clickedBannerLink.bind(null, 'https://usaspending-help.zendesk.com/hc/en-us/community/topics')}>
                            Community
                        </a> page. Visit the old site at&nbsp;
                        <a
                            href="https://legacy.usaspending.gov"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={clickedBannerLink.bind(null, 'https://legacy.usaspending.gov')}>
                            legacy.usaspending.gov
                        </a>.
                    </div>
                    <button
                        className="info-banner__close-button"
                        title="Dismiss message"
                        aria-label="Dismiss message"
                        onClick={this.props.closeBanner}>
                        <Close alt="Dismiss message" />
                    </button>
                </div>
            </div>
        );
    }
}

InfoBanner.propTypes = propTypes;

