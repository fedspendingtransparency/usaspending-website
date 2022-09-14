/**
 * HomepageResources.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomepageResources = () => (
    <section className="homepage-resources__section">
        <FlexGridRow className="grid-content">
            <FlexGridCol width={12}>
                <FlexGridRow className="homepage-resources__top-label-container">
                    <div className="homepage-resources__top-label-icon-container">
                        <FontAwesomeIcon
                            className="homepage-resources__book-icon"
                            icon="book-open"
                            size="xs" />
                    </div>
                    <div className="homepage-resources__top-label-text">RESOURCES</div>
                </FlexGridRow>
                <FlexGridRow className="homepage-resources__headline">Find answers to your data questions</FlexGridRow>
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
