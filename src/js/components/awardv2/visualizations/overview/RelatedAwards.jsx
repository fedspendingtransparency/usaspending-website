/**
 * RelatedAwards.jsx
 * Created by Lizzie Salita 12/11/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';
import Tooltip from 'components/sharedComponents/Tooltip';

const propTypes = {
    overview: PropTypes.object
};

export default class RelatedAwards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfoTooltip: false,
            tooltip: {
                x: 0,
                y: 0
            }
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
    }

    showTooltip() {
        this.setState({
            showInfoTooltip: true
        });
    }

    closeTooltip() {
        this.setState({
            showInfoTooltip: false
        });
    }
    render() {
        let parentLink = 'N/A';
        if (this.props.overview.parentAward && this.props.overview.parentId) {
            parentLink = (
                <a
                    className="related-awards__link"
                    href={`#/award_v2/${this.props.overview.parentId}`}>
                    {this.props.overview.parentAward}
                </a>
            );
        }
        return (
            <div className="related-awards">
                <div className="award-overview__title related-awards__title">
                    Related Awards
                    <button
                        onBlur={this.closeTooltip}
                        className="award__icon"
                        onFocus={this.showTooltip}
                        onMouseEnter={this.showTooltip}
                        onClick={this.showTooltip}>
                        <Icons.InfoCircle alt="Information" />
                    </button>
                </div>
                <div className="related-awards__parent">
                    <div className="related-awards__label">
                        Parent Award
                    </div>
                    {parentLink}
                </div>
            </div>
        );
    }
}

RelatedAwards.propTypes = propTypes;
