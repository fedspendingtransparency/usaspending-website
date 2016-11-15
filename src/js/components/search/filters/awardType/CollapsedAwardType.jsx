/**
 * collapsedAwardType.jsx
 * Created by Emily Gullo 11/02/2016
 **/

import React from 'react';
import AwardExpandButton from './AwardExpandButton';

const defaultProps = {
    id: '',
    name: '',
    selected: false,
    hideArrow: true,
    arrowState: 'collapsed'
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
        return (
            <div className="primary-award-type">
                <div className="award-type-item-wrapper">
                    <AwardExpandButton
                        hidden={this.props.hideArrow}
                        toggleExpand={this.props.toggleExpand} />
                    <input
                        type="checkbox"
                        id={this.props.id}
                        value={this.props.name}
                        checked={this.props.selected}
                        onChange={this.props.toggleChildren} />
                    <label htmlFor={this.props.id}>{this.props.name}</label>
                </div>
            </div>
        );
    }

}

CollapsedAwardType.propTypes = propTypes;
CollapsedAwardType.defaultProps = defaultProps;
