/**
 * FooterComponent.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

export default class Footer extends React.Component {
    render() {
        const year = new Date().getFullYear();
        return (
            <footer className="usa-footer usa-footer-slim" role="contentinfo">
                <div className="usa-footer-primary-section">
                    <div className="usa-grid-full">
                        <div className="usa-width-full">
                            &copy; {year} USAspending.gov
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
