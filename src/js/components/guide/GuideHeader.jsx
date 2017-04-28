/**
 * GuideHeader.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';

import * as Icons from 'components/sharedComponents/icons/Icons';

import GuideSearchBar from './GuideSearchBar';

const propTypes = {
    hideGuide: React.PropTypes.func
};

export default class GuideHeader extends React.Component {
    render() {
        return (
            <div className="guide-header">
                <button
                    className="close-button"
                    aria-label="Close Guide"
                    onClick={this.props.hideGuide}>
                    <Icons.Close alt="Close Guide" />
                </button>
                <h1 className="guide-title">
                    Guide
                </h1>

                <GuideSearchBar />

                <div className="guide-example">
                    Example: &quot;Funding Obligated&quot;
                </div>
            </div>
        );
    }
}

GuideHeader.propTypes = propTypes;
