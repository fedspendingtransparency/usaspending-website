/**
 * IdvDates.jsx
 * Created by Lizzie Salita 12/10/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    dates: PropTypes.object
};

export default class IdvDates extends React.Component {
    render() {
        return (
            <div className="idv-dates">
                <div className="idv-dates__heading">
                    Dates
                </div>
                <div className="idv-dates__row">
                    <div className="idv-dates__label">
                        Start Date
                    </div>
                    <div className="idv-dates__date">
                        {this.props.dates.startDate || '--'}
                    </div>
                </div>
                <div className="idv-dates__row">
                    <div className="idv-dates__label">
                        Last Modified On
                    </div>
                    <div className="idv-dates__date">
                        {this.props.dates.lastModifiedDate || '--'}
                    </div>
                </div>
                <div className="idv-dates__row">
                    <div className="idv-dates__label">
                        End Date
                    </div>
                    <div className="idv-dates__date">
                        {this.props.dates.endDate || '--'}
                    </div>
                </div>
            </div>
        );
    }
}

IdvDates.propTypes = propTypes;
