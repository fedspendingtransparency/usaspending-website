/**
 * GlobalModalContainer.jsx
 * Created by Lizzie Salita 2/22/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { hideModal } from 'redux/actions/modal/modalActions';
import RedirectModal from 'components/sharedComponents/RedirectModal';
import InterimDataDisclaimerModal from 'components/covid19/InterimDataDisclaimerModal';
import CovidModalContainer from 'containers/covid19/CovidModalContainer';

import { globalModalProps } from '../../propTypes';

const propTypes = {
    globalModal: globalModalProps,
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
        if (this.props.globalModal.modal === "covid") {
            return (
                <CovidModalContainer
                    mounted={this.props.globalModal.display}
                    hideModal={this.props.hideModal} />
            );
        }
        if (this.props.globalModal.modal === "covid-data-disclaimer") {
            return (
                <InterimDataDisclaimerModal
                    mounted={this.props.globalModal.display}
                    hideModal={this.props.hideModal} />
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
    (dispatch) => ({
        hideModal: () => dispatch(hideModal())
    })
)(GlobalModalContainer);
