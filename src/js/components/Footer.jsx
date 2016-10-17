/**
 * FooterComponent.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

export default class Footer extends React.Component {
    render() {
        const year = new Date().getFullYear();
        return (
            <div className="usa-footer">
                <span className="usa-footer-primary-section">{year}
                    USAspending.gov</span>
            </div>
        );
    }
}
