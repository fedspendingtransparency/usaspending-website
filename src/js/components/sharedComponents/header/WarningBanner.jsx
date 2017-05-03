import React from 'react';
import * as Icons from '../icons/Icons';

export default class Header extends React.Component {
    render() {
        return (
            <div className="warning-banner-wrap">
                <div className="warning-banner">
                    <div className="top-alert-icon">
                        <i className="usa-da-icon"><Icons.ExclamationTriangle /></i>
                    </div>
                    <div className="top-alert-text">
                        <p>
                            This site is not intended to be an official resource for federal
                            spending data. To view official federal spending data, please
                            visit&nbsp;
                            <a
                                href="https://www.usaspending.gov"
                                target="_blank"
                                rel="noopener noreferrer">
                                USAspending.gov
                            </a>.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
