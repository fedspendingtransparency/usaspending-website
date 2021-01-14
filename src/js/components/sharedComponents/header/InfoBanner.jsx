import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
        const title = 'New to USAspending: COVID-19 Spending Data';
        const content = (
            <p>
            USAspending now has spending data from federal agencies related to the Coronavirus Aid, Relief, and Economic Security (CARES) Act and other COVID-19 appropriations.
                <button onClick={this.props.triggerModal}> Learn more</button> about the new data and features, or <Link to="/disaster/covid-19">visit the profile page</Link> to explore and download the data today!
            </p>
        );

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
