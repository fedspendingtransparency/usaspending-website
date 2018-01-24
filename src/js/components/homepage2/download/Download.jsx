/**
 * Download.jsx
 * Created by Kevin Li 1/23/18
 */

import React from 'react';

import DownloadPlaceholder from './DownloadPlaceholder';

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
                <div className="homepage-download__wrapper">
                    <ul
                        className="homepage-download__list homepage-download__list_desktop homepage-download__list_left">
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

                    <div className="homepage-download__detail">
                        <DownloadPlaceholder />
                    </div>
                </div>
            </section>
        );
    }
}
