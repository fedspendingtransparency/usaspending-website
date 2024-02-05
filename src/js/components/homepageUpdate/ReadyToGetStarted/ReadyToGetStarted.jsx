/**
 * ReadyToGetStarted.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol, CardContainer, CardHero, CardBody, CardButton } from 'data-transparency-ui';
import Analytics from '../../../helpers/analytics/Analytics';

const cardObjects = [
    {
        fillColor: '#00bde3',
        image: 'img/homepage-ready-to-get-started/homepage-get-started-award-search.webp',
        imageHeight: '177px',
        overline: 'SEARCH AWARD DATA',
        headline: 'Find details on federal awards',
        buttonText: 'Go to Award Search',
        buttonLink: '/search',
        action: () => Analytics.event({
            event: 'homepage_ready-to-get-started',
            category: 'Homepage',
            action: 'Link',
            label: 'award search card'
        })
    },
    {
        fillColor: '#34a37e',
        image: 'img/homepage-ready-to-get-started/homepage-get-started-spending-explorer.webp',
        imageHeight: '177px',
        overline: 'EXPLORE THE DATA',
        headline: 'Break down the federal budget',
        buttonText: 'Dive into Spending Explorer',
        buttonLink: '/explorer',
        action: () => Analytics.event({
            event: 'homepage_ready-to-get-started',
            category: 'Homepage',
            action: 'Link',
            label: 'spending explorer card'
        })
    },
    {
        fillColor: '#fa9441',
        image: 'img/homepage-ready-to-get-started/homepage-get-started-recipient-profiles.webp',
        imageHeight: '177px',
        overline: 'EXPLORE THE DATA',
        headline: 'Find recipients of federal funds',
        buttonText: 'Browse Recipient Profiles',
        buttonLink: '/recipient',
        action: () => Analytics.event({
            event: 'homepage_ready-to-get-started',
            category: 'Homepage',
            action: 'Link',
            label: 'spending profiles card'
        })
    },
    {
        fillColor: '#9355dc',
        image: 'img/homepage-ready-to-get-started/homepage-get-started-learn-more.webp',
        imageHeight: '177px',
        overline: 'FIND RESOURCES',
        headline: 'Learn more about USAspending.gov',
        buttonText: 'Read about the Data Sources',
        buttonLink: '/data-sources',
        action: () => Analytics.event({
            event: 'homepage_ready-to-get-started',
            category: 'Homepage',
            action: 'Link',
            label: 'resources card'
        })
    }
];

const ReadyToGetStarted = () => (
    <section className="ready-to-get-started__section">
        <div style={{ display: "flex", justifyContent: "center" }}>
            <FlexGridRow className="grid-content">
                <FlexGridCol className="ready-to-get-started__title" width={12}>
                Ready to get started?
                </FlexGridCol>
                <FlexGridRow className="ready-to-get-started__card-row" hasGutter gutterSize="lg">
                    {cardObjects.map((card, index) => (
                        <FlexGridCol
                            className="ready-to-get-started__card"
                            key={index}
                            mobile={12}
                            tablet={6}
                            desktop={3}>
                            <CardContainer
                                variant="outline"
                                size="md">
                                <CardHero
                                    size="md"
                                    variant="inset"
                                    fill={card.fillColor}
                                    imageContainerHeight={card.imageHeight}
                                    img={card.image} />
                                <CardBody
                                    variant="inset"
                                    imageContainerHeight={card.imageHeight}
                                    overline={card.overline}
                                    headline={card.headline}>
                                    <CardButton
                                        text={card.buttonText}
                                        variant="text"
                                        buttonSize="sm"
                                        backgroundColor="light"
                                        textAlignment="left"
                                        link={card.buttonLink}
                                        action={card.action} />
                                </CardBody>
                            </CardContainer>
                        </FlexGridCol>
                    ))}
                </FlexGridRow>
            </FlexGridRow>
        </div>
    </section>
);

export default ReadyToGetStarted;
