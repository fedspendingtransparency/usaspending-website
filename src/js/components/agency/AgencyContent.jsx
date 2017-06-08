/**
 * AgencyContent.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import AgencySidebar from './AgencySidebar';

export default class AgencyContent extends React.Component {
    render() {
        return (
            <div className="agency-content-wrapper">
                <div className="agency-sidebar">
                    <AgencySidebar />
                </div>
                <div className="agency-content">
                    Content
                </div>
            </div>
        );
    }
}
