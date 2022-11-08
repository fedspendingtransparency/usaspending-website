/**
 * FeaturedContent.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridCol } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Analytics from 'helpers/analytics/Analytics';
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import CardHero from "../../sharedComponents/commonCards/CardHero";
import CardBody from "../../sharedComponents/commonCards/CardBody";
import ExternalLink from "../../sharedComponents/ExternalLink";


const FeaturedContent = () => {
    const trackFeaturedCovidLink = () => Analytics.event({
        category: 'Homepage',
        action: 'Link',
        label: 'covid-19 featured content'
    });
    const trackFeaturedResourcesLink = () => Analytics.event({
        category: 'Homepage',
        action: 'Link',
        label: 'resources featured content'
    });
    return (<>
        <section className="featured-content__section">
            <div className="featured-content__heading">
                <div className="featured-content__heading--background">
                    <FontAwesomeIcon className="featured-content__heading--icon" icon="bullhorn" />
                </div>
                <span>Featured Content</span>
            </div>
            <div className="featured-content__section--flex-row">
                <FlexGridCol width={12} desktop={6} tablet={6} mobile={12}>
                    <Link className="featured-content__section--link" to="disaster/covid-19" onClick={trackFeaturedCovidLink}>
                        <CardContainer variant="outline" size="md">
                            <CardHero fill="#3333a3" variant="expanded" img="img/homepage-featured-content/homepage-feature-covid-19.webp" />
                            <CardBody
                                overline="COVID-19 Spending"
                                headline={
                                    <div>
                                        Track federal spending in response to the COVID-19 pandemic
                                    </div>
                                }>
                            </CardBody>
                        </CardContainer>
                    </Link>
                </FlexGridCol>
                <FlexGridCol width={12} desktop={6} tablet={6} mobile={12}>
                    <ExternalLink url="https://www.youtube.com/channel/UCyDn83O-0XC98H3TCV-VCGQ" isCard onClick={trackFeaturedResourcesLink}>
                        <CardContainer variant="outline" size="md">
                            <CardHero fill="#009ec1" variant="expanded" img="img/homepage-featured-content/homepage-featured-youtube.webp" />
                            <CardBody
                                overline="Resources"
                                headline={
                                    <div>
                                        Learn how to use USAspending.gov with our tutorial&nbsp;
                                        <span style={{ whiteSpace: "nowrap" }}>videos&nbsp;
                                            <FontAwesomeIcon style={{ width: '20px' }} icon="external-link-alt" />
                                        </span>
                                    </div>
                                }>
                            </CardBody>
                        </CardContainer>
                    </ExternalLink>
                </FlexGridCol>
            </div>
        </section>
    </>
    );
};

export default FeaturedContent;
