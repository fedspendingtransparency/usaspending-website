import React from "react";
import CardContainer from "../../sharedComponents/commonCards/CardContainer";
import CardHero from "../../sharedComponents/commonCards/CardHero";
import CardBody from "../../sharedComponents/commonCards/CardBody";

const Video = () => {
    <CardContainer variant="outline" size="md">
        <CardHero fill="#3333a3" variant="expanded" img="img/homepage-featured-content/homepage-feature-covid-19.webp" />
        <CardBody
            overline="COVID-19 Spending"
            headline={
                <div>
                    Track federal spending in response to the COVID-19 pandemic
                </div>
            }>
        </CardBody>
    </CardContainer>
}


export default Video;