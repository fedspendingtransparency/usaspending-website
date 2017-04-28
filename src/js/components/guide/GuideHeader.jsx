/**
 * GuideHeader.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';

import * as Icons from 'components/sharedComponents/icons/Icons';

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
            </div>
        );
    }
}

GuideHeader.propTypes = propTypes;
