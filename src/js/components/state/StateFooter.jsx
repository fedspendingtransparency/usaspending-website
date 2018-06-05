/**
 * StateFooter.jsx
 * Created by Lizzie Salita 5/7/18
 */

import React from 'react';

export default class StateFooter extends React.Component {
    render() {
        return (
            <div className="state-footer">
                <div className="footer-content">
                    <h4>
                        Looking for more insight?
                    </h4>
                    <p>
                        Check out the <strong>Advanced Search</strong> page <br />
                        for more in-depth analysis on this state and more
                    </p>
                    <a
                        className="state-search-button"
                        href="/#/search">
                        Let&#39;s go!
                    </a>
                </div>
            </div>
        );
    }
}
