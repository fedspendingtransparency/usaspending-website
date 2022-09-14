/**
 * HomepageResources.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';

const HomepageResources = () => (
    <section className="homepage-resources__section">
        <FlexGridRow className="grid-content">
            <FlexGridCol width={12}>
                <FlexGridRow>RESOURCES</FlexGridRow>
                <FlexGridRow>Find answers to your data questions</FlexGridRow>
            </FlexGridCol>
            <FlexGridRow hasGutter gutterSize="lg">
                <FlexGridCol>CARD</FlexGridCol>
                <FlexGridCol>CARD</FlexGridCol>
                <FlexGridCol>CARD</FlexGridCol>
                <FlexGridCol>CARD</FlexGridCol>
            </FlexGridRow>
        </FlexGridRow>
    </section>
);

export default HomepageResources;
