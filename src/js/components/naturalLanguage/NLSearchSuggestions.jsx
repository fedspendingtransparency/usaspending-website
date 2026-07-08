/**
 * NLSearchSuggestions.jsx
 * Created by Trey Morgan 7/2/2026
 */

import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexGridRow, FlexGridCol, CardContainer, CardBody, Button } from 'data-transparency-ui';
import Analytics from 'helpers/analytics/Analytics';
import { searchCardData } from "./NLData";

// eslint-disable-next-line prefer-arrow-callback
const NLSearchSuggestions = memo(function SearchSuggestionsSection() {
    const handleWatchVideosClick = () => {
        Analytics.event({
            event: 'watch-training-videos',
            category: 'Natural Language Search Page',
            action: 'Link',
            label: 'Search Suggestions'
        });
        window.open("/training-videos")

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
                                image={<FontAwesomeIcon 
                                    className="search-suggestions__card-row icon"
                                    icon="arrow-up-right"/>}/>
                        </FlexGridCol>
                    </div>
                    <FlexGridRow className="search-suggestions__card-row" hasGutter gutterSize="lg">
                        {searchCardData.map((card) => (
                            <FlexGridCol 
                                className="search-suggestions__card" 
                                key={`search-suggestions-card-${card.id}`}
                                mobile={12}
                                tablet={12}
                                desktop={4}>
                                <CardContainer variant="outline" size="md">
                                    <CardBody
                                        customClassName="search-suggestions__card-body"
                                        overline={card.overline} 
                                        headline={card.headline}
                                        text={card.filterByHeader}>
                                        {card.icons.map((icon) => icon)}
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