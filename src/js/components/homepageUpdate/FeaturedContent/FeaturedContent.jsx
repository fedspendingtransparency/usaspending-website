/**
 * FeaturedContent.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import CardHero from "../../sharedComponents/commonCards/CardHero";
import CardBody from "../../sharedComponents/commonCards/CardBody";
import CardButton from "../../sharedComponents/commonCards/CardButton";

const FeaturedContent = () => (
        <div style={{ display: 'inline-flex', 'flex-wrap': 'wrap', gap: '12px'}}>
                <CardContainer variant="outline" size="md" style={{ width: '33.33%' }}>
                    <CardHero fill="#1a4480" />
                    <CardBody
                        overline="Award Search"
                        headline="Find details on federal awards"
                        text="Search spending to your community using Location filters like Place of Performance" >
                        <CardButton text="Return Home" variant="primary" link="/" />
                    </CardBody>
                </CardContainer>
                <CardContainer variant="outline" size="md" style={{ width: '33.33%' }}>
                    <CardHero fill="#1a4480" />
                    <CardBody
                        overline="Award Search"
                        headline="Find details on federal awards"
                        text="Search spending to your community using Location filters like Place of Performance" >
                        <CardButton text="Return Home" variant="primary" link="/" />
                    </CardBody>
                </CardContainer>
        </div>
);

export default FeaturedContent;
