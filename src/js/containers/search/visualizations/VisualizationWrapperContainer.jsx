/**
 * VisualizationWrapperContainer.jsx
 * Created by Kevin Li 4/30/18
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchViewActions from 'redux/actions/search/searchViewActions';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import VisualizationWrapper from 'components/search/visualizations/VisualizationWrapper';

export default connect(
    (state) => (
        state.searchView
    ),
    (dispatch) => bindActionCreators(
        Object.assign(
            {},
            searchViewActions,
            searchFilterActions
        ),
        dispatch
    )
)(VisualizationWrapper);
