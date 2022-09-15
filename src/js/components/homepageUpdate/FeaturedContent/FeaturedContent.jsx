/**
 * FeaturedContent.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridCol } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import CardHero from "../../sharedComponents/commonCards/CardHero";
import CardBody from "../../sharedComponents/commonCards/CardBody";


const FeaturedContent = () => (
    <>
        <section className="featured-content__section">
            <div className="featured-content__heading">
                <div className="featured-content__heading--background">
                    <FontAwesomeIcon style={{ width: "12px", color: "#005ea2" }} icon="bullhorn" />
                </div>
                <span>Featured Content</span>
            </div>
            <div className="featured-content__section--flex-row">
                <FlexGridCol width={12} desktop={6} tablet={6} mobile={12}>
                    <Link to="disaster/covid-19">
                        <CardContainer variant="outline" size="md">
                            <CardHero fill="#1a4480" img="img/homepage-featured-content/homepage-feature-covid-19.webp" />
                            <CardBody
                                overline="COVID-19 Spending"
                                headline={
                                    <div style={{ height: '90px' }}>
                                        Track federal spending in response to the COVID-19 pandemic
                                    </div>
                                }>
                            </CardBody>
                        </CardContainer>
                    </Link>
                </FlexGridCol>
                <FlexGridCol width={12} desktop={6} tablet={6} mobile={12}>
                    <CardContainer variant="outline" size="md">
                        <CardHero fill="#009ec1" img="img/homepage-featured-content/homepage-featured-youtube.webp" />
                        <CardBody
                            overline="Resources"
                            headline={
                                <div style={{ height: '90px' }}>
                                    Learn how to use USAspending with our tutorial videos&nbsp;
                                    <FontAwesomeIcon style={{ width: '20px' }} icon="external-link-alt" />
                                </div>
                            }>
                        </CardBody>
                    </CardContainer>
                </FlexGridCol>
            </div>
        </section>
    </>
);

export default FeaturedContent;
