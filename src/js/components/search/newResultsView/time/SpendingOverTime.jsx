import React from "react";
import fetchSpendingOverTimeData from '../fetchSpendingOverTimeData';

const resource = fetchSpendingOverTimeData();

const SpendingOverTime = React.memo(() => {
    if (resource) {
        console.log('spending over time api call');
    }
    const content = resource.read();
    const message = content.messages[0];
    const aggregatedAmount = content.results[0].aggregated_amount;

    return (
        <section
            className="temp-component-two"
            style={{
                border: '2px solid green',
                height: '800px',
                margin: '40px 40px',
                textAlign: 'center',
                fontSize: '24px',
                paddingTop: '40px'
            }}>
            <div>
                Spending Over Time Section
            </div>
            <br />
            <div>
                {message}
            </div>
            <br />
            <div>
                Aggregated Amount for this chart
            </div>
            <div>
                {aggregatedAmount}
            </div>
        </section>
    );
});

export default SpendingOverTime;
