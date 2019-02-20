/**
 * IDVBanner.jsx
 * Created by David Trinh 2/20/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { InfoCircle, Close } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    closeBanner: PropTypes.func
};

export default class IDVBanner extends React.Component {
    constructor(props) {
        super(props);
        this.bannerClosed = this.bannerClosed.bind(this);
    }
    bannerClosed() {
        this.props.closeBanner('showIDVBanner', 'usaspending_idv_banner');
    }
    render() {
        return (

            <div className="award-amounts__banner">
                <div className="award-amounts__banner-info">
                    <span className="award-amounts__banner-info-icon"><InfoCircle /></span>
                    <p>The information on this tab comes from the data directly attributed to this IDV.</p>
                </div>
                <button
                    className="award-amounts__banner-close-icon"
                    title="Dismiss message"
                    aria-label="Dismiss message"
                    onClick={this.bannerClosed}>
                    <Close alt="Dismiss message" />
                </button>
            </div>
        );
    }
}

IDVBanner.propTypes = propTypes;
