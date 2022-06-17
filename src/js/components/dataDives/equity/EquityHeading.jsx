/**
 * EquityHeading.jsx
 * Created by Brian Petway 06/16/22
 */

import React from 'react';
import { FlexGridRow } from 'data-transparency-ui';


const EquityHeading = ({ heading, intro, note }) => {
    const blah = 'blah';

    return (
        <section
            className="equity-heading"
            aria-label="EquityHeading sections">
            <FlexGridRow className="grid-content">
                <div className="equity-heading_heading">{heading}</div>
            </FlexGridRow>
        </section>
    );
};

export default EquityHeading;
