/**
 * FeaturedContent.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridCol, CardContainer, CardHero, CardBody } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Analytics from 'helpers/analytics/Analytics';
import ExternalLink from "../../sharedComponents/ExternalLink";
import articles from "../../../../config/featuredContent/featuredContentMetadata";


const trackFeaturedSavingsBondLink = () => Analytics.event({
    event: 'homepage_featured_content_links',
    category: 'Homepage',
    action: 'Link',
    label: 'fiscal data interest expense feature content'
});

const date = new Date();

const articlesByFeatureDate = articles.sort(
    (a1, a2) => a1.feature_week - a2.feature_week
);
const marketingContent = articles.filter((article) => article.content_type === 'Marketing');

// sort articles by date, then filter by type, then get latest

const FeaturedContent = () => (
    <section className="featured-content__section">
        <div className="featured-content__heading">
            <div className="featured-content__heading--background">
                <FontAwesomeIcon className="featured-content__heading--icon" icon="bullhorn" />
            </div>
            <span>Featured Content</span>
        </div>
        <div className="featured-content__section--flex-row">
            <FlexGridCol width={12} desktop={6} tablet={6} mobile={12}>
                {console.log({ marketingContent, articlesByFeatureDate })}
                <ExternalLink isCard url="https://forms.office.com/Pages/ResponsePage.aspx?id=is1pDRKeIU2V8LRAbgZxCosrFrEyW1NFiLX9Wji-iCxUQ0FHNlZMRFdCVlcyQ0VKVFNGOVRDR0lJUi4u">
                    <CardContainer variant="outline" size="md">
                        <CardHero fill="#1b2b85" variant="expanded" img="img/homepage-featured-content/homepage-feature-API-Feedback-Survey@2x.webp" />
                        <CardBody
                            overline="YOUR FEEDBACK"
                            headline={
                                <div>
                                    We’re seeking your input on the USAspending API
                                </div>
                            }>
                        </CardBody>
                    </CardContainer>
                </ExternalLink>
            </FlexGridCol>
            <FlexGridCol width={12} desktop={6} tablet={6} mobile={12}>
                <a href="https://fiscaldata.treasury.gov/interest-expense-avg-interest-rates/" target="_blank" rel="noopener noreferrer" onClick={trackFeaturedSavingsBondLink} className="featured-content__section--link" >
                    <CardContainer variant="outline" size="md">
                        <CardHero fill="#2e8367" variant="expanded" img="img/homepage-featured-content/homepage-feature-interest-expense-2-x@2x.webp" />
                        <CardBody
                            overline="PARTNER SITES"
                            headline={
                                <div>
                                        Fiscal Data Explores Interest Expense on National Debt
                                </div>
                            }>
                        </CardBody>
                    </CardContainer>
                </a>
            </FlexGridCol>
        </div>
    </section>);
export default FeaturedContent;
