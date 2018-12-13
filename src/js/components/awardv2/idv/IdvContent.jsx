/**
 * IdvContent.jsx
 * Created by Lizzie Salita 12/3/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { startCase } from 'lodash';

import AwardDescription from '../visualizations/description/AwardDescription';

const propTypes = {
    awardId: PropTypes.string,
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
                <div className="award__row">
                    <AwardDescription
                        awardId={this.props.awardId}
                        description={this.props.overview.description}
                        naics={this.props.overview.additionalDetails.naicsCode}
                        psc={this.props.overview.additionalDetails.pscCode} />
                </div>
            </div>
        );
    }
}

IdvContent.propTypes = propTypes;
