import React from "react";
import fetchData from './fetchAwardsTableData';

const resource = fetchData();

const TempComponent3 = () => {
    const content = resource.read();
    const term = content.results[0].term;
    const definition = content.results[0].official;

    return (
        <section
            id="temp-component-three"
            style={{
                border: '2px solid blue',
                height: '400px',
                margin: '40px 40px',
                textAlign: 'center',
                fontSize: '24px',
                paddingTop: '80px'
            }}>
            COMPONENT 3
            <div>
                {term}
                {definition}
            </div>
        </section>
    );
};

export default TempComponent3;
