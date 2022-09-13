/**
 * ReadyToGetStarted.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import CardHero from "../../sharedComponents/commonCards/CardHero";
import CardBody from "../../sharedComponents/commonCards/CardBody";
import CardButton from "../../sharedComponents/commonCards/CardButton";

const cardObjects = [
    {
        fillColor: '#00bde3',
        image: 'img/homepage-ready-to-get-started/homepage-get-started-award-search.webp',
        overline: 'AWARD SEARCH',
        headline: 'Find details on federal awards',
        buttonText: 'Go to Award Search',
        buttonLink: ''
    },
    {
        fillColor: '#34a37e',
        image: 'img/homepage-ready-to-get-started/homepage-get-started-spending-explorer.webp',
        overline: 'SPENDING EXPLORER',
        headline: 'Break down the federal budget',
        buttonText: 'Dive into Spending Explorer',
        buttonLink: ''
    },
    {
        fillColor: '#fa9441',
        image: 'img/homepage-ready-to-get-started/homepage-get-started-recipient-profiles.webp',
        overline: 'SPENDING PROFILES',
        headline: 'Find recipients of federal funds',
        buttonText: 'Browse Recipient Profiles',
        buttonLink: ''
    },
    {
        fillColor: '#9355dc',
        image: 'img/homepage-ready-to-get-started/homepage-get-started-learn-more.webp',
        overline: 'RESOURCES',
        headline: 'Learn more about USAspending.gov',
        buttonText: 'Find out what we do',
        buttonLink: ''
    }
];

const ReadyToGetStarted = () => (
    <section className="ready-to-get-started__section">
        <FlexGridRow className="grid-content">
            <FlexGridCol className="ready-to-get-started__title" width={12}>
                Ready to get started?
            </FlexGridCol>
            <FlexGridRow hasGutter gutterSize="lg">
                {cardObjects.map((card) => (
                    <FlexGridCol
                        className="ready-to-get-started__card"
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
                                img={card.image} />
                            <CardBody
                                overline={card.overline}
                                headline={card.headline}>
                                <CardButton
                                    text={card.buttonText}
                                    variant="text"
                                    link={card.buttonLink} />
                            </CardBody>
                        </CardContainer>
                    </FlexGridCol>
                ))}
            </FlexGridRow>
        </FlexGridRow>
    </section>
);

export default ReadyToGetStarted;
