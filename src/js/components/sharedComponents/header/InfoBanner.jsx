import React from 'react';
import PropTypes from 'prop-types';
import { InfoCircle, Close } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    closeBanner: PropTypes.func
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
                        We will continue to improve the site on a rolling basis and we&apos;d love
                        your feedback. Questions? Check out our&nbsp;
                        <a
                            href="https://usaspending-help.zendesk.com/hc/en-us/sections/115000739433-Frequently-Ask-Questions"
                            target="_blank"
                            rel="noopener noreferrer">
                            FAQ
                        </a> or join the conversation on our&nbsp;
                        <a
                            href="https://usaspending-help.zendesk.com/hc/en-us/community/topics"
                            target="_blank"
                            rel="noopener noreferrer">
                            Community
                        </a> page. Visit the old site at&nbsp;
                        <a
                            href="https://legacy.usaspending.gov"
                            target="_blank"
                            rel="noopener noreferrer">
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

