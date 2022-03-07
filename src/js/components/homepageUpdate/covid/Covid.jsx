import React from 'react';
import { FlexGridRow } from 'data-transparency-ui';


const Covid = () => (
    <section
        className="homepage-covid"
        aria-label="Covid sections"
        style={{ width: '100%', height: '400px', 'background-color': 'lightgrey' }}>
        <FlexGridRow
            className="grid-content"
            style={{
                height: '400px', 'background-color': 'white'
            }}>
        content goes here
        </FlexGridRow>
    </section>
);


export default Covid;
