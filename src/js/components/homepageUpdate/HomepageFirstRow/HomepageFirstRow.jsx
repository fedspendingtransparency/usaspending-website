/**
 * HomepageFirstRow.jsx
 * Created by Brian Petway 08/22/22
 */

import React, { useEffect, useState } from 'react';
import { FlexGridCol } from 'data-transparency-ui';
import { throttle } from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import FeaturedContent from "../FeaturedContent/FeaturedContent";
import WordOfTheDay from "../WordOfTheDay/WordOfTheDay";
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import CardHero from "../../sharedComponents/commonCards/CardHero";
import CardBody from "../../sharedComponents/commonCards/CardBody";

const HomepageFirstRow = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    return (
        <div>
            <div style={{
                display: 'inline-flex', 'flex-wrap': 'wrap', width: '100%', gap: '35px'
            }}>
                <FlexGridCol width={8} mobile={12} tablet={12} desktop={8}>
                    <div style={{ display: 'inline-flex', width: '100%', gap: '24px' }}>
                        <FlexGridCol desktop={6} tablet={6} mobile={12}>
                            <CardContainer variant="outline" size="md">
                                <CardHero fill="#1a4480" img="img/homepage-featured-content/homepage-feature-covid-19.webp" />
                                <CardBody
                                    overline="COVID-19 Spending"
                                    headline="Track federal spending in response to the COVID-19 pandemic">
                                </CardBody>
                            </CardContainer>
                        </FlexGridCol>
                        <FlexGridCol desktop={6} tablet={6} mobile={12}>
                            <CardContainer variant="outline" size="md">
                                <CardHero fill="#009ec1" img="img/homepage-featured-content/homepage-featured-youtube.webp" />
                                <CardBody
                                    overline="Resources"
                                    headline={<div style={{ height: '90px' }}>Learn how to use USAspending with our tutorial videos <FontAwesomeIcon style={{ width: '20px' }} icon="external-link-alt" /></div>} >
                                </CardBody>
                            </CardContainer>
                        </FlexGridCol>
                    </div>
                </FlexGridCol>
                <FlexGridCol width={4} desktop={4} tablet={12} mobile={12}>
                    <WordOfTheDay />
                </FlexGridCol>
            </div>
        </div>
    );
};

export default HomepageFirstRow;
