/**
 * IDVAmounts.jsx
 * Created by David Trinh 2/19/19
 **/
import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import IDVBanner from './IDVBanner';

const propTypes = {
    awards: PropTypes.object
};

export default class IDVAmounts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showIDVBanner: false
        };
        this.closeBanner = this.closeBanner.bind(this);
    }
    componentWillMount() {
        // check if the info banner cookie exists
        if (!Cookies.get('usaspending_idv_banner')) {
            // cookie does not exist, show the banner
            this.setState({
                showIDVBanner: true
            });
        }
    }

    closeBanner(bannerType, cookieName) {
        // set a cookie to hide the banner in the future if banner is closed
        Cookies.set(cookieName, 'hide', { expires: 730 });
        this.setState({
            [bannerType]: false
        });
    }
    render() {
        let idvBanner = (
            <IDVBanner
                closeBanner={this.closeBanner} />
        );

        if (!this.state.showIDVBanner) {
            idvBanner = null;
        }
        const awards = this.props.awards;
        return (
            <div className="award-amounts__content">
                {idvBanner}
                <div className="award-amounts__data-wrapper">
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_blue" />Obligated Amount</div>
                        <span>{awards.totalObligationFormatted}</span>
                    </div>
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_gray" />Base &#38; Exercised Options</div>
                        <span>{awards.baseExercisedOptionsFormatted}</span>
                    </div>
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_transparent" />Base &#38; All Options</div>
                        <span>{awards.baseAndAllOptionsFormatted}</span>
                    </div>
                </div>
            </div>
        );
    }
}
IDVAmounts.propTypes = propTypes;
