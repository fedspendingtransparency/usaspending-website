/**
 * Guide.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';

import GuideHeader from './GuideHeader';
import GuideSearchResults from './search/GuideSearchResults';
import GuideDefinition from './definition/GuideDefinition';

export default class Guide extends React.Component {
    render() {
        const content = <GuideSearchResults {...this.props} />;

        return (
            <div className="usa-da-guide-wrapper">
                <div className="guide-sidebar">
                    <GuideHeader {...this.props} />
                    {content}
                </div>
            </div>
        );
    }
}
