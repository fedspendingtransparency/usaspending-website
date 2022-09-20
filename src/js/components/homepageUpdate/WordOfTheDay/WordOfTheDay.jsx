/**
 * WordOfTheDay.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexGridCol } from 'data-transparency-ui';
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import CardBody from "../../sharedComponents/commonCards/CardBody";
import CardButton from "../../sharedComponents/commonCards/CardButton";

const WordOfTheDay = () => (
    <section className="word-of-the-day__section">
        <div className="word-of-the-day__heading">
            <div className="word-of-the-day__heading--background">
                <FontAwesomeIcon className="word-of-the-day__heading--icon" icon="lightbulb" />
            </div>
            <span>Word of the Day</span>
        </div>
        <CardContainer variant="outline" fill="#1a4480">
            <FlexGridCol>
                <CardBody customClassName="word-of-the-day__body">
                    <div className="word-of-the-day__headline">Obligation</div>
                    <div className="word-of-the-day__divider" />
                    When awarding funding, the U.S. government enters a binding agreement called an obligation, which means that the federal government promises to spend the money.
                    <CardButton variant="secondary" customClassName="word-of-the-day__button" text="Read More" />
                </CardBody>
            </FlexGridCol>
        </CardContainer>
    </section>
);

export default WordOfTheDay;
