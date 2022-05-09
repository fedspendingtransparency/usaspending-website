/**
 * AwardsBanner.jsx
 * Created by David Trinh 2/20/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { InfoCircle, Close } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    jumpToReferencedAwardsTable: PropTypes.func
};

export default class AwardsBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: true
        };
        this.toggleBanner = this.toggleBanner.bind(this);
    }
    toggleBanner() {
        this.setState({
            toggle: false
        });
    }
    render() {
        return (

            <div className={`award-amounts__banner ${!this.state.toggle ? "award-amounts__banner_hidden" : ""}`}>
                <span className="award-amounts__banner-info-icon"><InfoCircle /></span>
                <p>The information in this tab is pulled from the combined data of awards that reference this IDV, not the IDV itself. To see those awards, scroll to the&nbsp;
                    <button
                        onClick={this.props.jumpToReferencedAwardsTable}
                        className="award-viz__button">
                        table of awards under this IDV
                    </button>
                    &nbsp;on this page.
                </p>
                <button
                    className="award-amounts__banner-close-icon"
                    title="Dismiss message"
                    aria-label="Dismiss message"
                    onClick={this.toggleBanner}>
                    <Close alt="Dismiss message" />
                </button>
            </div>
        );
    }
}

AwardsBanner.propTypes = propTypes;
