/**
 * FullDownloadModalContainer.jsx
 * Created by Kevin Li 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as downloadActions from 'redux/actions/search/downloadActions';

import FullDownloadModal from 'components/search/modals/fullDownload/FullDownloadModal';

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
    setDownloadCollapsed: PropTypes.func,
    pendingDownload: PropTypes.bool,
    download: PropTypes.object
};

export class FullDownloadModalContainer extends React.Component {
    render() {
        return (
            <FullDownloadModal
                setDownloadCollapsed={this.props.setDownloadCollapsed}
                pendingDownload={this.props.pendingDownload}
                download={this.props.download}
                mounted={this.props.mounted}
                hideModal={this.props.hideModal} />
        );
    }
}

FullDownloadModalContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        pendingDownload: state.download.pendingDownload,
        download: state.download
    }),
    (dispatch) => bindActionCreators(downloadActions, dispatch)
)(FullDownloadModalContainer);
