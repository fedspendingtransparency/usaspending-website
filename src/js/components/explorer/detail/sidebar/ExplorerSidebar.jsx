/**
 * ExplorerSidebar.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Home, Calendar, AngleRight } from 'components/sharedComponents/icons/Icons';

import FYPicker from './FYPicker';
import VerticalTrail from './VerticalTrail';

const propTypes = {
    fy: PropTypes.number,
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
        let fyPicker = null;
        if (this.state.showFYMenu) {
            fyPicker = (<FYPicker
                pickedYear={this.pickedYear} />);
        }

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

                <div className="fy-item">
                    <button
                        className="fy-button"
                        onClick={this.toggleFYMenu}
                        disabled>
                        <div className="content">
                            <div className="icon">
                                <Calendar alt="Pick fiscal year" />
                            </div>
                            <div className="label">
                                {this.props.fy}
                            </div>
                            <div className="icon arrow">
                                <AngleRight alt="Show menu" />
                            </div>
                        </div>
                    </button>
                </div>

                {fyPicker}

                <VerticalTrail
                    trail={this.props.trail.toArray()}
                    rewindToFilter={this.props.rewindToFilter} />

            </div>
        );
    }
}

ExplorerSidebar.propTypes = propTypes;
