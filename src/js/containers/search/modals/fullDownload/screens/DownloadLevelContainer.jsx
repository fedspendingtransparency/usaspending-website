/**
 * DownloadLevelContainer.jsx
 * Created by Kevin Li 8/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as downloadActions from 'redux/actions/search/downloadActions';

import DownloadLevel from 'components/search/modals/fullDownload/screens/DownloadLevel';

const propTypes = {
    download: PropTypes.object
};

export class DownloadLevelContainer extends React.Component {
    render() {
        return (
            <DownloadLevel {...this.props} />
        );
    }
}

DownloadLevelContainer.propTypes = propTypes;

export default connect(
    (state) => ({ download: state.download }),
    (dispatch) => bindActionCreators(downloadActions, dispatch)
)(DownloadLevelContainer);
