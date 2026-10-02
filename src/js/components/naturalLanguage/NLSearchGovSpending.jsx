/**
 * NLSearchGovSpending.jsx/
 * Created by Trey Morgan 8/12/2026
 */

import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexGridRow, FlexGridCol, CardContainer, CardBody, Button } from 'data-transparency-ui';
import NLSearchSuggestionsIcon from "./NLSearchSuggestionsIcon";
import { searchGovSpendingData } from "./NLData";
import PropTypes from "prop-types";
import { sanitizeNLInput } from "../../helpers/search/naturalLanguage/sanitizeNLInput";
import * as Icons from 'components/sharedComponents/icons/Icons';
import { NL_INPUT_MAX_CHARS } from "../search/collapsibleSidebar/NLConstants";
const DEFAULT_ICON_PATH = "../../../../img/magnifying-glass-white.svg";

const propTypes = {
    isFilters: PropTypes.bool
};
const NLSearchGovSpending = ({ isFilters=false }) => {
    const [inputValue, setInputValue] = useState('');
    const MAX_CHARS = NL_INPUT_MAX_CHARS;

    const handleInputChange = (event) => {
        setInputValue(sanitizeNLInput(event.target.value));
    };
    const handleClear = (event) => {
        event.preventDefault();
        setInputValue('');
    }
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
                        <div className="search-gov-spending__clear-container">
                            <input
                                maxLength={MAX_CHARS}
                                name="search gov spending input"
                                className="search-gov-spending__input"
                                type="text"
                                id="nl-input"
                                value={inputValue} 
                                onChange={handleInputChange} 
                                placeholder="Type a question about government spending, or choose a sample prompt below." />
                            {inputValue.length > 0 && <button
                                className="clear-button"
                                id="nl-clear-button"
                                aria-label="Clear Input"
                                title="Clear Input"
                                onClick={handleClear}>
                                <Icons.Close alt="Clear search input" />
                            </button>}
                        </div>
                        <button className="search-gov-spending__input-button">
                            <img src={DEFAULT_ICON_PATH} alt="Icon for Search Button"/>
                        </button>
                    </div>
                    <div className="search-gov-spending__prompt-container">
                        <div className="search-gov-spending__tablet-prompt-wrapper">
                            <span className="search-gov-spending__prompt-title">BUILD A PROMPT AROUND:</span>
                        </div>

                        <div className="search-gov-spending__button-container">
                            <button value="How much federal spending went to [recipient]?" 
                                onClick={handleInputChange} 
                                className="search-gov-spending__prompt-button">
                                Recipient
                            </button>
                            <button value="What agencies received funding during [time period]?" 
                                onClick={handleInputChange} 
                                className="search-gov-spending__prompt-button">
                                Time Period
                            </button>
                            <button value="How much federal funding did [my state] receive?"
                                onClick={handleInputChange} 
                                className="search-gov-spending__prompt-button">
                                Location
                            </button>
                            <button value="How much federal funding went to [industry]?"
                                onClick={handleInputChange}
                                className="search-gov-spending__prompt-button">
                                Industry
                            </button>
                            <button value="What [contracts/grants] did the Health Care Industry receive?"
                                onClick={handleInputChange}
                                className="search-gov-spending__prompt-button">
                                Award Type
                            </button>
                        </div>
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