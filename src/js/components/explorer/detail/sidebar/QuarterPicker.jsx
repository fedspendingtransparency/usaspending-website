/**
 * QuarterPicker.jsx
 * Created by Kevin Li 2/12/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { earliestExplorerYear } from 'helpers/fiscalYearHelper';

import FYPicker from './FYPicker';
import QuarterButton from './QuarterButton';

const propTypes = {
    fy: PropTypes.string
};

export default class QuarterPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quarters: {}
        };

        this.hoveredQuarter = this.hoveredQuarter.bind(this);
    }

    hoveredQuarter(quarter) {
        const newState = {};
        for (let i = 1; i <= 4; i++) {
            newState[`Q${i}`] = Boolean(quarter >= i);
        }

        this.setState({
            quarters: newState
        });
    }

    render() {

        return (
            <div className="quarter-picker">
                <div className="quarter-picker__fy">
                    <FYPicker
                        fy={this.props.fy} />
                </div>
                <ul className="quarter-picker__list">
                    <li className="quarter-picker__list-item">
                        <QuarterButton
                            quarter={1}
                            hoveredQuarter={this.hoveredQuarter}
                            disabled={`${this.props.fy}` === `${earliestExplorerYear}`}
                            active={this.state.quarters.Q1}
                            first />
                    </li>
                    <li className="quarter-picker__list-item">
                        <QuarterButton
                            quarter={2}
                            hoveredQuarter={this.hoveredQuarter}
                            active={this.state.quarters.Q2} />
                    </li>
                    <li className="quarter-picker__list-item">
                        <QuarterButton
                            quarter={3}
                            hoveredQuarter={this.hoveredQuarter}
                            active={this.state.quarters.Q3} />
                    </li>
                    <li className="quarter-picker__list-item">
                        <QuarterButton
                            quarter={4}
                            hoveredQuarter={this.hoveredQuarter}
                            active={this.state.quarters.Q4}
                            last />
                    </li>
                </ul>
            </div>
        );
    }
}

QuarterPicker.propTypes = propTypes;
