/**
 * ModalContent.jsx
 * Created by Lizzie Salita 11/3/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { CheckCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    hideModal: PropTypes.func,
    setDownloadCollapsed: PropTypes.func,
    expectedFile: PropTypes.string,
    expectedUrl: PropTypes.string,
    download: PropTypes.object
};

export default class DownloadProgress extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            copied: false
        };

        this.onCopy = this.onCopy.bind(this);
    }

    componentDidMount() {
        this.props.setDownloadCollapsed(true);
    }

    onCopy() {
        this.setState({
            copied: true
        });
    }

    render() {
        const icon = (
            <div className="icon valid">
                <CheckCircle />
            </div>
        );
        return (
            <div className="download-progress-screen">
                <div className="main-title">
                    <h3>We&#8217;re preparing your download.</h3>
                    <div className="details">
                        This may take a little while &mdash; wait times vary based on site traffic and file size.
                    </div>
                    <div className="link-box">
                        <p>Once your download is ready, you can use this link to access it anytime.</p>
                        <div className="link">{this.props.expectedUrl}</div>

                        <CopyToClipboard
                            text={this.props.expectedUrl}
                            onCopy={this.onCopy}>
                            <button>
                                {this.state.copied ? <span>{icon}</span> : null}
                                {this.state.copied ? 'Copied' : 'Copy Link'}
                            </button>
                        </CopyToClipboard>
                    </div>
                    <div className="sub-details">
                        To keep browsing, close this box; your download status will appear at the bottom of the screen.
                    </div>
                    <button className="finish-button" onClick={this.props.hideModal}>Close</button>
                </div>
            </div>
        );
    }
}

DownloadProgress.propTypes = propTypes;
