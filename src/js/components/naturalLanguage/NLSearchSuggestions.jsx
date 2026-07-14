/**
 * NLSearchSuggestions.jsx
 * Created by Trey Morgan 7/2/2026
 */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexGridRow, FlexGridCol, CardContainer, CardBody, Button } from 'data-transparency-ui';
import Analytics from "../../helpers/analytics/Analytics";
import { searchCardData } from "./NLData";
import NLMoreResources from "./NLMoreResources";

const NLSearchSuggestions = () => {
    const handleWatchVideosClick = () => {
        Analytics.event({
            event: 'watch-training-videos',
            category: 'Natural Language Search Page',
            action: 'Link',
            label: 'search suggestions'
        });
        window.open("/training-videos");
    }

    return (
        <>
            <section className="search-suggestions__section"> 
                <FlexGridRow className="search-suggestions__row">
                    <div className="search-suggestions__title">
                            Learn how to build your USAspending search
                    </div>
                    <div className="search-suggestions__link">
                        <Button
                            copy="Watch training videos"
                            onClick={handleWatchVideosClick}
                            buttonTitle="Watch training videos"
                            buttonSize="md"
                            buttonType="text"
                            backgroundColor="light"
                            textAlignment="left"
                            imageAlignment="right"
                            image={
                                <div className="button-icon-container">
                                    <FontAwesomeIcon 
                                        className="button-icon"
                                        icon="arrow-up-right"/>
                                </div>}/>
                    </div>
                    <FlexGridRow className="search-suggestions__card-row">
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
            </section> 
            <NLMoreResources />
        </>
    );
};

export default NLSearchSuggestions;