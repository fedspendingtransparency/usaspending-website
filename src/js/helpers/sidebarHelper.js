/**
 * Created by michaelbray on 8/9/17.
 */

// eslint-disable-next-line import/prefer-default-export
export const filterHasSelections = (reduxFilters, filter) => {
    switch (filter.title) {
        case 'Keyword':
            if (reduxFilters.keyword.toArray().length > 0) {
                return true;
            }
            return false;
        case 'Time Period':
            if (reduxFilters.timePeriodFY.toArray().length > 0
                || (reduxFilters.timePeriodRange
                && reduxFilters.timePeriodRange.toArray().length === 2)) {
                return true;
            }
            return false;
        case 'Award Type':
            if (reduxFilters.awardType.toArray().length > 0) {
                return true;
            }
            return false;
        case 'Agency':
            if (reduxFilters.selectedFundingAgencies.toArray().length > 0
                || reduxFilters.selectedAwardingAgencies.toArray().length > 0) {
                return true;
            }
            return false;
        case 'Recipient':
            if (reduxFilters.selectedRecipients.toArray().length > 0) {
                return true;
            }
            return false;
        case 'Recipient Type':
            if (reduxFilters.recipientType.toArray().length > 0) {
                return true;
            }
            return false;
        case 'Location':
            if (reduxFilters.selectedLocations.toArray().length > 0
                || reduxFilters.selectedRecipientLocations.toArray().length > 0) {
                return true;
            }
            return false;
        case 'Award Amount':
            if (reduxFilters.awardAmounts.toArray().length > 0) {
                return true;
            }
            return false;
        case 'Award ID':
            if (reduxFilters.selectedAwardIDs.toArray().length > 0) {
                return true;
            }
            return false;
        case 'Assistance Listing':
            if (reduxFilters.selectedCFDA.toArray().length > 0) {
                return true;
            }
            return false;
        case 'North American Industry Classification System (NAICS)':
            return (reduxFilters.naicsCodes.toObject().require.length > 0);
        case 'Product or Service Code (PSC)':
            if (reduxFilters.pscCodes.toObject().require.length > 0) {
                return true;
            }
            return false;
        case 'Type of Contract Pricing':
            if (reduxFilters.pricingType.toArray().length > 0) {
                return true;
            }
            return false;
        case 'Type of Set Aside':
            if (reduxFilters.setAside.toArray().length > 0) {
                return true;
            }
            return false;
        case 'Extent Competed':
            if (reduxFilters.extentCompeted.toArray().length > 0) {
                return true;
            }
            return false;
        case 'Treasury Account Symbol (TAS)':
            if (reduxFilters.tasCodes.toObject().require.length > 0) return true;
            return false;
        case 'Disaster Emergency Fund Code (DEFC)':
            if (reduxFilters.defCodes.toObject().require.length > 0) return true;
            return false;
        default:
            return false;
    }
};
