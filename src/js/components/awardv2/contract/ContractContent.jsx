/**
 * ContractContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';
import AwardAmounts from '../visualizations/amounts/AwardAmounts';
import AwardDescription from "../visualizations/description/AwardDescription";

const propTypes = {
    selectedAward: PropTypes.object,
    inFlight: PropTypes.bool
};

export default class ContractContent extends React.Component {
    render() {
        return (
            <div className="award award-contract">
                <div className="award__heading">
                    <span className="award__heading_bold">{startCase(this.props.selectedAward.typeDescription)}</span> <div className="award__heading-glossary"><Icons.Glossary /></div> | {this.props.selectedAward.id}
                    <hr className="award__heading-divider" />
                </div>
                <div className="award__row">
                    <AwardAmounts
                        award={this.props.selectedAward} />
                    <AwardDescription
                        award={this.props.selectedAward} />
                </div>
            </div>
        );
    }
}
ContractContent.propTypes = propTypes;
