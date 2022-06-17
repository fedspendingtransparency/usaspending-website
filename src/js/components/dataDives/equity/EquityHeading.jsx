/**
 * EquityHeading.jsx
 * Created by Brian Petway 06/16/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';


const EquityHeading = ({ heading, intro, note }) => (
    <section
        className="equity-heading"
        aria-label="EquityHeading sections">
        <FlexGridRow className="grid-content">
            <FlexGridCol>
                <div className="equity-heading__heading">{heading}</div>
                <div className="equity-heading__stats-row">
                    <div className="equity-heading__pill">Partner Collaboration</div>
                    <div className="equity-heading__date">Jan 18, 2022</div>
                    <div className="equity-heading__dot">&#8226;</div>
                    <div>4 posts</div>
                </div>
                <div className="equity-heading__intro">{intro}</div>
                <div className="equity-heading__note">{note}</div>
            </FlexGridCol>
        </FlexGridRow>
    </section>
);

export default EquityHeading;
