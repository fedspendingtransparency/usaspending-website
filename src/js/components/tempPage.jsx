import React from 'react';
import PropTypes from "prop-types";
import CardContainer from "./sharedComponents/cards/CardContainer";
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';


const tempPage = () => {
    return(
        <FlexGridRow width={3} desktop={3} hasGutter gutterSize={32}>
            <FlexGridCol width={3} desktop={3}>
                <CardContainer variant={"outline"} size={'md'}>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                </CardContainer>
            </FlexGridCol>
            <FlexGridCol width={3} desktop={3}>
                <CardContainer variant={"elevated"} size={'md'}>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                </CardContainer>
            </FlexGridCol>
            <FlexGridCol width={3} desktop={3}>
                <CardContainer variant={"outline"}>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                </CardContainer>
            </FlexGridCol>
            <FlexGridCol width={3} desktop={3}>
                <CardContainer variant={"outline"} fill={"#1a4480"}>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                    <div>hello</div>
                </CardContainer>
            </FlexGridCol>
        </FlexGridRow>
    );
};


export default tempPage;