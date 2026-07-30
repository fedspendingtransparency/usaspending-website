/**
 * NLData.js
 * Created by Trey Morgan 7/8/2026
 */

import React from "react";
import NLSearchSuggestionsIcon from "./NLSearchSuggestionsIcon";
import Analytics from "../../helpers/analytics/Analytics";
import { closeOtherSlideOuts } from "../../helpers/slideoutHelper";
import storeSingleton from 'redux/storeSingleton';
import * as glossaryActions from "../../redux/actions/glossary/glossaryActions"
import * as aboutTheDataActions from "../../redux/actions/aboutTheDataSidebar/aboutTheDataActions"

const overline = 'IF YOU WANT TO KNOW:';
const filterByHeader = 'FILTER BY:'
const id = crypto.randomUUID();

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
                labelVariant="search-suggestions" 
                icon="calendar"/>,
            <NLSearchSuggestionsIcon 
                key={`location-${id}`} variant="location" 
                label="Location"
                labelVariant="search-suggestions"  
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
                labelVariant="search-suggestions"  
                icon="search" />,
            <NLSearchSuggestionsIcon 
                key={`recipient-${id}`} variant="recipient" 
                label="Recipient"
                labelVariant="search-suggestions"  
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
                labelVariant="search-suggestions"  
                icon="file-certificate" />,
            <NLSearchSuggestionsIcon 
                key={`award-description-${id}`} variant="award-description" 
                label="Award Description"
                labelVariant="search-suggestions" 
                icon="building" /> 
        ]
    }
]

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
            closeOtherSlideOuts('glossary');
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
            closeOtherSlideOuts('atd');
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
            closeOtherSlideOuts();
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
            closeOtherSlideOuts();
            navigate("/federal-spending-guide");
        },
        image: (
            <NLSearchSuggestionsIcon 
                variant="federal-spending-guide" 
                label="Federal Spending Guide" 
                icon="money-check-dollar"/>
        ) 
    }
]