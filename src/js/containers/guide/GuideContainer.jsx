/**
 * GuideContainer.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AnimatedGuideWrapper from 'components/guide/AnimatedGuideWrapper';

import * as guideActions from 'redux/actions/guide/guideActions';

const propTypes = {
    guide: React.PropTypes.object
};

export class GuideContainer extends React.Component {
    render() {
        return (
            <AnimatedGuideWrapper {...this.props} />
        );
    }
}

GuideContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        guide: state.guide
    }),
    (dispatch) => bindActionCreators(guideActions, dispatch)
)(GuideContainer);
