/**
 * KeywordSearchHover.jsx
 * Created by Lizzie Salita 1/16/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { InfoCircle, Close } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    closeTooltip: PropTypes.func
};

export default class KeywordSearchHover extends React.Component {
    render() {
        return (
            <div className="keyword-hover">
                <div className="hover-content">
                    <div className="icon">
                        <InfoCircle alt="Keyword Search Info" />
                    </div>
                    <div className="message">
                        Keyword Search returns results matching recipient name, recipient DUNS, recipient parent DUNS,
                        NAICS code, PSC code, and Award ID. If you’re only interested in results matching award
                        descriptions, tick the box to narrow your search to award description fields only.
                    </div>
                    <button
                        className="close"
                        title="Dismiss message"
                        aria-label="Dismiss message"
                        onClick={this.props.closeTooltip}>
                        <Close alt="Dismiss message" />
                    </button>
                </div>
            </div>
        );
    }
}

KeywordSearchHover.propTypes = propTypes;
