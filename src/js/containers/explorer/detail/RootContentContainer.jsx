/**
 * RootContentContainer.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as explorerActions from 'redux/actions/explorer/explorerActions';

import RootContent from 'components/explorer/detail/RootContent';

const propTypes = {
    type: PropTypes.string,
    explorer: PropTypes.object
};

export class RootContentContainer extends React.Component {

    render() {
        return (
            <RootContent {...this.props} />
        );
    }
}

RootContentContainer.propTypes = propTypes;

export default connect(
    (state) => ({ explorer: state.explorer }),
    (dispatch) => bindActionCreators(explorerActions, dispatch)
)(RootContentContainer);
