/**
 * HomepageResources.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import CardHero from "../../sharedComponents/commonCards/CardHero";
import CardBody from "../../sharedComponents/commonCards/CardBody";
import CardButton from "../../sharedComponents/commonCards/CardButton";

const cardObjects = [
    {
        icon: (<FontAwesomeIcon icon="chart-bar" />),
        headline: 'Analyst Guide',
        text: 'Learn how to use our data',
        buttonText: 'View the guide',
        buttonIcon: (<FontAwesomeIcon icon="arrow-right" />),
        buttonLink: ''
    },
    {
        icon: (<FontAwesomeIcon icon="database" />),
        headline: 'Data Dictionary',
        text: 'Learn about our data elements',
        buttonText: 'View the dictionary',
        buttonIcon: (<FontAwesomeIcon icon="arrow-right" />),
        buttonLink: ''
    },
    {
        icon: (<FontAwesomeIcon icon="sitemap" />),
        headline: 'Data Model',
        text: 'Learn how our data is organized',
        buttonText: 'View the model',
        buttonIcon: (<FontAwesomeIcon icon="arrow-right" />),
        buttonLink: ''
    },
    {
        icon: (<FontAwesomeIcon icon="book" />),
        headline: 'Glossary',
        text: 'Learn about spending terms',
        buttonText: 'View the glossary',
        buttonIcon: (<FontAwesomeIcon icon="arrow-right" />),
        buttonLink: ''
    }
];

const HomepageResources = () => (
    <section className="homepage-resources__section">
        <FlexGridRow className="grid-content">
            <FlexGridCol width={12}>
                <FlexGridRow className="homepage-resources__top-label-container">
                    <div className="homepage-resources__top-label-icon-container">
                        <FontAwesomeIcon
                            className="homepage-resources__book-icon"
                            icon="book-open"
                            size="xs" />
                    </div>
                    <div className="homepage-resources__top-label-text">RESOURCES</div>
                </FlexGridRow>
                <FlexGridRow className="homepage-resources__headline">Find answers to your data questions</FlexGridRow>
            </FlexGridCol>
            <FlexGridRow hasGutter gutterSize="lg">
                {cardObjects.map((card) => (
                    <FlexGridCol
                        mobile={12}
                        tablet={6}
                        desktop={3}>
                        <CardContainer>
                            {card.icon}
                            <CardBody
                                headline={card.headline}
                                text={card.text}>
                                <CardButton
                                    variant="primary"
                                    text={card.buttonText}
                                    link={card.buttonLink} />
                            </CardBody>
                        </CardContainer>
                    </FlexGridCol>
                ))}
            </FlexGridRow>
        </FlexGridRow>
    </section>
);

export default HomepageResources;
