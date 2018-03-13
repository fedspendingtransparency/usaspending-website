/**
 * ContractAdditionalDetails
 * Created by Kevin Li 3/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as DataFields from 'dataMapping/contracts/additionalDetails';

import AdditionalGroup from './AdditionalGroup';

const propTypes = {
    selectedAward: PropTypes.object
};

export default class ContractAdditionalDetails extends React.Component {
    render() {
        const award = this.props.selectedAward;
        let executiveCompensation = null;
        if (award.recipient.officers) {
            executiveCompensation = (
                <div>
                    <hr className="additional-group-divider" />
                    <AdditionalGroup
                        data={award.recipient.officers}
                        fields={DataFields.compensationFields}
                        title="Executive Compensation" />
                </div>
            );
        }
        return (
            <div className="additional-details-wrapper">
                <AdditionalGroup
                    data={award}
                    fields={DataFields.parentFields}
                    title="Parent Award Details" />
                <hr className="additional-group-divider" />
                <AdditionalGroup
                    data={award}
                    fields={DataFields.agencyFields}
                    title="Agency Details" />
                <hr className="additional-group-divider" />
                <AdditionalGroup
                    data={award.additionalDetails}
                    fields={DataFields.competitionFields}
                    title="Competition Details" />
                <hr className="additional-group-divider" />
                <AdditionalGroup
                    data={award.additionalDetails}
                    fields={DataFields.pscFields}
                    title="Product or Service Details" />
                <hr className="additional-group-divider" />
                <AdditionalGroup
                    data={award.additionalDetails}
                    fields={DataFields.legislativeFields}
                    title="Legislative Mandates" />
                <hr className="additional-group-divider" />
                <AdditionalGroup
                    data={award.additionalDetails}
                    fields={DataFields.additionalFields}
                    title="Additional Details" />
                {executiveCompensation}
            </div>
        );
    }
}

ContractAdditionalDetails.propTypes = propTypes;
