/**
 * @jest-environment jsdom
 *
 * searchFiltersReducer-test.js
 * Created by Kevin Li 1/17/17
 */

import { Set, OrderedMap } from 'immutable';

import searchFiltersReducer, { initialState } from 'redux/reducers/search/searchFiltersReducer';
import { awardRanges } from 'dataMapping/search/awardAmount';

import { mockRecipient, mockAgency, mockTreasuryAccount } from './mock/mockFilters';

jest.mock('helpers/fiscalYearHelper', () => require('./mockFiscalYearHelper'));

describe('searchFiltersReducer', () => {
    it('should return the initial state by default', () => {
        expect(searchFiltersReducer(undefined, {})).toEqual(initialState);
    });

    describe('TOGGLE_SEARCH_FILTER_AWARD_TYPE', () => {
        const action = {
            type: 'TOGGLE_SEARCH_FILTER_AWARD_TYPE',
            awardType: '09'
        };

        it('should add a value if it does not currently exist in the set', () => {
            const startingState = Object.assign({}, initialState);

            expect(searchFiltersReducer(startingState, action).awardType).toEqual(new Set(['09']));
        });

        it('should remove a value if currently exists in the set', () => {
            const startingState = Object.assign({}, initialState, {
                awardType: new Set(['09'])
            });

            expect(searchFiltersReducer(startingState, action).awardType).toEqual(new Set([]));
        });
    });

    describe('UPDATE_TEXT_SEARCH', () => {
        const action = {
            type: 'UPDATE_TEXT_SEARCH',
            textInput: 'testing'
        };

        const keyword = 'testing';

        it('should add the provided keyword if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, action);

            expect(updatedState.keyword).toEqual(new OrderedMap({ testing: keyword }));
        });

        it('should not override the previous keyword, if the new keyword does not already exist', () => {
            const startingState = Object.assign({}, initialState, {
                keyword: new OrderedMap({ moretesting: 'moretesting' })
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.keyword).toEqual(new OrderedMap({
                moretesting: 'moretesting',
                testing: 'testing'
            }));
        });

        it('should remove the provided keyword if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                keyword: new OrderedMap({ testing: keyword })
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.keyword).toEqual(new OrderedMap());
        });
    });

    describe('BULK_SEACH_FILTER_AWARD_TYPE', () => {
        it('should add the provided values when the direction is "add"', () => {
            const action = {
                type: 'BULK_SEARCH_FILTER_AWARD_TYPE',
                awardTypes: ['10', '06'],
                direction: 'add'
            };

            const startingState = Object.assign({}, initialState);

            expect(searchFiltersReducer(startingState, action).awardType).toEqual(new Set(['10', '06']));
        });

        it('should remove the provided values when the direction is "remove"', () => {
            const action = {
                type: 'BULK_SEARCH_FILTER_AWARD_TYPE',
                awardTypes: ['10', '06'],
                direction: 'remove'
            };

            const startingState = Object.assign({}, initialState, {
                awardType: new Set(['09', '10', '06'])
            });

            expect(searchFiltersReducer(startingState, action).awardType).toEqual(new Set(['09']));
        });
    });

    describe('UPDATE_SEARCH_FILTER_TIME_PERIOD', () => {
        it('should set the time period value to the provided action data', () => {
            const action = {
                type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD',
                dateType: 'fy',
                fy: ['1778', '1777', '1775'],
                start: null,
                end: null
            };

            const expected = {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['1778', '1777', '1775']),
                timePeriodStart: null,
                timePeriodEnd: null
            };

            const updatedState = searchFiltersReducer(undefined, action);

            Object.keys(expected).forEach((key) => {
                expect(updatedState[key]).toEqual(expected[key]);
            });
        });
    });

    describe('UPDATE_SEARCH_FILTER_NEW_AWARDS_ONLY_SELECTED', () => {
        it('should set the filterNewAwardsOnlySelected value to the provided action data', () => {
            const action = {
                type: 'UPDATE_SEARCH_FILTER_NEW_AWARDS_ONLY_SELECTED',
                filterValue: true
            };

            const expected = {
                filterNewAwardsOnlySelected: true
            };

            const updatedState = searchFiltersReducer(undefined, action);

            Object.keys(expected).forEach((key) => {
                expect(updatedState[key]).toEqual(expected[key]);
            });
        });
    });

    describe('UPDATE_SEARCH_FILTER_NEW_AWARDS_ONLY_ACTIVE', () => {
        it('should set the filterNewAwardsOnlyActive value to the provided action data', () => {
            const action = {
                type: 'UPDATE_SEARCH_FILTER_NEW_AWARDS_ONLY_ACTIVE',
                filterValue: true
            };

            const expected = {
                filterNewAwardsOnlyActive: true
            };

            const updatedState = searchFiltersReducer(undefined, action);

            Object.keys(expected).forEach((key) => {
                expect(updatedState[key]).toEqual(expected[key]);
            });
        });
    });

    describe('UPDATE_SEARCH_FILTER_NAO_FROM_FY_OR_DATE_RANGE', () => {
        it('should set the filterNaoActiveFromFyOrDateRange value to the provided action data', () => {
            const action = {
                type: 'UPDATE_SEARCH_FILTER_NAO_FROM_FY_OR_DATE_RANGE',
                filterValue: true
            };

            const expected = {
                filterNaoActiveFromFyOrDateRange: true
            };

            const updatedState = searchFiltersReducer(undefined, action);

            Object.keys(expected).forEach((key) => {
                expect(updatedState[key]).toEqual(expected[key]);
            });
        });
    });

    describe('UPDATE_SELECTED_LOCATIONS', () => {
        const action = {
            type: 'UPDATE_SELECTED_LOCATIONS',
            location: {
                matched_ids: [2, 3],
                place_type: 'CITY',
                parent: 'INDIANA',
                place: 'PAWNEE'
            }
        };

        const cityId = `2,3_PAWNEE_CITY`;

        const expectedCity = {
            matched_ids: [2, 3],
            place_type: 'CITY',
            parent: 'INDIANA',
            place: 'PAWNEE',
            identifier: cityId
        };

        it('should add the provided location if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.selectedLocations).toEqual(new OrderedMap({
                [cityId]: expectedCity
            }));
        });

        it('should remove the provided location if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                selectedLocations: new OrderedMap({
                    [cityId]: expectedCity
                })
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.selectedLocations).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_DOMESTIC_FOREIGN', () => {
        it('should set the domestic/foreign filter scope to the input string', () => {
            const action = {
                type: 'UPDATE_DOMESTIC_FOREIGN',
                selection: 'domestic'
            };

            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.locationDomesticForeign).toEqual('domestic');
        });
    });

    describe('ADD_POP_LOCATION_OBJECT', () => {
        it('should add the given location object to the place of performance filter', () => {
            const action = {
                type: 'ADD_POP_LOCATION_OBJECT',
                location: {
                    identifier: 'ABC',
                    display: {
                        title: 'A Big Country',
                        standalone: 'A Big Country',
                        entity: 'Country'
                    },
                    filter: {
                        country: 'ABC'
                    }
                }
            };

            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.selectedLocations.toJS()).toEqual({
                ABC: {
                    identifier: 'ABC',
                    display: {
                        title: 'A Big Country',
                        standalone: 'A Big Country',
                        entity: 'Country'
                    },
                    filter: {
                        country: 'ABC'
                    }
                }
            });
        });
    });

    describe('ADD_RECIPIENT_LOCATION_OBJECT', () => {
        it('should add the given location object to the recipient location filter', () => {
            const action = {
                type: 'ADD_RECIPIENT_LOCATION_OBJECT',
                location: {
                    identifier: 'ABC',
                    display: {
                        title: 'A Big Country',
                        standalone: 'A Big Country',
                        entity: 'Country'
                    },
                    filter: {
                        country: 'ABC'
                    }
                }
            };

            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.selectedRecipientLocations.toJS()).toEqual({
                ABC: {
                    identifier: 'ABC',
                    display: {
                        title: 'A Big Country',
                        standalone: 'A Big Country',
                        entity: 'Country'
                    },
                    filter: {
                        country: 'ABC'
                    }
                }
            });
        });
    });

    describe('UPDATE_SELECTED_AWARDING_AGENCIES', () => {
        const action = {
            type: 'UPDATE_SELECTED_AWARDING_AGENCIES',
            agency: mockAgency
        };

        const agency = '1788_subtier';

        const expectedAgency = mockAgency;

        it('should add the provided agency if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, action);

            expect(updatedState.selectedAwardingAgencies).toEqual(new OrderedMap([[agency, expectedAgency]]));
        });

        it('should remove the provided agency if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                selectedAwardingAgencies: new OrderedMap([[agency, expectedAgency]])
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.selectedAwardingAgencies).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_SELECTED_FUNDING_AGENCIES', () => {
        const action = {
            type: 'UPDATE_SELECTED_FUNDING_AGENCIES',
            agency: mockAgency
        };

        const agency = '1788_subtier';

        const expectedAgency = mockAgency;

        it('should add the provided agency if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, action);

            expect(updatedState.selectedFundingAgencies).toEqual(new OrderedMap([[agency, expectedAgency]]));
        });

        it('should remove the provided agency if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                selectedFundingAgencies: new OrderedMap([[agency, expectedAgency]])
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.selectedFundingAgencies).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_TREASURY_ACCOUNT_COMPONENTS', () => {
        const action = {
            type: 'UPDATE_TREASURY_ACCOUNT_COMPONENTS',
            source: mockTreasuryAccount
        };

        const component = {
            '098-765-****-2008-X-****-321': {
                ata: '098',
                aid: '765',
                bpoa: '',
                epoa: '2008',
                a: 'X',
                main: '',
                sub: '321'
            }
        };


        it('should add the provided TAS component if it does not currently exist', () => {
            const updatedState = searchFiltersReducer(undefined, action);

            expect(updatedState.treasuryAccounts).toEqual(new OrderedMap(component));
        });

        it('should remove the provided TAS component if it already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                treasuryAccounts: new OrderedMap(component)
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.treasuryAccounts).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_SELECTED_RECIPIENTS', () => {
        const action = {
            type: 'UPDATE_SELECTED_RECIPIENTS',
            recipient: mockRecipient
        };

        const recipient = 'Booz Allen';

        it('should add the Recipient if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, action);

            expect(updatedState.selectedRecipients).toEqual(new Set([recipient]));
        });

        it('should remove the Recipient if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                selectedRecipients: new Set([recipient])
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.selectedRecipients).toEqual(new Set());
        });
    });

    describe('UPDATE_RECIPIENT_DOMESTIC_FORIEGN', () => {
        it(
            'should set the Recipient domestic/foreign filter ' + 'scope to the input string',
            () => {
                const action = {
                    type: 'UPDATE_RECIPIENT_DOMESTIC_FORIEGN',
                    selection: 'domestic'
                };

                const updatedState = searchFiltersReducer(undefined, action);
                expect(updatedState.recipientDomesticForeign).toEqual('domestic');
            }
        );
    });

    describe('UPDATE_RECIPIENT_LOCATIONS', () => {
        const action = {
            type: 'UPDATE_RECIPIENT_LOCATIONS',
            location: {
                place_type: 'COUNTY',
                matched_ids: [22796],
                place: 'McLean',
                parent: 'KENTUCKY'
            }
        };

        const recipientCityId = `22796_McLean_COUNTY`;

        const expectedRecipientCity = {
            place_type: 'COUNTY',
            matched_ids: [22796],
            place: 'McLean',
            parent: 'KENTUCKY',
            identifier: recipientCityId
        };

        it('should add the provided location if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.selectedRecipientLocations).toEqual(new OrderedMap({
                [recipientCityId]: expectedRecipientCity
            }));
        });

        it('should remove the provided location if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                selectedRecipientLocations: new OrderedMap({
                    [recipientCityId]: expectedRecipientCity
                })
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.selectedRecipientLocations).toEqual(new OrderedMap());
        });
    });

    describe('TOGGLE_SEARCH_FILTER_RECIPIENT_TYPE', () => {
        const action = {
            type: 'TOGGLE_SEARCH_FILTER_RECIPIENT_TYPE',
            recipientType: 'small_business'
        };

        it('should add a value if it does not currently exist in the set', () => {
            const startingState = Object.assign({}, initialState);

            expect(searchFiltersReducer(startingState, action).recipientType).toEqual(new Set(['small_business']));
        });

        it('should remove a value if currently exists in the set', () => {
            const startingState = Object.assign({}, initialState, {
                recipientType: new Set(['small_business'])
            });

            expect(searchFiltersReducer(startingState, action).recipientType).toEqual(new Set([]));
        });
    });

    describe('BULK_SEARCH_FILTER_RECIPIENT_TYPES', () => {
        it('should add the provided values when the direction is "add"', () => {
            const action = {
                type: 'BULK_SEARCH_FILTER_RECIPIENT_TYPES',
                recipientTypes: ['small_business', 'other_than_small_business'],
                direction: 'add'
            };

            const startingState = Object.assign({}, initialState);

            expect(searchFiltersReducer(startingState, action).recipientType).toEqual(new Set(['small_business', 'other_than_small_business']));
        });

        it('should remove the provided values when the direction is "remove"', () => {
            const action = {
                type: 'BULK_SEARCH_FILTER_RECIPIENT_TYPES',
                recipientTypes: ['small_business', 'other_than_small_business'],
                direction: 'remove'
            };

            const startingState = Object.assign({}, initialState, {
                recipientType: new Set([
                    'small_business',
                    'other_than_small_business',
                    'alaskan_native_corporation_owned_firm'
                ])
            });

            expect(searchFiltersReducer(startingState, action).recipientType).toEqual(new Set(['alaskan_native_corporation_owned_firm']));
        });
    });

    describe('UPDATE_AWARD_AMOUNTS', () => {
        const predefinedRangeAction = {
            type: 'UPDATE_AWARD_AMOUNTS',
            awardAmounts: 'range-1'
        };

        const updatedPredefinedRangeAction = {
            type: 'UPDATE_AWARD_AMOUNTS',
            awardAmounts: 'range-0'
        };

        const specificRangeAction = {
            type: 'UPDATE_AWARD_AMOUNTS',
            awardAmounts: [10000, 20000]
        };

        const updatedSpecificRangeAction = {
            type: 'UPDATE_AWARD_AMOUNTS',
            awardAmounts: [55.55, 66.66]
        };

        const predefinedAwardAmount = 'range-1';
        const expectedpredefinedAwardAmount = awardRanges[predefinedAwardAmount];

        const specificAwardAmount = [10000, 20000];

        describe('Checkbox / Range', () => {
            // user checks a checkbox
            it('should add a award amount if none exist', () => {
                const newMap = new OrderedMap({});
                const updatedState = searchFiltersReducer(
                    { awardAmounts: newMap },
                    predefinedRangeAction
                );
                expect(updatedState.awardAmounts).toEqual(new OrderedMap({
                    [predefinedAwardAmount]: expectedpredefinedAwardAmount
                }));
            });
            // user checks a different checkbox
            it('should set a new award amount', () => {
                const startingState = {
                    awardAmounts: new OrderedMap({
                        [predefinedAwardAmount]: expectedpredefinedAwardAmount
                    })
                };

                const updatedState = searchFiltersReducer(
                    startingState,
                    updatedPredefinedRangeAction
                );
                expect(updatedState.awardAmounts).toEqual(new OrderedMap({ 'range-0': [null, 1000000] }));
            });
            // user deselects a checkbox
            it('should set award amounts in state to an empty ordered map', () => {
                const startingState = {
                    awardAmounts: new OrderedMap({
                        [predefinedAwardAmount]: expectedpredefinedAwardAmount
                    })
                };

                const updatedState = searchFiltersReducer(
                    startingState,
                    predefinedRangeAction
                );
                expect(updatedState.awardAmounts).toEqual(new OrderedMap({}));
            });
        });

        describe('Specific / User Input', () => {
            it('should a specific award amount range if nothing exists', () => {
                const newMap = new OrderedMap({});
                const updatedState = searchFiltersReducer(
                    { awardAmounts: newMap },
                    specificRangeAction
                );
                expect(updatedState.awardAmounts).toEqual(new OrderedMap({
                    specific: specificAwardAmount
                }));
            });

            it('should set a specific award amount range if a specific range already exists', () => {
                const startingState = {
                    awardAmounts: new OrderedMap({
                        specific: specificAwardAmount
                    })
                };

                const updatedState = searchFiltersReducer(
                    startingState,
                    updatedSpecificRangeAction
                );
                expect(updatedState.awardAmounts)
                    .toEqual(new OrderedMap({ specific: [55.55, 66.66] }));
            });

            it('should set a specific award amount range if a checkbox range already exists', () => {
                const startingState = {
                    awardAmounts: new OrderedMap({
                        [predefinedAwardAmount]: expectedpredefinedAwardAmount
                    })
                };

                const updatedState = searchFiltersReducer(
                    startingState,
                    updatedSpecificRangeAction
                );
                expect(updatedState.awardAmounts)
                    .toEqual(new OrderedMap({ specific: [55.55, 66.66] }));
            });
        });
    });

    describe('UPDATE_SELECTED_CFDA', () => {
        const action = {
            type: 'UPDATE_SELECTED_CFDA',
            cfda: {
                identifier: '10.101',
                program_number: '10.101',
                popular_name: '',
                program_title: 'Hawaii Sugar Disaster Program'
            }
        };

        const cfdaNum = '10.101';

        const expectedCFDA = {
            identifier: '10.101',
            program_number: '10.101',
            popular_name: '',
            program_title: 'Hawaii Sugar Disaster Program'
        };

        it('should add the provided cfda if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.selectedCFDA).toEqual(new OrderedMap({
                [cfdaNum]: expectedCFDA
            }));
        });

        it('should remove the provided cfda if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                selectedCFDA: new OrderedMap({
                    [cfdaNum]: expectedCFDA
                })
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.selectedCFDA).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_NAICS', () => {
        it('removes descendants w/ ancestor already in require array', () => {
            const action = {
                type: "UPDATE_NAICS",
                payload: {
                    exclude: [""],
                    require: ["11", "111110", "1112", "1113", "21", "2111", "211110", "2112"],
                    counts: [{ count: 64, value: '11' }, { count: 32, value: '21' }]
                }
            };
            const state = searchFiltersReducer(initialState, action).naicsCodes;
            expect(state.require).toEqual(["11", "21"]);
            expect(state.counts).toEqual(action.payload.counts);
        });
        it('does not remove descendants if one ancestor\'s in both require and excluded', () => {
            const action = {
                type: "UPDATE_NAICS",
                payload: {
                    exclude: ["1111"],
                    require: ["11", "111110", "1112", "1113", "21", "2111", "211110", "2112"]
                }
            };
            const state = searchFiltersReducer(initialState, action).naicsCodes;
            expect(state.require).toEqual(["11", "111110", "21"]);
        });
    });

    describe('UPDATE_PSC', () => {
        it('updates the relevant test property', () => {
            // when this action is used, lots of functions are composed
            // to remove redundancy, placeholder strings etc...
            // consequently, this test is super basic.
            const action = {
                type: "UPDATE_PSC",
                payload: {
                    exclude: [["Products", "B", "B5"]],
                    require: [["children_of_Products", "children_of_B"]],
                    counts: [{ label: 'test', count: 50, value: 'x' }]
                }
            };
            const state = searchFiltersReducer(initialState, action).pscCodes;
            expect(state.require.length).toEqual(1);
            expect(state.exclude.length).toEqual(1);
            expect(state.counts.length).toEqual(1);
        });
    });

    describe('UPDATE_PSC', () => {
        it('updates the relevant test property', () => {
            // when this action is used, lots of functions are composed
            // to remove redundancy, placeholder strings etc...
            // consequently, this test is super basic.
            const action = {
                type: "UPDATE_TAS",
                payload: {
                    exclude: [["Products", "B", "B5"]],
                    require: [["children_of_Products", "children_of_B"]],
                    counts: [{ label: 'test', count: 50, value: 'x' }]
                }
            };
            const state = searchFiltersReducer(initialState, action).tasCodes;
            expect(state.require.length).toEqual(1);
            expect(state.exclude.length).toEqual(1);
            expect(state.counts.length).toEqual(1);
        });
    });

    describe('UPDATE_PRICING_TYPE', () => {
        it('should set a pricing type value when there is none', () => {
            const action = {
                type: 'UPDATE_PRICING_TYPE',
                pricingType: 'B'
            };
            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.pricingType).toEqual(new Set(['B']));
        });

        it('should remove the provided values when unchecked', () => {
            const action = {
                type: 'UPDATE_PRICING_TYPE',
                pricingType: 'B'
            };

            const startingState = Object.assign({}, initialState, {
                pricingType: new Set(['B', 'L'])
            });

            expect(searchFiltersReducer(startingState, action).pricingType).toEqual(new Set(['L']));
        });

        it('should add new values to an existing set', () => {
            const action = {
                type: 'UPDATE_PRICING_TYPE',
                pricingType: 'B'
            };

            const startingState = Object.assign({}, initialState, {
                pricingType: new Set(['M', 'J', 'L'])
            });

            expect(searchFiltersReducer(startingState, action).pricingType).toEqual(new Set(['M', 'J', 'L', 'B']));
        });
    });

    describe('UPDATE_SET_ASIDE', () => {
        it('should set a set aside value', () => {
            const action = {
                type: 'UPDATE_SET_ASIDE',
                setAside: 'BICiv'
            };
            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.setAside).toEqual(new Set(['BICiv']));
        });
    });

    describe('UPDATE_EXTENT_COMPETED', () => {
        it('should set an extent competed value', () => {
            const action = {
                type: 'UPDATE_EXTENT_COMPETED',
                extentCompeted: 'CDOCiv'
            };
            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.extentCompeted).toEqual(new Set(['CDOCiv']));
        });
    });

    describe('UPDATE_SEARCH_FILTER_GENERIC', () => {
        it('should set an arbitrary child filter key with the given filter value', () => {
            const action = {
                type: 'UPDATE_SEARCH_FILTER_GENERIC',
                filterType: 'timePeriodType',
                filterValue: 'dr'
            };

            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.timePeriodType).toEqual('dr');
        });
    });

    describe('RESET_SEARCH_TIME_FILTER', () => {
        it(
            'should reset the fields relevant to time period filtering to their initial state' +
                ' values after fiscal years change',
            () => {
                const firstAction = {
                    type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD',
                    dateType: 'fy',
                    fy: ['1778', '1777', '1775'],
                    start: null,
                    end: null
                };

                const resetAction = {
                    type: 'RESET_SEARCH_TIME_FILTER'
                };

                const expectedFirst = {
                    timePeriodType: 'fy',
                    timePeriodFY: new Set(['1778', '1777', '1775']),
                    timePeriodStart: null,
                    timePeriodEnd: null
                };

                const expectedSecond = {
                    timePeriodType: 'fy',
                    timePeriodFY: new Set(),
                    timePeriodStart: null,
                    timePeriodEnd: null
                };

                // perform the first action to change the time period filter values
                let updatedState = searchFiltersReducer(undefined, firstAction);
                // validate that the search filters changed
                Object.keys(expectedFirst).forEach((key) => {
                    expect(updatedState[key]).toEqual(expectedFirst[key]);
                });

                // reset the time period filters
                updatedState = searchFiltersReducer(updatedState, resetAction);
                // validate that the search filters reset
                Object.keys(expectedSecond).forEach((key) => {
                    expect(updatedState[key]).toEqual(expectedSecond[key]);
                });
            }
        );

        it(
            'should reset the fields relevant to time period filtering to their initial state' +
                ' values after a date range changes',
            () => {
                const firstAction = {
                    type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD',
                    dateType: 'dr',
                    fy: [],
                    start: '1776-01-01',
                    end: '1776-12-31'
                };

                const resetAction = {
                    type: 'RESET_SEARCH_TIME_FILTER'
                };

                const expectedFirst = {
                    timePeriodType: 'dr',
                    timePeriodFY: new Set(),
                    timePeriodStart: '1776-01-01',
                    timePeriodEnd: '1776-12-31'
                };

                const expectedSecond = {
                    timePeriodType: 'fy',
                    timePeriodFY: new Set(),
                    timePeriodStart: null,
                    timePeriodEnd: null
                };

                // perform the first action to change the time period filter values
                let updatedState = searchFiltersReducer(undefined, firstAction);
                // validate that the search filters changed
                Object.keys(expectedFirst).forEach((key) => {
                    expect(updatedState[key]).toEqual(expectedFirst[key]);
                });

                // reset the time period filters
                updatedState = searchFiltersReducer(updatedState, resetAction);
                // validate that the search filters reset
                Object.keys(expectedSecond).forEach((key) => {
                    expect(updatedState[key]).toEqual(expectedSecond[key]);
                });
            }
        );
    });

    describe('CLEAR_SEARCH_FILTER_TYPE', () => {
        it('should reset a single search filter to its initial state value', () => {
            const firstAction = {
                type: 'UPDATE_SEARCH_FILTER_GENERIC',
                filterType: 'awardType',
                filterValue: new Set(['03', '04'])
            };

            const clearAction = {
                type: 'CLEAR_SEARCH_FILTER_TYPE',
                filterType: 'awardType'
            };

            const firstExpected = new Set(['03', '04']);
            const secondExpected = new Set();

            // perform the first action that updates the award type filter
            let updatedState = searchFiltersReducer(undefined, firstAction);
            expect(updatedState.awardType).toEqual(firstExpected);

            // perform the clear action to reset the award type filter value
            updatedState = searchFiltersReducer(updatedState, clearAction);
            expect(updatedState.awardType).toEqual(secondExpected);
        });
    });

    describe('CLEAR_SEARCH_FILTER_ALL', () => {
        it(
            'should reset the search filters to the initial state after multiple actions have been' +
                ' performed',
            () => {
                const firstAction = {
                    type: 'UPDATE_DOMESTIC_FOREIGN',
                    selection: 'domestic'
                };

                const secondAction = {
                    type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD',
                    dateType: 'fy',
                    fy: ['1778', '1777', '1775'],
                    start: null,
                    end: null
                };

                const firstExpected = 'domestic';
                const secondExpected = {
                    timePeriodType: 'fy',
                    timePeriodFY: new Set(['1778', '1777', '1775']),
                    timePeriodStart: null,
                    timePeriodEnd: null
                };

                // perform the first action that updates the domestic/foreign scope
                let updatedState = searchFiltersReducer(undefined, firstAction);
                expect(updatedState.locationDomesticForeign).toEqual(firstExpected);

                // perform the second action to modify the time period
                updatedState = searchFiltersReducer(updatedState, secondAction);
                Object.keys(secondExpected).forEach((key) => {
                    expect(updatedState[key]).toEqual(secondExpected[key]);
                });

                // validate that the changes from the first action remained
                expect(updatedState.locationDomesticForeign).toEqual(firstExpected);

                // reset the state to its initial value
                const finalAction = {
                    type: 'CLEAR_SEARCH_FILTER_ALL'
                };
                updatedState = searchFiltersReducer(updatedState, finalAction);
                expect(updatedState).toEqual(initialState);
            }
        );
    });

    describe('RESTORE_HASHED_FILTERS', () => {
        it('should create a brand new state based on the initial state with the provided inputs', () => {
            const originalState = Object.assign({}, initialState);
            originalState.recipientDomesticForeign = 'foreign';
            originalState.awardType = new Set(['A', 'B']);
            originalState.timePeriodFY = new Set(['1987']);

            let state = searchFiltersReducer(originalState, {});
            expect(state.recipientDomesticForeign).toEqual('foreign');
            expect(state.awardType).toEqual(new Set(['A', 'B']));
            expect(state.timePeriodFY).toEqual(new Set(['1987']));

            const action = {
                type: 'RESTORE_HASHED_FILTERS',
                filters: {
                    recipientDomesticForeign: 'domestic',
                    timePeriodFY: new Set(['1999'])
                }
            };
            state = searchFiltersReducer(state, action);
            expect(state.timePeriodFY).toEqual(new Set(['1999']));
            expect(state.recipientDomesticForeign).toEqual('domestic');
            expect(state.awardType).toEqual(new Set([]));
        });
    });
});
