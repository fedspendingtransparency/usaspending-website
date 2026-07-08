/**
 * NLSearchSuggestions.jsx
 * Created by Trey Morgan 7/2/2026
 */

import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexGridRow, FlexGridCol, CardContainer, CardHero, CardBody, CardButton, Button } from 'data-transparency-ui';
import Analytics from 'helpers/analytics/Analytics';


const overline = 'IF YOU WANT TO KNOW:';
const text = 'FILTER BY:'

const searchCardData = [
    {
        overline,
        headline: <>How much federal funding did <strong>my state</strong> receive last year?</>,
        text
    },
    {
        overline,
        headline: <>How much federal funding are <strong>national defense corporations</strong> receiving?</>,
        text
    },
    {
        overline,
        headline: <>What federal <strong>grants</strong> have been awarded for <strong>health care</strong>?</>,
        text
    }
]

// eslint-disable-next-line prefer-arrow-callback
const NLSearchSuggestions = memo(function SearchSuggestionsSection() {
    const handleWatchVideosClick = () => {
        Analytics.event({
            event: 'watch-training-videos',
            category: 'Natural Language Search Page',
            action: 'Link',
            label: 'Search Suggestions'
        });
        window.open("/usaspending.gov/training-videos")

    }

    return (
        <section className="search-suggestions__section"> 
            <div style={{ display: "flex", justifyContent: "center" }}>
                <FlexGridRow className="grid-content">
                    <div style={{display: 'flex', flex: '1 0 0', alignItems: 'baseline'}}>
                        <FlexGridCol className="search-suggestions__title">
                            Learn how to build USAspending search
                        </FlexGridCol>
                        <FlexGridCol className="search-suggestions__link">
                            <Button
                                copy="Watch training videos"
                                onClick={handleWatchVideosClick}
                                buttonTitle="Watch training videos"
                                buttonSize="md"
                                buttonType="text"
                                backgroundColor="light"
                                textAlignment="left"
                                imageAlignment="right"
                                image={<FontAwesomeIcon icon="arrow-up-right" style={{height: '16px', width: '16px'}} />}/>
                        </FlexGridCol>
                    </div>
                    <FlexGridRow className="search-suggestions__card-row" hasGutter gutterSize="lg">
                        {searchCardData.map((card, index) => (
                            <FlexGridCol 
                                className="search-suggestions__card" 
                                key={index}
                                mobile={12}
                                tablet={12}
                                desktop={4}>
                                <CardContainer variant="outline" size="md">
                                    <CardBody
                                        customClassName="search-suggestions__card-body"
                                        overline={card.overline} 
                                        headline={card.headline}
                                        text={card.text}>
                                        
                                        Card Body
                                    </CardBody>
                                </CardContainer>
                            </FlexGridCol>
                        ))
                           
                        }
                    </FlexGridRow>
                   
                    
                </FlexGridRow>
                
            </div>
        </section> 
    );
});

export default NLSearchSuggestions;