/**
 * collapsedAwardType.jsx
 * Created by Emily Gullo 11/02/2016
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

const defaultProps = {
    id: '',
    name: '',
    selected: false,
    hideArrow: true
};

const propTypes = {
    id: React.PropTypes.string,
    toggleExpand: React.PropTypes.func,
    toggleChildren: React.PropTypes.func,
    name: React.PropTypes.string,
    selected: React.PropTypes.bool,
    hideArrow: React.PropTypes.bool
};

export default class CollapsedAwardType extends React.Component {

    render() {
        let hiddenClass = '';
        if (this.props.hideArrow) {
            hiddenClass = ' hide';
        }
        return (
            <div className="primaryAwardTypeOption">
                <input
                    type="checkbox"
                    id={this.props.id}
                    value={this.props.name}
                    checked={this.props.selected}
                    onChange={this.props.toggleChildren} />
                <label htmlFor={this.props.id}>{this.props.name}</label>
                <a
                    className={`toggle ${hiddenClass}`}
                    href="#null"
                    onClick={this.props.toggleExpand}>
                    <Icons.AngleDown />
                </a>
            </div>
        );
    }

}

CollapsedAwardType.propTypes = propTypes;
CollapsedAwardType.defaultProps = defaultProps;
