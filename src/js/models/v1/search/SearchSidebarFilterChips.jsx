/**
 * SearchSidebarFilterChips.js
 * Created by Josue Aguilar on 02/03/2025.
 */
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import Accounting from 'accounting';
import { uniqueId } from "lodash-es";

import { recipientTypes } from 'dataMapping/search/recipientType';
import SearchAwardsOperation from "./SearchAwardsOperation";
import ShownValue from "../../../components/search/filters/otherFilters/ShownValue";
import * as searchFilterActions from "../../../redux/actions/search/searchFilterActions";
import * as naicsActions from "../../../redux/actions/search/naicsActions";
import * as pscActions from "../../../redux/actions/search/pscActions";
import * as tasActions from "../../../redux/actions/search/tasActions";
import {
    decrementTasCountAndUpdateUnchecked,
    getTasAncestryPathForChecked,
    removeStagedTasFilter
} from "../../../helpers/tasHelper";
import { formatAwardAmountRange } from "../../../helpers/awardAmountHelper";
import { awardTypeCodes, awardTypeGroups } from "../../../dataMapping/search/awardType";
import {
    extentCompetedDefinitions,
    pricingTypeDefinitions,
    setAsideDefinitions
} from "../../../dataMapping/search/contractFields";
import { decrementNaicsCountAndUpdateUnchecked, removeStagedNaicsFilter } from "../../../helpers/naicsHelper";
import {
    decrementPscCountAndUpdateUnchecked,
    getPscAncestryPathForChecked,
    removeStagedPscFilter
} from "../../../helpers/pscHelper";
import { trimCheckedToCommonAncestors } from "../../../helpers/checkboxTreeHelper";
import { dateRangeChipLabel, locationChipLabel } from "../../../helpers/searchHelper";
import { defCodes, defCodeGroups } from "../../../dataMapping/search/defCodes";

const propTypes = {
    filters: PropTypes.object,
    category: PropTypes.string,
    tasCounts: PropTypes.array,
    tasNodes: PropTypes.array,
    tasChecked: PropTypes.array,
    naicsCounts: PropTypes.array,
    pscCounts: PropTypes.array
};

const SearchSidebarFilterChips = ({
    filters,
    category,
    tasCounts,
    tasNodes,
    tasChecked,
    tasUnchecked,
    naicsCounts,
    naicsNodes,
    naicsChecked,
    naicsUnchecked,
    pscCounts,
    pscNodes,
    pscChecked,
    pscUnchecked,
    ...props
}) => {
    let filtersData;
    const chips = [];

    const dataFromState = () => {
        filtersData = new SearchAwardsOperation();
        filtersData.fromState(filters);
        filtersData.defCode = filters.defCode.toArray();
    };

    const isSubset = (array1, array2) => array2.every((element) => array1.includes(element));

    const addChip = (removeFilter, label) => {
        const removeChip = (e) => {
            e.stopPropagation();
            removeFilter();
        };

        chips.push(
            <ShownValue
                label={label}
                removeValue={removeChip}
                key={uniqueId('selected-filter-chips__')} />
        );
    };

    const getLocationChips = () => {
        // Add Locations
        if (filtersData.selectedLocations?.length > 0) {
            filtersData.selectedLocations.forEach((location) => {
                const removeFilter = (e) => {
                    e.stopPropagation();
                    const newValue = filters.selectedLocations.delete(location.identifier);
                    props.updateGenericFilter({
                        type: 'selectedLocations',
                        value: newValue
                    });
                };

                chips.push(
                    <ShownValue
                        label={
                            `Place of Performance: ${
                                locationChipLabel(location.display.entity, location)
                            }`
                        }
                        removeValue={removeFilter} />);
            });
        }

        if (filtersData.selectedRecipientLocations?.length > 0) {
            filtersData.selectedRecipientLocations.forEach((location) => {
                const removeFilter = (e) => {
                    e.stopPropagation();
                    const newValue = filters.selectedRecipientLocations.delete(location.identifier);
                    props.updateGenericFilter({
                        type: 'selectedRecipientLocations',
                        value: newValue
                    });
                };

                chips.push(
                    <ShownValue
                        label={
                            `Recipient Location: ${
                                locationChipLabel(location.display.entity, location)
                            }`
                        }
                        removeValue={removeFilter} />);
            });
        }
    };

    const getTimePeriodChips = () => {
        if (filtersData.timePeriodFY?.length > 0 || filtersData.time_period?.length > 0) {
            if (filtersData.timePeriodType === 'dr' && filtersData.time_period?.length > 0) {
                filtersData.time_period.forEach((timePeriod, index) => {
                    const removeDateRange = (startDate, endDate, e) => {
                        e.stopPropagation();

                        const newValue = filters.time_period.delete(timePeriod);

                        props.updateGenericFilter({
                            type: 'timePeriodType',
                            value: 'dr'
                        });
                        props.updateGenericFilter({
                            type: 'time_period',
                            value: newValue
                        });
                    };

                    const dateLabel = dateRangeChipLabel(timePeriod);

                    chips.push((
                        <ShownValue
                            key={index}
                            label={dateLabel}
                            removeValue={(e) => removeDateRange(timePeriod.start_date, timePeriod.end_date, e)} />
                    ));
                });
            }
            else if (filtersData.timePeriodType === 'fy' && filtersData.timePeriodFY?.length > 0) {
                filtersData.timePeriodFY.forEach((fy) => {
                    const removeFY = (e) => {
                        e.stopPropagation();
                        const newFilters = filters.timePeriodFY.delete(fy);
                        props.updateTimePeriod({ fy: newFilters, dateType: 'fy' });
                    };

                    chips.push(
                        <ShownValue
                            label={`FY ${fy}`}
                            removeValue={removeFY} />
                    );
                });
            }
        }
    };

    const getCharacteristicsChips = () => {
        if (filtersData.awardDescription) {
            const removeAwardsDescription = (e) => {
                e.stopPropagation();
                props.updateGenericFilter({
                    type: 'awardDescription',
                    value: ''
                });
            };

            chips.push(
                <ShownValue
                    label={filtersData.awardDescription}
                    removeValue={removeAwardsDescription} />
            );
        }

        if (filtersData.selectedAwardIDs?.length > 0) {
            filtersData.selectedAwardIDs.forEach((id) => {
                const removeAwardID = (e) => {
                    e.stopPropagation();
                    const awardId = filters.selectedAwardIDs.delete(id);

                    props.updateGenericFilter({
                        type: 'selectedAwardIDs',
                        value: awardId
                    });
                };

                chips.push(
                    <ShownValue
                        label={id}
                        removeValue={removeAwardID} />
                );
            });
        }

        if (filtersData.awardAmounts?.length > 0 && filtersData.awardAmounts?.[0].length > 0) {
            const firstValue = filtersData.awardAmounts[0][0];
            const secondValue = filtersData.awardAmounts[0][1];
            let key;

            if (firstValue === null && secondValue === 1000000) {
                key = 'range-0';
            }
            else if (firstValue === 1000000 && secondValue === 25000000) {
                key = 'range-1';
            }
            else if (firstValue === 25000000 && secondValue === 100000000) {
                key = 'range-2';
            }
            else if (firstValue === 100000000 && secondValue === 500000000) {
                key = 'range-3';
            }
            else if (firstValue === 500000000 && secondValue === null) {
                key = 'range-4';
            }
            else {
                key = 'specific';
            }

            const removeAwardAmount = (e) => {
                e.stopPropagation();
                const newValue = filters.awardAmounts.delete(key);
                props.updateGenericFilter({
                    type: 'awardAmounts',
                    value: newValue
                });
            };

            chips.push(
                <ShownValue
                    label={formatAwardAmountRange(filtersData.awardAmounts[0], 2)}
                    removeValue={removeAwardAmount} />
            );
        }

        if (filtersData.contractAwardType?.length > 0) {
            let contractsGrouped = false;
            let contractIdvsGrouped = false;

            if (isSubset(filtersData.contractAwardType, awardTypeGroups.contracts)) {
                contractsGrouped = true;
                addChip(
                    () => props.bulkContractAwardTypeChange({
                        types: awardTypeGroups.contracts,
                        direction: 'remove'
                    }),
                    "All Contracts"
                );
            }

            if (isSubset(filtersData.contractAwardType, awardTypeGroups.idvs)) {
                contractIdvsGrouped = true;
                addChip(
                    () => props.bulkContractAwardTypeChange({
                        types: awardTypeGroups.idvs,
                        direction: 'remove'
                    }),
                    "All Contract IDVs"
                );
            }

            if (!contractsGrouped || !contractIdvsGrouped) {
                let contractAwardTypes = filtersData.contractAwardType;

                if (contractsGrouped) {
                    contractAwardTypes = contractAwardTypes.filter(
                        (type) => !awardTypeGroups.contracts.includes(type)
                    );
                }
                else if (contractIdvsGrouped) {
                    contractAwardTypes = contractAwardTypes.filter(
                        (type) => !awardTypeGroups.idvs.includes(type)
                    );
                }

                contractAwardTypes.forEach((awardType) => {
                    addChip(
                        () => {
                            const newValue = filters.contractAwardType.delete(awardType);
                            props.updateGenericFilter({
                                type: 'contractAwardType',
                                value: newValue
                            });
                        },
                        awardTypeCodes[awardType]
                    );
                });
            }
        }

        if (filtersData.naicsCodes.require?.length > 0) {
            naicsCounts.forEach(({ value, label, count }) => {
                const removeNaics = (e) => {
                    e.stopPropagation();
                    const newChecked = removeStagedNaicsFilter(naicsNodes, naicsChecked, value);
                    const [newCounts, newUnchecked] = decrementNaicsCountAndUpdateUnchecked(
                        {
                            value, label, count, checked: false
                        },
                        naicsUnchecked,
                        naicsChecked,
                        naicsCounts,
                        naicsNodes
                    );

                    props.setUncheckedNaics(newUnchecked);
                    props.updateNaics(newChecked, newUnchecked, newCounts);
                    props.setCheckedNaics(newChecked);
                    props.setNaicsCounts(newCounts);
                };

                chips.push(
                    <ShownValue
                        label={`NAICS | ${value} - ${label} (${Accounting.formatNumber(count, 'thousand')})`}
                        removeValue={removeNaics} />
                );
            });
        }

        if (filtersData.pscCheckbox.require?.length > 0) {
            pscCounts.forEach(({ value, label, count }) => {
                const removePsc = (e) => {
                    e.stopPropagation();
                    const newChecked = removeStagedPscFilter(pscNodes, pscChecked, value);
                    const [newCounts, newUnchecked] = decrementPscCountAndUpdateUnchecked(
                        {
                            value, label, count, checked: false
                        },
                        pscUnchecked,
                        pscChecked,
                        pscCounts,
                        pscNodes
                    );
                    props.setCheckedPsc(newChecked);
                    props.setPscCounts(newCounts);
                    props.setUncheckedPsc(newUnchecked);
                    props.updatePSC(
                        trimCheckedToCommonAncestors(getPscAncestryPathForChecked(newChecked, pscNodes)),
                        getPscAncestryPathForChecked(newUnchecked, pscNodes),
                        newCounts
                    );
                };

                chips.push(
                    <ShownValue
                        label={`PSC | ${value} - ${label} (${Accounting.formatNumber(count, 'thousand')})`}
                        removeValue={removePsc} />
                );
            });
        }

        if (filtersData.pricingType?.length > 0) {
            filtersData.pricingType.forEach((pricingType) => {
                addChip(
                    () => {
                        const newValue = filters.pricingType.delete(pricingType);
                        props.updateGenericFilter({
                            type: 'pricingType',
                            value: newValue
                        });
                    },
                    pricingTypeDefinitions[pricingType]
                );
            });
        }

        if (filtersData.setAside?.length > 0) {
            filtersData.setAside.forEach((setAside) => {
                addChip(
                    () => {
                        const newValue = filters.setAside.delete(setAside);
                        props.updateGenericFilter({
                            type: 'setAside',
                            value: newValue
                        });
                    },
                    setAsideDefinitions[setAside]
                );
            });
        }

        if (filtersData.extentCompeted?.length > 0) {
            filtersData.extentCompeted.forEach((extentCompeted) => {
                addChip(
                    () => {
                        const newValue = filters.extentCompeted.delete(extentCompeted);
                        props.updateGenericFilter({
                            type: 'extentCompeted',
                            value: newValue
                        });
                    },
                    extentCompetedDefinitions[extentCompeted]
                );
            });
        }

        if (filtersData.financialAssistanceAwardType?.length > 0) {
            let grantsGrouped = false;
            let directPaymentsGrouped = false;
            let loansGrouped = false;
            let otherGrouped = false;

            if (isSubset(filtersData.financialAssistanceAwardType, awardTypeGroups.grants)) {
                grantsGrouped = true;
                addChip(
                    () => props.bulkFinancialAssistanceAwardTypeChange({
                        types: awardTypeGroups.grants,
                        direction: 'remove'
                    }),
                    "All Grants"
                );
            }

            if (isSubset(filtersData.financialAssistanceAwardType, awardTypeGroups.direct_payments)) {
                directPaymentsGrouped = true;
                addChip(
                    () => props.bulkFinancialAssistanceAwardTypeChange({
                        types: awardTypeGroups.direct_payments,
                        direction: 'remove'
                    }),
                    "All Direct Payments"
                );
            }

            if (isSubset(filtersData.financialAssistanceAwardType, awardTypeGroups.loans)) {
                loansGrouped = true;
                addChip(
                    () => props.bulkFinancialAssistanceAwardTypeChange({
                        types: awardTypeGroups.loans,
                        direction: 'remove'
                    }),
                    "All Loans"
                );
            }

            if (isSubset(filtersData.financialAssistanceAwardType, awardTypeGroups.other)) {
                otherGrouped = true;
                addChip(
                    () => props.bulkFinancialAssistanceAwardTypeChange({
                        types: awardTypeGroups.other,
                        direction: 'remove'
                    }),
                    "All Other"
                );
            }

            if (!grantsGrouped || !directPaymentsGrouped || !loansGrouped || !otherGrouped) {
                let financialAwardTypes = filtersData.financialAssistanceAwardType;

                if (grantsGrouped) {
                    financialAwardTypes = financialAwardTypes.filter(
                        (type) => !awardTypeGroups.grants.includes(type)
                    );
                }
                if (directPaymentsGrouped) {
                    financialAwardTypes = financialAwardTypes.filter(
                        (type) => !awardTypeGroups.direct_payments.includes(type)
                    );
                }
                if (loansGrouped) {
                    financialAwardTypes = financialAwardTypes.filter(
                        (type) => !awardTypeGroups.loans.includes(type)
                    );
                }
                if (otherGrouped) {
                    financialAwardTypes = financialAwardTypes.filter(
                        (type) => !awardTypeGroups.other.includes(type)
                    );
                }

                financialAwardTypes.forEach((awardType) => {
                    addChip(
                        () => {
                            const newValue = filters.financialAssistanceAwardType.delete(awardType);
                            props.updateGenericFilter({
                                type: 'financialAssistanceAwardType',
                                value: newValue
                            });
                        },
                        awardTypeCodes[awardType]
                    );
                });
            }
        }

        if (filtersData.selectedCFDA?.length > 0) {
            filtersData.selectedCFDA.forEach((cfda) => {
                const removeCfda = (e) => {
                    e.stopPropagation();
                    props.updateSelectedCFDA({ cfda });
                };

                chips.push(
                    <ShownValue
                        label={`Assistance Listing | ${cfda.identifier} | ${cfda.program_title}`}
                        removeValue={removeCfda} />
                );
            });
        }
    };

    const getRecipientChips = () => {
        console.log("I should not be called");
        if (filtersData.selectedRecipients?.length > 0) {
            filters.selectedRecipients.forEach((recipient) => {
                addChip(() => props.updateSelectedRecipients(recipient), recipient);
            });
        }

        if (filtersData.recipientType?.length > 0) {
            filtersData.recipientType.forEach((recipientType) => {
                addChip(
                    () => {
                        const newRecipientTypes = filters.recipientType.delete(recipientType);
                        props.updateGenericFilter({
                            type: 'recipientType',
                            value: newRecipientTypes
                        });
                    },
                    recipientTypes[recipientType]
                );
            });
        }
    };

    const getSourcesChips = () => {
        if (filtersData.awardingAgencies?.length > 0) {
            filtersData.awardingAgencies.forEach((agency) => {
                const removeAwardingAgency = (e) => {
                    e.stopPropagation();
                    props.updateSelectedAwardingAgencies({ agency });
                };

                chips.push(
                    <ShownValue
                        label={`Award | ${agency.subtier_agency.name}`}
                        removeValue={removeAwardingAgency} />
                );
            });
        }

        if (filtersData.fundingAgencies?.length > 0) {
            filtersData.fundingAgencies.forEach((agency) => {
                const removeFundingAgencies = (e) => {
                    e.stopPropagation();
                    props.updateSelectedFundingAgencies({ agency });
                };

                chips.push(
                    <ShownValue
                        label={`Fund | ${agency.subtier_agency.name}`}
                        removeValue={removeFundingAgencies} />
                );
            });
        }

        if (filtersData.tasSources?.length > 0 || filtersData.tasCheckbox.require?.length > 0) {
            tasCounts.forEach(({ value, label, count }) => {
                const removeTas = (e) => {
                    e.stopPropagation();
                    const newChecked = removeStagedTasFilter(tasNodes, tasChecked, value);
                    const [newCounts, newUnchecked] = decrementTasCountAndUpdateUnchecked(
                        {
                            value, label, count, checked: false
                        },
                        tasUnchecked,
                        tasChecked,
                        tasCounts,
                        tasNodes
                    );
                    props.setCheckedTas(newChecked);
                    props.setTasCounts(newCounts);
                    props.setUncheckedTas(newUnchecked);
                    props.updateTAS(
                        trimCheckedToCommonAncestors(getTasAncestryPathForChecked(newChecked, tasNodes)),
                        getTasAncestryPathForChecked(newUnchecked, tasNodes),
                        newCounts
                    );
                };

                chips.push(
                    <ShownValue
                        label={`TAS | ${value} - ${label} (${Accounting.formatNumber(count, 'thousand')})`}
                        removeValue={removeTas} />
                );
            });
        }

        if (filtersData.defCode?.length > 0) {
            if (isSubset(filtersData.defCode, defCodeGroups.covid)) {
                addChip(
                    () => props.bulkDefCodeChange({
                        types: defCodeGroups.covid,
                        direction: 'remove'
                    }),
                    'All COVID-19 Spending'
                );
            }
            else {
                filtersData.defCode.forEach((covid) => {
                    addChip(
                        () => props.toggleDefCode({ value: covid }),
                        `${covid}: ${
                            defCodes[covid].title.substring(0, 30)
                        }... ${
                            defCodes[covid]
                                .public_law
                                .includes('Non-emergency') ? '(Non-emergency)' : '(Emergency)'
                        }`
                    );
                });
            }

            if (isSubset(filtersData.defCode, defCodeGroups.infrastructure)) {
                addChip(
                    () => props.bulkDefCodeChange({
                        types: defCodeGroups.infrastructure,
                        direction: 'remove'
                    }),
                    'All Infrastructure Spending'
                );
            }
            else {
                filtersData.DefCode.forEach((infra) => {
                    addChip(() => props.toggleDefCode({ value: infra }),
                        `${infra}: ${
                            defCodes[infra].title.substring(0, 30)
                        }... ${
                            defCodes[infra]
                                .public_law
                                .includes('Non-emergency') ? '(Non-emergency)' : '(Emergency)'
                        }`
                    );
                });
            }
        }
    };

    dataFromState();

    switch (category) {
        case 'location':
            getLocationChips();
            break;
        case 'timePeriod':
            getTimePeriodChips();
            break;
        case 'characteristics':
            getCharacteristicsChips();
            break;
        case 'recipients':
            getRecipientChips();
            break;
        case 'sources':
            getSourcesChips();
            break;
        default:
            console.log('ERROR: Invalid Category Type');
    }

    return (chips);
};


const combinedActions = Object.assign({},
    searchFilterActions,
    naicsActions,
    pscActions,
    tasActions
);

SearchSidebarFilterChips.propTypes = propTypes;
export default connect(
    (state) => ({
        filters: state.filters,
        tasCounts: state.tas.counts.toJS(),
        tasNodes: state.tas.tas.toJS(),
        tasChecked: state.tas.checked.toJS(),
        tasUnchecked: state.tas.unchecked.toJS(),
        naicsCounts: state.naics.counts.toJS(),
        naicsNodes: state.naics.naics.toJS(),
        naicsChecked: state.naics.checked.toJS(),
        naicsUnchecked: state.naics.unchecked.toJS(),
        pscCounts: state.psc.counts.toJS(),
        pscNodes: state.psc.psc.toJS(),
        pscChecked: state.psc.checked.toJS(),
        pscUnchecked: state.psc.unchecked.toJS()
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(SearchSidebarFilterChips);
