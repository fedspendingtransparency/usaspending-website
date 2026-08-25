/**
 * NLSearchSuggestions.jsx
 * Created by Trey Morgan 7/2/2026
 */

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useIsMobile from "hooks/useIsMobile";
import { FlexGridRow, FlexGridCol, CardContainer, CardBody, Button } from 'data-transparency-ui';
import Analytics from "../../helpers/analytics/Analytics";
import { searchCardData } from "./NLData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, A11y, Pagination } from 'swiper/modules';
import "swiper/css/bundle";
import "swiper/css";

const NLSearchSuggestions = () => {
    const navigate = useNavigate();
    const { isDesktop } = useIsMobile();
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    
    const handleWatchVideosClick = () => {
        Analytics.event({
            event: 'watch-training-videos',
            category: 'Natural Language Search Page',
            action: 'Link',
            label: 'search suggestions'
        });
        navigate("/training-videos");
    }

    const onSlideChange = (d) => {
        const currentIndex = d.realIndex;

        d.slides.forEach((i) => {
            if (i === currentIndex) {
                setActiveCardIndex(currentIndex);
            }
        });
    };

    const getCardContent = () => {
        if (!isDesktop) {
            return (
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
            ); 
        }
        
        return (
            <Swiper
                direction={"horizontal"}
                slidesPerView={'auto'}
                spaceBetween={16}
                pagination={{
                    el: '.custom-pagination', // Links to the custom pagination dots
                    clickable: true
                }}
                keyboard
                a11y
                modules={[Keyboard, A11y, Pagination]}
                onSlideChange={onSlideChange}
                className="search-suggestions__swiper">
                {searchCardData.map((card, i) => (
                    <SwiperSlide
                        tabIndex={activeCardIndex === i ? 0 : -1}
                        className="search-suggestions__slide" 
                        key={`search-suggestions-card-${card.id}`}>
                        <CardContainer variant="outline" size="md">
                            <CardBody
                                customClassName="search-suggestions__card-body"
                                overline={card.overline} 
                                headline={card.headline}
                                text={card.filterByHeader}>
                                {card.icons.map((icon) => icon)}
                            </CardBody>
                        </CardContainer>
                    </SwiperSlide>
                ))   
                }
            </Swiper>
        );
    };

    return (
        <FlexGridRow className="search-suggestions__row">
            <FlexGridRow className="search-suggestions__title-row">
                <FlexGridCol mobile={12} tablet={12} desktop={8} className="search-suggestions__title">
                    Learn how to build your USAspending search
                </FlexGridCol>
                <FlexGridCol mobile={12} tablet={12} desktop={4} className="search-suggestions__link">
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
                </FlexGridCol>
            </FlexGridRow>
            {getCardContent()}
            <div className="custom-pagination" />
        </FlexGridRow>
    );
};

export default NLSearchSuggestions;