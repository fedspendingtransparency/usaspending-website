/**
 * ExtraModalContainer.jsx
 * Created by Kevin Li 5/5/17
 */

import React from 'react';
import { isCancel } from 'axios';

import ExtraModal from 'components/search/modals/ExtraModal';

import * as DownloadHelper from 'helpers/downloadHelper';

const propTypes = {
    lastReq: React.PropTypes.string,
    mounted: React.PropTypes.bool
};

export class ExtraModalContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'A link to the file is being generated.',
            message: 'Requesting file...',
            activeReq: '',
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
        if (this.props.lastReq !== '' && this.props.lastReq !== this.state.activeReq) {
            this.setState({
                activeReq: this.props.lastReq
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

        this.request = DownloadHelper.requestAwardTable({
            req: this.props.lastReq
        });

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
