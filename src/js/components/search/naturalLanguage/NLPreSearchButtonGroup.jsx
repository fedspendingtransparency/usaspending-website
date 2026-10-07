/**
 * NLPreSearchButtonGroup.jsx
 * Created by JD House 8/20/2026
 */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isCancel } from 'axios';
import { FlexGridRow, FlexGridCol, CardContainer } from 'data-transparency-ui';
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, A11y } from 'swiper/modules';
import PropTypes from "prop-types";
import "swiper/css";
import { preSearchOptionsToRemove, preSearchOptions } from "./NLData";
import { generateUrlHash } from "../../../helpers/searchHelper";
import { combineQueryParams, getQueryParamString } from "../../../helpers/queryParams";
import useQueryParams from "../../../hooks/useQueryParams";
import useFireQueryEvent from "../../../hooks/useFireQueryEvent";
import useIsMobile from "../../../hooks/useIsMobile";
const propTypes = {
    source: PropTypes.string
}

// to remove when Smart Assist deploys
const getQuestions = preSearchOptionsToRemove.map(({ options }) => {
    const index = Math.floor(Math.random() * options.length);
    return options[index]
});

const NLPreSearchButtonGroup = ({source = ""}) => {
    const query = useQueryParams();
    const fireQueryEvent = useFireQueryEvent();
    const { isMedium } = useIsMobile();

    const fireSearchEvent = (filterValue) => {
        fireQueryEvent();
        let tempHash = generateUrlHash(filterValue);
        tempHash.promise
            .then((results) => {
                const newQueryParams = combineQueryParams(query, {hash: encodeURIComponent(results.data.hash)});
                window.open(`${'/search'}${getQueryParamString(newQueryParams)}`, "_self");
                
                // operation has resolved
                tempHash = null;
            })
            .catch((error) => {
                if (!isCancel(error)) {
                    // Request failed
                    console.log(error);
                }
                tempHash = null;
            });
    }

    if ( source !== "Homepage") {
        return (
            <div className="landing-pre-search__section">
                <FlexGridRow className="landing-pre-search__row">
                    {getQuestions.map((btn) => (
                        <FlexGridCol 
                            key={`landing-pre-search-${btn.id}`} 
                            className="landing-pre-search__col"
                            desktopxl={4} 
                            desktop={12} 
                            tablet={12}
                            mobile={12}>
                            <CardContainer 
                                variant="outline"
                                onClick={() => btn.action(fireSearchEvent)}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter'){
                                        btn.action(fireSearchEvent)
                                    } 
                                }}>
                                <div className="pre-search-icon">
                                    <FontAwesomeIcon icon="filter-list" />
                                </div>
                                <div className="pre-search-text">{btn.text}</div>
                            </CardContainer>
                            
                        </FlexGridCol>
                    ))}
                </FlexGridRow>
            </div>
        );
    }


    return (
        <div className="homepage-pre-search">
            <div className="homepage-pre-search__container">
                <div className="homepage-pre-search__headline">What people are searching</div>
                <div className="homepage-pre-search__subText">
                    Get the data breakdown on popular searches about government spending.
                </div>
                { isMedium ? (
                    <FlexGridRow className="homepage-pre-search__row" hasGutter>
                        {preSearchOptions.map((btn) => (
                            <FlexGridCol
                                key={`homepage-pre-search-${btn.id}`}
                                className="homepage-pre-search__col"
                                desktop={6}
                                tablet={6}
                                mobile={12}>
                                <CardContainer
                                    variant="outline"
                                    onClick={() => btn.action(fireSearchEvent)}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter'){
                                            btn.action(fireSearchEvent)
                                        }
                                    }}>
                                    <div className="pre-search-content">
                                        <div className="pre-search-icon">
                                            <FontAwesomeIcon icon={btn.icon} />
                                        </div>
                                        <div className="pre-search-copy">
                                            <div className="pre-search-title">{btn.title}</div>
                                            <div className="pre-search-text">{btn.text}</div>
                                        </div>
                                    </div>
                                </CardContainer>
                            </FlexGridCol>
                        ))}
                    </FlexGridRow>
                ) : (
                    <FlexGridRow className="homepage-pre-search__swiper-row">
                        <FlexGridCol desktop={12} tablet={6} className="homepage-pre-search__swiper-col">
                            <Swiper
                                direction="horizontal"
                                slidesPerView="auto"
                                spaceBetween={16}
                                keyboard
                                a11y
                                grabCursor={true}
                                modules={[Keyboard, A11y]}
                                className="homepage-pre-search__swiper">
                                {preSearchOptions.map((btn) => (
                                    <SwiperSlide
                                        key={`homepage-pre-search-${btn.id}`}
                                        className="homepage-pre-search__slide">                        
                                        <CardContainer
                                            variant="outline"
                                            onClick={() => btn.action(fireSearchEvent)}
                                            onKeyUp={(e) => {
                                                if (e.key === 'Enter'){
                                                    btn.action(fireSearchEvent)
                                                }
                                            }}>
                                            <div className="pre-search-content">
                                                <div className="pre-search-icon">
                                                    <FontAwesomeIcon icon={btn.icon} />
                                                </div>
                                                <div className="pre-search-copy">
                                                    <div className="pre-search-title">{btn.title}</div>
                                                    <div className="pre-search-text">{btn.text}</div>
                                                </div>
                                            </div>
                                        </CardContainer>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </FlexGridCol>
                    </FlexGridRow>
                )}
            </div>
        </div>
    )
};


NLPreSearchButtonGroup.propTypes = propTypes;
export default NLPreSearchButtonGroup;