/**
 * SearchSidebarFilterChips.js
 * Created by Josue Aguilar on 02/03/2025.
 */


class SearchSidebarFilterChips {
    constructor() {
        // filters from redux
        this.keyword = {};
        this.timePeriodType = 'dr';
        this.timePeriodFY = [];
        this.time_period = [];
        this.filterNewAwardsOnlySelected = false;
        this.filterNewAwardsOnlyActive = false;
        this.filterNaoActiveFromFyOrDateRange = false;
        this.selectedLocations = {};
        this.locationDomesticForeign = 'all';
        this.selectedFundingAgencies = {};
        this.selectedAwardingAgencies = {};
        this.selectedRecipients = [];
        this.recipientDomesticForeign = 'all';
        this.recipientType = [];
        this.selectedRecipientLocations = {};
        this.awardType = [];
        this.selectedAwardIDs = {};
        this.awardAmounts = {};
        this.selectedCFDA = {};
        this.naicsCodes = {
            require: [],
            exclude: [],
            counts: []
        };
        this.pscCodes = {
            require: [],
            exclude: [],
            counts: []
        };
        this.defCodes = {
            require: [],
            exclude: [],
            counts: []
        };
        this.covidDefCode = [];
        this.infraDefCode = [];
        this.pricingType = [];
        this.setAside = [];
        this.extentCompeted = [];
        this.treasuryAccounts = {};
        this.tasCodes = {
            require: [],
            exclude: [],
            counts: []
        };
    }

    fromState(state) {
        this.keyword = state.keyword.toArray();
        this.time_period = state.time_period?.toArray();
        this.timePeriodFY = state.timePeriodFY.toArray();
        this.timePeriodRange = [];
        this.timePeriodType = state.timePeriodType;

        this.dateType = state.filterNewAwardsOnlySelected;

        this.awardType = state.awardType.toArray();

        this.awardingAgencies = state.selectedAwardingAgencies.toArray();
        this.fundingAgencies = state.selectedFundingAgencies.toArray();

        this.tasSources = state.treasuryAccounts.toArray();
        this.tasCheckbox = {
            require: state.tasCodes.toObject().require,
            exclude: state.tasCodes.toObject().exclude
        };

        this.selectedRecipients = state.selectedRecipients.toArray();
        this.recipientDomesticForeign = state.recipientDomesticForeign;
        this.selectedRecipientLocations = state.selectedRecipientLocations.toArray();
        this.recipientType = state.recipientType.toArray();

        this.selectedLocations = state.selectedLocations.toArray();
        this.locationDomesticForeign = state.locationDomesticForeign;

        this.awardAmounts = state.awardAmounts.toArray();

        this.selectedAwardIDs = state.selectedAwardIDs.toArray();

        this.selectedCFDA = state.selectedCFDA.toArray();
        this.naicsCodes = {
            require: state.naicsCodes.toObject().require,
            exclude: state.naicsCodes.toObject().exclude
        };
        this.pscCheckbox = {
            require: state.pscCodes.toObject().require,
            exclude: state.pscCodes.toObject().exclude
        };
        this.defCodes = {
            require: state.defCodes.toObject().require,
            exclude: state.defCodes.toObject().exclude
        };

        this.pricingType = state.pricingType.toArray();
        this.setAside = state.setAside.toArray();
        this.extentCompeted = state.extentCompeted.toArray();
    }

    toData() {
        const chipData = {};

        // Add Locations
        if (this.selectedLocations?.length > 0) {
            chipData.location = this.selectedLocations.map((location) => {
                const removeFilter = (e) => {
                    e.stopPropagation();
                    console.log('removeFilter');
                };

                return {
                    title: location.display.title,
                    removeFilter
                };
            });
        }

        return chipData;
    }
}

export default SearchSidebarFilterChips;
