import React from "react";
import fetchData from './fetchData';

const resource = fetchData();

const TempComponent4 = () => {
    const content = resource.read();
    const term = content.results[0].term;
    const definition = content.results[0].official;

    return (
        <section
            id="temp-component-four"
            style={{
                border: '2px solid gold',
                height: '400px',
                margin: '40px 40px',
                textAlign: 'center',
                fontSize: '24px',
                paddingTop: '80px'
            }}>
            COMPONENT 4
            <div>
                {term}
                {definition}
            </div>
        </section>
    );
};

export default TempComponent4;
