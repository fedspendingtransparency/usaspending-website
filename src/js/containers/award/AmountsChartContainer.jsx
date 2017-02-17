/**
 * AmountsChartContainer.jsx
 * Created by Emily Gullo 02/13/2017
 **/

import React from 'react';
import AmountsChart from 'components/award/visualizations/AmountsChart';

const propTypes = {
    potential: React.PropTypes.number,
    current: React.PropTypes.number,
    sub: React.PropTypes.number
};

const defaultProps = {
    amounts: {
        potential: 9688907673,
        current: 5856789012,
        sub: 1134324223
    }
};

class AmountsChartContainer extends React.Component {

    render() {
        return (
            <AmountsChart
                potential={this.props.potential}
                current={this.props.current}
                sub={this.props.sub} />
        );
    }
}
export default AmountsChartContainer;

AmountsChartContainer.propTypes = propTypes;
AmountsChartContainer.defaultProps = defaultProps;
