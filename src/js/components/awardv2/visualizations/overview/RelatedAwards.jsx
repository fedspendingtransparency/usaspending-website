/**
 * RelatedAwards.jsx
 * Created by Lizzie Salita 12/11/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';
import InfoTooltip from '../../idv/InfoTooltip';

const propTypes = {
    overview: PropTypes.object
};

export default class RelatedAwards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false,
            offsetTop: 0,
            offsetRight: 0
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
        this.measureOffset = throttle(this.measureOffset.bind(this), 16);
    }

    componentDidMount() {
        this.measureOffset();
        window.addEventListener('scroll', this.measureOffset);
        window.addEventListener('resize', this.measureOffset);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.measureOffset);
        window.removeEventListener('resize', this.measureOffset);
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

    measureOffset() {
        const targetElement = this.referenceDiv;
        const offsetTop = targetElement.offsetTop - 35;
        const offsetRight = window.innerWidth - targetElement.offsetLeft - targetElement.clientWidth - 300;
        this.setState({
            offsetTop,
            offsetRight
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
        let tooltip = null;
        if (this.state.showInfoTooltip) {
            const style = {
                top: this.state.offsetTop,
                right: this.state.offsetRight
            };

            tooltip = (
                <div
                    className="info-tooltip-spacer"
                    style={style}>
                    <InfoTooltip>
                        <strong>Related Awards</strong>
                        <p>
                            Related Awards refers to two possible types of awards related to this IDV:
                        </p>
                        <ul>
                            <li>
                                <strong>Parent Award</strong> – The parent award is an IDV award that this contract was made under.  Click on the link to view more information on this award&apos;s parent.
                            </li>
                            <li>
                                <strong>Parent Award Orders Under this IDV</strong> – This is a count of how many awards were made under this IDV.  Click on the link to see more information about all of those orders.
                            </li>
                        </ul>
                    </InfoTooltip>
                </div>
            );
        }
        return (
            <div
                className="related-awards">
                <div className="award-overview__title related-awards__title">
                    Related Awards
                    <div className="award__info-wrapper">
                        <div ref={(div) => {
                            this.referenceDiv = div;
                        }}>
                            <button
                                onBlur={this.closeTooltip}
                                className="award__icon"
                                onFocus={this.showTooltip}
                                onMouseEnter={this.showTooltip}
                                onMouseLeave={this.closeTooltip}
                                onClick={this.showTooltip}>
                                <Icons.InfoCircle alt="Information" />
                            </button>
                            {tooltip}
                        </div>
                    </div>
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
