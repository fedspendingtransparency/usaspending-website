/**
 * BudgetLine.jsx
 * Created by Emily Gullo 03/02/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import BudgetLabel from './BudgetLabel';

const propTypes = {
    size: PropTypes.string,
    gTransform: PropTypes.string,
    rectTransform: PropTypes.string,
    textTransform: PropTypes.string,
    label: PropTypes.string,
    accessibilityLabel: PropTypes.string
};

export default class BudgetLine extends React.Component {
    render() {
        let budgetLabel = (<BudgetLabel
            labelWidth={20}
            labelPadding={5}
            labelDistance={5}
            currentY={0}
            graphHeight={642}
            size="small" />);
        if (this.props.size === 'large') {
            budgetLabel = (<BudgetLabel
                labelWidth={20}
                labelPadding={3}
                labelDistance={8}
                currentX={0}
                graphWidth={this.gClass.offsetWidth * 0.79}
                size="large" />);
        }
        return (
            <figure
                className="line-wrap"
                tabIndex={-1}
                aria-label={this.props.accessibilityLabel}
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
                                width="125"
                                height="25"
                                x={0}
                                y={0} />
                            <text
                                transform={this.props.textTransform}
                                fill="white"
                                fontSize="26px"
                                className="title"
                                fontWeight="300"
                                x={44}
                                y={2}
                                textAnchor="end">
                                {this.props.label}
                            </text>
                        </g>
                    </g>
                </svg>
            </figure>
        );
    }
}

BudgetLine.propTypes = propTypes;
