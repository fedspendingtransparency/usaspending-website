/**
 * Welcome.jsx
 * Created by Emily Gullo 9/26/2016
 **/
import React from 'react'

export default class Welcome extends React.Component {
    render() {
        return (
            <div className="usa-da-page-title">
                <h1>Welcome to USAspending.gov</h1>
				<a href="/#/search">Search Results</a>
            </div>
        );
    }
}
