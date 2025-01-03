/**
 * SearchFilterCategories.jsx
 * Created by Andrea Blackwell November 4, 2024
 */

import React from 'react';
import { LocationSectionContainer } from "../../containers/search/filters/location/LocationSectionContainer";
import TimePeriodContainer from "../../containers/search/filters/TimePeriodContainer";
import AwardIDSearchContainer from "../../containers/search/filters/awardID/AwardIDSearchContainer";
import AgencyContainer from "../../containers/search/filters/AgencyContainer";
import TASCheckboxTreeContainer from "../../containers/search/filters/programSource/TASCheckboxTreeContainer";
import RecipientSearchContainer from "../../containers/search/filters/recipient/RecipientSearchContainer";
import RecipientTypeContainer from "../../containers/search/filters/recipient/RecipientTypeContainer";
import AwardAmountSearchContainer from "../../containers/search/filters/awardAmount/AwardAmountSearchContainer";
import AwardTypeContainer from "../../containers/search/filters/AwardTypeContainer";
import NAICSCheckboxTree from "../../containers/search/filters/naics/NAICSCheckboxTree";
import PSCCheckboxTreeContainer from "../../containers/search/filters/psc/PSCCheckboxTreeContainer";
import PricingTypeContainer from "../../containers/search/filters/PricingTypeContainer";
import SetAsideContainer from "../../containers/search/filters/SetAsideContainer";
import ExtentCompetedContainer from "../../containers/search/filters/ExtentCompetedContainer";
import CFDASearchContainer from "../../containers/search/filters/cfda/CFDASearchContainer";
import DEFCheckboxTree from "../../containers/search/filters/def/DEFCheckboxTree";

export const SearchFilterCategories = [
    {
        categoryKey: 'location',
        iconName: 'map-marked-alt',
        iconColor: '#34a37e',
        iconBackgroundColor: '#dbf6ed',
        title: 'Location',
        description: 'Find awards by recipient location or where work is being done'
    },
    {
        categoryKey: 'timePeriod',
        iconName: 'calendar-alt',
        iconColor: '#1A4480',
        iconBackgroundColor: '#edf5ff',
        title: 'Time Period',
        description: 'Find awards by specific date or date range'
    },
    {
        categoryKey: 'characteristics',
        iconName: 'cubes',
        iconColor: '#ff580a',
        iconBackgroundColor: '#fff3ea',
        title: 'Characteristics',
        description: 'Find awards by award type, ID, industry code, and more'
    },
    {
        categoryKey: 'recipients',
        iconName: 'building',
        iconColor: '#1b2b85',
        iconBackgroundColor: '#edf0ff',
        title: 'Recipients',
        description: 'Find awards by business, nonprofit, other organization, and more'
    },
    {
        categoryKey: 'sources',
        iconName: 'university',
        iconColor: '#009ec1',
        iconBackgroundColor: '#e5faff',
        title: 'Sources',
        description: 'Find awards by the source of funding (agency, Treasury Account Symbol, or Disaster Emergency Fund Code)'
    }
];

export const FilterCategoryTree = {
    location: {
        title: 'Location',
        component: <LocationSectionContainer />
    },
    timePeriod: {
        title: 'Time Period',
        component: <TimePeriodContainer />
    },
    characteristics: {
        children: [
            {
                categoryType: 'ALL',
                categories: [
                    {
                        title: 'Award Description',
                        titleOnly: true
                    },
                    {
                        title: 'Award ID',
                        component: <AwardIDSearchContainer />,
                        titleOnly: true
                    },
                    {
                        title: 'Spending Amount',
                        component: <AwardAmountSearchContainer />,
                        titleOnly: true
                    }
                ]
            },
            {
                categoryType: 'CONTRACTS',
                categories: [
                    {
                        title: 'Contract Award Type',
                        component: <AwardTypeContainer />,
                        titleOnly: true
                    },
                    {
                        title: 'North American Industry Classification System (NAICS)',
                        component: (
                            <>
                                <div className="search-option">
                                    <NAICSCheckboxTree />
                                </div>
                            </>
                        ),
                        titleOnly: true
                    },
                    {
                        title: 'Product and Service Code (PSC)',
                        component: (
                            <>
                                <div className="search-option">
                                    <PSCCheckboxTreeContainer />
                                </div>
                            </>
                        ),
                        titleOnly: true
                    },
                    {
                        title: 'Type of Contract Pricing',
                        component: <PricingTypeContainer />,
                        titleOnly: true
                    },
                    {
                        title: 'Type of Set Aside',
                        component: <SetAsideContainer />,
                        titleOnly: true
                    },
                    {
                        title: 'Extent Competed',
                        component: <ExtentCompetedContainer />,
                        titleOnly: true
                    }
                ]
            },
            {
                categoryType: 'FINANCIAL ASSISTANCE',
                categories: [
                    {
                        title: 'Financial Assistance Award Type',
                        titleOnly: true
                    },
                    {
                        title: 'Assistance Listing',
                        component: <CFDASearchContainer />,
                        titleOnly: true
                    }
                ]
            }

        ]

    },
    recipients: {
        children: [
            {
                title: 'Recipient',
                component: <RecipientSearchContainer />,
                titleOnly: true
            },
            {
                title: 'Recipient Type',
                component: <RecipientTypeContainer />,
                titleOnly: true
            }
        ]
    },
    sources: {
        children: [
            {
                categoryType: 'doNotDisplay',
                categories: [
                    {
                        title: 'Agency',
                        component: <AgencyContainer />,
                        titleOnly: true
                    },
                    {
                        title: 'Treasury Account Symbol (TAS)',
                        component: <TASCheckboxTreeContainer showInfo={false} />,
                        titleOnly: true
                    }
                ]
            },
            {
                categoryType: 'DISASTER EMERGENCY FUND CODE (DEFC)',
                categories: [
                    {
                        title: 'COVID-19 Spending',
                        component: <DEFCheckboxTree defcType="COVID" />,
                        titleOnly: true
                    },
                    {
                        title: 'Infrastructure Spending',
                        component: <DEFCheckboxTree defcType="INFRA" />,
                        titleOnly: true
                    }
                ]
            }
        ]
    }
};
