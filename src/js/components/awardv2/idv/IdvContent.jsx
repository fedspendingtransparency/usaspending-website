/**
 * IdvContent.jsx
 * Created by Lizzie Salita 12/3/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { startCase } from 'lodash';

const propTypes = {
    overview: PropTypes.object
};

export default class ContractContent extends React.Component {
    render() {
        return (
            <div className="award award-idv">
                <div className="award__heading">
                    <div className="award__heading-text">{startCase(this.props.overview.typeDescription)}</div>
                    <span className="award__heading-lable">PIID</span>
                    <span className="award__heading-id">{this.props.overview.id}</span>
                </div>
                <hr />
            </div>
        );
    }
}

ContractContent.propTypes = propTypes;
