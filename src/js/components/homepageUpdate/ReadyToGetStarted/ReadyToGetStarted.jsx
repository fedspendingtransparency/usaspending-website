/**
 * ReadyToGetStarted.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';

const ReadyToGetStarted = () => (
    <section className="ready-to-get-started__section">
        <FlexGridRow className="grid-content">
            <FlexGridCol className="ready-to-get-started__title" width={12}>
                Ready to get started?
            </FlexGridCol>
            <FlexGridRow hasGutter gutterSize="lg">
                <FlexGridCol mobile={12} tablet={6} desktop={3}>
                    CARD
                </FlexGridCol>
                <FlexGridCol mobile={12} tablet={6} desktop={3}>
                    CARD
                </FlexGridCol>
                <FlexGridCol mobile={12} tablet={6} desktop={3}>
                    CARD
                </FlexGridCol>
                <FlexGridCol mobile={12} tablet={6} desktop={3}>
                    CARD
                </FlexGridCol>
            </FlexGridRow>
        </FlexGridRow>
    </section>
);

export default ReadyToGetStarted;
