/**
 * HomepageFirstRow.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridCol } from 'data-transparency-ui';
import FeaturedContent from "../FeaturedContent/FeaturedContent";
import WordOfTheDay from "../WordOfTheDay/WordOfTheDay";

const HomepageFirstRow = () => (
    <div
        className="grid-content">
        <div
            className="featured-word-of-the-day-row">
            <FlexGridCol width={8} mobile={12} tablet={12} desktop={8}>
                <FeaturedContent />
            </FlexGridCol>
            <FlexGridCol width={12} mobile={12} tablet={12} desktop={4}>
                <WordOfTheDay />
            </FlexGridCol>
        </div>
    </div>
);

export default HomepageFirstRow;
