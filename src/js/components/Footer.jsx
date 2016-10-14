/**
 * FooterComponent.jsx
 * Created by Mike Bray 12/26/15
 **/

import React from 'react';

export default class Footer extends React.Component {
    render() {
        const year = new Date().getFullYear();
        return (
            <div className="usa-da-footer">
            	{year} USAspending.gov
            </div>
        );
    }
}
