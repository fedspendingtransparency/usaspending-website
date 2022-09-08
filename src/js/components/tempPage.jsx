import React from 'react';
import CardContainer from "./sharedComponents/cards/CardContainer";
import CardHero from "./sharedComponents/cards/CardHero";
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import CardBody from "./sharedComponents/cards/CardBody";
import CardButton from "./sharedComponents/cards/CardButton";
import PageWrapper from "./sharedComponents/PageWrapper";

const tempPage = () => {
    return(
        <PageWrapper
            pageName="Test Page"
            classNames="usa-da-about-page"
            title="Test Page">
            <main id="main-content" className="main-content">
                <h1>Container Variants</h1>
                <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32}>
                    <FlexGridCol width={3} desktop={3}>
                        <CardContainer variant={"outline"} size={'sm'} height={'200px'}>
                            <CardBody>
                                <div>When awarding funding, the U.S. government enters a binding agreement called an obligation, which meand that the federal government promises to spend the money.</div>
                            </CardBody>
                        </CardContainer>
                    </FlexGridCol>
                    <FlexGridCol width={3} desktop={3}>
                        <CardContainer variant={"outline"} size={'md'}>
                            <CardBody>
                                <div>When awarding funding, the U.S. government enters a binding agreement called an obligation, which meand that the federal government promises to spend the money.</div>
                            </CardBody>
                        </CardContainer>
                    </FlexGridCol>
                    <FlexGridCol width={3} desktop={3}>
                        <CardContainer variant={"elevated"} size={'md'}>
                            <CardBody>
                                <div>When awarding funding, the U.S. government enters a binding agreement called an obligation, which meand that the federal government promises to spend the money.</div>
                            </CardBody>
                        </CardContainer>
                    </FlexGridCol>
                    <FlexGridCol width={3} desktop={3}>
                        <CardContainer variant={"outline"} fill={"#1a4480"}>
                            <CardBody>
                                <div>When awarding funding, the U.S. government enters a binding agreement called an obligation, which meand that the federal government promises to spend the money.</div>
                            </CardBody>
                        </CardContainer>
                    </FlexGridCol>
                </FlexGridRow>
                <h1>Hero Variants</h1>
                <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32}>
                    <FlexGridCol width={3} desktop={3}>
                        <CardContainer variant={"elevated"} size={'sm'}>
                            <CardHero variant={"inset"} fill={"#1a4480"} />
                            <CardBody variant={'inset'}>
                                <p>hello</p>
                                <p>hello</p>
                            </CardBody>
                        </CardContainer>
                    </FlexGridCol>
                    <FlexGridCol width={3} desktop={3}>
                        <CardContainer variant={"elevated"} size={'md'}>
                            <CardHero fill={"#1a4480"} />
                            <p>hello</p>
                            <p>hello</p>
                        </CardContainer>
                    </FlexGridCol>
                    <FlexGridCol width={3} desktop={3}>
                        <CardContainer variant={"elevated"} size={'md'}>
                            <CardHero fill={"#1a4480"} img='' />
                            <CardBody
                                overline={"Award Search"}
                                headline={"Find details on federal awards"}
                                text={"Search spending to your community using Location filters like Place of Performance"} >
                                <CardButton text="Search" variant="primary" />
                            </CardBody>
                        </CardContainer>
                    </FlexGridCol>
                </FlexGridRow>
                <h1>Button Variants</h1>
                <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32}>
                    <FlexGridCol width={4} desktop={4}>
                        <CardContainer variant={"elevated"} size={'md'}>
                            <CardHero fill={"#1a4480"} img='' />
                            <CardBody
                                overline={"Resources"}
                                headline={"Learn how to use USAspending with our tutorial videos"} >
                                    <CardButton text="Search" variant="hero__button--action" />
                            </CardBody>
                        </CardContainer>
                    </FlexGridCol>
                    <FlexGridCol width={4} desktop={4}>
                        <CardContainer variant={"elevated"} size={'md'}>
                            <CardHero variant={"expanded"} fill={"#1a4480"} />
                            <CardBody
                                overline={"Resources"}
                                headline={"Learn how to use USAspending with our tutorial videos"} >
                                <CardButton text="Search" />
                            </CardBody>
                        </CardContainer>
                    </FlexGridCol>
                    <FlexGridCol width={4} desktop={4}>
                        <CardContainer variant={"elevated"} size={'md'}>
                            <CardHero variant={"expanded"} fill={"#1a4480"} />
                            <CardBody
                                overline={"Resources"}
                                headline={"Learn how to use USAspending with our tutorial videos"} >
                                <CardButton text="Search" variant={"text"} />
                            </CardBody>
                        </CardContainer>
                    </FlexGridCol>
                </FlexGridRow>
            </main>
        </PageWrapper>
    );
};


export default tempPage;