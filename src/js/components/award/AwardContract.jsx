/**
 * AwardContract.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';
import AwardAmounts from './AwardAmounts';
import ContractDetails from './ContractDetails';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class AwardContract extends React.Component {

    render() {
        return (
            <div className="award-contract-wrapper">
                <AwardAmounts
                    selectedAward={this.props.selectedAward} />
                <ContractDetails
                    selectedAward={this.props.selectedAward} />
            </div>
        );
    }
}
AwardContract.propTypes = propTypes;
