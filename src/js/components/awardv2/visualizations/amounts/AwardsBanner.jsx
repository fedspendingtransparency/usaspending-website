/**
 * AwardsBanner.jsx
 * Created by David Trinh 2/20/19
 **/

import React from 'react';
import { InfoCircle, Close } from 'components/sharedComponents/icons/Icons';


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
                <p>The information in this tab is pulled from the combined data of awards that reference this IDV, not the IDV itself. To see those awards, scroll to the <a href="/">referencing awards table</a> on this page.</p>
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

