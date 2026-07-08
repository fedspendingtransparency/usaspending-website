/**
 * NLData.js
 * Created by Trey Morgan 7/8/2026
 */

/* eslint-disable import/prefer-default-export */
import React from "react";
import NLSearchSuggestionsIcon from "./NLSearchSuggestionsIcon";

const overline = 'IF YOU WANT TO KNOW:';
const filterByHeader = 'FILTER BY:'
const iconId = crypto.randomUUID();

export const searchCardData = [
    {
        id: iconId + 1,
        overline,
        headline: (
            <>
                How much federal funding did <strong>my state</strong> receive last year?
            </>
        ),
        filterByHeader,
        icons: [
            <NLSearchSuggestionsIcon 
                key={`time-period-${iconId}`}  
                variant="time-period" 
                label="Time Period" 
                icon="calendar" />,
            <NLSearchSuggestionsIcon 
                key={`location-${iconId}`} variant="location" 
                label="Location" 
                icon="location-dot" /> 
        ]
    },
    {
        id: iconId + 2,
        overline,
        headline: ( 
            <>
                How much federal funding are <strong>national defense corporations</strong> 
                receiving?
            </>
        ),
        filterByHeader,
        icons: [
            <NLSearchSuggestionsIcon 
                key={`keyword-${iconId}`}  
                variant="keyword" 
                label="Keyword" 
                icon="search" />,
            <NLSearchSuggestionsIcon 
                key={`recipient-${iconId}`} variant="recipient" 
                label="Recipient" 
                icon="user" /> 
        ]
    },
    {
        id: iconId + 3,
        overline,
        headline: (
            <>
                What federal <strong>grants</strong> have been awarded for 
                <strong>health care</strong>?
            </>
        ),
        filterByHeader,
        icons: [
            <NLSearchSuggestionsIcon 
                key={`award-type-${iconId}`}  
                variant="award-type" 
                label="Award Type" 
                icon="file-certificate" />,
            <NLSearchSuggestionsIcon 
                key={`award-description-${iconId}`} variant="award-description" 
                label="Award Description" 
                icon="building" /> 
        ]
    }
]