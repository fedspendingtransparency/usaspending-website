/**
 * BudgetLine.jsx
 * Created by Emily Gullo 03/02/2017
 **/

import React from 'react';
import BudgetLabel from './BudgetLabel';

export default class BudgetLine extends React.Component {

    render() {
        return (<svg className="budget-line">
            <g
                className="budget-label-group"
                transform="translate(0, 0)">
                <BudgetLabel
                    labelWidth={20}
                    labelPadding={5}
                    labelDistance={5}
                    currentY={0}
                    graphHeight={642} />
                <g
                    className="budget-label"
                    transform="translate(15,300)rotate(180)">
                    <rect
                        transform="translate(20, -78)rotate(90)"
                        fill="#5b616b"
                        width="80"
                        height="30"
                        x={0}
                        y={0} />
                    <text
                        transform="translate(0, 0)rotate(90)"
                        fill="white"
                        className="title"
                        x={0}
                        y={0}
                        textAnchor="end">
                        2.74 trillion
                    </text>
                </g>
            </g>
        </svg>);
    }
}
