/**
 * NLSearchGovSpending.jsx/
 * Created by Trey Morgan 8/12/2026
 */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexGridRow, FlexGridCol, CardContainer, CardBody, Button } from 'data-transparency-ui';
import NLSearchSuggestionsIcon from "./NLSearchSuggestionsIcon";

const NLSearchGovSpending = () => {

    return (
        <section className="search-gov-spending__section">
            <FlexGridRow className="search-gov-spending__row">
                <div className="search-gov-spending__title">
                    <NLSearchSuggestionsIcon 
                        variant="gov-spending"
                        label="Search government spending using AI"
                        icon="sparkles"/>
                </div>
                <div className="search-gov-spending__link">
                    <Button 
                        copy="Learn about Smart Assist"
                        onClick={() => {}}
                        buttonTitle="Learn about Smart Assist"
                        buttonSize="md"
                        buttonType="text"
                        backgroundColor="light"
                        textAlignment="left"
                        imageAlignment="right"
                        image={
                            <div className="button-icon-container">
                                <FontAwesomeIcon 
                                    className="button-icon"
                                    icon="arrow-up-right"/>
                            </div>}/>
                </div>
            </FlexGridRow>
        </section>
    )

}


export default NLSearchGovSpending;