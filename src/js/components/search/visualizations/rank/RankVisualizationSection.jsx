/**
  * RankVisualizationSection.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';

export default class RankVisualizationSection extends React.Component {
    render() {
        return (
            <div
                className="results-visualization-rank-section"
                id="results-section-rank">
                <h3>Spending By:</h3>
                <hr className="results-divider" />
            </div>
        );
    }
}
