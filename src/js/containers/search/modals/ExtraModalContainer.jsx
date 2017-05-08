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
            activeReq: ''
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

        // this.request.promise
        //     .then(())
    }

    render() {
        return (
            <ExtraModal
                {...this.props}
                title={this.state.title}
                message={this.state.message} />
        );
    }
}

ExtraModalContainer.propTypes = propTypes;

export default ExtraModalContainer;
