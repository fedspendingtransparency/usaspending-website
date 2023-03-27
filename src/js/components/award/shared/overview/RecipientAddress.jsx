/**
 * RecipientAddress.jsx
 * Created by Jonathan Hill 11/26/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { AddresskeysByAwardType } from 'dataMapping/award/awardOverview';
import { TooltipWrapper } from "data-transparency-ui";
import { CDTooltip } from 'components/search/filters/tooltips/AdvancedSearchTooltip';
import FeatureFlag from "../../../sharedComponents/FeatureFlag";

const propTypes = {
    aggregateRecordType: PropTypes.string,
    recipientLocation: PropTypes.object
};

// contains letters or numbers
const regEx = RegExp('[A-Za-z0-9]');
const regExTest = (string) => regEx.test(string);

const RecipientAddress = ({ recipientLocation, aggregateRecordType }) => {
    const arrayOfAddressKeysByAwardType = AddresskeysByAwardType[aggregateRecordType];
    const recipientAddress = arrayOfAddressKeysByAwardType.map(
        (addressKey) => (
            <div
                className="award-overview__left-section__recipient__recipient-address__address-line award-overview__left-section__aggregated-text"
                key={addressKey}>
                {recipientLocation[addressKey] || null}
            </div>
        )
    );
    // if any address field contains letters or numbers this will return true
    const addressContainsLetters = arrayOfAddressKeysByAwardType
        .map((addressKey) => recipientLocation[addressKey] || '')
        .some(regExTest);
    return (
        <div className="award-overview__left-section__recipient-address-container">
            <div className="award-overview__left-section__recipient__recipient-address">
                { !addressContainsLetters ? '--' : recipientAddress }
            </div>
            <FeatureFlag>
                <div className="award-overview__left-section__recipient-tooltip">
                    <TooltipWrapper
                        className="homepage__covid-19-tt"
                        icon="info"
                        tooltipComponent={<CDTooltip />} />
                </div>
            </FeatureFlag>
        </div>
    );
};

RecipientAddress.propTypes = propTypes;
export default RecipientAddress;
