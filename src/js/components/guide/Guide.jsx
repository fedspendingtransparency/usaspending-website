/**
 * Guide.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';

import GuideHeader from './GuideHeader';

export default class Guide extends React.Component {
    render() {
        return (
            <div className="usa-da-guide-wrapper">
                <div className="guide-sidebar">
                    <GuideHeader {...this.props} />
                </div>
            </div>
        );
    }
}
