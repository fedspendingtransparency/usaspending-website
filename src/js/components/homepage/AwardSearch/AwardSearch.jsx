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
                    <Swiper centeredSlides watchSlidesVisibility slidesPerView="auto" navigation modules={[Navigation]} className="award-search__swiper">
                        <SwiperSlide className="award_search__slide" style={{ textAlign: "center" }}>Slide 1</SwiperSlide>
                        <SwiperSlide className="award_search__slide" style={{ textAlign: "center" }}>Slide 2</SwiperSlide>
                        <SwiperSlide className="award_search__slide" style={{ textAlign: "center" }}>Slide 3</SwiperSlide>
                        <SwiperSlide className="award_search__slide" style={{ textAlign: "center" }}>Slide 4</SwiperSlide>
                        <SwiperSlide className="award_search__slide" style={{ textAlign: "center" }}>Slide 5</SwiperSlide>
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
                                <SwiperSlide className="award_search__slide" style={{ textAlign: "center", marginBottom: "20px" }}>Slide 1</SwiperSlide>
                                <SwiperSlide className="award_search__slide" style={{ textAlign: "center", marginBottom: "20px" }}>Slide 2</SwiperSlide>
                                <SwiperSlide className="award_search__slide" style={{ textAlign: "center", marginBottom: "20px" }}>Slide 3</SwiperSlide>
                                <SwiperSlide className="award_search__slide" style={{ textAlign: "center", marginBottom: "20px" }}>Slide 4</SwiperSlide>
                                <SwiperSlide className="award_search__slide" style={{ textAlign: "center", marginBottom: "20px" }}>Slide 5</SwiperSlide>
                            </Swiper>
                        </FlexGridCol>
                    </>)}
            </FlexGridRow>
        </section>);
};

export default AwardSearch;
