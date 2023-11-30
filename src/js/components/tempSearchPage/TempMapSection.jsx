import React from "react";
import fetchData from './fetchAwardsTableData';

const resource = fetchData();

const TempMapSection = () => {
    const content = resource.read();
    const message = content.messages[0];
    const sampleId = content.results[0]['Award ID'];

    return (
        <section
            id="temp-component-three"
            style={{
                border: '2px solid blue',
                height: '400px',
                margin: '40px 40px',
                textAlign: 'center',
                fontSize: '24px',
                paddingTop: '40px'
            }}>
            <div>
                Map Section
            </div>
            <br />
            <div>
                {message}
            </div>
            <br />
            <div>
                Award ID of first result:
            </div>
            <div>
                {sampleId}
            </div>
        </section>
    );
};

export default TempMapSection;
