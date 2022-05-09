/**
 * FullDownloadModal.jsx
 * Created by Kevin Li 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';

import { Close } from 'components/sharedComponents/icons/Icons';

import TopFilterBarContainer from 'containers/search/topFilterBar/TopFilterBarContainer';
import DownloadLevelContainer from
    'containers/search/modals/fullDownload/screens/DownloadLevelContainer';
import DownloadScopeContainer from
    'containers/search/modals/fullDownload/screens/DownloadScopeContainer';

import DownloadBreadcrumb from './breadcrumb/DownloadBreadcrumb';

import DownloadProgress from './screens/DownloadProgress';

const propTypes = {
    mounted: PropTypes.bool,
    download: PropTypes.object,
    hideModal: PropTypes.func,
    setDownloadCollapsed: PropTypes.func,
    pendingDownload: PropTypes.bool
};

export default class FullDownloadModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            downloadStep: 1
        };

        this.goToStep = this.goToStep.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!this.props.pendingDownload && prevProps.pendingDownload) {
            // we went from there being a download to there not being a download
            // this likely means the download finished (or failed), so the user can start a new
            // download request after closing the modal.
            this.resetModal();
        }
    }
    resetModal() {
        this.setState({
            downloadStep: 1
        }, () => {
            this.props.hideModal();
        });
    }

    hideModal() {
    // reset the state before closing, but only if we're not on the download screen
        if (this.state.downloadStep === 3 || this.props.pendingDownload) {
            this.props.setDownloadCollapsed(true);
            this.props.hideModal();
            return;
        }

        this.setState({
            downloadStep: 1
        }, () => {
            this.props.hideModal();
        });
    }

    goToStep(step, override = false) {
    // we can only go backwards
        if (step >= this.state.downloadStep && !override) {
            return;
        }

        this.setState({
            downloadStep: step
        });
    }

    render() {
        let content = <DownloadLevelContainer goToStep={this.goToStep} />;
        if (this.state.downloadStep === 2) {
            content = <DownloadScopeContainer goToStep={this.goToStep} />;
        }
        else if (this.state.downloadStep === 3) {
            content = (<DownloadProgress
                hideModal={this.hideModal}
                download={this.props.download}
                setDownloadCollapsed={this.props.setDownloadCollapsed}
                expectedUrl={this.props.download.expectedUrl} />);
        }

        return (
            <Modal
                mounted={this.props.mounted}
                onExit={this.hideModal}
                titleText="Additional Options"
                dialogClass="search-section-extra-modal"
                verticallyCenter
                escapeExits>
                <div className="full-download-modal">
                    <div className="download-header">
                        <div className="header-content">
                            <h1>Download Data</h1>
                            <div className="close-wrapper">
                                <button
                                    className="close-button"
                                    onClick={this.props.hideModal}
                                    title="Close"
                                    aria-label="Close">
                                    <Close alt="Close modal" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="download-body">
                        <div className="download-filter-bar">
                            <TopFilterBarContainer compressed />
                        </div>
                        <DownloadBreadcrumb
                            step={this.state.downloadStep}
                            goToStep={this.goToStep} />
                        {content}
                    </div>
                </div>
            </Modal>
        );
    }
}

FullDownloadModal.propTypes = propTypes;
