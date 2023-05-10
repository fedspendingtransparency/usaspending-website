/**
 * MobileDropdown.jsx
 * Created by Kevin Li 10/2/17
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import MobileDropdownItem from './MobileDropdownItem';

const propTypes = {
    hideMobileNav: PropTypes.func,
    active: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string.isRequired,
    section1Items: PropTypes.array,
    section2Items: PropTypes.array,
    section3Items: PropTypes.array,
    section1Options: PropTypes.array,
    section2Options: PropTypes.array,
    section3Options: PropTypes.array,
    index: PropTypes.number
};

export default class MobileDropdown extends React.Component {
    constructor(props) {
        super(props);

        console.log('props', props);

        this.state = {
            expandedDropdown: false
        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
    }

    toggleDropdown() {
        this.setState({
            expandedDropdown: !this.state.expandedDropdown
        });
    }

    closeDropdown() {
        this.setState({
            expandedDropdown: false
        });
    }

    render() {
        let hideList = '';
        if (!this.state.expandedDropdown) {
            hideList = 'mobile-dropdown__list_hide';
        }


        // const items = this.props.items.map((item) => (
        //     <MobileDropdownItem
        //         {...item}
        //         key={item.url}
        //         comingSoon={!item.enabled}
        //         title={item.label}
        //         isNewTab={item.isNewTab}
        //         url={item.url}
        //         active={item.url === this.props.active}
        //         externalLink={item.externalLink}
        //         hideMobileNav={this.props.hideMobileNav} />
        // ));

        // TODO - REPLACE THIS WITH AN INDIVIDUAL PROP FOR NEW ITEM
        // const containsNewNavItem = this.props.items.some(({ isNewTab }) => isNewTab);

        return (
            <div className="mobile-dropdown">
                <button
                    className="mobile-dropdown__parent"
                    title={this.props.title || this.props.label}
                    onClick={this.toggleDropdown}>
                    <span className="mobile-dropdown__parent-label">
                        {/* {containsNewNavItem && */}
                        {/*     <div className="new-badge-outer"> */}
                        {/*         <FontAwesomeIcon icon="circle" /> */}
                        {/*     </div> */}
                        {/* } */}
                        {this.props.label}
                    </span>
                    <span className="mobile-dropdown__parent-icon">
                        <FontAwesomeIcon icon="chevron-right" />
                    </span>
                </button>

                <ul className={`mobile-dropdown__list ${hideList}`}>
                    <MobileDropdownItem {...this.props} />
                </ul>
            </div>
        );
    }
}

MobileDropdown.propTypes = propTypes;
