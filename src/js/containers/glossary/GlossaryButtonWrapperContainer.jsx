/**
 * GlossaryButtonWrapperContainer.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as glossaryActions from 'redux/actions/glossary/glossaryActions';

const propTypes = {
    dispatch: PropTypes.func
};

export class GlossaryButtonWrapperContainer extends React.Component {
    render() {
        // This is a special container that can dynamically wrap around an arbitrary child
        // component in order to avoid creating multiple versions of this container that return
        // different button styles.
        // We do not pass all the container's props down to the children to avoid passing the
        // `child` property to the child component. Because of this, we manually assemble the
        // bound Redux action using `this.props.dispatch` provided by React-Redux rather than
        // auto-generating the props in the `connect` HOC.
        const actions = bindActionCreators(glossaryActions, this.props.dispatch);
        return (
            <this.props.child {...this.props} {...actions} />
        );
    }
}

GlossaryButtonWrapperContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        glossary: state.glossary
    })
)(GlossaryButtonWrapperContainer);
