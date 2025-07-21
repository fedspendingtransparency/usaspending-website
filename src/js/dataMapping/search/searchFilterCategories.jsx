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
import AwardTypeContainerV2 from "../../containers/search/filters/AwardTypeContainerV2";
import NAICSCheckboxTree from "../../containers/search/filters/naics/NAICSCheckboxTree";
import PSCCheckboxTreeContainer from "../../containers/search/filters/psc/PSCCheckboxTreeContainer";
import PricingTypeContainer from "../../containers/search/filters/PricingTypeContainer";
import SetAsideContainer from "../../containers/search/filters/SetAsideContainer";
import ExtentCompetedContainer from "../../containers/search/filters/ExtentCompetedContainer";
import CFDASearchContainer from "../../containers/search/filters/cfda/CFDASearchContainer";
import DEFCheckboxTreeContainer from "../../containers/search/filters/def/DEFCheckboxTreeContainer";
import AwardDescriptionFilterContainer from "../../containers/search/filters/AwardDescriptionFilterContainer";

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
        component: <LocationSectionContainer />,
        dsmComponent: true,
        dsmFile: "location-filter-panel.mdx"
    },
    timePeriod: {
        title: 'Time Period',
        component: <TimePeriodContainer searchV2 />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "time-filter-panel.mdx"
    },
    characteristics: {
        dsmComponent: true,
        dsmFile: "characteristics-panel.mdx",
        children: [
            {
                categoryType: 'ALL',
                categories: [
                    {
                        title: 'Award Description',
                        component: <AwardDescriptionFilterContainer />,
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "award_description.mdx"
                    },
                    {
                        title: 'Award ID',
                        component: <AwardIDSearchContainer searchV2 />,
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "award_id.mdx"
                    },
                    {
                        title: 'Spending Amount',
                        component: <AwardAmountSearchContainer searchV2 />,
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "spending_amount.mdx"
                    }
                ]
            },
            {
                categoryType: 'CONTRACTS',
                categories: [
                    {
                        title: 'Contract Award Type',
                        component: <AwardTypeContainerV2 isContractAwardType />,
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "contract_award_type.mdx"
                    },
                    {
                        title: 'North American Industry Classification System (NAICS)',
                        component: (
                            <>
                                <div className="search-option">
                                    <NAICSCheckboxTree searchV2 />
                                </div>
                            </>
                        ),
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "naics.mdx"
                    },
                    {
                        title: 'Product and Service Code (PSC)',
                        component: (
                            <>
                                <div className="search-option">
                                    <PSCCheckboxTreeContainer searchV2 />
                                </div>
                            </>
                        ),
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "psc.mdx"
                    },
                    {
                        title: 'Type of Contract Pricing',
                        component: <PricingTypeContainer searchV2 />,
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "contract_pricing.mdx"
                    },
                    {
                        title: 'Type of Set Aside',
                        component: <SetAsideContainer searchV2 />,
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "set_aside.mdx"
                    },
                    {
                        title: 'Extent Competed',
                        component: <ExtentCompetedContainer searchV2 />,
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "extent_competed.mdx"
                    }
                ]
            },
            {
                categoryType: 'FINANCIAL ASSISTANCE',
                categories: [
                    {
                        title: 'Financial Assistance Award Type',
                        component: <AwardTypeContainerV2 />,
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "financial_assistance_award_type.mdx"
                    },
                    {
                        title: 'Assistance Listing',
                        component: <CFDASearchContainer searchV2 />,
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "assistance_listing.mdx"
                    }
                ]
            }

        ]

    },
    recipients: {
        dsmComponent: true,
        dsmFile: "recipients-panel.mdx",
        children: [
            {
                title: 'Recipient',
                component: <RecipientSearchContainer searchV2 />,
                titleOnly: true,
                dsmComponent: true,
                dsmFile: "recipient.mdx"
            },
            {
                title: 'Recipient Type',
                component: <RecipientTypeContainer searchV2 />,
                titleOnly: true,
                dsmComponent: true,
                dsmFile: "recipient_type.mdx"
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
                        component: <AgencyContainer searchV2 />,
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "agency.mdx"
                    },
                    {
                        title: 'Treasury Account Symbol (TAS)',
                        component: <TASCheckboxTreeContainer showInfo={false} searchV2 />,
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "tas.mdx"
                    }
                ]
            },
            {
                categoryType: 'DISASTER EMERGENCY FUND CODE (DEFC)',
                categories: [
                    {
                        title: 'COVID-19 Spending',
                        component: <DEFCheckboxTreeContainer defcType="covid_19" />,
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "covid19.mdx"
                    },
                    {
                        title: 'Infrastructure Spending',
                        component: <DEFCheckboxTreeContainer defcType="infrastructure" />,
                        titleOnly: true,
                        dsmComponent: true,
                        dsmFile: "infrastructure_spending.mdx"
                    }
                ]
            }
        ],
        dsmComponent: true,
        dsmFile: "sources-panel.mdx"
    }
};

export const filterList = [
    {
        title: "Location",
        component: <LocationSectionContainer />,
        dsmComponent: true,
        dsmFile: "location-filter-panel.mdx",
        category: "location"
    },
    {
        title: "Time Period",
        component: <TimePeriodContainer searchV2 />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "time-filter-panel.mdx",
        category: "time_period"
    },
    {
        title: "Award Description",
        component: <AwardDescriptionFilterContainer />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "award_description.mdx",
        category: "characteristics"
    },
    {
        title: "Award ID",
        component: <AwardIDSearchContainer searchV2 />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "award_id.mdx",
        category: "characteristics"
    },
    {
        title: "Spending Amount",
        component: <AwardAmountSearchContainer searchV2 />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "spending_amount.mdx",
        category: "characteristics"
    },
    {
        title: 'Contract Award Type',
        component: <AwardTypeContainerV2 isContractAwardType />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "contract_award_type.mdx",
        category: "characteristics"
    },
    {
        title: 'North American Industry Classification System (NAICS)',
        component: (
            <>
                <div className="search-option">
                    <NAICSCheckboxTree searchV2 />
                </div>
            </>
        ),
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "naics.mdx",
        category: "characteristics"
    },
    {
        title: 'Product and Service Code (PSC)',
        component: (
            <>
                <div className="search-option">
                    <PSCCheckboxTreeContainer searchV2 />
                </div>
            </>
        ),
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "psc.mdx",
        category: "characteristics"
    },
    {
        title: 'Type of Contract Pricing',
        component: <PricingTypeContainer searchV2 />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "contract_pricing.mdx",
        category: "characteristics"
    },
    {
        title: 'Type of Set Aside',
        component: <SetAsideContainer searchV2 />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "set_aside.mdx",
        category: "characteristics"
    },
    {
        title: 'Extent Competed',
        component: <ExtentCompetedContainer searchV2 />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "extent_competed.mdx",
        category: "characteristics"
    },
    {
        title: 'Financial Assistance Award Type',
        component: <AwardTypeContainerV2 />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "financial_assistance_award_type.mdx",
        category: "characteristics"
    },
    {
        title: 'Assistance Listing',
        component: <CFDASearchContainer searchV2 />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "assistance_listing.mdx",
        category: "characteristics"
    },
    {
        title: 'Recipient',
        component: <RecipientSearchContainer searchV2 />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "recipient.mdx",
        category: "recipient"
    },
    {
        title: 'Recipient Type',
        component: <RecipientTypeContainer searchV2 />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "recipient_type.mdx",
        category: "recipient"
    },
    {
        title: 'Agency',
        component: <AgencyContainer searchV2 />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "agency.mdx",
        category: "sources"
    },
    {
        title: 'Treasury Account Symbol (TAS)',
        component: <TASCheckboxTreeContainer showInfo={false} searchV2 />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "tas.mdx",
        category: "sources"
    },
    {
        title: 'COVID-19 Spending',
        component: <DEFCheckboxTreeContainer defcType="covid_19" />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "covid19.mdx"
    },
    {
        title: 'Infrastructure Spending',
        component: <DEFCheckboxTreeContainer defcType="infrastructure" />,
        titleOnly: true,
        dsmComponent: true,
        dsmFile: "infrastructure_spending.mdx"
    }
];
