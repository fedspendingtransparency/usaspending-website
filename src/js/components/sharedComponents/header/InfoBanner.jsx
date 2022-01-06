import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
        let title = 'New to USAspending: COVID-19 Spending Data';
        let content = (
            <p>
            USAspending now has spending data from federal agencies related to the Coronavirus Aid, Relief, and Economic Security (CARES) Act and other COVID-19 appropriations.
                <button onClick={this.props.triggerModal}> Learn more</button> about the new data and features, or <Link to="/disaster/covid-19">visit the profile page</Link> to explore and download the data today!
            </p>
        );

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
