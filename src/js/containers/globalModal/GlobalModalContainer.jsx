/**
 * GlobalModalContainer.jsx
 * Created by Lizzie Salita 2/22/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as redirectModalActions from 'redux/actions/modal/modalActions';

import RedirectModal from 'components/sharedComponents/RedirectModal';

const propTypes = {
    globalModal: PropTypes.shape({
        display: PropTypes.bool,
        url: PropTypes.string,
        modal: PropTypes.oneOf(['redirect', '', 'covid'])
    }),
    hideModal: PropTypes.func
};

export class GlobalModalContainer extends React.Component {
    render() {
        if (this.props.globalModal.modal === "redirect") {
            return (
                <RedirectModal
                    mounted={this.props.globalModal.display}
                    hideModal={this.props.hideModal}
                    url={this.props.globalModal.url} />
            );
        }
        return null;
    }
}

GlobalModalContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        globalModal: state.modal
    }),
    (dispatch) => bindActionCreators(redirectModalActions, dispatch)
)(GlobalModalContainer);
