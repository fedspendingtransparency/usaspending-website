/**
 * RedirectModalContainer.jsx
 * Created by Lizzie Salita 2/22/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as redirectModalActions from 'redux/actions/redirectModal/redirectModalActions';

import RedirectModal from 'components/sharedComponents/RedirectModal';

const propTypes = {
    redirectModal: PropTypes.object,
    hideModal: PropTypes.func
};

export class RedirectModalContainer extends React.Component {
    render() {
        return (
            <RedirectModal
                mounted={this.props.redirectModal.display}
                hideModal={this.props.hideModal}
                url={this.props.redirectModal.url} />
        );
    }
}

RedirectModalContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        redirectModal: state.redirectModal
    }),
    (dispatch) => bindActionCreators(redirectModalActions, dispatch)
)(RedirectModalContainer);
