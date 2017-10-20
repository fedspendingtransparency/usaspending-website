/**
 * ExtraModalContainer.jsx
 * Created by Kevin Li 5/5/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';

import ExtraModal from 'components/search/modals/tableDownload/ExtraModal';

import * as DownloadHelper from 'helpers/downloadHelper';

const propTypes = {
    downloadParams: PropTypes.object,
    mounted: PropTypes.bool
};

export class ExtraModalContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'A link to the file is being generated.',
            message: 'Requesting file...',
            activeParams: '',
            location: '',
            animate: true
        };

        this.request = null;
        this.statusChecker = null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mounted !== this.props.mounted && this.props.mounted) {
            this.modalOpened();
        }
    }


    modalOpened() {
        if (this.props.downloadParams !== {} && this.props.downloadParams !== this.state.activeParams) {
            this.setState({
                activeParams: this.props.downloadParams
            }, () => {
                this.requestDownload();
            });
        }
    }

    requestDownload() {
        if (this.request) {
            this.request.cancel();
        }

        this.setState({
            animate: true,
            location: '',
            title: 'A link to the file is being generated.'
        });

        this.request = DownloadHelper.requestAwardTable(
            this.props.downloadParams
        );

        this.request.promise
            .then((res) => {
                this.parseResponse(res.data);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    if (err.response && err.response.data) {
                        let message = `Error: ${err.response.statusText} (${err.response.status})`;
                        if (err.response.data.status) {
                            message = err.response.data.status;
                        }

                        this.setState({
                            message,
                            title: 'An error occurred while generating the file.',
                            location: '',
                            animate: false
                        });
                    }

                    console.log(err);
                }
            });
    }

    parseResponse(data) {
        let title = 'A link to the file is being generated.';
        let animate = true;

        let done = false;

        if (data.location && data.location !== '') {
            title = 'A link to the file has been generated successfully.';
            animate = false;
            done = true;
        }

        this.setState({
            title,
            animate,
            message: data.status,
            location: data.location
        }, () => {
            if (!done && this.props.mounted) {
                // keep checking every 30 seconds
                this.statusChecker = window.setTimeout(() => {
                    this.requestDownload();
                }, 30 * 1000);
            }
        });
    }

    render() {
        return (
            <ExtraModal
                {...this.props}
                {...this.state} />
        );
    }
}

ExtraModalContainer.propTypes = propTypes;

export default ExtraModalContainer;
