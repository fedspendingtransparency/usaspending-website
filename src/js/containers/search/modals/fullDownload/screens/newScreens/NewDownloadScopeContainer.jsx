/**
 * NewDownloadScopeContainer.jsx
 * Created by Kevin Li 8/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as downloadActions from 'redux/actions/search/downloadActions';

import NewDownloadScope from 'components/search/modals/fullDownload/screens/newScreens/NewDownloadScope';

const propTypes = {
    download: PropTypes.object
};

const NewDownloadScopeContainer = (props) => (
    <NewDownloadScope {...props} />
);

NewDownloadScopeContainer.propTypes = propTypes;

export default connect(
    (state) => ({ download: state.download }),
    (dispatch) => bindActionCreators(downloadActions, dispatch)
)(NewDownloadScopeContainer);
