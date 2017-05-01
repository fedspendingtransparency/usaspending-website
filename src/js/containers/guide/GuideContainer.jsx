/**
 * GuideContainer.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GuideListenerSingleton from 'containers/router/GuideListenerSingleton';

import AnimatedGuideWrapper from 'components/guide/AnimatedGuideWrapper';

import * as guideActions from 'redux/actions/guide/guideActions';

const propTypes = {
    guide: React.PropTypes.object
};

export class GuideContainer extends React.Component {
    componentDidMount() {
        GuideListenerSingleton.subscribe(this);
    }

    componentWillUnmount() {
        GuideListenerSingleton.unsubscribe(this);
    }

    detectedUrlChange(value) {
        console.log(value);
    }

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
