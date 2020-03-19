/**
 * Created by michaelbray on 8/9/17.
 */

// eslint-disable-next-line import/prefer-default-export
export const filterHasSelections = (reduxFilters, filter) => {
    switch (filter) {
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
        case 'CFDA Programs':
            if (reduxFilters.selectedCFDA.toArray().length > 0) {
                return true;
            }
            return false;
        case 'NAICS Code':
            if (reduxFilters.selectedNAICS.toArray().length > 0) {
                return true;
            }
            return false;
        case 'North American Industry Classification System (NAICS)':
            return (reduxFilters.naics_codes.require.length > 0);
        case 'Product/Service Code (PSC)':
            if (reduxFilters.selectedPSC.toArray().length > 0) {
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
        default:
            return false;
    }
};
