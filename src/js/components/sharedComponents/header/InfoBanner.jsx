import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isBefore, startOfToday } from "date-fns";
import { isIe } from "helpers/browser";
import ExternalLink from 'components/sharedComponents/ExternalLink';

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
        this.props.closeBanner('showInfoBanner');
    }

    render() {
        let title = 'New on USAspending: Unique Entity Identifiers';
        let content = (
            <p>
                Beginning in March, UEIs will be added to USAspending displays alongside DUNS numbers.
                <button onClick={this.props.triggerModal}> Learn more and find out what changes you’ll see on the site.</button>
            </p>
        );

        // reminder that month is 0-indexed
        if (isIe() && isBefore(startOfToday(), new Date(2022, 1, 18))) {
            title = 'USAspending Ending Support for Internet Explorer';
            content = (
                <p>
                    Support for Internet Explorer will end on Friday, 2/18/2022. Please use one of the following browsers to continue to access USAspending.gov:
                    <ExternalLink url="https://support.microsoft.com/en-us/microsoft-edge/make-the-switch-from-internet-explorer-to-microsoft-edge-a6f7173e-e84a-36a3-9728-3df20ade9b3c">{' '}Microsoft Edge</ExternalLink>
                    ,
                    <ExternalLink url="https://support.google.com/chrome/answer/95417?hl=en&co=GENIE.Platform%3DDesktop">{' '}Google Chrome</ExternalLink>
                    ,
                    <ExternalLink url="https://www.mozilla.org/en-US/firefox/new/">{' '}Mozilla Firefox</ExternalLink>
                    , Apple Safari.
                </p>
            );
        }

        return (
            <div className="info-banner">
                <div className="info-banner__content">
                    <span className="info-banner__info-circle">
                        <FontAwesomeIcon size="lg" icon="info-circle" />
                    </span>
                    <>
                        <div className="info-banner__alert-text">
                            <p className="info-banner__title-text">{title}</p>
                            {content}
                        </div>
                        <button
                            className="info-banner__close-button"
                            title="Dismiss message"
                            aria-label="Dismiss message"
                            onClick={this.bannerClosed}>
                            <FontAwesomeIcon size="lg" alt="Dismiss message" icon="times" />
                        </button>
                    </>
                </div>
            </div>
        );
    }
}

InfoBanner.propTypes = propTypes;
