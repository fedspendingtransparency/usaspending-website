/**
 * NLData.js
 * Created by Trey Morgan 7/8/2026
 */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NLSearchSuggestionsIcon from "./NLSearchSuggestionsIcon";
import Analytics from "../../../helpers/analytics/Analytics";
import { closeOtherSlideouts } from "../../../helpers/slideoutHelper";
import storeSingleton from 'redux/storeSingleton';
import * as glossaryActions from "../../../redux/actions/glossary/glossaryActions"
import * as aboutTheDataActions from "../../../redux/actions/aboutTheDataSidebar/aboutTheDataActions"
import { initialState as defaultFilters } from '../../../redux/reducers/search/searchFiltersReducer';
import { awardTypeGroups } from "../../../dataMapping/search/awardType";
import { REQUEST_VERSION } from "../../../GlobalConstants";

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
                text: (<>Show me financial assistance for <span>broadband infrastructure</span></>),
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
];

export const smartAssistContent = {
    overview: {
        heading: 'Overview',
        items: [
            {
                title: 'What is Smart Assist?',
                content: (
                    <>
                        <p>
                            Smart Assist is an AI feature on USAspending.gov that interprets your prompt and selects Advanced Search filters for you. You can describe what you want in your own words, and Smart Assist translates that into filters to find matching data.
                        </p>
                    </>
                )
            },
            {
                title: 'Which Data Does Smart Assist Use?',
                content: (
                    <>
                        <p>
                            Your search will be used to find <span style={{color: '#005ea2'}}>Awards, Subawards, and Transactions</span> using the existing Advanced Search page filters ranging from time period to specific codes or categories.
                        </p>
                    </>
                )
            }
        ]
    },
    search: {
        heading: 'Searching With Smart Assist',
        items: [
            {
                title: `What's the Best Way to Search?`,
                content: (
                    <>
                        <p>
                            Focus on the data you want to see, not a question you want answered. Describe the spending you want to explore, like awards to a specific business, contracts in an industry, or grants in a timeframe.
                        </p>
                        <p>
                            Example: Instead of “How much money did Michigan get for education last year?”, try “Show Department of Education spending in Michigan for 2025.”
                        </p>
                    </>
                )
            },
            {
                title: 'How Does Smart Assist Interpret Questions and Provide Responses?',
                content: (
                    <>
                        <p>
                            When you submit a prompt, Smart Assist looks for key details such as agencies, recipients, fiscal years, locations, award types, and spending categories, then maps those details to available filters in USAspending data.
                        </p>
                        <p>
                          While your search runs, you’ll see status updates. If your prompt could mean more than one thing, Smart Assist returns the best match based on context. If there’s only a partial match, it lets you know and suggests ways to refine the search.
                        </p>
                    </>
                )
            }
        ]
    },
    results: {
        heading: 'Understanding Results',
        items: [
            {
                title: `What's Included in Smart Assist Search Results?`,
                content: (
                    <>
                        <p>
                            Smart Assist results include tables and charts you can explore and download. Depending on your prompt, results may include:
                        </p>
                        <ul>
                            <li>A list of matching awards or subawards</li>
                            <li>Results by Category</li>
                            <li>Results Over Time</li>
                            <li>Results by Geography</li>
                        </ul>
                        <p>
                           For details about what’s included in your results, visit the Data Sources and Methodology section below each results table.
                        </p>
                    </>
                )
            },
            {
                title: 'How Can I Refine My Search?',
                content: (
                    <>
                        <p>
                            If the initial results aren’t what you expected, you can refine them in two ways:
                        </p>
                        <p>
                            Adjust filters: After a search completes, the chosen filters appear on the Filter tab of the Search panel. You can change values, add filters, or remove filters, then submit a new search. For example, “Only show grants” populates results for all available grants; you can then narrow by time period or awarding agency.
                        </p>
                        <p>
                            Edit your prompt: Select “Start New Search” to reload your original prompt, make changes, and resubmit. For example, update “Only show grants” to “Only show grants in 2020.”
                        </p>
                    </>
                )
            },
            {
                title: 'Why Did I Receive a Partial Response or Error Message?',
                content: (
                    <>
                        <p>
                            Smart Assist returns results when it can interpret your request. If it needs more information, you may see a partial response or an error message. Common reasons include:
                        </p>
                        <ul>
                            <li>Irrelevant questions (e.g., tax collection totals are outside federal awards data).</li>
                            <li>Unavailable data (e.g., a location that does not exist in USAspending data). In some cases, Smart Assist defaults to the Keyword Search filter.</li>
                            <li>Broad questions (e.g., “Show me where federal money is going.” may need more detail including information such as an agency or location).</li>
                            <li>Biased or harmful content (e.g., “unethical companies”). Smart Assist may ignore those terms and use only valid filters (such as Time Period).</li>
                        </ul>
                        <p>
                          When this happens, Smart Assist explains the limitations and suggests ways to improve your query.
                        </p>
                    </>
                )
            }
        ]
    },
    limitations: {
        heading: 'Limitations',
        items: [
            {
                title: `What Doesn't Smart Assist Do?`,
                content: (
                    <>
                        <ul>
                            <li>Summarize data or provide key insights</li>
                            <li>Create information that is not available in the data</li>
                            <li>Predict future spending</li>
                            <li>Modify or update federal spending records</li>
                            <li>Interpret opinions or policy questions as factual spending data</li>
                            <li>Access information outside the datasets available through USAspending.gov</li>
                        </ul>
                        <p>
                            Smart Assist does not create new information, make assumptions beyond available federal spending data, or summarize results.
                        </p>
                    </>
                )
            }
        ]
    },
    feedback: {
        heading: 'Feedback & Support',
        items: [
            {
                title: 'How Can I Provide Feedback for Smart Assist?',
                content: (
                    <>
                        <p>
                            After you view a response, you may be asked if the answer was helpful. Your feedback helps us improve Smart Assist by highlighting where responses can become more accurate, useful, and easier to understand.
                        </p>
                    </>
                )
            }
        ]
    }
};

export const smartAssistResources = [
    {
        icon: (
            <div className="search-info-page__resources-icon-container glossary">
                <FontAwesomeIcon icon="book" color="#0081a1" size="lg" />
            </div>
        ),
        headline: 'Glossary',
        text: 'Defines terminology found throughout USAspending',
        buttonText: (
            <div className="search-info-page__resources-link-container">
                <div>View the glossary&nbsp;&nbsp;
                    <FontAwesomeIcon icon="arrow-right" />
                </div>
            </div>
        ),
        action: () => { 
            Analytics.event({
                event: 'search-info-page_resources-glossary',
                category: 'Natural Language Additional Resources',
                action: 'Link',
                label: 'glossary button'
            });
            
            closeOtherSlideouts('glossary');
            dispatch(glossaryActions.toggleGlossary());
        },
        govLink: false,
        onlyPerformAction: true
    },
    {
        icon: (
            <div className="search-info-page__resources-icon-container articles">
                <FontAwesomeIcon icon="graduation-cap" color="#0081a1" size="lg" />
            </div>
        ),
        headline: 'Featured Content',
        text: 'Read our articles and watch training videos about Smart Assist ',
        buttonText: (
            <div className="search-info-page__resources-link-container">
                <div>View Smart Assist articles&nbsp;&nbsp;
                    <FontAwesomeIcon icon="arrow-right" />
                </div>
            </div>
        ),
        action: () => { 
            Analytics.event({
                event: 'search-info-page_resources-featured-content',
                category: 'Natural Language Additional Resources',
                action: 'Link',
                label: 'smart assist articles button'
            })
        },
        govLink: false,
        onlyPerformAction: true
    },
    {
        icon: (
            <div className="search-info-page__resources-icon-container guide">
                <FontAwesomeIcon icon="money-check-dollar" color="#0081a1" size="lg" />
            </div>
        ),
        headline: 'Federal Spending Guide',
        text: 'Learn about Federal Spending and USAspending data',
        buttonText: (
            <div className="search-info-page__resources-link-container">
                <div>View Federal Spending Guide&nbsp;&nbsp;
                    <FontAwesomeIcon icon="arrow-right" />
                </div>
            </div>
        ),
        buttonLink: '/federal-spending-guide',
        action: () => { 
            Analytics.event({
                event: 'search-info-page_resources-federal-spending-guide',
                category: 'Natural Language Additional Resources',
                action: 'Link',
                label: 'smart assist federal spending guide button'
            })
        }
    }
];