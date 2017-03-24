/**
 * ContractAdditionalDetails
 * Created by Kevin Li 3/2/17
 */

import React from 'react';

import * as DataFields from 'dataMapping/grants/additionalDetails';

import AdditionalGroup from './AdditionalGroup';

const propTypes = {
    award: React.PropTypes.object
};

export default class AssistanceAdditionalDetails extends React.Component {
    render() {
        const award = this.props.award.selectedAward;
        return (
            <div className="additional-details-wrapper">
                <AdditionalGroup
                    data={award}
                    fields={DataFields.budgetFields}
                    title={"Budget Information"} />
            </div>
        );
    }
}

AssistanceAdditionalDetails.propTypes = propTypes;
