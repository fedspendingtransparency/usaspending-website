import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '../icons/Icons';

const propTypes = {
    closeBanner: PropTypes.func
};

export default class WarningBanner extends React.Component {
    render() {
        return (
            <div className="warning-banner">
                <div className="warning-banner__content">
                    <div className="warning-banner__alert-icon">
                        <i className="usa-da-icon">
                            <Icons.ExclamationTriangle />
                        </i>
                    </div>
                    <div className="warning-banner__alert-text">
                        This site is in beta. To view the production site, visit&nbsp;
                        <a
                            href="https://www.usaspending.gov"
                            target="_blank"
                            rel="noopener noreferrer">
                            USAspending.gov
                        </a>.
                        We&#39;re updating this site on a rolling basis and we&#39;d love your feedback!
                        Share your thoughts&nbsp;
                        <a
                            href="https://usaspending-help.zendesk.com/hc/en-us/community/topics"
                            target="_blank"
                            rel="noopener noreferrer">
                            here
                        </a>.
                    </div>
                    <button
                        className="warning-banner__close-button"
                        title="Dismiss message"
                        aria-label="Dismiss message"
                        onClick={this.props.closeBanner}>
                        <Icons.Close alt="Dismiss message" />
                    </button>
                </div>
            </div>
        );
    }
}

WarningBanner.propTypes = propTypes;
