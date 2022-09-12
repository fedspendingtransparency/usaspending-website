/**
 * ReadyToGetStarted.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';

const ReadyToGetStarted = () => (
    <section className="ready-to-get-started__section">
        <FlexGridRow>
            <FlexGridCol className="ready-to-get-started__title" width={12}>
                Ready to get started?
            </FlexGridCol>
        </FlexGridRow>
        <FlexGridRow className="grid-content">
            CARDS GO HERE
        </FlexGridRow>
    </section>
);

export default ReadyToGetStarted;
