/**
 * BreakdownDropdown.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';

import { dropdownScopes, rootScopes, icons } from 'dataMapping/explorer/dropdownScopes';
import { sidebarTypes } from 'dataMapping/explorer/sidebarStrings';
import ViewTypeButton from 'components/sharedComponents/buttons/ViewTypeButton';
import DropdownItem from './DropdownItem';

const propTypes = {
    isRoot: PropTypes.bool,
    active: PropTypes.object,
    trail: PropTypes.array,
    root: PropTypes.string,
    changeSubdivisionType: PropTypes.func,
    changeView: PropTypes.func,
    viewType: PropTypes.string,
    history: PropTypes.object
};

export class BreakdownDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            options: [],
            active: null
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.pickItem = this.pickItem.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        this.prepareOptions(this.props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.active !== this.props.active) {
            this.prepareOptions(this.props);
        }
        else if (prevProps.root !== this.props.root) {
            this.prepareOptions(this.props);
        }
        else if (prevProps.isRoot !== this.props.isRoot) {
            this.prepareOptions(this.props);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.state.expanded && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                expanded: false
            });
        }
    }

    prepareOptions(props) {
        let options = [];
        let active = props.root;
        if (props.isRoot) {
            // we're at the root level, so populate the full list
            options = rootScopes;
        }
        else {
            // we're not at the root, so we need to determine our current position in the tree using
            // the last filter that was applied
            const optionTree = dropdownScopes[props.root];

            const lastTrailItem = this.props.trail[this.props.trail.length - 1];
            const lastFilter = lastTrailItem.subdivision;

            const currentIndex = Math.min(optionTree.indexOf(lastFilter),
                optionTree.length - 1);
            const accountDepth = optionTree.indexOf('federal_account');
            const programActivityIndex = optionTree.indexOf('program_activity');

            // Check if at or above the Federal Account level
            if (currentIndex <= accountDepth) {
                if (programActivityIndex !== -1) {
                    // remove program activity from the options
                    optionTree.splice(programActivityIndex, 1);
                }
            }

            const remainingTree = optionTree.slice(currentIndex);

            options = remainingTree;

            active = props.active.subdivision;
        }

        this.setState({
            options,
            active
        });
    }

    toggleMenu() {
        this.setState({
            expanded: !this.state.expanded
        }, () => {
            if (this.state.expanded) {
                document.addEventListener('mousedown', this.handleClickOutside);
            }
            else {
                document.removeEventListener('mousedown', this.handleClickOutside);
            }
        });
    }

    pickItem(item) {
        this.setState({
            expanded: false
        }, () => {
            if (this.props.isRoot && item !== this.props.root) {
                // TODO redirect to the correct root URL
                this.props.history.push(`/explorer/${item}`);
            }
            else if (!this.props.isRoot) {
                this.props.changeSubdivisionType(item);
            }
        });
    }

    render() {
        let dropdown = null;
        if (this.state.expanded) {
            const items = this.state.options.map((option) => (
                <DropdownItem
                    key={option}
                    value={option}
                    pickItem={this.pickItem} />
            ));
            dropdown = (
                <ul className="dropdown__menu">
                    {items}
                </ul>);
        }

        let icon = null;
        const IconType = icons[this.state.active];
        if (IconType) {
            icon = <IconType />;
        }

        return (
            <div className="explorer-toolbar" ref={this.setWrapperRef}>
                <div className="explorer-toolbar__breakdown">
                    <div className="breakdown__label">
                        See the breakdown by:
                    </div>
                    <div className="breakdown__dropdown">
                        <button
                            className="dropdown__selection"
                            onClick={this.toggleMenu}>
                            <div className="dropdown__icon">
                                {icon}
                            </div>
                            <div className="dropdown__label">
                                {sidebarTypes[this.state.active]}
                            </div>
                            <div className="dropdown__arrow">
                                <FontAwesomeIcon icon="angle-down" />
                            </div>
                        </button>

                        {dropdown}
                    </div>
                </div>
                <div className="view-buttons">
                    <ViewTypeButton
                        value="treemap"
                        label="Treemap"
                        icon="th-large"
                        active={this.props.viewType === 'treemap'}
                        changeView={this.props.changeView} />
                    <ViewTypeButton
                        value="table"
                        label="Table"
                        icon="table"
                        active={this.props.viewType === 'table'}
                        changeView={this.props.changeView} />
                </div>
            </div>
        );
    }
}

BreakdownDropdown.propTypes = propTypes;
export default withRouter(BreakdownDropdown);
