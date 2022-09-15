/**
 * WordOfTheDay.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import CardBody from "../../sharedComponents/commonCards/CardBody";
import ExternalLink from "../../sharedComponents/ExternalLink";

const WordOfTheDay = () => (
    <section className="word-of-the-day__section">
        <div className="word-of-the-day__heading">
            <div className="word-of-the-day__heading--background">
                <FontAwesomeIcon style={{ width: "8px", color: "#ff580a" }} icon="lightbulb" />
            </div>
            <span>Word of the Day</span>
        </div>
        <CardContainer variant="outline" fill="#1a4480">
            <CardBody>
                When awarding funding, the U.S. When awarding funding, the U.S.When awarding funding, the U.S.When awarding funding, the U.S.When awarding funding, the U.S.
            </CardBody>
        </CardContainer>
    </section>
);

export default WordOfTheDay;
