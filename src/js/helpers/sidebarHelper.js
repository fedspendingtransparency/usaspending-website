/**
 * Created by michaelbray on 8/9/17.
 */

/* eslint-disable default-export */
export const filterHasSelections = (reduxFilters, filter) => {
    switch (filter) {
        case 'Search':
            if (reduxFilters.keyword !== '') {
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
        case 'Agencies':
            if (reduxFilters.selectedFundingAgencies.toArray().length > 0
                || reduxFilters.selectedAwardingAgencies.toArray().length > 0) {
                return true;
            }
            return false;
        case 'Recipients':
            if (reduxFilters.selectedRecipients.toArray().length > 0
                || (reduxFilters.recipientDomesticForeign !== ''
                && reduxFilters.recipientDomesticForeign !== 'all')
                || reduxFilters.selectedRecipientLocations.toArray().length > 0
                || reduxFilters.recipientType.toArray().length > 0) {
                return true;
            }
            return false;
        case 'Place of Performance':
            if (reduxFilters.selectedLocations.toArray().length > 0
                || (reduxFilters.locationDomesticForeign !== ''
                && reduxFilters.locationDomesticForeign !== 'all')) {
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
/* eslint-enable default-export */
