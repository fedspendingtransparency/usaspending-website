/**
 * DownloadBottomBar.jsx
 * Created by Kevin Li 8/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { ExclamationCircle, CheckCircle } from 'components/sharedComponents/icons/Icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const propTypes = {
    showError: PropTypes.bool,
    showSuccess: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    download: PropTypes.object
};

const defaultProps = {
    showError: false,
    showSuccess: false
};

const Spinner = () => (
    <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
    </div>
);

export default class DownloadBottomBar extends React.Component {
    constructor(props) {
        super(props);

        this.onCopy = this.onCopy.bind(this);

        this.state = {
            copied: false
        };
    }

    onCopy() {
        this.setState({
            copied: true
        });
    }

    render() {
        let leftIcon = <Spinner />;
        if (this.props.showError) {
            leftIcon = <ExclamationCircle alt="Error" />;
        }
        else if (this.props.showSuccess) {
            leftIcon = <CheckCircle alt="Ready for Download" />;
        }

        const icon = (
            <div className="icon valid">
                <CheckCircle />
            </div>
        );

        return (
            <div className="floating-download-bottom-bar">
                <div className="bottom-bar-content">
                    <div className="left-icon">
                        {leftIcon}
                    </div>
                    <div className="text-content">
                        <div className="title">
                            {this.props.title}
                        </div>
                        <p>
                            {this.props.description}
                        </p>
                        {this.state.copied ? <span>{icon}</span> : null}
                        <CopyToClipboard
                            text={this.props.download.expectedUrl}
                            onCopy={this.onCopy}>
                            <button>{this.state.copied ? 'Copied' : 'Your Download Link'}</button>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
        );
    }
}

DownloadBottomBar.propTypes = propTypes;
DownloadBottomBar.defaultProps = defaultProps;
