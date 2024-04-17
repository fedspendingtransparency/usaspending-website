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

export const DsmWrapper = ({ heading, description }) => (
    <>
        <h4>{heading}</h4>
        <p>{description}</p>
    </>
);
