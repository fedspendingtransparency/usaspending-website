/**
 * IDVBanner.jsx
 * Created by David Trinh 2/20/19
 **/

import React from 'react';
import { InfoCircle, Close } from 'components/sharedComponents/icons/Icons';

export default class IDVBanner extends React.Component {
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
                <div className="award-amounts__banner-info">
                    <span className="award-amounts__banner-info-icon"><InfoCircle /></span>
                    <p>The information on this tab comes from the data directly attributed to this IDV.</p>
                </div>
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
