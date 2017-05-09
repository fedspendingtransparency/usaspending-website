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
                    <div className="visualization-description no-scope">
                        <div className="content">
                            View a list of the top CFDA programs from highest to lowest.
                            You can view your results in a bar graph or a tree map.
                        </div>
                    </div>
                </div>
            </RankVisualizationSection>
        );
    }
}
