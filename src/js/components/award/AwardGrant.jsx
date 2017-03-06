/**
 * AwardGrant.jsx
 * Created by Lizzie Dabbs 03/06/2017
 **/

import React from 'react';
import AwardAmounts from './AwardAmounts';
import GrantDetails from './GrantDetails';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class AwardGrant extends React.Component {

    render() {
        return (
            <div className="award-contract-wrapper">
                <AwardAmounts
                    selectedAward={this.props.selectedAward} />
                <GrantDetails
                    selectedAward={this.props.selectedAward} />
            </div>
        );
    }
}
AwardGrant.propTypes = propTypes;
