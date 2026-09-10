/**
 * NLSearchGovSpending.jsx/
 * Created by Trey Morgan 8/12/2026
 */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexGridRow, FlexGridCol, CardContainer, CardBody, Button } from 'data-transparency-ui';
import NLSearchSuggestionsIcon from "./NLSearchSuggestionsIcon";
import { searchGovSpendingData } from "./NLData";
import PropTypes from "prop-types";

const DEFAULT_ICON_PATH = "../../../../img/magnifying-glass-white.svg";
const propTypes = {
    isFilters: PropTypes.bool

};
const NLSearchGovSpending = ({ isFilters=false }) => {

    return (
        <section className={`search-gov-spending__section ${isFilters ? ' filter-spacing': ''}`}>
            <FlexGridRow className="search-gov-spending__row">
                <div className="search-gov-spending__label-icon-container">
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
                {isFilters && 
                <>
                    <span className="search-gov-spending__question">What questions do you have about federal award spending data?</span>
                    <div className="search-gov-spending__input-container">
                        <input
                            className="search-gov-spending__input"
                            type="text"
                            placeholder="Type a question about government spending, or choose an sample prompt below." />
                        <button className="search-gov-spending__input-button">
                            <img src={DEFAULT_ICON_PATH} alt="Icon for Search Button"/>
                        </button>
                    </div>
                    <div className="search-gov-spending__prompt-container">
                        <span className="search-gov-spending__prompt-title">BUILD A PROMPT AROUND:</span>
                        <button className="search-gov-spending__prompt-button">Recipient</button>
                        <button className="search-gov-spending__prompt-button">Time Period</button>
                        <button className="search-gov-spending__prompt-button">Location</button>
                        <button className="search-gov-spending__prompt-button">Industry</button>
                        <button className="search-gov-spending__prompt-button">Award Type</button>
                    </div>
                </>}

                {!isFilters && <div className="search-gov-spending__container">
                    <div className="search-gov-spending__header">
                        HOW IT WORKS:
                    </div>
                    <FlexGridRow className="search-gov-spending__card-row">
                        {searchGovSpendingData.map((cardData) => (
                            <FlexGridCol
                                className="search-gov-spending__card" 
                                key={`search-gov-spending-card-${cardData.id}`}
                                mobile={12}
                                tablet={12}
                                desktop={4}>

                                <CardContainer variant="none">
                                    <CardBody customClassName="card-body">
                                        {cardData.icon}
                                    </CardBody>
                                </CardContainer>
                            </FlexGridCol>
                        ))
                        }
                    </FlexGridRow>              
                </div>}
            </FlexGridRow>
        </section>
    )

}
NLSearchGovSpending.propTypes = propTypes;
export default NLSearchGovSpending;