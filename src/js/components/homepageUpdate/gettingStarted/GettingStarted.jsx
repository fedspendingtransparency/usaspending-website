import React from 'react';
import { FlexGridRow } from "data-transparency-ui";


const GettingStarted = () => (
    <section
        className="homepage-getting-started"
        aria-label="Getting started sections"
        style={{ width: '100%', height: '400px', 'background-color': 'white' }}>
        <FlexGridRow
            className="grid-content"
            style={{
                height: '400px', 'background-color': 'white'
            }}>
            content goes here
        </FlexGridRow>
    </section>
);

export default GettingStarted;
