/**
 * TopFiveSection.jsx
 * Created by Kwadwo Opoku-Debrah 07/10/18
 */

import React from 'react';

import { recipientCategories as topCategories } from 'dataMapping/topCategories';
import TopFiveContainer from 'containers/recipient/topFive/TopFiveContainer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionHeader, FlexGridRow } from "data-transparency-ui";

const TopFiveSection = () => {
    const content = topCategories.map((category) => (
        <TopFiveContainer
            key={category}
            category={category} />
    ));

    return (
        <FlexGridRow
            className="recipient-section topfive"
            id="recipient-top-five">
            <SectionHeader
                icon={<FontAwesomeIcon icon="table" size="2x" />}
                title="Top 5"
                titleTooltip={{ component: false }}
                descTooltip={{ component: false }} />
            <hr className="results-divider" />
            <div className="state-section__description">
                The set of tables below provide a summary of awards to this recipient through multiple angles. To see more than the top 5, you can visit our Advanced Search page.
            </div>
            <div className="topfive__content">
                {content}
            </div>
        </FlexGridRow>
    );
};

export default TopFiveSection;
