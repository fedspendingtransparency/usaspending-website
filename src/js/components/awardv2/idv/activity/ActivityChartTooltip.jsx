/**
 * FederalAccountsTreeTooltip.jsx
 * Created by Jonathan Hill 5/2/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.object,
    mouseIsInTooltipDiv: PropTypes.func,
    mouseOutOfTooltipDiv: PropTypes.func
};

export default class IdvActivityTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            direction: 'top',
            tooltipStyle: {
                transform: ''
            },
            windowWidth: 0,
            windowHeight: 0
        };

        this.measureWindow = this.measureWindow.bind(this);
    }
    componentDidMount() {
        this.measureWindow();
        window.addEventListener('resize', this.measureWindow);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data.x !== this.props.data.x || prevProps.data.y !== this.props.data.y) {
            this.positionTooltip();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureWindow);
    }

    measureWindow() {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth
            || document.body.clientWidth;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
            || document.body.clientHeight;

        this.setState({
            windowWidth,
            windowHeight
        }, () => {
            this.positionTooltip();
        });
    }

    positionTooltip() {
        // measure the tooltip width
        const tooltipWidth = this.div.offsetWidth;
        const containerX = this.containerDiv.getBoundingClientRect().left;
        // let direction = 'right';
        let direction = 'center';
        const awardAgencyDiv = this.awardAgencyDiv.getBoundingClientRect().width;
        const recipientDiv = this.recipientDiv.getBoundingClientRect().width;
        const tooltipBody = this.tooltipBody.getBoundingClientRect().width;
        console.log(' awardAgencyDiv Width : ', awardAgencyDiv);
        console.log(' recipientDiv Width : ', recipientDiv);
        // calculate the padding between the elements and the tooltip body
        const tooltipBodyPadding = tooltipBody - (awardAgencyDiv + recipientDiv);
        // const theTooltipWidth = (awardAgencyDiv + recipientDiv + tooltipBodyPadding) - 488;
        const theTooltipWidth = awardAgencyDiv + recipientDiv + 70;
        // adjust the X position so the tooltip is centered at X
        let adjustedX = this.props.data.x;
        let adjustedY = this.props.data.y;
        // if (this.props.data.x + tooltipWidth >= this.state.windowWidth) {
        //     direction = 'right';
        //     adjustedX = this.props.data.x - tooltipWidth - 20;
        // }
        // this.div.style.top = `${this.props.data.y}px`;
        // this.div.style.left = `${this.props.data.x}px`;
        this.setState({
            direction,
            tooltipStyle: {
                transform: `translate(${adjustedX}px,-${adjustedY}px)`,
                width: `${theTooltipWidth}px`
                // bottom: `${this.props.data.y}px`,
                // left: `${adjustedX}px`
                // position: {
                //     x: `${this.props.data.y}px`,
                //     y: `${adjustedX}px`
                // }
            }
        });
    }

    render() {
        const { data } = this.props;
        console.log(' DATA : ', data);
        // const { percent, obligatedAmount, _federalAccountName } = this.props;
        // const subtitle =
        // `${this.props._fundingAgencyName} (${this.props._fundingAgencyAbbreviation})`;

        return (
            <div className="visualization-tooltip"
                ref={(div) => {
                    this.containerDiv = div;
                }}>
                <div
                    className={`tooltip ${this.state.direction}`}
                    onMouseEnter={this.props.mouseIsInTooltipDiv}
                    onMouseLeave={this.props.mouseOutOfTooltipDiv}
                    style={this.state.tooltipStyle}
                    ref={(div) => {
                        this.div = div;
                    }}>
                    <h5 className="tooltip-title">
                        { data.grandchild ? 'GRANDCHILD' : 'CHILD'} AWARD
                    </h5>
                    <div className="tooltip-body"
                        ref={(div) => {
                            this.tooltipBody = div;
                        }}>
                        <div className="tooltip-body__row">
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title first-titles">
                                    PIID
                                </h6>
                                <div className="tooltip-body__row-info-data">
                                    <a href={`https://www.usaspending.gov/#/award/${data.piid}`}>{data.piid}</a>
                                </div>
                            </div>
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title first-titles">
                                    Parent IDV PIID
                                </h6>
                                <div className="tooltip-body__row-info-data">
                                    <a href={`https://www.usaspending.gov/#/award/${data.piid}`}>NeedParentPiid</a>
                                </div>
                            </div>
                        </div>
                        <div className="tooltip-body__row">
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title">
                                    Awarding Agency
                                </h6>
                                <div
                                    className="tooltip-body__row-info-data"
                                    ref={(div) => {
                                        this.awardAgencyDiv = div;
                                    }}>
                                    <a href={`https://www.usaspending.gov/#/agency/${data.awardingAgencyId}`}>
                                        {data.awardingAgencyName}
                                    </a>
                                </div>
                            </div>
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title">
                                    Recipient
                                </h6>
                                <div
                                    className="tooltip-body__row-info-data"
                                    ref={(div) => {
                                        this.recipientDiv = div;
                                    }}>
                                    <a href={`https://www.usaspending.gov/#/recipient/${data.recipientId}`}>
                                        {data.recipientName.toUpperCase()}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="tooltip-body__row">
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title">Start</h6>
                                <div className="tooltip-body__row-info-data">
                                    {data.startDate}
                                </div>
                            </div>
                            <div className="tooltip-body__row-info second-child">
                                <h6 className="tooltip-body__row-info-title">End</h6>
                                <div className="tooltip-body__row-info-data">
                                    {data.endDate}
                                </div>
                            </div>
                            <div className="tooltip-body__row-info">
                                <h6 className="tooltip-body__row-info-title">
                                    Awarded Amount
                                </h6>
                                <div className="tooltip-body__row-info-data">
                                    <strong>{data._obligatedAmount !== 0 ? data.obligatedAmount : '--'} </strong>
                                    of {data._awardedAmount !== 0 ? data.awardedAmount : '--'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

IdvActivityTooltip.propTypes = propTypes;
