/**
 * AwardSearch.jsx
 * Created by Brian Petway 08/22/22
 */

import React, { useState, useEffect } from 'react';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import { isCancel } from 'axios';
import { useDispatch } from 'react-redux';
import { setSearchViewType } from 'redux/actions/search/searchViewActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { initialState as defaultFilters } from 'redux/reducers/search/searchFiltersReducer';
import { throttle } from 'lodash';
import CardButton from "../../sharedComponents/commonCards/CardButton";
import CardBody from "../../sharedComponents/commonCards/CardBody";
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import GlossaryLink from '../../sharedComponents/GlossaryLink';
import { generateUrlHash } from "../../../helpers/searchHelper";
import { REQUEST_VERSION } from "../../../GlobalConstants";

/* eslint-disable */
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
/* eslint-enable */

const AwardSearch = () => {
    const dispatch = useDispatch();
    const [isDesktopXL, setDesktopXL] = useState(false);
    const [isMobile, setMobile] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    const placeOfPerformance = <div>Search spending to your community using Location filters like <div className="award-search__glossary">Place of Performance</div> {<GlossaryLink term="primary-place-of-performance" />}</div>;
    const fiscalYear = <div>See spending data over time using our Time Period filters, like <div className="award-search__glossary">Fiscal Year</div> {<GlossaryLink term="fiscal-year-fy" />}</div>;
    const naics = <div>Use the <div className="award-search__glossary">North American Industry Classification System (NAICS)</div> {<GlossaryLink term="naics" />} filter to find spending by industry</div>;
    const psc = <div>From medical supplies to aircraft equipment, use <div className="award-search__glossary">Product or Service Codes (PSCs)</div> {<GlossaryLink term="product-or-service-code-psc" />} to see what&apos;s being purchased</div>;
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
                } else {
                    setMobile(false);
                }
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


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
        } else if (tab === "time") {
            filterValue.filters.timePeriodFY =
            [(FiscalYearHelper.currentFiscalYear()).toString(),
                (FiscalYearHelper.currentFiscalYear() - 1).toString(),
                (FiscalYearHelper.currentFiscalYear() - 2).toString(),
                (FiscalYearHelper.currentFiscalYear() - 3).toString(),
                (FiscalYearHelper.currentFiscalYear() - 4).toString()];
        } else if (tab === "rank" && rankType === "naics") {
            filterValue.filters.timePeriodFY = [FiscalYearHelper.currentFiscalYear().toString()];
        } else if (tab === "rank" && rankType === "psc") {
            filterValue.filters.timePeriodFY = [FiscalYearHelper.currentFiscalYear().toString()];
        }

        let tempHash = generateUrlHash(filterValue);
        tempHash.promise
            .then((results) => {
                const hashData = results.data;
                if (rankType === "naics" || rankType === "psc") {
                    window.open(`/search?hash=${hashData.hash}&tab=${tab}&rankType=${rankType}`, "_self");
                } else {
                    window.open(`/search?hash=${hashData.hash}&tab=${tab}`, "_self");
                }
                // operation has resolved
                tempHash = null;
            }).then(() => {
                dispatch(setSearchViewType(tab));
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
    const handleGoToAdvancedSearch = (buttonName, rankType) => {
        getSelectedTab(buttonName, rankType);
    };
    return (
        <section className="award-search__section">
            <div style={{ justifyContent: "center" }}>
                <FlexGridRow className="grid-content">
                    {isDesktopXL &&
            (<>
                <FlexGridCol desktop={6} tablet={12} mobile={12} className="award-search__col1">
                    <div className="award-search__overline-div">
                        <span
                            className="fa-layers fa-fw award-search__span"><FontAwesomeIcon icon="search" size="sm" style={{ height: '12px', width: '12px' }} />
                        </span>
                        <p className="award-search__overline">AWARD SEARCH</p>
                    </div>
                    <h2 className="award-search__header">Search data on federal award spending</h2>
                    <p className="award-search__subtext">Find information on awards such as contracts, loans, and grants based on location, industry, and more.</p>
                </FlexGridCol>
                <FlexGridCol desktop={6} tablet={12} mobile={12} className="award-search__col2">
                    <Swiper centeredSlides watchslidesvisibility="true" slidesPerView="auto" spaceBetween={0} navigation modules={[Navigation]} style={{ alignItems: "middle" }}>
                        <SwiperSlide className="award-search__slide" style={{ marginBottom: "20px" }}>
                            <FlexGridCol tabIndex="0" width={3} desktop={3}>
                                <CardContainer variant="elevated" size="lg">
                                    <CardBody
                                        headline="Federal Spending to Communities"
                                        text={placeOfPerformance} >
                                        <div className="award-search__image">
                                            <img src="img/homepage-award-search/award-search-communities-2x.svg" alt="" role="presentation" />
                                        </div>
                                        <CardButton onlyPerformAction text="View spending by state" variant="primary" action={() => { handleGoToAdvancedSearch("map"); }} />
                                    </CardBody>
                                </CardContainer>
                            </FlexGridCol>
                        </SwiperSlide>
                        <SwiperSlide className="award-search__slide" style={{ marginBottom: "20px" }}>
                            <FlexGridCol tabIndex="0" width={3} desktop={3}>
                                <CardContainer variant="elevated" size="lg">
                                    <CardBody
                                        headline="Federal Spending Over Time"
                                        text={fiscalYear}>
                                        <div className="award-search__image">
                                            <img src="img/homepage-award-search/award-search-over-time-2x.svg" alt="" role="presentation" />
                                        </div>
                                        <CardButton onlyPerformAction text="View spending by fiscal year" variant="primary" action={() => { handleGoToAdvancedSearch("time"); }} />
                                    </CardBody>
                                </CardContainer>
                            </FlexGridCol>
                        </SwiperSlide>
                        <SwiperSlide className="award-search__slide" style={{ marginBottom: "20px" }}>
                            <FlexGridCol tabIndex="0" width={3} desktop={3}>
                                <CardContainer variant="elevated" size="lg">
                                    <CardBody
                                        headline="Federal Spending by Industry"
                                        text={naics}>
                                        <div className="award-search__image">
                                            <img src="img/homepage-award-search/award-search-industry-2x.svg" alt="" role="presentation" />
                                        </div>
                                        <CardButton onlyPerformAction text="View spending by industry" variant="primary" action={() => { handleGoToAdvancedSearch("rank", "naics"); }} />
                                    </CardBody>
                                </CardContainer>
                            </FlexGridCol>
                        </SwiperSlide>
                        <SwiperSlide className="award-search__slide" style={{ marginBottom: "20px" }}>
                            <FlexGridCol tabIndex="0" width={3} desktop={3}>
                                <CardContainer variant="elevated" size="lg">
                                    <CardBody
                                        headline="Federal Spending by Product or Service"
                                        text={psc}>
                                        <div className="award-search__image">
                                            <img src="img/homepage-award-search/award-search-psc-2x.svg" alt="" role="presentation" />
                                        </div>
                                        <CardButton onlyPerformAction text="View spending by product or service" variant="primary" action={() => { handleGoToAdvancedSearch("rank", "psc"); }} />
                                    </CardBody>
                                </CardContainer>
                            </FlexGridCol>
                        </SwiperSlide>
                    </Swiper>
                </FlexGridCol>
            </>)}
                    {!isDesktopXL && (
                        <>
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
                            <FlexGridCol desktop={8} tablet={12} mobile={12} className="award-search__col2">
                                <Swiper centeredSlides pagination={isMobile} navigation={!isMobile} watchslidesvisibility="true" slidesPerView="auto" spaceBetween={0} modules={[Pagination, Navigation]} className="award-search__swiper">
                                    <SwiperSlide className="award-search__slide" style={{ marginBottom: "20px" }}>
                                        <FlexGridCol tabIndex="0" width={3} desktop={3}>
                                            <CardContainer variant="elevated" size="lg">
                                                <CardBody
                                                    headline="Federal Spending to Communities"
                                                    text={placeOfPerformance}>
                                                    <div className="award-search__image">
                                                        <img src="img/homepage-award-search/award-search-communities-2x.svg" alt="" role="presentation" />
                                                    </div>
                                                    <CardButton onlyPerformAction text="View spending by state" variant="primary" action={() => { handleGoToAdvancedSearch("map"); }} />
                                                </CardBody>
                                            </CardContainer>
                                        </FlexGridCol>
                                    </SwiperSlide>
                                    <SwiperSlide className="award-search__slide" style={{ marginBottom: "20px" }}>
                                        <FlexGridCol tabIndex="0" width={3} desktop={3}>
                                            <CardContainer variant="elevated" size="lg">
                                                <CardBody
                                                    headline="Federal Spending Over Time"
                                                    text={fiscalYear}>
                                                    <div className="award-search__image">
                                                        <img src="img/homepage-award-search/award-search-over-time-2x.svg" alt="" role="presentation" />
                                                    </div>
                                                    <CardButton onlyPerformAction text="View spending by fiscal year" variant="primary" action={() => { handleGoToAdvancedSearch("time"); }} />
                                                </CardBody>
                                            </CardContainer>
                                        </FlexGridCol>
                                    </SwiperSlide>
                                    <SwiperSlide className="award-search__slide" style={{ marginBottom: "20px" }}>
                                        <FlexGridCol tabIndex="0" width={3} desktop={3}>
                                            <CardContainer variant="elevated" size="lg">
                                                <CardBody
                                                    headline="Federal Spending by Industry"
                                                    text={naics}>
                                                    <div className="award-search__image">
                                                        <img src="img/homepage-award-search/award-search-industry-2x.svg" alt="" role="presentation" />
                                                    </div>
                                                    <CardButton onlyPerformAction text="View spending by industry" variant="primary" action={() => { handleGoToAdvancedSearch("rank", "naics"); }} />
                                                </CardBody>
                                            </CardContainer>
                                        </FlexGridCol>
                                    </SwiperSlide>
                                    <SwiperSlide className="award-search__slide" style={{ marginBottom: "20px" }}>
                                        <FlexGridCol tabIndex="0" width={3} desktop={3}>
                                            <CardContainer variant="elevated" size="lg">
                                                <CardBody
                                                    headline="Federal Spending by Product or Service"
                                                    text={psc}>
                                                    <div className="award-search__image">
                                                        <img src="img/homepage-award-search/award-search-psc-2x.svg" alt="" role="presentation" />
                                                    </div>
                                                    <CardButton onlyPerformAction text="View spending by product or service" variant="primary" action={() => { handleGoToAdvancedSearch("rank", "psc"); }} />
                                                </CardBody>
                                            </CardContainer>
                                        </FlexGridCol>
                                    </SwiperSlide>
                                </Swiper>
                            </FlexGridCol>
                        </>)}
                </FlexGridRow>
            </div>
        </section>);
};

export default AwardSearch;
