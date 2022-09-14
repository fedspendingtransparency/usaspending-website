/**
 * WordOfTheDay.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import CardBody from "../../sharedComponents/commonCards/CardBody";

const WordOfTheDay = () => (
    <section className="word-of-the-day__section">
        <CardContainer variant="outline" fill="#1a4480">
            <CardBody>
                <div>When awarding funding, the U.S. government enters a binding agreement called an obligation, which meand that the federal government promises to spend the money.</div>
            </CardBody>
        </CardContainer>
    </section>
);

export default WordOfTheDay;
