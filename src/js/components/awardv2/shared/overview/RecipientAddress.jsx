/**
 * RecipientAddress.jsx
 * Created by Jonathan Hill 11/26/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { AddresskeysByAwardType } from 'dataMapping/awardsv2/awardOverview';

const propTypes = {
    aggregateRecordType: PropTypes.string,
    placeOfPerformance: PropTypes.object
};

const RecipientAddress = ({ placeOfPerformance, aggregateRecordType }) => (
    <div className="award-overview__left-section__recipient__recipient-address">
        {
            AddresskeysByAwardType[aggregateRecordType].map(
                (addressKey) => (
                    <div
                        className="award-overview__left-section__recipient__recipient-address__address-line award-overview__left-section__aggregated-text"
                        key={addressKey}>
                        {placeOfPerformance[addressKey] || '--'}
                    </div>
                )
            )
        }
    </div>
);

RecipientAddress.propTypes = propTypes;
export default RecipientAddress;
