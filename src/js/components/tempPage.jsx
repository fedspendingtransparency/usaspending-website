import React from "react";
import { FlexGridRow, FlexGridCol } from "data-transparency-ui";
import CardContainer from "./sharedComponents/commonCards/CardContainer";
import CardHero from "./sharedComponents/commonCards/CardHero";
import CardBody from "./sharedComponents/commonCards/CardBody";
import CardButton from "./sharedComponents/commonCards/CardButton";
import PageWrapper from "./sharedComponents/PageWrapper";
import FeatureFlag from "./sharedComponents/FeatureFlag";

require("pages/homepageUpdate/homepageUpdate.scss");

const tempPage = () => {
    const imageLink = "../../img/top-bowie-state-combined-image.svg";

    return (
        <FeatureFlag>
            <PageWrapper
                pageName="Test Page"
                classNames="usa-da-about-page"
                title="Test Page">
                <main id="main-content" className="main-content">
                    <div className="flex-gap" style={{ display: 'inline-flex', 'flex-wrap': 'wrap', gap: '12px' }}>
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div>
                    </div>
                    <h1>Container Variants</h1>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32}>
                        <FlexGridCol width={3} desktop={3}>
                            <CardContainer variant="outline" size="sm" height="200px">
                                <CardBody>
                                    <div>When awarding funding, the U.S. government enters a binding agreement called an obligation, which meand that the federal government promises to spend the money.</div>
                                </CardBody>
                            </CardContainer>
                        </FlexGridCol>
                        <FlexGridCol width={3} desktop={3}>
                            <CardContainer variant="outline" size="md">
                                <CardBody>
                                    <div>When awarding funding, the U.S. government enters a binding agreement called an obligation, which meand that the federal government promises to spend the money.</div>
                                </CardBody>
                            </CardContainer>
                        </FlexGridCol>
                        <FlexGridCol width={3} desktop={3}>
                            <CardContainer variant="elevated" size="md">
                                <CardBody>
                                    <div>When awarding funding, the U.S. government enters a binding agreement called an obligation, which meand that the federal government promises to spend the money.</div>
                                </CardBody>
                            </CardContainer>
                        </FlexGridCol>
                        <FlexGridCol width={3} desktop={3}>
                            <CardContainer variant="outline" fill="#1a4480">
                                <CardBody>
                                    <div>When awarding funding, the U.S. government enters a binding agreement called an obligation, which meand that the federal government promises to spend the money.</div>
                                </CardBody>
                            </CardContainer>
                        </FlexGridCol>
                        <FlexGridCol width={3} desktop={3}>
                            <CardContainer>
                                <CardBody
                                    overline="Award Search"
                                    headline="Find details on federal awards"
                                    text="Search spending to your community using Location filters like Place of Performance" >
                                    <CardButton text="Search" variant="primary" link="/search" />
                                </CardBody>
                            </CardContainer>
                        </FlexGridCol>
                    </FlexGridRow>
                    <h1>Hero Variants</h1>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32}>
                        <FlexGridCol width={3} desktop={3}>
                            <CardContainer variant="elevated" size="sm">
                                <CardHero variant="inset" fill="#1a4480" img={imageLink} />
                                <CardBody variant="inset" overline="blah lbahl bhal" headline="more more more">
                                    <p>hello</p>
                                    <p>hello</p>
                                </CardBody>
                            </CardContainer>
                        </FlexGridCol>
                        <FlexGridCol width={3} desktop={3}>
                            <CardContainer variant="elevated" size="md">
                                <CardHero fill="#1a4480" img={imageLink} />
                                <p>hello</p>
                                <p>hello</p>
                            </CardContainer>
                        </FlexGridCol>
                        <FlexGridCol width={3} desktop={3}>
                            <CardContainer variant="elevated" size="md">
                                <CardHero fill="#1a4480" />
                                <CardBody
                                    overline="Award Search"
                                    headline="Find details on federal awards"
                                    text="Search spending to your community using Location filters like Place of Performance" >
                                    <CardButton text="Return Home" variant="primary" link="/" />
                                </CardBody>
                            </CardContainer>
                        </FlexGridCol>
                    </FlexGridRow>
                    <h1>Button Variants</h1>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32}>
                        <FlexGridCol width={4} desktop={4}>
                            <CardContainer variant="elevated" size="md">
                                <CardHero fill="#1a4480" />
                                <CardBody
                                    overline="Resources"
                                    headline="Learn how to use USAspending with our tutorial videos" >
                                    <CardButton text="Search" variant="hero__button--action" link="/search" />
                                </CardBody>
                            </CardContainer>
                        </FlexGridCol>
                        <FlexGridCol width={4} desktop={4}>
                            <CardContainer variant="elevated" size="md">
                                <CardHero variant="expanded" img={imageLink} />
                                <CardBody
                                    overline="Resources"
                                    headline="Learn how to use USAspending with our tutorial videos" >
                                    <CardButton text="Search" link="/search" />
                                </CardBody>
                            </CardContainer>
                        </FlexGridCol>
                        <FlexGridCol width={4} desktop={4}>
                            <CardContainer variant="elevated" size="md">
                                <CardHero variant="expanded" fill="#1a4480" img={imageLink} />
                                <CardBody
                                    overline="Resources"
                                    headline="Learn how to use USAspending with our tutorial videos" >
                                    <CardButton text="Search" variant="text" link="/search" />
                                </CardBody>
                            </CardContainer>
                        </FlexGridCol>
                    </FlexGridRow>
                </main>
            </PageWrapper>
        </FeatureFlag>
    );
};


export default tempPage;
