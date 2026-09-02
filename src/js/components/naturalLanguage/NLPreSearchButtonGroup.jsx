/**
 * NLPreSearchButtonGroup.jsx
 * Created by JD House 8/20/2026
 */

import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isCancel } from 'axios';
import { FlexGridRow, FlexGridCol, CardContainer } from 'data-transparency-ui';
import { preSearchOptions } from "./NLData";
import { generateUrlHash } from "../../helpers/searchHelper";
import { combineQueryParams, getQueryParamString } from "../../helpers/queryParams";
import useQueryParams from "../../hooks/useQueryParams";

const NLPreSearchButtonGroup = () => {
    const query = useQueryParams();

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
                const newQueryParams = combineQueryParams(query, {hash: encodeURIComponent(results.data.hash)});
                window.open(`${'/search'}${getQueryParamString(newQueryParams)}`, "_self");
                
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