/**
 * TreeMapLine
 * Created by michaelbray on 6/2/17.
 */


import React from 'react';
import TreeMapLabel from './TreeMapLabel';

const propTypes = {
    size: React.PropTypes.string,
    gTransform: React.PropTypes.string,
    rectTransform: React.PropTypes.string,
    textTransform: React.PropTypes.string,
    label: React.PropTypes.string
};

export default class TreeMapLine extends React.Component {

    render() {
        let budgetLabel = (<TreeMapLabel
            labelWidth={20}
            labelPadding={5}
            labelDistance={5}
            currentY={0}
            graphHeight={642}
            size="small" />);

        if (this.props.size === 'large') {
            budgetLabel = (<TreeMapLabel
                labelWidth={20}
                labelPadding={5}
                labelDistance={5}
                currentX={0}
                graphWidth={this.gClass.offsetWidth * 0.79}
                size="large" />);
        }

        return (<div
            className="line-wrap"
            ref={(g) => {
                this.gClass = g;
            }}>
            <svg
                className={`budget-line ${this.props.size}`}>
                <g
                    className="budget-label-group"
                    transform="translate(0, 0)">
                    {budgetLabel}
                    <g
                        className="budget-label"
                        transform={this.props.gTransform}>
                        <rect
                            transform={this.props.rectTransform}
                            fill="#5b616b"
                            width="80"
                            height="30"
                            x={0}
                            y={0} />
                        <text
                            transform={this.props.textTransform}
                            fill="white"
                            className="title"
                            x={0}
                            y={0}
                            textAnchor="end">
                            {this.props.label}
                        </text>
                    </g>
                </g>
            </svg>
        </div>);
    }
}

TreeMapLine.propTypes = propTypes;
