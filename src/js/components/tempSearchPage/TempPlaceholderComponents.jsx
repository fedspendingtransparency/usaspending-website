import React from "react";

export const TempPlaceholderComponent = () => (
    <div style={{
        border: '2px solid pink',
        height: '800px',
        margin: '40px 40px',
        textAlign: 'center',
        fontSize: '24px'
    }}>
        PLACEHOLDER COMPONENT
    </div>
);

export const TempPlaceholderChart = () => (
    <div style={{
        backgroundColor: '#fee3ff',
        color: '#e72eff',
        height: '480px',
        textAlign: 'center',
        fontSize: '24px'
    }}>
        PLACEHOLDER CHART
    </div>
);

export const TempPlaceholderTable = () => (
    <div style={{
        backgroundColor: 'lightgoldenrodyellow',
        color: 'goldenrod',
        height: '480px',
        textAlign: 'center',
        fontSize: '24px'
    }}>
        PLACEHOLDER TABLE
    </div>
);

export const TempPlaceholderDsmContent = () => (
    <>
        <h4>What’s included in this view of the data</h4>
        <p>The data in the chart below represent federal action       obligation       amounts for prime award transactions within the selected filters. Loan awards use the subsidy cost rather than the obligated amount to sum up the value of the loan. Prime award transactions with the same unique award ID are grouped under a single prime award summary. Prime award summaries can be viewed in the Table tab.</p>
        <h4>Awarding Agency and Awarding Subagency</h4>
        <p>View a list of the top Agencies from highest to lowest. View your results by Awarding Agency or Sub Agency and hover over the bars for more detailed information.</p>
        <h4>Recipient</h4>
        <p>View a list of the top Recipients from highest to lowest. View your results by Parent Recipient or Recipient, and hover over the bars for more detailed information.</p>
        <h4>North American Industry Classification System (NAICS) and Product or Service Code (PSC)</h4>
        <p>View a list of the top Industry Codes from highest to lowest. View your results by NAICS Code or PSC Code, and hover over the bars for more detailed information.</p>
        <h4>Assistance Listing</h4>
        <p>View a list of the top CFDA Programs from highest to lowest, and hover over the bars for more detailed information.</p>
    </>
);
