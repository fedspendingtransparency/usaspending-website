import React from "react";
import fetchData from './fetchData';

const resource = fetchData();

const TempComponent1 = () => {
    const content = resource.read();
    const term = content.results[0].term;
    const definition = content.results[0].official;

    return (
        <div style={{
            border: '2px solid red',
            height: '400px',
            margin: '40px 40px',
            textAlign: 'center',
            fontSize: '24px',
            paddingTop: '80px'
        }}>
            COMPONENT 1
            <div>
                {term}
                {definition}
            </div>
        </div>
    );
};

export default TempComponent1;
