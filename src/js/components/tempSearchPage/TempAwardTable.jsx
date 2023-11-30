import React from "react";
import fetchAwardsTableData from './fetchAwardsTableData';

const resource = fetchAwardsTableData();

const TempAwardTable = () => {
    const content = resource.read();
    const message = content.messages[0];
    const sampleId = content.results[0]['Award ID'];

    return (
        <section
            id="temp-component-one"
            style={{
                border: '2px solid red',
                height: '400px',
                margin: '40px 40px',
                textAlign: 'center',
                fontSize: '24px',
                paddingTop: '40px'
            }}>
            <div>
            Awards Table Section
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

export default TempAwardTable;
