import React from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';
import { Link } from 'react-router-dom';
import { isBefore, isAfter, startOfToday } from 'date-fns';

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
        let content;
        let title;
        if (isBefore(startOfToday(), new Date(2021, 0, 4)) || isAfter(startOfToday(), new Date(2021, 0, 14))) {
            // Show the COVID banner before 1/4/21 after 1/14/21
            title = 'New to USAspending: COVID-19 Spending Data';
            content = (
                <p>
                USAspending now has spending data from federal agencies related to the Coronavirus Aid, Relief, and Economic Security (CARES) Act and other COVID-19 appropriations.
                    <button onClick={this.props.triggerModal}> Learn more</button> about the new data and features, or <Link to="/disaster/covid-19">visit the profile page</Link> to explore and download the data today!
                </p>
            );
        }
        else if (isAfter(startOfToday(), new Date(2021, 0, 4)) && isBefore(startOfToday(), new Date(2021, 0, 8))) {
            // Show the pre-migration banner 1/4/21 through 1/7/21
            title = 'Maintenance Update:';
            content = (
                <p>USAspending daily data refreshes will be paused temporarily starting Saturday January 9, 2021 for planned maintenance. Daily updates are estimated to resume on January 14, 2021 at which time the data will be made current. Please contact the Service Desk with any questions.</p>
            );
        }
        else if (isAfter(startOfToday(), new Date(2021, 0, 8)) && isBefore(startOfToday(), new Date(2021, 0, 14))) {
            // Show the migration banner 1/8/21 through 1/13/21
            title = 'Maintenance Update:';
            content = (
                <p>USAspending daily data refreshes have been temporarily paused for planned maintenance. All data on the website is current as of January 8, 2021. Daily updates are estimated to resume on January 14, 2021 at which time the data will be made current. Please contact the Service Desk with any questions.</p>
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
