/**
 * AwardSearch.jsx
 * Created by Brian Petway 08/22/22
 */

import React, { useState, useEffect } from 'react';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import { isCancel } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper";
import { initialState as defaultFilters } from 'redux/reducers/search/searchFiltersReducer';
import { throttle } from 'lodash';
import CardButton from "../../sharedComponents/commonCards/CardButton";
import CardBody from "../../sharedComponents/commonCards/CardBody";
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import GlossaryLink from '../../sharedComponents/GlossaryLink';
import { generateUrlHash } from "../../../helpers/searchHelper";
import { REQUEST_VERSION } from "../../../GlobalConstants";
import Analytics from '../../../helpers/analytics/Analytics';

/* eslint-disable */
import "swiper/css/bundle";
import "swiper/css";
/* eslint-enable */

const AwardSearch = () => {
    const [isDesktopXL, setDesktopXL] = useState(window.innerWidth >= 1400);
    const [isMobile, setMobile] = useState(window.innerWidth < 768);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [activeCardIndex, setActiveCardIndex] = useState(0);

    const placeOfPerformance = <div>Search spending to your community using Location filters like <div className="award-search__glossary">Place of Performance</div> {<GlossaryLink term="primary-place-of-performance" hidden={activeCardIndex !== 0} />}</div>;
    const fiscalYear = <div>See spending data over time using our Time Period filters, like <div className="award-search__glossary">Fiscal Year</div> {<GlossaryLink term="fiscal-year-fy" hidden={activeCardIndex !== 1} />}</div>;
    const naics = <div>Use the <div className="award-search__glossary">North American Industry Classification System (NAICS)</div> {<GlossaryLink term="naics" hidden={activeCardIndex !== 2} />} filter to find spending by industry</div>;
    const psc = <div>From medical supplies to aircraft equipment, use <div className="award-search__glossary">Product or Service Codes (PSCs)</div> {<GlossaryLink term="product-or-service-code-psc" hidden={activeCardIndex !== 3} />} to see what&apos;s being purchased</div>;
    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                if (newWidth >= 1400) {
                    setDesktopXL(true);
                }
                else {
                    setDesktopXL(false);
                }

                if (newWidth < 768) {
                    setMobile(true);
                }
                else {
                    setMobile(false);
                }
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);


    const getSelectedTab = (tab, rankType) => {
        const filterValue = {
            filters: {
                ...defaultFilters,
                selectedLocations: {
                    USA: {
                        filter: {
                            country: "USA"
                        },
                        display: {
                            title: "UNITED STATES",
                            entity: "Country",
                            standalone: "UNITED STATES"
                        },
                        identifier: "USA"
                    }
                }
            },
            version: REQUEST_VERSION
        };

        if (tab === "map") {
            filterValue.filters.timePeriodFY = [(FiscalYearHelper.currentFiscalYear()).toString()];
        }
        else if (tab === "time") {
            filterValue.filters.timePeriodFY =
                [(FiscalYearHelper.currentFiscalYear()).toString(),
                    (FiscalYearHelper.currentFiscalYear() - 1).toString(),
                    (FiscalYearHelper.currentFiscalYear() - 2).toString(),
                    (FiscalYearHelper.currentFiscalYear() - 3).toString(),
                    (FiscalYearHelper.currentFiscalYear() - 4).toString()];
        }
        else if (tab === "rank" && rankType === "naics") {
            filterValue.filters.timePeriodFY = [FiscalYearHelper.currentFiscalYear().toString()];
        }
        else if (tab === "rank" && rankType === "psc") {
            filterValue.filters.timePeriodFY = [FiscalYearHelper.currentFiscalYear().toString()];
        }

        let tempHash = generateUrlHash(filterValue);
        tempHash.promise
            .then((results) => {
                const hashData = results.data;
                if (rankType === "naics" || rankType === "psc") {
                    window.open(`/search?hash=${hashData.hash}&tab=${tab}&rankType=${rankType}`, "_self");
                }
                else {
                    window.open(`/search?hash=${hashData.hash}&tab=${tab}`, "_self");
                }
                // operation has resolved
                tempHash = null;
            })
            .catch((error) => {
                console.log(error);
                if (isCancel(error)) {
                    // Got cancelled
                }
                else if (error.response) {
                    // Errored out but got response, toggle noAward flag
                    this.hash = null;
                }
                else {
                    // Request failed
                    tempHash = null;
                    console.log(error);
                }
            });
    };
    const trackClick = (buttonName) => Analytics.event({
        category: 'Homepage',
        action: 'Link',
        label: `carousel ${buttonName}`
    });
    const handleGoToAdvancedSearch = (buttonName, rankType) => {
        getSelectedTab(buttonName, rankType);
        trackClick(buttonName);
    };

    const onSlideChange = (d) => {
        const currentIndex = d.realIndex;

        d.slides.forEach((slide, i) => {
            if (i === currentIndex) {
                // eslint-disable-next-line no-param-reassign
                slide.ariaHidden = false;
                setActiveCardIndex(currentIndex);
            }
            else {
                // eslint-disable-next-line no-param-reassign
                slide.ariaHidden = true;
            }
        });
    };

    return (
        <section className="award-search__section">
            <div style={{ justifyContent: "center" }} className="award-search__topdiv">
                <FlexGridRow className="grid-content">
                    {isDesktopXL &&
                        (<>
                            <FlexGridCol desktop={4} tablet={12} mobile={12} className="award-search__col1">
                                <div className="award-search__overline-div">
                                    <span
                                        className="fa-layers fa-fw award-search__span"><FontAwesomeIcon icon="search" size="sm" style={{ height: '12px', width: '12px' }} />
                                    </span>
                                    <p className="award-search__overline">AWARD SEARCH</p>
                                </div>
                                <h2 className="award-search__header">Search data on federal award spending</h2>
                                <p className="award-search__subtext">Find information on awards such as contracts, loans, and grants based on location, industry, and more.</p>
                            </FlexGridCol>
                            <FlexGridCol desktop={8} tablet={12} mobile={12} className="award-search__col2">
                                <Swiper
                                    a11y={{ enabled: true }}
                                    centeredSlides
                                    navigation
                                    watchslidesvisibility="true"
                                    slidesPerView="auto"
                                    spaceBetween={40}
                                    modules={[Keyboard, A11y, Navigation]}
                                    keyboard={{ enabled: true }}
                                    style={{ alignItems: "middle" }}
                                    onSlideChange={onSlideChange}>
                                    <SwiperSlide aria-hidden="false" tabIndex={0} className="award-search__slide award-search__card1" style={{ marginBottom: "20px" }}>
                                        <CardContainer variant="elevated" size="lg">
                                            <CardBody
                                                headline="Federal Spending to Communities"
                                                text={placeOfPerformance} >
                                                <div className="award-search__image">
                                                    <img src="img/homepage-award-search/award-search-communities-2x.svg" alt="" role="presentation" />
                                                </div>
                                                <CardButton
                                                    onlyPerformAction
                                                    text="View spending by state"
                                                    variant="primary"
                                                    disabled={activeCardIndex !== 0}
                                                    action={() => {
                                                        handleGoToAdvancedSearch("map");
                                                    }} />
                                            </CardBody>
                                        </CardContainer>
                                    </SwiperSlide>
                                    <SwiperSlide aria-hidden="true" tabIndex={0} className="award-search__slide award-search__card2" style={{ marginBottom: "20px" }}>
                                        <CardContainer variant="elevated" size="lg">
                                            <CardBody
                                                headline="Federal Spending Over Time"
                                                text={fiscalYear}>
                                                <div className="award-search__image">
                                                    <img src="img/homepage-award-search/award-search-over-time-2x.svg" alt="" role="presentation" />
                                                </div>
                                                <CardButton
                                                    onlyPerformAction
                                                    text="View spending by fiscal year"
                                                    variant="primary"
                                                    disabled={activeCardIndex !== 1}
                                                    action={() => {
                                                        handleGoToAdvancedSearch("time");
                                                    }} />
                                            </CardBody>
                                        </CardContainer>
                                    </SwiperSlide>
                                    <SwiperSlide aria-hidden="true" tabIndex={0} className="award-search__slide award-search__card3" style={{ marginBottom: "20px" }}>
                                        <CardContainer variant="elevated" size="lg">
                                            <CardBody
                                                headline="Federal Spending by Industry"
                                                text={naics}>
                                                <div className="award-search__image">
                                                    <img src="img/homepage-award-search/award-search-industry-2x.svg" alt="" role="presentation" />
                                                </div>
                                                <CardButton
                                                    onlyPerformAction
                                                    text="View spending by industry"
                                                    variant="primary"
                                                    disabled={activeCardIndex !== 2}
                                                    action={() => {
                                                        handleGoToAdvancedSearch("rank", "naics");
                                                    }} />
                                            </CardBody>
                                        </CardContainer>
                                    </SwiperSlide>
                                    <SwiperSlide aria-hidden="true" tabIndex={0} className="award-search__slide award-search__card1" style={{ marginBottom: "20px" }}>
                                        <CardContainer variant="elevated" size="lg">
                                            <CardBody
                                                headline="Federal Spending by Product or Service"
                                                text={psc}>
                                                <div className="award-search__image">
                                                    <img src="img/homepage-award-search/award-search-psc-2x.svg" alt="" role="presentation" />
                                                </div>
                                                <CardButton
                                                    onlyPerformAction
                                                    text="View spending by product or service"
                                                    variant="primary"
                                                    disabled={activeCardIndex !== 3}
                                                    action={() => {
                                                        handleGoToAdvancedSearch("rank", "psc");
                                                    }} />
                                            </CardBody>
                                        </CardContainer>
                                    </SwiperSlide>
                                </Swiper>
                            </FlexGridCol>
                        </>)}
                    {!isDesktopXL && (
                        <>
                            <FlexGridRow desktop={9} tablet={12} mobile={12}>
                                <FlexGridCol desktop={9} tablet={12} mobile={12} className="award-search__col1">
                                    <div className="award-search__overline-div">
                                        <span
                                            className="fa-layers fa-fw award-search__span"><FontAwesomeIcon icon="search" size="sm" style={{ height: '12px', width: '12px' }} />
                                        </span>
                                        <p className="award-search__overline">AWARD SEARCH</p>
                                    </div>
                                    <h2 className="award-search__header">Search data on federal award spending</h2>
                                    <p className="award-search__subtext">Find information on awards such as contracts, loans, and grants based on location, industry, and more.</p>
                                </FlexGridCol>
                            </FlexGridRow>
                            <FlexGridCol desktop={8} tablet={12} mobile={12} className="award-search__col2" style={{ width: "100%", margin: "auto" }}>
                                <Swiper
                                    a11y={{ enabled: true }}
                                    centeredSlides
                                    pagination={isMobile}
                                    navigation={!isMobile}
                                    watchslidesvisibility="true"
                                    slidesPerView="auto"
                                    spaceBetween={40}
                                    modules={[Keyboard, A11y, Pagination, Navigation]}
                                    keyboard={{ enabled: true }}
                                    className="award-search__swiper"
                                    onSlideChange={onSlideChange}>
                                    <SwiperSlide aria-hidden="false" tabIndex={0} className="award-search__slide" style={{ marginBottom: "20px" }}>
                                        <CardContainer className="award-search__card1" variant="elevated" size={isMobile ? "sm" : "lg"}>
                                            <CardBody
                                                headline="Federal Spending to Communities"
                                                text={placeOfPerformance}>
                                                <div className="award-search__image">
                                                    <img src="img/homepage-award-search/award-search-communities-2x.svg" alt="" role="presentation" />
                                                </div>
                                                <CardButton
                                                    onlyPerformAction
                                                    text="View spending by state"
                                                    variant="primary"
                                                    disabled={activeCardIndex !== 0}
                                                    action={() => {
                                                        handleGoToAdvancedSearch("map");
                                                    }} />
                                            </CardBody>
                                        </CardContainer>
                                    </SwiperSlide>
                                    <SwiperSlide aria-hidden="true" tabIndex={0} className="award-search__slide award-search__card2" style={{ marginBottom: "20px" }}>
                                        <CardContainer className="award-search__card2" variant="elevated" size={isMobile ? "sm" : "lg"}>
                                            <CardBody
                                                headline="Federal Spending Over Time"
                                                text={fiscalYear}>
                                                <div className="award-search__image">
                                                    <img src="img/homepage-award-search/award-search-over-time-2x.svg" alt="" role="presentation" />
                                                </div>
                                                <CardButton
                                                    onlyPerformAction
                                                    text="View spending by fiscal year"
                                                    variant="primary"
                                                    disabled={activeCardIndex !== 1}
                                                    action={() => {
                                                        handleGoToAdvancedSearch("time");
                                                    }} />
                                            </CardBody>
                                        </CardContainer>
                                    </SwiperSlide>
                                    <SwiperSlide aria-hidden="true" tabIndex={0} className="award-search__slide award-search__card3" style={{ marginBottom: "20px" }}>
                                        <CardContainer className="award-search__card3" variant="elevated" size={isMobile ? "sm" : "lg"}>
                                            <CardBody
                                                headline="Federal Spending by Industry"
                                                text={naics}>
                                                <div className="award-search__image">
                                                    <img src="img/homepage-award-search/award-search-industry-2x.svg" alt="" role="presentation" />
                                                </div>
                                                <CardButton
                                                    onlyPerformAction
                                                    text="View spending by industry"
                                                    variant="primary"
                                                    disabled={activeCardIndex !== 2}
                                                    action={() => {
                                                        handleGoToAdvancedSearch("rank", "naics");
                                                    }} />
                                            </CardBody>
                                        </CardContainer>
                                    </SwiperSlide>
                                    <SwiperSlide aria-hidden="true" tabIndex={0} className="award-search__slide award-search__card4" style={{ marginBottom: "20px" }}>
                                        <CardContainer className="award-search__card4" variant="elevated" size={isMobile ? "sm" : "lg"}>
                                            <CardBody
                                                headline="Federal Spending by Product or Service"
                                                text={psc}>
                                                <div className="award-search__image">
                                                    <img src="img/homepage-award-search/award-search-psc-2x.svg" alt="" role="presentation" />
                                                </div>
                                                <CardButton
                                                    onlyPerformAction
                                                    text="View spending by product or service"
                                                    variant="primary"
                                                    disabled={activeCardIndex !== 3}
                                                    action={() => {
                                                        handleGoToAdvancedSearch("rank", "psc");
                                                    }} />
                                            </CardBody>
                                        </CardContainer>
                                    </SwiperSlide>
                                </Swiper>
                            </FlexGridCol>
                        </>)}
                </FlexGridRow>
            </div>
        </section>);
};

export default AwardSearch;
