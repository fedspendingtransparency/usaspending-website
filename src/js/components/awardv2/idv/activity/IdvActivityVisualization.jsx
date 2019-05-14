/**
 * IdvActivityVisualization.jsx
 * Created by Lizzie Salita 5/14/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'components/sharedComponents/Pagination';
import ActivityChart from './chart/ActivityChart';

const propTypes = {
    page: PropTypes.number,
    count: PropTypes.number,
    changePage: PropTypes.func,
    awards: PropTypes.array
};

export default class IdvActivityVisualization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTooltip: false
        };
    }

    render() {
        const itemHeight = 20;
        // Height is number of results * item height + 30px padding
        const height = (this.props.awards.length * itemHeight) + 30;
        const chart = (
            <ActivityChart
                awards={this.props.awards}
                height={height} />
        );
        return (
            <div className="activity-visualization">
                <Pagination
                    onChangePage={this.props.changePage}
                    pageNumber={this.props.page}
                    totalItems={this.props.count}
                    pageSize={10} />
                {chart}
                <div className="visualization-legend">
                    <div className="visualization-legend__circle" />
                    <div className="visualization-legend__label">
                        Obligated
                    </div>
                </div>
            </div>
        );
    }
}

IdvActivityVisualization.propTypes = propTypes;
