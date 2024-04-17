import React from "react";
import fetchData from '../fetchSpendingByGeographyData';

const resource = fetchData();

const MapVisualization = React.memo(() => {
    if (resource) {
        console.log('map section api call');
    }
    const content = resource.read();
    const message = content.messages[0];
    const displayName = content.results[0].display_name;

    return (
        <section
            className="temp-component-three"
            style={{
                border: '2px solid blue',
                height: '800px',
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
                Display Name of first result:
            </div>
            <div>
                {displayName}
            </div>
        </section>
    );
});

export default MapVisualization;
