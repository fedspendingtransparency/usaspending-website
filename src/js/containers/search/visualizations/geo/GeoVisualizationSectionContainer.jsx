/**
 * GeoVisualizationSectionContainer.jsx
 * Created by Kevin Li 2/13/17
 */

/**
 * TimeVisualizationSectionContainer.jsx
 * Created by Kevin Li 1/12/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GeoVisualizationSection from
    'components/search/visualizations/geo/GeoVisualizationSection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

const propTypes = {

};

export class GeoVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scope: 'pop'
        };

        this.changeScope = this.changeScope.bind(this);
    }

    changeScope(scope) {
        this.setState({
            scope
        });
    }

    render() {
        return (
            <GeoVisualizationSection
                scope={this.state.scope}
                changeScope={this.changeScope} />
        );
    }
}

GeoVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.filters }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(GeoVisualizationSectionContainer);
