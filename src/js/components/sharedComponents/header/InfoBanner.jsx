import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isBefore, isAfter, startOfToday } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        // Show the COVID banner before 1/4/21 after 1/13/21
        let title = 'New to USAspending: COVID-19 Spending Data';
        let content = (
            <p>
            USAspending now has spending data from federal agencies related to the Coronavirus Aid, Relief, and Economic Security (CARES) Act and other COVID-19 appropriations.
                <button onClick={this.props.triggerModal}> Learn more</button> about the new data and features, or <Link to="/disaster/covid-19">visit the profile page</Link> to explore and download the data today!
            </p>
        );
        if (isAfter(startOfToday(), new Date(2021, 0, 3)) && isBefore(startOfToday(), new Date(2021, 0, 8))) {
            // Show the pre-migration banner 1/4/21 through 1/7/21
            title = 'Maintenance Update:';
            content = (
                <p data-testid="pre-migration-message">USAspending daily data refreshes will be paused temporarily starting Saturday January 9, 2021 for planned maintenance. Daily updates are estimated to resume on January 14, 2021 at which time the data will be made current. Please contact the Service Desk with any questions.</p>
            );
        }
        else if (isAfter(startOfToday(), new Date(2021, 0, 7)) && isBefore(startOfToday(), new Date(2021, 0, 14))) {
            // Show the migration banner 1/8/21 through 1/13/21
            title = 'Maintenance Update:';
            content = (
                <p data-testid="migration-message">USAspending daily data refreshes have been temporarily paused for planned maintenance. All data on the website is current as of January 8, 2021. Daily updates are estimated to resume on January 14, 2021 at which time the data will be made current. Please contact the Service Desk with any questions.</p>
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
