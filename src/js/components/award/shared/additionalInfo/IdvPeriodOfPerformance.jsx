/**
 * IdvPeriodOfPerformance.jsx
 * Created by Lizzie Salita 6/25/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from 'components/sharedComponents/accordion/Accordion';

const propTypes = {
    accordionData: PropTypes.object,
    onToggle: PropTypes.func
};

const IdvPeriodOfPerformance = ({ accordionData, onToggle }) => {
    const title = (
        <span>
            <FontAwesomeIcon className="accordion-icon-calendar-alt" size="lg" icon="calendar-alt" />
            Period of Performance
        </span>
    );

    return (
        <Accordion
            title={title}
            onToggle={onToggle}
            contentClassName="no-padding"
            containerClassName="expand-all-trigger">
            <div className="accordion__content">
                <table className="accordion-table">
                    <tbody>
                        <tr
                            className="accordion-table__row">
                            <td className="accordion-table__data accordion-table__data_info-tooltip">
                                Start Date
                                <div
                                    className="tooltip-popover-container"
                                    tabIndex={0}
                                    role="button">
                                    <FontAwesomeIcon icon="info-circle" />
                                    <span className="tooltip-popover">
                                        Selected based on the earliest Start Date across all transactions on this IDV
                                    </span>
                                </div>
                            </td>
                            <td>{accordionData['Start Date'] || '--'}</td>
                        </tr>
                        <tr
                            className="accordion-table__row">
                            <td className="accordion-table__data accordion-table__data_info-tooltip">
                                Ordering Period End Date
                                <div
                                    className="tooltip-popover-container"
                                    tabIndex={0}
                                    role="button">
                                    <FontAwesomeIcon icon="info-circle" />
                                    <span className="tooltip-popover">
                                        Selected based on the latest Ordering Period End Date across all transactions on this IDV
                                    </span>
                                </div>
                            </td>
                            <td>{accordionData['Ordering Period End Date'] || '--'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Accordion>
    );
};

IdvPeriodOfPerformance.propTypes = propTypes;
export default IdvPeriodOfPerformance;
