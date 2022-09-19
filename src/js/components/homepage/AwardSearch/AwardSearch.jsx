/**
 * AwardSearch.jsx
 * Created by Brian Petway 08/22/22
 */

import React, { useState, useEffect } from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { throttle } from 'lodash';
import CardButton from "../../sharedComponents/commonCards/CardButton";
import CardBody from "../../sharedComponents/commonCards/CardBody";
import CardContainer from "../../sharedComponents/commonCards/CardContainer";

/* eslint-disable */
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
/* eslint-enable */

const AwardSearch = () => {
    const [isDesktopXL, setDesktopXL] = useState(false);
    const [isMobile, setMobile] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
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

    return (
        <section className="award-search__section">
            <FlexGridRow className="grid-content" >
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
                    <Swiper centeredSlides watchSlidesVisibility slidesPerView="auto" navigation modules={[Navigation]} style={{ height: "100px", alignItems: "middle" }}>
                        <SwiperSlide className="award_search__slide" style={{ marginBottom: "20px" }}>
                            <FlexGridCol width={3} desktop={3}>
                                <CardContainer variant="elevated" size="lg">
                                    <CardBody
                                        headline="Federal Spending to Communities"
                                        text="Search spending to your community using Location filters like Place of Performance">
                                        <div>
                                            <img src="img/homepage-award-search/award-search-placeholder-communities.svg" alt="" />
                                        </div>
                                        <CardButton text="View spending by state" variant="primary" link="/search" />
                                    </CardBody>
                                </CardContainer>
                            </FlexGridCol>
                        </SwiperSlide>
                        <SwiperSlide className="award_search__slide" style={{ marginBottom: "20px" }}>
                            <FlexGridCol width={3} desktop={3}>
                                <CardContainer variant="elevated" size="lg">
                                    <CardBody
                                        headline="Federal Spending Over Time"
                                        text="See spending data over time using our Time Period filters, like Fiscal Year">
                                        <div>
                                            <img src="img/homepage-award-search/award-search-placeholder-time.svg" alt="" />
                                        </div>
                                        <CardButton text="View spending by fiscal year" variant="primary" link="/search" />
                                    </CardBody>
                                </CardContainer>
                            </FlexGridCol>
                        </SwiperSlide>
                        <SwiperSlide className="award_search__slide" style={{ marginBottom: "20px" }}>
                            <FlexGridCol width={3} desktop={3}>
                                <CardContainer variant="elevated" size="lg">
                                    <CardBody
                                        headline="Federal Spending by Industry"
                                        text="Use the North American Industry Classification System (NAICS) filter to find spending by industry">
                                        <div>
                                            <img src="img/homepage-award-search/award-search-placeholder-industry.svg" alt="" />
                                        </div>
                                        <CardButton text="View spending by industry" variant="primary" link="/search" />
                                    </CardBody>
                                </CardContainer>
                            </FlexGridCol>
                        </SwiperSlide>
                        <SwiperSlide className="award_search__slide" style={{ marginBottom: "20px" }}>
                            <FlexGridCol width={3} desktop={3}>
                                <CardContainer variant="elevated" size="lg">
                                    <CardBody
                                        headline="Federal Spending by Product or Service"
                                        text="From medical supplies to aircraft equipment, use Product or Service Codes (PSCs) to see what’s being purchased">
                                        <div>
                                            <img src="img/homepage-award-search/award-search-placeholder-product.svg" alt="" />
                                        </div>
                                        <CardButton text="View spending by product or service" variant="primary" link="/search" />
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
                            <Swiper pagination={isMobile} navigation={!isMobile} modules={[Pagination, Navigation]} className="award-search__swiper">
                                <SwiperSlide className="award_search__slide" style={{ marginBottom: "20px" }}>
                                    <FlexGridCol width={3} desktop={3}>
                                        <CardContainer variant="elevated" size="lg">
                                            <CardBody
                                                headline="Federal Spending to Communities"
                                                text="Search spending to your community using Location filters like Place of Performance">
                                                <div>
                                                    <img src="img/homepage-award-search/award-search-placeholder-communities.svg" alt="" />
                                                </div>
                                                <CardButton text="View spending by state" variant="primary" link="/search" />
                                            </CardBody>
                                        </CardContainer>
                                    </FlexGridCol>
                                </SwiperSlide>
                                <SwiperSlide className="award_search__slide" style={{ marginBottom: "20px" }}>
                                    <FlexGridCol width={3} desktop={3}>
                                        <CardContainer variant="elevated" size="lg">
                                            <CardBody
                                                headline="Federal Spending Over Time"
                                                text="See spending data over time using our Time Period filters, like Fiscal Year">
                                                <div>
                                                    <img src="img/homepage-award-search/award-search-placeholder-time.svg" alt="" />
                                                </div>
                                                <CardButton text="View spending by fiscal year" variant="primary" link="/search" />
                                            </CardBody>
                                        </CardContainer>
                                    </FlexGridCol>
                                </SwiperSlide>
                                <SwiperSlide className="award_search__slide" style={{ marginBottom: "20px" }}>
                                    <FlexGridCol width={3} desktop={3}>
                                        <CardContainer variant="elevated" size="lg">
                                            <CardBody
                                                headline="Federal Spending by Industry"
                                                text="Use the North American Industry Classification System (NAICS) filter to find spending by industry">
                                                <div>
                                                    <img src="img/homepage-award-search/award-search-placeholder-industry.svg" alt="" />
                                                </div>
                                                <CardButton text="View spending by industry" variant="primary" link="/search" />
                                            </CardBody>
                                        </CardContainer>
                                    </FlexGridCol>
                                </SwiperSlide>
                                <SwiperSlide className="award_search__slide" style={{ marginBottom: "20px" }}>
                                    <FlexGridCol width={3} desktop={3}>
                                        <CardContainer variant="elevated" size="lg">
                                            <CardBody
                                                headline="Federal Spending by Product or Service"
                                                text="From medical supplies to aircraft equipment, use Product or Service Codes (PSCs) to see what’s being purchased">
                                                <div>
                                                    <img src="img/homepage-award-search/award-search-placeholder-product.svg" alt="" />
                                                </div>
                                                <CardButton text="View spending by product or service" variant="primary" link="/search" />
                                            </CardBody>
                                        </CardContainer>
                                    </FlexGridCol>
                                </SwiperSlide>
                            </Swiper>
                        </FlexGridCol>
                    </>)}
            </FlexGridRow>
        </section>);
};

export default AwardSearch;
