import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FlexGridRow, FlexGridCol, CardContainer, CardHero, CardBody, CardButton, Button, Table } from "data-transparency-ui";
import PageWrapper from "./sharedComponents/PageWrapper";
import PageFeatureFlag from "./sharedComponents/PageFeatureFlag";

require("pages/search/searchPage.scss");

const tempPage = () => {
    const imageLink = "../../img/top-bowie-state-combined-image.svg";

    const columns =
        [
            {
                title: 'award',
                displayName: 'Prime Award ID',
                columnWidth: 200
            },
            {
                title: 'amount',
                displayName: 'Amount',
                columnWidth: 200
            },
            {
                title: 'percent',
                displayName: '% of Total Amount',
                right: true,
                columnWidth: 400
            },
            {
                title: 'test',
                displayName: 'test',
                columnWidth: 200
            },
            {
                title: 'mock1',
                displayName: 'Mock Data 1',
                columnWidth: 200
            },
            {
                title: 'mock2',
                displayName: 'Mock Data 2',
                columnWidth: 200
            },
            {
                title: 'mock2',
                displayName: 'Mock Data 2',
                columnWidth: 200
            },
            {
                title: 'mock2',
                displayName: 'Mock Data 2',
                columnWidth: 200
            },
            {
                title: 'mock2',
                displayName: 'Mock Data 2',
                columnWidth: 200
            },
            {
                title: 'mock2',
                displayName: 'Mock Data 2',
                columnWidth: 200
            },
            {
                title: 'mock2',
                displayName: 'Mock Data 2',
                columnWidth: 200
            }
        ];
    const rows = [
        [<a href="/">Link</a>, 'first row', '25%', <a href="/">LinkLongLongLongLongLong</a>, 'mock1', 'mock2', 'mock2', 'mock2', 'mock2', 'mock2', 'mock2LongerData'],
        [<React.Fragment><strong>jsx</strong> content</React.Fragment>, 'second row', 'mock data longlonglonglonglonglong longlonglonglonglonglong', 'test', 'mock1', 'mock2', 'mock2', 'mock2', 'mock2', 'mock2', 'mock2LongerData'],
        [<a href="/">Link</a>, 'third row', 'test', <a href="/">Link</a>, 'mock1', 'mock2', 'mock2', 'mock2', 'mock2', 'mock2', 'mock2LongerData'],
        [<a href="/">Link</a>, 'fourth row', 'test', <a href="/">Link</a>, 'mock1', 'mock2', 'mock2', 'mock2', 'mock2', 'mock2', 'mock2LongerData']
    ];

    return (
        <PageFeatureFlag>
            <PageWrapper
                pageName="Test Page"
                classNames="usa-da-search-page"
                title="Test Page">
                <main id="main-content" className="main-content">
                    <section style={{ margin: '80px', backgroundColor: 'white' }}>
                        <div style={{
                            width: '800px', overflowX: 'scroll', borderRadius: '8px', border: 'solid 1px #dfe1e2'
                        }}>
                            <Table columns={columns} rows={rows} classNames="search-results-dtui-table" stickyFirstColumn />
                        </div>
                    </section>
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
                    <h1>New Button Variants</h1>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="primary" backgroundColor="light" />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="primary" backgroundColor="light" />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="primary" backgroundColor="light" />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px" }}>
                        <Button copy="This is wrapping button text" buttonTitle="TEST" buttonSize="lg" buttonType="primary" backgroundColor="light" maxWidth="200px" textAlignment="center" />
                        <Button copy="This is wrapping button text" buttonTitle="TEST" buttonSize="lg" buttonType="primary" backgroundColor="light" maxWidth="200px" textAlignment="left" />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="primary" backgroundColor="light" disabled />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="primary" backgroundColor="light" disabled />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="primary" backgroundColor="light" disabled />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="primaryIcon" backgroundColor="light" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="primaryIcon" backgroundColor="light" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="primaryIcon" backgroundColor="light" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="secondary" backgroundColor="light" />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="secondary" backgroundColor="light" />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="secondary" backgroundColor="light" />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px", backgroundColor: "#323a44" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="secondary" backgroundColor="dark" />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="secondary" backgroundColor="dark" />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="secondary" backgroundColor="dark" />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px", backgroundColor: "#323a44" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="secondaryIcon" backgroundColor="dark" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="secondaryIcon" backgroundColor="dark" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="secondaryIcon" backgroundColor="dark" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="tertiary" backgroundColor="light" />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="tertiary" backgroundColor="light" />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="tertiary" backgroundColor="light" />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="tertiaryIcon" backgroundColor="light" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="tertiaryIcon" backgroundColor="light" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="tertiaryIcon" backgroundColor="light" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="text" backgroundColor="light" />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="text" backgroundColor="light" />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="text" backgroundColor="light" />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="text" backgroundColor="light" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="text" backgroundColor="light" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="text" backgroundColor="light" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="text" backgroundColor="light" imageAlignment="right" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="text" backgroundColor="light" imageAlignment="right" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="text" backgroundColor="light" imageAlignment="right" image={<FontAwesomeIcon icon="share-alt" />} />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px", backgroundColor: "#323a44" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="text" backgroundColor="dark" />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="text" backgroundColor="dark" />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="text" backgroundColor="dark" />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px", backgroundColor: "#323a44" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="text" backgroundColor="dark" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="text" backgroundColor="dark" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="text" backgroundColor="dark" imageAlignment="left" image={<FontAwesomeIcon icon="share-alt" />} />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px", backgroundColor: "#323a44" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="text" backgroundColor="dark" imageAlignment="right" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="text" backgroundColor="dark" imageAlignment="right" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="text" backgroundColor="dark" imageAlignment="right" image={<FontAwesomeIcon icon="share-alt" />} />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="stacked" backgroundColor="light" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="stacked" backgroundColor="light" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="stacked" backgroundColor="light" image={<FontAwesomeIcon icon="share-alt" />} />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px", backgroundColor: "#323a44" }}>
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="sm" buttonType="stacked" backgroundColor="dark" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="md" buttonType="stacked" backgroundColor="dark" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="TEST" buttonTitle="TEST" buttonSize="lg" buttonType="stacked" backgroundColor="dark" image={<FontAwesomeIcon icon="share-alt" />} />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px" }}>
                        <Button buttonTitle="TEST" buttonSize="sm" buttonType="icon" backgroundColor="light" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button buttonTitle="TEST" buttonSize="md" buttonType="icon" backgroundColor="light" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button buttonTitle="TEST" buttonSize="lg" buttonType="icon" backgroundColor="light" image={<FontAwesomeIcon icon="share-alt" />} />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px", backgroundColor: "#323a44" }}>
                        <Button buttonTitle="TEST" buttonSize="sm" buttonType="icon" backgroundColor="dark" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button buttonTitle="TEST" buttonSize="md" buttonType="icon" backgroundColor="dark" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button buttonTitle="TEST" buttonSize="lg" buttonType="icon" backgroundColor="dark" image={<FontAwesomeIcon icon="share-alt" />} />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px" }}>
                        <Button copy="what" buttonTitle="TEST" buttonSize="sm" buttonType="inline" backgroundColor="light" imageAlignment="right" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="what" buttonTitle="TEST" buttonSize="md" buttonType="inline" backgroundColor="light" imageAlignment="right" image={<FontAwesomeIcon icon="share-alt" />} />
                        <Button copy="what" buttonTitle="TEST" buttonSize="lg" buttonType="inline" backgroundColor="light" imageAlignment="right" image={<FontAwesomeIcon icon="share-alt" />} />
                    </FlexGridRow>
                    <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32} style={{ marginLeft: "16px" }}>
                        <Button copy="hello" buttonTitle="TEST" buttonSize="sm" buttonType="intext" backgroundColor="light" to="https://usaspending.gov" />
                        <Button copy="hello" buttonTitle="TEST" buttonSize="md" buttonType="intext" backgroundColor="light" to="https://usaspending.gov" />
                        <Button copy="hello" buttonTitle="TEST" buttonSize="lg" buttonType="intext" backgroundColor="light" to="https://usaspending.gov" />
                    </FlexGridRow>
                </main>
            </PageWrapper>
        </PageFeatureFlag>
    );
};


export default tempPage;
