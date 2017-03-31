/**
 * FooterComponent.jsx
 * Created by Destin Frasier 02/24/2017
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

export default class Footer extends React.Component {
    render() {
        const year = new Date().getFullYear();
        return (
            <footer className="footer-outer-wrap" role="contentinfo">
                <div className="footer-container">
                    <div className="footerLogo">
                        <a href="/" title="USAspending.gov Home" aria-label="USAspending.gov Home">
                            <Icons.FlagLogo className="usa-da-flag-logo" />
                        </a>
                    </div>
                    <div className="internal-links">
                        <h6>This site is an alpha release. All data is test data.</h6>
                        <ul className="inline">
                            <li><a href="/" title="Feedback" aria-label="Feedback">Feedback</a></li>
                            <li><a href="/" title="About Us" aria-label="About Us">About Us</a></li>
                            <li><a href="http://fedspendingtransparency.github.io" target="_blank" rel="noopener noreferrer" title="About the DATA Act" aria-label="About the DATA Act">About the DATA Act</a></li>
                        </ul>
                    </div>
                    <div className="external-links">
                        <h6>Other Resources on Federal Spending</h6>
                        <ul>
                            <li><a href="http://foreignassistance.gov" target="_blank" rel="noopener noreferrer" title="Foreign Assistance" aria-label="Foreign Assistance">Foreign Assistance</a></li>
                            <li><a href="https://itdashboard.gov" target="_blank" rel="noopener noreferrer" title="IT Dashboard" aria-label="IT Dashboard">IT Dashboard</a></li>
                            <li><a href="https://www.fiscal.treasury.gov" target="_blank" rel="noopener noreferrer" title="Bureau of the Fiscal Service" aria-label="Bureau of the Fiscal Service">Bureau of the Fiscal Service</a></li>
                            <li><a href="https://www.data.gov/" target="_blank" rel="noopener noreferrer" title="Data.gov" aria-label="Data.gov">Data.gov</a></li>
                            <li><a href="https://www.cbo.gov/" target="_blank" rel="noopener noreferrer" title="Congressional Budget Office" aria-label="Congressional Budget Office">Congressional Budget Office</a></li>
                        </ul>
                    </div>
                </div>
                <div className="copyright-block">
                    <small>&copy; {year} USAspending.gov</small>
                </div>
            </footer>
        );
    }
}
