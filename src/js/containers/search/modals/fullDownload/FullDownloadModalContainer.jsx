/**
 * FullDownloadModalContainer.jsx
 * Created by Kevin Li 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as downloadActions from '../../../../redux/actions/search/downloadActions';
import NewDownloadModal from '../../../../components/search/modals/fullDownload/NewDownloadModal';

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
    setDownloadCollapsed: PropTypes.func,
    pendingDownload: PropTypes.bool,
    download: PropTypes.object,
    awardsCount: PropTypes.number,
    transactionsCount: PropTypes.number,
    subawardsCount: PropTypes.number
};

export class FullDownloadModalContainer extends React.Component {
    render() {
        return (<NewDownloadModal
            setDownloadCollapsed={this.props.setDownloadCollapsed}
            pendingDownload={this.props.pendingDownload}
            download={this.props.download}
            mounted={this.props.mounted}
            hideModal={this.props.hideModal}
            awardsCount={this.props.awardsCount}
            subawardsCount={this.props.subawardsCount}
            transactionsCount={this.props.transactionsCount} />);
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
