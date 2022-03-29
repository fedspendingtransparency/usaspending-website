/**
 * Covid.jsx
 * Created by Andrea Blackwell 03/07/22
 */

import React from 'react';
import {FlexGridRow, FlexGridCol} from 'data-transparency-ui';

require('pages/homepageUpdate/_homepageCovidSection.scss');

const Covid = () => (
    <section
        className="homepage-covid"
        aria-label="Covid sections">
        <FlexGridRow
            className="grid-content">
            <FlexGridCol width={6} className="homepage-covid__column-one">
                <div className="homepage-covid__column-one-content-wrapper">
                    <div className="homepage-covid__heading">
                        The Federal Response to COVID-19
                    </div>
                    <div className="homepage-covid__content">
                        The federal government has spent [$3.59 trillion] in response to COVID-19.
                    </div>
                </div>
            </FlexGridCol>
            <FlexGridCol width={6} className="homepage-covid__column-two">
                <div className="homepage-covi__column-two-content-wrapper">
                    Column Two Content
                </div>
            </FlexGridCol>
        </FlexGridRow>
    </section>
);

export default Covid;
