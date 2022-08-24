/**
 * HomepageFirstRow.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import FeaturedContent from "../FeaturedContent/FeaturedContent";
import WordOfTheDay from "../WordOfTheDay/WordOfTheDay";

const HomepageFirstRow = () => (
    <section className="homepage-first-row__section">
        <FlexGridRow className="usa-dt-flex-grid__row grid-content">
            <FlexGridCol width={8} >
                <FeaturedContent />
            </FlexGridCol>
            <FlexGridCol width={4} >
                <WordOfTheDay />
            </FlexGridCol>
        </FlexGridRow>
    </section>
);

export default HomepageFirstRow;
