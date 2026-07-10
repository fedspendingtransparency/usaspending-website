/**
 * 
 * NLMoreResources.jsx 
 * Created by Trey Morgan 7/8/2026
 */

import React from "react";
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import NLSearchSuggestionsIcon from "./NLSearchSuggestionsIcon";

const NLMoreResources = () => (
    <section className="more-resources__section">
        <FlexGridRow className="more-resources__row">
            <FlexGridCol className="more-resources__label">
                MORE RESOURCES:
            </FlexGridCol>
            <FlexGridCol className="more-resources__col">
                <NLSearchSuggestionsIcon 
                    variant="glossary" 
                    label="Glossary" 
                    icon="book"/>
            </FlexGridCol>

            <FlexGridCol className="more-resources__col">
                <NLSearchSuggestionsIcon 
                    variant="about-the-data" 
                    label="About the Data " 
                    icon="database"/>
            </FlexGridCol>

            <FlexGridCol className="more-resources__col">
                <NLSearchSuggestionsIcon 
                    variant="data-dictionary" 
                    label="Data Dictionary" 
                    icon="book-open"/>
            </FlexGridCol>

            <FlexGridCol className="more-resources__col">
                <NLSearchSuggestionsIcon 
                    variant="federal-spending-guide" 
                    label="Federal Spending Guide" 
                    icon="money-check-dollar"/>
            </FlexGridCol>
        </FlexGridRow>
    </section>
)


export default NLMoreResources;