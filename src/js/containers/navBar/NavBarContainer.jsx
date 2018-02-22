/**
 * NavBarContainer.jsx
 * Created by Lizzie Salita 2/22/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as redirectModalActions from 'redux/actions/redirectModal/redirectModalActions';

import NavBar from 'components/sharedComponents/header/NavBar';

require('pages/redirect/redirectModal.scss');

const propTypes = {
    showModal: PropTypes.func
};

export class NavBarContainer extends React.Component {
    render() {
        return (
            <NavBar
                redirect={this.props.showModal} />
        );
    }
}

NavBarContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        redirectModal: state.redirectModal
    }),
    (dispatch) => bindActionCreators(redirectModalActions, dispatch)
)(NavBarContainer);
