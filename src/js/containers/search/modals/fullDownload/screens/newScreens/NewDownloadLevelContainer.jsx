/**
 * NewDownloadLevelContainer.jsx
 * Created by Nick Torres 3/3/26
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as downloadActions from 'redux/actions/search/downloadActions';

import NewDownloadLevel from 'components/search/modals/fullDownload/screens/newScreens/NewDownloadLevel';

const propTypes = {
    download: PropTypes.object
};

const NewDownloadLevelContainer = (props) => (
    <NewDownloadLevel {...props} />
);

NewDownloadLevelContainer.propTypes = propTypes;

export default connect(
    (state) => ({ download: state.download }),
    (dispatch) => bindActionCreators(downloadActions, dispatch)
)(NewDownloadLevelContainer);
