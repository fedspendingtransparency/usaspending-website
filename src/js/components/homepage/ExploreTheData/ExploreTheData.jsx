/**
 * ExploreTheData.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FlexGridRow, FlexGridCol, CardContainer, CardHero, CardBody, CardButton } from 'data-transparency-ui';

const propTypes = {
    title: PropTypes.string,
    cardObjects: PropTypes.array,
    access: PropTypes.bool
};

const ExploreTheData = (props) => (
    <section className={`explore-data__section ${props.access ? "access" : ""}`}>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <FlexGridRow className="grid-content">
                <FlexGridCol className="explore-data__title" width={12}>
                    {props.title}
                </FlexGridCol>
                <FlexGridRow className="explore-data__card-row" hasGutter gutterSize="lg">
                    {props.cardObjects.map((card, index) => (
                        <FlexGridCol
                            className="explore-data__card"
                            key={index}
                            mobile={12}
                            tablet={12}
                            desktop={4}>
                            <CardContainer variant="elevated" size="md">
                                <CardHero fill={card.fillColor} />
                                <CardBody
                                    headline={card.headline}
                                    text={card.text}>
                                    <CardButton
                                        variant="secondary"
                                        backgroundColor="light"
                                        buttonSize="sm"
                                        textAlignment="center"
                                        text={card.buttonText}
                                        link={card.buttonLink}
                                        govLink={card.govLink}
                                        action={card.action}>
                                    </CardButton>
                                </CardBody>
                            </CardContainer>
                        </FlexGridCol>
                    ))}
                </FlexGridRow>
            </FlexGridRow>
        </div>
    </section>
);

ExploreTheData.propTypes = propTypes;
export default ExploreTheData;
