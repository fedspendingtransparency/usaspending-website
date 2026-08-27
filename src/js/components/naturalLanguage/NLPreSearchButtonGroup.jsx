/**
 * NLPreSearchButtonGroup.jsx
 * Created by JD House 8/20/2026
 */

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isCancel } from 'axios';
import { FlexGridRow, FlexGridCol, CardContainer } from 'data-transparency-ui';
import { preSearchOptions } from "./NLData";
import { generateUrlHash } from "../../helpers/searchHelper";

const NLPreSearchButtonGroup = () => {
    const spendingLevel = useSelector((state) => state.searchView.spendingLevel);
    const getRandomOption = ({options}) => {
        // eslint-disable-next-line react-hooks/purity
        const index = Math.floor(Math.random() * options.length);
        return options[index];
    }

    const getQuestions = useMemo(() => preSearchOptions.map((type) => getRandomOption(type)), []);

    const fireSearchEvent = (filterValue) => {
        let tempHash = generateUrlHash(filterValue);
        tempHash.promise
            .then((results) => {
                const hashData = results.data;
                let url = `/search?hash=${encodeURIComponent(hashData.hash)}`;

                if (spendingLevel === "subawards") {
                    url += "&subawards=true";
                }

                window.open(url, "_self");
                // operation has resolved
                tempHash = null;
            })
            .catch((error) => {
                if (!isCancel(error)) {
                    // Request failed
                    console.log(error);
                }
                tempHash = null;
            });
    }

    return (
        <div className="landing-pre-search__section">
            <FlexGridRow className="landing-pre-search__row">
                {getQuestions.map((btn) => (
                    <FlexGridCol 
                        key={`landing-pre-search-${btn.id}`} 
                        className="landing-pre-search__col"
                        desktopxl={4} 
                        desktop={12} 
                        tablet={12}
                        mobile={12}>
                        <CardContainer 
                            variant="outline"
                            onClick={() => btn.action(fireSearchEvent)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter'){
                                    btn.action(fireSearchEvent)
                                } 
                            }}>
                            <div className="pre-search-icon">
                                <FontAwesomeIcon icon="filter-list" />
                            </div>
                            <div className="pre-search-text">{btn.text}</div>
                        </CardContainer>
                        
                    </FlexGridCol>
                ))}
            </FlexGridRow>
        </div>
    )};

export default NLPreSearchButtonGroup;