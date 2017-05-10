/**
 * NavBarGuideLink.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';

import { Guide } from '../icons/Icons';

const propTypes = {
    toggleGuide: React.PropTypes.func
};

export default class NavBarGuideLink extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.toggleGuide();
    }

    render() {
        return (
            <button
                aria-label="Show Guide"
                className="header-guide-button"
                id="header-guide-button"
                onClick={this.clickedButton}>
                <div className="guide-button-content">
                    <span className="guide-button-icon">
                        <Guide alt="Guide" />
                    </span>
                    Guide
                </div>
            </button>
        );
    }
}

NavBarGuideLink.propTypes = propTypes;
