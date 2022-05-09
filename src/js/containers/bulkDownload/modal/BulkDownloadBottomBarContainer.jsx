/**
 * BulkDownloadBottomBarContainer.jsx
 * Created by Lizzie Salita 11/3/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import * as bulkDownloadActions from 'redux/actions/bulkDownload/bulkDownloadActions';

import DownloadBottomBar from 'components/search/modals/fullDownload/DownloadBottomBar';

import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';

const propTypes = {
    bulkDownload: PropTypes.object,
    setDownloadPending: PropTypes.func,
    setDownloadCollapsed: PropTypes.func,
    setDownloadExpectedFile: PropTypes.func,
    resetDownload: PropTypes.func
};

export class BulkDownloadBottomBarContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            showError: false,
            showSuccess: false,
            title: 'We\'re preparing your download(s)...',
            description: 'If you plan to leave the site, copy the download link before you go - you\'ll need it to access your file.'
        };

        this.request = null;
        this.statusRequest = null;
        this.statusTimer = null;
        this.statusCount = 0;

        this.checkStatus = this.checkStatus.bind(this);
        this.closeBar = this.closeBar.bind(this);
        this.windowWillClose = this.windowWillClose.bind(this);
    }

    componentDidMount() {
        if (this.props.bulkDownload.download.pendingDownload && this.props.bulkDownload.download.showCollapsedProgress &&
            !this.state.visible) {
            this.checkStatus();
            this.displayBar();
        }
    }

    componentDidUpdate() {
        if (this.props.bulkDownload.download.pendingDownload && this.props.bulkDownload.download.showCollapsedProgress && !this.state.visible) {
            this.checkStatus();
            this.displayBar();
        }
    }

    componentWillUnmount() {
    // this happens when page navigation occurs
        window.removeEventListener('beforeunload', this.windowWillClose);
        window.clearTimeout(this.statusTimer);
    }

    displayBar() {
    // monitor for window close events
        window.addEventListener('beforeunload', this.windowWillClose);
        this.setState({
            visible: true,
            showError: false,
            showSuccess: false,
            title: 'We\'re preparing your download(s)...',
            description: 'If you plan to leave the site, copy the download link before you go - you\'ll need it to access your file.'
        }, this.checkStatus);
    }

    checkStatus() {
        if (this.props.bulkDownload.download.expectedFile !== '') {
            if (this.statusRequest) {
                this.statusRequest.cancel();
            }
            this.statusRequest = BulkDownloadHelper.requestBulkDownloadStatus({
                file_name: this.props.bulkDownload.download.expectedFile
            });

            this.statusRequest.promise
                .then((res) => {
                    this.parseStatus(res.data);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        // something went wrong
                        console.log(err);

                        if (err.response) {
                            this.displayError(err.response.data.message);
                        }
                        else {
                            this.displayError(err.message);
                        }
                    }
                });
        }
    }

    parseStatus(data) {
        if (data.status === 'finished') {
            // download is ready
            this.downloadFile(data.file_url);
            return;
        }
        else if (data.status === 'failed') {
            this.displayError(data.message);
            return;
        }
        this.scheduleNextStatus();
    }

    scheduleNextStatus() {
    // determine when the next status check should be
    // it should be 15 seconds for the first minute, then 30 seconds after that
        let timeToWait = 15;
        if (this.statusCount >= 4) {
            timeToWait = 30;
        }

        if (this.statusTimer) {
            window.clearTimeout(this.statusTimer);
        }

        this.statusTimer = window.setTimeout(this.checkStatus, timeToWait * 1000);
        this.statusCount += 1;
    }

    displayError(message) {
    // update redux
        this.props.setDownloadPending(false);
        this.props.setDownloadCollapsed(false);

        this.setState({
            showError: true,
            title: 'An error occurred while generating your file.',
            description: message
        }, () => {
            window.setTimeout(this.closeBar, 5000); // close the bar in 5 seconds
        });
    }

    downloadFile(url) {
    // stop monitoring for window close events
        window.removeEventListener('beforeunload', this.windowWillClose);

        // start the download
        window.open(url, '_self');

        // update redux
        this.props.setDownloadPending(false);
        this.props.setDownloadCollapsed(false);

        this.setState({
            showSuccess: true,
            title: 'Your file is ready for download.',
            description: 'Your download should begin automatically.'
        }, () => {
            window.setTimeout(this.closeBar, 5000); // close the bar in 5 seconds
        });
    }

    closeBar() {
    // stop monitoring for window close events
        window.removeEventListener('beforeunload', this.windowWillClose);
        this.props.resetDownload();
        this.setState({
            visible: false
        });
    }

    windowWillClose(e) {
    /* eslint-disable no-param-reassign */
    // we need to modify the browser event to trigger a warning message
        e.returnValue = `You have a file that is still being generated. If you leave, the file \
will no longer download to your computer. Are you sure you want to do this?`;
    /* eslint-ensable no-param-reassign */
    }

    render() {
        return (
            <TransitionGroup>
                {this.state.visible && (
                    <CSSTransition
                        classNames="download-slide"
                        timeout={500}
                        exit>
                        <DownloadBottomBar
                            {...this.props}
                            download={this.props.bulkDownload.download}
                            showError={this.state.showError}
                            showSuccess={this.state.showSuccess}
                            title={this.state.title}
                            description={this.state.description} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        );
    }
}

BulkDownloadBottomBarContainer.propTypes = propTypes;

export default connect(
    (state) => ({ bulkDownload: state.bulkDownload }),
    (dispatch) => bindActionCreators(bulkDownloadActions, dispatch)
)(BulkDownloadBottomBarContainer);
