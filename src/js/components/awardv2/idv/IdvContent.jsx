/**
 * IdvContent.jsx
 * Created by Lizzie Salita 12/3/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { startCase } from 'lodash';
import RelatedAwards from '../visualizations/overview/RelatedAwards';
import IdvDates from './IdvDates';

const propTypes = {
    overview: PropTypes.object
};

export default class IdvContent extends React.Component {
    render() {
        return (
            <div className="award award-idv">
                <div className="award__heading">
                    <div className="award__heading-text">{startCase(this.props.overview.typeDescription)}</div>
                    <div className="award__heading-lable">{this.props.overview.id ? 'PIID' : ''}</div>
                    <div className="award__heading-id">{this.props.overview.id}</div>
                </div>
                <hr />
                <div className="award__row award-overview" id="award-overview">
                    <RelatedAwards
                        overview={this.props.overview} />
                    <IdvDates
                        dates={this.props.overview.dates} />
                </div>
            </div>
        );
    }
}

IdvContent.propTypes = propTypes;
