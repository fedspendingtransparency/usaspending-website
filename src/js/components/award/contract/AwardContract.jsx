/**
 * AwardContract.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import AwardAmounts from '../AwardAmounts';
import ContractDetails from './ContractDetails';

const propTypes = {
    selectedAward: PropTypes.object,
    seeAdditional: PropTypes.func
};

export default class AwardContract extends React.Component {
    render() {
        return (
            <div className="award-contract-wrapper">
                <AwardAmounts
                    selectedAward={this.props.selectedAward} />
                <ContractDetails
                    selectedAward={this.props.selectedAward}
                    seeAdditional={this.props.seeAdditional} />
            </div>
        );
    }
}
AwardContract.propTypes = propTypes;
