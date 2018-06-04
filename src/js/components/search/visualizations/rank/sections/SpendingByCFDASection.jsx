/**
 * SpendingByCFDASection.jsx
 * Created by Kevin Li 5/4/17
 */

import React from 'react';

import RankVisualizationSection from './RankVisualizationSection';

export default class SpendingByCFDASection extends React.Component {
    render() {
        return (
            <RankVisualizationSection {...this.props}>
                <div className="visualization-top">
                    <div className="visualization-top__description">
                        View a list of the top CFDA Programs from highest to lowest, and hover over the bars for
                        more detailed information.
                    </div>
                </div>
            </RankVisualizationSection>
        );
    }
}
