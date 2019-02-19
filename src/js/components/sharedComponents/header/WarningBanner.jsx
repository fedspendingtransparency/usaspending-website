import React from 'react';
import PropTypes from 'prop-types';
import { Close, ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    closeBanner: PropTypes.func
};

export default class WarningBanner extends React.Component {
    constructor(props) {
        super(props);
        this.bannerClosed = this.bannerClosed.bind(this);
    }
    bannerClosed() {
        this.props.closeBanner('showWarningBanner', 'usaspending_warning_banner');
    }
    render() {
        return (
            <div className="info-banner info-banner_warning">
                <div className="info-banner__content">
                    <div className="info-banner__alert-icon">
                        <i className="usa-da-icon">
                            <ExclamationTriangle alt="Warning" />
                        </i>
                    </div>
                    <div className="info-banner__alert-text">
                        <div className="info-banner__title-text">
                            FY19 Q1 financial data is delayed.
                        </div>
                        Due to the recent partial lapse in appropriations,
                        FY19Q1 financial data is&nbsp;
                        <strong>
                        delayed until March 21st
                        </strong>.
                        The spending explorer, federal
                        account pages, and custom account download will update at that time
                        to <br />incorporate FY19Q1 data.
                        The award data (including advanced and keyword search engines) will
                        <strong> not </strong> be affected by this delay.
                    </div>
                    <button
                        className="info-banner__close-button"
                        title="Dismiss message"
                        aria-label="Dismiss message"
                        onClick={this.bannerClosed}>
                        <Close alt="Dismiss message" />
                    </button>
                </div>
            </div>
        );
    }
}

WarningBanner.propTypes = propTypes;
