/**
 * NLPreSearchButtonGroup.jsx
 * Created by Trey Morgan 7/2/2026
 */

import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isCancel } from 'axios';
import { FlexGridRow, FlexGridCol, CardContainer } from 'data-transparency-ui';
import { preSearchOptions } from "./NLData";
import { generateUrlHash } from "../../helpers/searchHelper";

const NLPreSearchButtonGroup = () => {
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
                window.open(`/search?hash=${encodeURIComponent(hashData.hash)}`, "_self");
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
        <section className="landing-pre-search__section">
            <FlexGridRow className="landing-pre-search__row">
                {getQuestions.map((btn) => (
                    <FlexGridCol 
                        key={`landing-pre-search-${btn.id}`} 
                        className="landing-pre-search__col"
                        mobile={12}
                        tablet={6}
                        desktop={4}>
                        <CardContainer 
                            variant="outline"
                            size="sm"
                            onClick={() => btn.action(fireSearchEvent)}
                            onKeyUp={() => btn.action(fireSearchEvent)}>
                            <div className="pre-search-icon">
                                <FontAwesomeIcon icon="filter-list" />
                            </div>
                            <div className="pre-search-text">{btn.text}</div>
                        </CardContainer>
                        
                    </FlexGridCol>
                ))}
            </FlexGridRow>
        </section>
    )};

export default NLPreSearchButtonGroup;