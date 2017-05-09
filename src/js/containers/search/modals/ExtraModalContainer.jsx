/**
 * ExtraModalContainer.jsx
 * Created by Kevin Li 5/5/17
 */

import React from 'react';

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
            location: 'dd',
            animate: true
        };

        this.request = null;
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

        this.request = DownloadHelper.requestAwardTable({
            req: this.props.lastReq
        });

        this.request.promise
            .then((res) => {
                this.parseReponse(res.data);
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.status) {
                    this.setState({
                        title: 'An error occurred while generating the file.',
                        message: err.response.data.status,
                        location: 'dddd',
                        animate: false
                    });
                }
            });
    }

    parseReponse(data) {
        let title = 'A link to the file is being generated.';
        let animate = true;

        if (data.location && data.location !== '') {
            title = 'A link to the file has been generated successfully.';
            animate = false;
        }

        this.setState({
            title,
            animate,
            message: data.status,
            location: data.location
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
