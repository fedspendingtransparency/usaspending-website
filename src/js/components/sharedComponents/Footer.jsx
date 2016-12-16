/**
 * FooterComponent.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

export default class Footer extends React.Component {
    render() {
        const year = new Date().getFullYear();
        return (
            <footer className="site-footer" role="contentinfo">
                &copy; {year} USAspending.gov
            </footer>
        );
    }
}
