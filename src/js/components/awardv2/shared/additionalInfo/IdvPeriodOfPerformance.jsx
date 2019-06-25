/**
 * IdvPeriodOfPerformance.jsx
 * Created by Lizzie Salita 6/25/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InfoTooltip from '../../idv/InfoTooltip';
import { idvStartDateInfo, idvEndDateInfo } from '../../idv/InfoTooltipContent';

const propTypes = {
    accordionName: PropTypes.string,
    accordionIcon: PropTypes.string,
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
        return (
            <div className={this.state.open ? 'accordion accordion_open' : 'accordion'}>
                <div
                    className="accordion__bar"
                    tabIndex={0}
                    role="button"
                    onKeyPress={this.handleClick}
                    onClick={this.handleClick}>
                    <span>
                        <FontAwesomeIcon size="lg" icon="calendar-alt" />
                        Period of Performance
                    </span>
                    <span>
                        {this.state.open ? <FontAwesomeIcon size="lg" icon="angle-down" /> : <FontAwesomeIcon size="lg" icon="angle-right" />}
                    </span>
                </div>
                <div className="accordion__content">
                    <table className="accordion-table">
                        <tbody>
                            <tr
                                className="accordion-table__row">
                                <td className="accordion-table__data accordion-table__data_info-tooltip">
                                    Start Date
                                    <InfoTooltip>
                                        {idvStartDateInfo}
                                    </InfoTooltip>
                                </td>
                                <td>{this.props.accordionData['Start Date'] || '--'}</td>
                            </tr>
                            <tr
                                className="accordion-table__row">
                                <td className="accordion-table__data accordion-table__data_info-tooltip">
                                    Ordering Period End Date
                                    <InfoTooltip>
                                        {idvEndDateInfo}
                                    </InfoTooltip>
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
