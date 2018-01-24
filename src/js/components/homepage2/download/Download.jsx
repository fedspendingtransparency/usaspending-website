/**
 * Download.jsx
 * Created by Kevin Li 1/23/18
 */

import React from 'react';

export default class Download extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: null
        };
    }
    render() {
        return (
            <section
                className="homepage-download"
                aria-label="Download options">
                <ul
                    className="desktop-navigation left-navigation">
                    <li>
                        <a
                            className="desktop-navigation-link download-icon archive"
                            href="#/bulk_download/award_data_archive">
                                Award Data Archive
                        </a>
                    </li>
                    <li>
                        <a
                            className="desktop-navigation-link download-icon award"
                            href="#/bulk_download">
                                Custom Award Data
                        </a>
                    </li>
                    <li>
                        <div
                            className="desktop-navigation-placeholder download-icon account">
                                Custom Account Data
                        </div>
                    </li>
                </ul>
            </section>
        );
    }
}
