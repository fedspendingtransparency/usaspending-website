/**
 * StateFooter.jsx
 * Created by Lizzie Salita 5/7/18
 */

import React from 'react';
import { Link } from 'react-router-dom';

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
                    <Link
                        className="state-search-button"
                        to="/search">
                        Let&#39;s go!
                    </Link>
                </div>
            </div>
        );
    }
}
