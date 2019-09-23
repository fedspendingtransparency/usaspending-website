/**
 * IdvPeriodOfPerformance.jsx
 * Created by Lizzie Salita 6/25/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createOnKeyDownHandler } from 'helpers/keyboardEventsHelper';

const propTypes = {
    accordionData: PropTypes.object,
    globalToggle: PropTypes.bool
};

export default class IdvPeriodOfPerformance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (this.props.globalToggle !== prevProps.globalToggle) {
            this.globalOverride();
        }
    }
    handleClick() {
        this.setState({ open: !this.state.open });
    }

    globalOverride() {
        this.setState({
            open: this.props.globalToggle
        });
    }

    render() {
        const onKeyDownHandler = createOnKeyDownHandler(this.handleClick);
        return (
            <div className={this.state.open ? 'accordion accordion_open' : 'accordion'}>
                <div
                    className="accordion__bar"
                    tabIndex={0}
                    role="button"
                    onKeyDown={onKeyDownHandler}
                    onClick={this.handleClick}>
                    <span>
                        <FontAwesomeIcon className="accordion-icon-calendar-alt" size="lg" icon="calendar-alt" />
                        Period of Performance
                    </span>
                    <span>
                        {this.state.open ? <FontAwesomeIcon className="accordion-caret" size="lg" icon="angle-down" /> : <FontAwesomeIcon className="accordion-caret" size="lg" icon="angle-right" />}
                    </span>
                </div>
                <div className="accordion__content">
                    <table className="accordion-table">
                        <tbody>
                            <tr
                                className="accordion-table__row">
                                <td className="accordion-table__data accordion-table__data_info-tooltip">
                                    Start Date
                                    <div className="tooltip-popover-container" tabIndex="0" role="button">
                                        <FontAwesomeIcon icon="info-circle" />
                                        <span className="tooltip-popover">
                                        Selected based on the earliest Start Date across all transactions on this IDV
                                        </span>
                                    </div>
                                </td>
                                <td>{this.props.accordionData['Start Date'] || '--'}</td>
                            </tr>
                            <tr
                                className="accordion-table__row">
                                <td className="accordion-table__data accordion-table__data_info-tooltip">
                                    Ordering Period End Date
                                    <div className="tooltip-popover-container" tabIndex="0" role="button">
                                        <FontAwesomeIcon icon="info-circle" />
                                        <span className="tooltip-popover">
                                            Selected based on the latest Ordering Period End Date across all transactions on this IDV
                                        </span>
                                    </div>
                                </td>
                                <td>{this.props.accordionData['Ordering Period End Date'] || '--'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

IdvPeriodOfPerformance.propTypes = propTypes;
