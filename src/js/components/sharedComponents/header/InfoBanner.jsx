import React from 'react';
import PropTypes from 'prop-types';
import { InfoCircle, Close } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    closeBanner: PropTypes.func
};

export default class InfoBanner extends React.Component {
    render() {
        // TODO - Lizzie: add FAQ url
        return (
            <div className="info-banner">
                <div className="info-banner__content">
                    <div className="info-banner__alert-icon">
                        <i className="usa-da-icon">
                            <InfoCircle alt="Information" />
                        </i>
                    </div>
                    <div className="info-banner__alert-text">
                        Welcome to the new&nbsp;
                        <a href="#/">
                            USAspending.gov
                        </a>!
                        We offer agency financial data along with awards data. Questions? Check out our&nbsp;
                        <a
                            href=""
                            target="_blank"
                            rel="noopener noreferrer">
                            FAQ
                        </a>.
                        Want to suggest a feature? Join the conversation on&nbsp;
                        <a
                            href="https://usaspending-help.zendesk.com/hc/en-us/community/topics"
                            target="_blank"
                            rel="noopener noreferrer">
                            our community page
                        </a>.
                        Visit the old site at&nbsp;
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

