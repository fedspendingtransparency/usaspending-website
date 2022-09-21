/**
 * ExploreTheData.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import CardHero from "../../sharedComponents/commonCards/CardHero";
import CardBody from "../../sharedComponents/commonCards/CardBody";
import CardButton from "../../sharedComponents/commonCards/CardButton";

const propTypes = {
    title: PropTypes.string,
    cardObjects: PropTypes.array
};

const ExploreTheData = (props) => (
    <section className="explore-data__section">
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
                                    variant="hero__button--action"
                                    text={card.buttonText}
                                    link={card.buttonLink}
                                    apiLink={card.apiLink}>
                                </CardButton>
                            </CardBody>
                        </CardContainer>
                    </FlexGridCol>
                ))}
            </FlexGridRow>
        </FlexGridRow>
    </section>
);

ExploreTheData.propTypes = propTypes;
export default ExploreTheData;
