/**
 * ExplorerSidebar.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Home } from 'components/sharedComponents/icons/Icons';

import VerticalTrail from './VerticalTrail';
import QuarterPicker from './QuarterPicker';

const propTypes = {
    fy: PropTypes.string,
    trail: PropTypes.object,
    setExplorerYear: PropTypes.func,
    rewindToFilter: PropTypes.func
};

export default class ExplorerSidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showFYMenu: false
        };

        this.toggleFYMenu = this.toggleFYMenu.bind(this);
        this.pickedYear = this.pickedYear.bind(this);
    }

    toggleFYMenu() {
        this.setState({
            showFYMenu: !this.state.showFYMenu
        });
    }

    pickedYear(year) {
        this.props.setExplorerYear(year);
        this.setState({
            showFYMenu: false
        });
    }

    render() {
        return (
            <div className="explorer-sidebar">
                <div className="start-over">
                    <a
                        className="start-over-button"
                        href="#/explorer">
                        <div className="content">
                            <div className="icon">
                                <Home alt="Home" />
                            </div>
                            <div className="label">
                                Start Over
                            </div>
                        </div>
                    </a>
                </div>

                <QuarterPicker
                    fy={this.props.fy}
                    quarter={1} />

                <VerticalTrail
                    trail={this.props.trail.toArray()}
                    rewindToFilter={this.props.rewindToFilter} />

            </div>
        );
    }
}

ExplorerSidebar.propTypes = propTypes;
