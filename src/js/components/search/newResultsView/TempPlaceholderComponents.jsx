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
        height: '500px',
        textAlign: 'center',
        fontSize: '24px'
    }}>
        PLACEHOLDER TABLE
    </div>
);

export const DsmContent = ({ heading, description }) => (
    <>
        <h4>{heading}</h4>
        <p>{description}</p>
    </>
);
