/**
 * ContractAdditionalDetails
 * Created by Kevin Li 3/2/17
 */

import React from 'react';

import * as DataFields from 'dataMapping/contracts/additionalDetails';

import AdditionalGroup from './AdditionalGroup';

const propTypes = {
    award: React.PropTypes.object
};

export default class ContractAdditionalDetails extends React.Component {
    render() {
        const award = this.props.award.selectedAward;
        return (
            <div className="additional-details-wrapper">
                <AdditionalGroup
                    data={award.latest_transaction.contract_data}
                    fields={DataFields.parentFields}
                    title={"Parent Award Details"} />
                <hr className="additional-group-divider" />
                <AdditionalGroup
                    data={award}
                    fields={DataFields.agencyFields}
                    title={"Agency Details"} />
                <hr className="additional-group-divider" />
                <AdditionalGroup
                    data={award.latest_transaction.contract_data}
                    fields={DataFields.competitionFields}
                    title={"Competition Details"} />
                <hr className="additional-group-divider" />
                <AdditionalGroup
                    data={award.latest_transaction.contract_data}
                    fields={DataFields.pscFields}
                    title={"Product or Service Details"} />
                <hr className="additional-group-divider" />
                <AdditionalGroup
                    data={award.latest_transaction.contract_data}
                    fields={DataFields.legislativeFields}
                    title={"Legislative Mandates"} />
                <hr className="additional-group-divider" />
                <AdditionalGroup
                    data={award.latest_transaction.contract_data}
                    fields={DataFields.additionalFields}
                    title={"Additional Details"} />
            </div>
        );
    }
}

ContractAdditionalDetails.propTypes = propTypes;
