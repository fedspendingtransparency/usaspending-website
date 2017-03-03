/**
 * AdditionalDetails
 * Created by Kevin Li 3/2/17
 */

import React from 'react';

import * as DataFields from 'dataMapping/contracts/additionalDetails';

import AdditionalGroup from './AdditionalGroup';

export default class AdditionalDetails extends React.Component {
    render() {
        return (
            <div className="additional-details-wrapper">
                <AdditionalGroup
                    award={this.props.award}
                    fields={DataFields.agencyFields}
                    title={"Agency Details"} />
            </div>
        );
    }
}
