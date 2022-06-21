/**
 * EquitySpotlightCards.jsx
 * Created by Brian Petway 06/21/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import Card from "../../sharedComponents/Card";

const EquitySpotlightCards = () => (
    <section>
        <FlexGridRow className="grid-content">
            <FlexGridCol
                width={6}
                className="equity-spotlight__column-one">
                <Card
                    icon={}
                    heading={}
                    content={}
                    link={} />
            </FlexGridCol>
            <FlexGridCol
                width={6}
                className="equity-spotlight__column-two">
                <Card
                    icon={}
                    heading={}
                    content={}
                    link={} />
            </FlexGridCol>
        </FlexGridRow>
    </section>
)

export default EquitySpotlightCards;
