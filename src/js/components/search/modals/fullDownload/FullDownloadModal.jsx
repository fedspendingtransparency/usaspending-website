/**
 * FullDownloadModal.jsx
 * Created by Kevin Li 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';

import { Close } from 'components/sharedComponents/icons/Icons';

import TopFilterBarContainer from 'containers/search/topFilterBar/TopFilterBarContainer';

import DownloadBreadcrumb from './breadcrumb/DownloadBreadcrumb';

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func
};

export default class FullDownloadModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            downloadStep: 1
        };

        this.goToStep = this.goToStep.bind(this);
    }

    goToStep(step) {
        // we can only go backwards
        if (step >= this.state.downloadStep) {
            return;
        }

        this.setState({
            downloadStep: step
        });
    }

    render() {
        return (
            <Modal
                mounted={this.props.mounted}
                onExit={this.props.hideModal}
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
                    </div>
                </div>
            </Modal>
        );
    }
}

FullDownloadModal.propTypes = propTypes;
