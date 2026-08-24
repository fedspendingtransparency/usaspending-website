/**
 * NLData.js
 * Created by Trey Morgan 7/8/2026
 */

import React from "react";
import NLSearchSuggestionsIcon from "./NLSearchSuggestionsIcon";
import Analytics from "../../helpers/analytics/Analytics";
import { closeOtherSlideouts } from "../../helpers/slideoutHelper";
import storeSingleton from 'redux/storeSingleton';
import * as glossaryActions from "../../redux/actions/glossary/glossaryActions"
import * as aboutTheDataActions from "../../redux/actions/aboutTheDataSidebar/aboutTheDataActions"
import { initialState as defaultFilters } from '../../redux/reducers/search/searchFiltersReducer';
import { awardTypeGroups } from "../../dataMapping/search/awardType";
import { REQUEST_VERSION } from "../../GlobalConstants";

const overline = 'IF YOU WANT TO KNOW:';
const filterByHeader = 'FILTER BY:'
const id = crypto.randomUUID();
const dayjs = require('dayjs');

const { dispatch } = storeSingleton.store || {};

export const searchCardData = [
    {
        id: id + 1,
        overline,
        headline: (
            <>
                How much federal funding did <strong>my state</strong> receive last year?
            </>
        ),
        filterByHeader,
        icons: [
            <NLSearchSuggestionsIcon 
                key={`time-period-${id}`}  
                variant="time-period" 
                label="Time Period"
                icon="calendar"/>,
            <NLSearchSuggestionsIcon 
                key={`location-${id}`} 
                variant="location" 
                label="Location"
                icon="location-dot"/> 
        ]
    },
    {
        id: id + 2,
        overline,
        headline: ( 
            <>
                How much federal funding are <strong>national defense corporations</strong> receiving?
            </>
        ),
        filterByHeader,
        icons: [
            <NLSearchSuggestionsIcon 
                key={`keyword-${id}`}  
                variant="keyword" 
                label="Keyword"
                icon="search" />,
            <NLSearchSuggestionsIcon 
                key={`recipient-${id}`} variant="recipient" 
                label="Recipient"
                icon="user" /> 
        ]
    },
    {
        id: id + 3,
        overline,
        headline: (
            <>
                What federal <strong>grants</strong> have been awarded for <strong>health care</strong>?
            </>
        ),
        filterByHeader,
        icons: [
            <NLSearchSuggestionsIcon 
                key={`award-type-${id}`}  
                variant="award-type" 
                label="Award Type"
                icon="file-certificate" />,
            <NLSearchSuggestionsIcon 
                key={`award-description-${id}`} 
                variant="award-description" 
                label="Award Description"
                icon="building" /> 
        ]
    }
];

export const moreResourcesBtnData = [
    {
        id: id + 1,
        action: () => { 
            Analytics.event({
                event: 'natural-language_glossary',
                category: 'Natural Language More Resources',
                action: 'Link',
                label: 'glossary button'
            });
            closeOtherSlideouts('glossary');
            dispatch(glossaryActions.toggleGlossary());
        },
        image: (
            <NLSearchSuggestionsIcon 
                variant="glossary" 
                label="Glossary" 
                icon="book"/>
        )
    },
    {
        id: id + 2,
        action: () => { 
            Analytics.event({
                event: 'natural-language_about-the-data',
                category: 'Natural Language More Resources',
                action: 'Link',
                label: 'about the data button'
            });
            closeOtherSlideouts('atd');
            dispatch(aboutTheDataActions.toggleAboutTheData());
        },
        image: (
            <NLSearchSuggestionsIcon 
                variant="about-the-data" 
                label="About the Data" 
                icon="database"/>
        ) 
    },
    {
        id: id + 3,
        action: (navigate) => { 
            Analytics.event({
                event: 'natural-language_data-dictionary',
                category: 'Natural Language More Resources',
                action: 'Link',
                label: 'data dictionary button'
            });
            closeOtherSlideouts();
            navigate("/data-dictionary");
        },
        image: (
            <NLSearchSuggestionsIcon 
                variant="data-dictionary" 
                label="Data Dictionary" 
                icon="book-open"/>
        ) 
    },
    {
        id: id + 4,
        action: (navigate) => { 
            Analytics.event({
                event: 'natural-language_fed-spending-guide',
                category: 'Natural Language More Resources',
                action: 'Link',
                label: 'federal spending guide button'
            });
            closeOtherSlideouts();
            navigate("/federal-spending-guide");
        },
        image: (
            <NLSearchSuggestionsIcon 
                variant="federal-spending-guide" 
                label="Federal Spending Guide" 
                icon="money-check-dollar"/>
        ) 
    }
];

export const searchGovSpendingData = [
    {
        id: id + 1,
        icon: (
            <NLSearchSuggestionsIcon
                variant="ask-questions"
                label="Ask questions"
                icon="question"
                description={
                    <>
                        Enter your <strong>question</strong> or select from{' '}
                        our <strong>templates</strong> in the Smart Assist panel.
                    </> 
                }/>
        )
    },
    {
        id: id + 2,
        icon: (
            <NLSearchSuggestionsIcon
                variant="analyzing-response"
                label="Analyzing Response"
                icon="arrows-rotate"
                description={
                    <>
                        Let our model do it’s work to{' '}
                        generate your <strong>data.</strong>
                    </> 
                }/>
        )
    },
    {
        id: id + 3,
        icon: (
            <NLSearchSuggestionsIcon
                variant="get-the-data"
                label="Get the Data"
                icon="chart-column"
                description={
                    <>
                        Get downloadable <strong>federal award</strong>{' '}
                        <strong>data</strong> relevant to your search!
                    </> 
                }/>
        )
    }
];

export const preSearchOptions = [
    {
        type: "award-recipient-type",
        options: [
            {
                id: "ar-1",
                text: (<>What <span>contracts</span> were awarded in <span>FY 2025</span>?</>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            timePeriodType: "fy",
                            timePeriodFY: ["2025"],
                            awardType: awardTypeGroups.contracts
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            },
            {
                id: "ar-2",
                text: (<>What <span>grants</span> were awarded in <span>FY 2026</span>?</>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            timePeriodType: "fy",
                            timePeriodFY: ["2026"],
                            awardType: awardTypeGroups.grants
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            },
            {
                id: "ar-3",
                text: (<>What funding went to <span>Small Businesses this year</span>?</>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            timePeriodType: "dr",
                            time_period: [
                                {
                                    start_date: dayjs().startOf('year').format('YYYY-MM-DD'),
                                    end_date: dayjs().format('YYYY-MM-DD')
                                }
                            ],
                            recipientType: ["small_business"]
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            },
            {
                id: "ar-4",
                text: (<>What funding went to <span>Veteran Owned Businesses</span> in <span>2026</span>?</>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            timePeriodType: "dr",
                            time_period: [
                                {
                                    start_date: dayjs().startOf('year').format('YYYY-MM-DD'),
                                    end_date: dayjs().format('YYYY-MM-DD')
                                }
                            ],
                            recipientType: ["veteran_owned_business"]
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            },
            {
                id: "ar-5",
                text: (<>What funding went to <span>nonprofit organizations last year</span>?</>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            timePeriodType: "dr",
                            time_period: [
                                {
                                    start_date: dayjs().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
                                    end_date: dayjs().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')
                                }
                            ],
                            recipientType: ["nonprofit"]
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            }
        ]
    },
    {
        type: "nacis-or-assistance-listing",
        options: [
            {
                id: "nal-1",
                text: (<>Show me examples of contracts related to <span>science & technology</span></>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            naicsCodes: {
                                require: ["5415", "5416", "5417"],
                                exclude: [],
                                counts: [
                                    {
                                        label: "Professional, Scientific, and Technical Services",
                                        value: "54",
                                        count: 18
                                    }
                                ]
                            }
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            },
            {
                id: "nal-2",
                text: (<>Show me examples of contracts related to <span>agriculture</span></>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            naicsCodes: {
                                require: ["11"],
                                exclude: [],
                                counts: [ 
                                    {
                                        label: "Agriculture, Forestry, Fishing and Hunting",
                                        value: "11",
                                        count: 64
                                    }
                                ]
                            }
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            },
            {
                id: "nal-3",
                text: (<>Show me examples of contracts related to <span>construction</span></>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            naicsCodes: {
                                require: ["23"],
                                exclude: [],
                                counts: [
                                    {
                                        label: "Construction",
                                        value: "23",
                                        count: 31
                                    }
                                ]
                            }
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            },
            {
                id: "nal-4",
                text: (<>Show me examples of financial assistance for <span>broad infrastructure</span></>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            selectedCFDA: {
                                11.031: {
                                    identifier: "11.031",
                                    popular_name: "Broadband Infrastructure Program",
                                    program_title: "Broadband Infrastructure Program",
                                    program_number: "11.031"
                                }
                            }
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            },
            {
                id: "nal-5",
                text: (<>Show me examples of grants for <span>school meals</span></>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            selectedCFDA: {
                                10.553: {
                                    identifier: "10.553",
                                    popular_name: "SBP",
                                    program_title: "School Breakfast Program",
                                    program_number: "10.553"
                                },
                                10.555: {
                                    identifier: "10.555",
                                    popular_name: "School Lunch",
                                    program_title: "National School Lunch Program",
                                    program_number: "10.555"
                                }
                            }
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            }
        ]
    },
    {
        type: "agency",
        options: [
            {
                id: "agency-1",
                text: (<>Show <span>Department of Agriculture (USDA)</span> awards in <span> 2026</span></>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            timePeriodType: "dr",
                            time_period: [
                                {
                                    start_date: dayjs().startOf('year').format('YYYY-MM-DD'),
                                    end_date: dayjs().format('YYYY-MM-DD')
                                }
                            ],
                            selectedAwardingAgencies: {
                                "95_toptier": {
                                    id: 95,
                                    agencyType: "toptier",
                                    toptier_flag: true,
                                    subtier_agency: {
                                        name: "Department of Agriculture",
                                        abbreviation: "USDA"
                                    },
                                    toptier_agency: {
                                        name: "Department of Agriculture",
                                        abbreviation: "USDA",
                                        toptier_code: "012"
                                    }
                                }
                            }
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            },
            {
                id: "agency-2",
                text: (<>Show <span>Department of Homeland Security (DHS)</span> awards</>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            selectedAwardingAgencies: {
                                "766_toptier": {
                                    id: 766,
                                    agencyType: "toptier",
                                    toptier_flag: true,
                                    subtier_agency: {
                                        name: "Department of Homeland Security",
                                        abbreviation: "DHS"
                                    },
                                    toptier_agency: {
                                        name: "Department of Homeland Security",
                                        abbreviation: "DHS",
                                        toptier_code: "070"
                                    }
                                }
                            }
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            },
            {
                id: "agency-3",
                text: (<>Show <span>Department of Health and Human Services (HHS)</span> awards</>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            selectedAwardingAgencies: {
                                "806_toptier": {
                                    id: 806,
                                    agencyType: "toptier",
                                    toptier_flag: true,
                                    subtier_agency: {
                                        name: "Department of Health and Human Services",
                                        abbreviation: "HHS"
                                    },
                                    toptier_agency: {
                                        name: "Department of Health and Human Services",
                                        abbreviation: "HHS",
                                        toptier_code: "075"
                                    }
                                }
                            }
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            },
            {
                id: "agency-4",
                text: (<>Show <span>Department of Veterans Affairs (VA)</span> awards</>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            selectedAwardingAgencies: {
                                "561_toptier": {
                                    id: 561,
                                    agencyType: "toptier",
                                    toptier_flag: true,
                                    subtier_agency: {
                                        name: "Department of Veterans Affairs",
                                        abbreviation: "VA"
                                    },
                                    toptier_agency: {
                                        name: "Department of Veterans Affairs",
                                        abbreviation: "VA",
                                        toptier_code: "036"
                                    }
                                }
                            }
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            },
            {
                id: "agency-5",
                text: (<>Show <span>Federal Bureau of Investigation (FBI)</span> awards in <span> 2026</span></>),
                action: (callback) => {
                    const filterValue = {
                        filters: {
                            ...defaultFilters,
                            timePeriodType: "dr",
                            time_period: [
                                {
                                    start_date: dayjs().startOf('year').format('YYYY-MM-DD'),
                                    end_date: dayjs().format('YYYY-MM-DD')
                                }
                            ],
                            selectedAwardingAgencies: {
                                "262_subtier": {
                                    id: 262,
                                    agencyType: "subtier",
                                    toptier_flag: false,
                                    subtier_agency: {
                                        name: "Federal Bureau of Investigation",
                                        abbreviation: "FBI"
                                    },
                                    toptier_agency: {
                                        name: "Department of Justice",
                                        abbreviation: "DOJ",
                                        toptier_code: "015"
                                    }
                                }
                            }
                        },
                        version: REQUEST_VERSION
                    };
                    callback(filterValue);
                }   
            }
        ]
    }
]