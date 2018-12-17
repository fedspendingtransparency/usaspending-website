/**
 * IdvContent.jsx
 * Created by Lizzie Salita 12/3/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { startCase } from 'lodash';
import RelatedAwards from '../visualizations/overview/RelatedAwards';
import IdvDates from './IdvDates';

import AdditionalInfo from '../contract/AdditionalInfo';

const propTypes = {
    overview: PropTypes.object
};

export default class IdvContent extends React.Component {
    render() {
        return (
            <div className="award award-idv">
                <div className="idv__heading">
                    <div className="idv__info">
                        <div className="award__heading-text">{startCase(this.props.overview.typeDescription)}</div>
                        <div className="award__heading-lable">{this.props.overview.id ? 'PIID' : ''}</div>
                        <div className="award__heading-id">{this.props.overview.id}</div>
                    </div>
                    <div className="idv__last-modified">
                        Last Modified On: <span className="idv__last-modified idv__last-modified_date">{this.props.overview.dates.lastModifiedDate}</span>
                    </div>
                </div>
                <hr />
                <div className="award__row award-overview" id="award-overview">
                    <RelatedAwards
                        overview={this.props.overview} />
                    <IdvDates
                        dates={this.props.overview.dates} />
                </div>

                <div className="award__agencyAdditional" id="award-additional-information">
                    <AdditionalInfo
                        overview={this.props.overview} />
                </div>
            </div>
        );
    }
}

IdvContent.propTypes = propTypes;
