/**
 * Download.jsx
 * Created by Kevin Li 1/23/18
 */

import React from 'react';

import { downloadOptions } from 'dataMapping/navigation/menuOptions';

import DownloadPlaceholder from './DownloadPlaceholder';
import DesktopButton from './DesktopButton';

export default class Download extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: null,
            hoveringInCenter: false
        };

        this.changeActiveItem = this.changeActiveItem.bind(this);
        this.exitedSection = this.exitedSection.bind(this);
        this.exitedCenter = this.exitedCenter.bind(this);
        this.enteredCenter = this.enteredCenter.bind(this);
    }

    changeActiveItem(type) {
        this.setState({
            type
        });
    }

    exitedSection(e) {
        e.stopPropagation();

        this.setState({
            type: null,
            hoveringInCenter: false
        });
    }

    exitedCenter(e) {
        e.stopPropagation();
        this.setState({
            hoveringInCenter: false
        });
    }

    enteredCenter() {
        this.setState({
            hoveringInCenter: true
        });
    }

    render() {
        const leftItems = downloadOptions.slice(0, 3).map((item) => (
            <li
                key={item.code}>
                <DesktopButton {...item} />
            </li>
        ));
        const rightItems = downloadOptions.slice(3).map((item) => (
            <li
                key={item.code}>
                <DesktopButton {...item} />
            </li>
        ));

        return (
            <section
                className="homepage-download"
                aria-label="Download options"
                onMouseLeave={this.exitedSection}>
                <div className="homepage-download__wrapper">
                    <ul
                        className="homepage-download__list homepage-download__list_desktop homepage-download__list_left">
                        {leftItems}
                    </ul>

                    <div
                        className="homepage-download__detail"
                        onMouseEnter={this.enteredCenter}
                        onMouseLeave={this.exitedCenter}>
                        <DownloadPlaceholder />
                    </div>

                    <ul
                        className="homepage-download__list homepage-download__list_desktop homepage-download__list_right">
                        {rightItems}
                    </ul>
                </div>
            </section>
        );
    }
}
