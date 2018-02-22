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

require('pages/redirect/redirectModal.scss');

const propTypes = {
    redirectModal: PropTypes.object,
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    setModalUrl: PropTypes.func,
    clearModalUrl: PropTypes.func
};

export class RedirectModalContainer extends React.Component {
    constructor(props) {
        super(props);

        this.hideModal = this.hideModal.bind(this);
    }

    hideModal() {
        this.props.hideModal();
        this.props.clearModalUrl();
    }

    render() {
        return (
            <RedirectModal
                mounted={this.props.redirectModal.display}
                hideModal={this.hideModal}
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
