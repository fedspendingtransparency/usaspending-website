/**
 * Download.jsx
 * Created by Kevin Li 1/23/18
 */

import React from 'react';

import { downloadOptions } from 'dataMapping/navigation/menuOptions';

import DownloadPlaceholder from './DownloadPlaceholder';
import DownloadDetail from './DownloadDetail';
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
    }

    changeActiveItem(index) {
        this.setState({
            type: downloadOptions[index]
        });
    }

    exitedSection(e) {
        if (e) {
            e.stopPropagation();
        }

        this.setState({
            type: null,
            hoveringInCenter: false
        });
    }

    exitedCenter(e) {
        if (e) {
            e.stopPropagation();
        }

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
        const leftItems = downloadOptions.slice(0, 3).map((item, index) => (
            <li
                className="homepage-download__list-item"
                key={item.code}>
                <DesktopButton
                    {...item}
                    index={index}
                    active={this.state.type && this.state.type.code === item.code}
                    changeActiveItem={this.changeActiveItem}
                    forceClear={this.exitedSection} />
            </li>
        ));
        const rightItems = downloadOptions.slice(3, 6).map((item, index) => (
            <li
                className="homepage-download__list-item"
                key={item.code}>
                <DesktopButton
                    {...item}
                    index={index + 3}
                    active={this.state.type && this.state.type.code === item.code}
                    changeActiveItem={this.changeActiveItem}
                    forceClear={this.exitedSection} />
            </li>
        ));

        let center = (
            <DownloadPlaceholder />
        );
        if (this.state.type) {
            center = (
                <DownloadDetail
                    {...this.state.type} />
            );
        }

        return (
            <section
                className="homepage-download"
                aria-label="Download options">
                <div
                    className="homepage-download__wrapper"
                    onMouseLeave={this.exitedSection}>
                    <ul
                        className="homepage-download__list homepage-download__list_desktop homepage-download__list_left">
                        {leftItems}
                    </ul>
                    <div
                        className="homepage-download__detail">
                        {center}
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
