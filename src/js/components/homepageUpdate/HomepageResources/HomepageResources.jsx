/**
 * HomepageResources.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import * as slideoutActions from 'redux/actions/slideouts/slideoutActions';
import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import * as glossaryActions from 'redux/actions/glossary/glossaryActions';
import { FlexGridRow, FlexGridCol, CardContainer, CardBody, CardButton } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Analytics from '../../../helpers/analytics/Analytics';

const HomepageResources = () => {
    const dispatch = useDispatch();

    const cardObjects = [
        {
            icon: (
                <div className="homepage-resources__icon-container guide">
                    <FontAwesomeIcon icon="chart-bar" color="#112f4e" size="lg" />
                </div>
            ),
            headline: 'Federal Spending Guide',
            text: 'Learn how to use the data',
            buttonText: (
                <>
                    <div>View the guide&nbsp;&nbsp;</div>
                    <FontAwesomeIcon icon="arrow-right" />
                </>
            ),
            buttonLink: '/federal-spending-guide',
            action: () => Analytics.event({
                event: 'homepage_find-resources',
                category: 'Homepage',
                action: 'Link',
                label: 'learn how to use the data card'
            })
        },
        {
            icon: (
                <div className="homepage-resources__icon-container dictionary">
                    <FontAwesomeIcon icon="database" color="#34a37e" size="lg" />
                </div>
            ),
            headline: 'Data Dictionary',
            text: 'Learn about the data elements',
            buttonText: (
                <>
                    <div>View the dictionary&nbsp;&nbsp;</div>
                    <FontAwesomeIcon icon="arrow-right" />
                </>
            ),
            buttonLink: '/data-dictionary',
            action: () => Analytics.event({
                event: 'homepage_find-resources',
                category: 'Homepage',
                action: 'Link',
                label: 'data dictionary card'
            })
        },
        {
            icon: (
                <div className="homepage-resources__icon-container model">
                    <FontAwesomeIcon icon="sitemap" color="#0081a1" size="lg" />
                </div>
            ),
            headline: 'About the Data',
            text: 'Read important data disclosures',
            buttonText: (
                <div className="homepage-resources__link-container">
                    View the disclosures&nbsp;&nbsp;
                    <FontAwesomeIcon icon="arrow-right" />
                </div>
            ),
            action: () => {
                Analytics.event({
                    event: 'homepage_find-resources',
                    category: 'Homepage',
                    action: 'Link',
                    label: 'data model card'
                });
                dispatch(aboutTheDataActions.showAboutTheData());
                dispatch(slideoutActions.setLastOpenedSlideout('atd'));
            },
            govLink: false,
            onlyPerformAction: true
        },
        {
            icon: (
                <div className="homepage-resources__icon-container glossary">
                    <FontAwesomeIcon icon="book" color="#3333a3" size="lg" />
                </div>
            ),
            headline: 'Glossary',
            text: 'Learn about spending terms',
            buttonText: (
                <div className="homepage-resources__link-container">
                    <div>View the glossary&nbsp;&nbsp;
                        <FontAwesomeIcon icon="arrow-right" />
                    </div>
                </div>
            ),
            action: () => {
                Analytics.event({
                    event: 'homepage_find-resources',
                    category: 'Homepage',
                    action: 'Link',
                    label: 'glossary card'
                });
                dispatch(glossaryActions.clearGlossaryTerm());
                dispatch(glossaryActions.showGlossary());
                dispatch(slideoutActions.setLastOpenedSlideout('glossary'));
            },
            govLink: false,
            onlyPerformAction: true
        }
    ];

    return (
        <section className="homepage-resources__section">
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FlexGridRow className="grid-content">
                    <FlexGridCol width={12}>
                        <FlexGridRow className="homepage-resources__top-label-container">
                            <div className="homepage-resources__top-label-icon-container">
                                <FontAwesomeIcon
                                    className="homepage-resources__book-icon"
                                    icon="book-open"
                                    size="xs" />
                            </div>
                            <div className="homepage-resources__top-label-text">FIND RESOURCES</div>
                        </FlexGridRow>
                        <FlexGridRow className="homepage-resources__headline">Find answers to your data questions</FlexGridRow>
                    </FlexGridCol>
                    <FlexGridCol width={12}>
                        <FlexGridRow className="homepage-resources__card-row" hasGutter gutterSize="lg">
                            {cardObjects.map((card, index) => (
                                <FlexGridCol
                                    className="homepage-resources__card-col"
                                    key={index}
                                    mobile={12}
                                    tablet={6}
                                    desktop={3}>
                                    <CardContainer>
                                        {card.icon}
                                        <CardBody
                                            headline={card.headline}
                                            text={card.text}>
                                            <CardButton
                                                variant="text"
                                                backgroundColor="light"
                                                textAlignment="left"
                                                text={card.buttonText}
                                                link={card.buttonLink}
                                                govLink={card.govLink}
                                                onlyPerformAction={card.onlyPerformAction}
                                                action={card.action} />
                                        </CardBody>
                                    </CardContainer>
                                </FlexGridCol>
                            ))}
                        </FlexGridRow>
                    </FlexGridCol>
                </FlexGridRow>
            </div>
        </section>
    );
};

export default HomepageResources;
