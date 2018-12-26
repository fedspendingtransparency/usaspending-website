/**
 * RecipientMultiParentCollapse.jsx
 * Created by Kwadwo Opoku-Debrah 12/21/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { InfoCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    parents: PropTypes.array
};

export default class RecipientMultiParentCollapse extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.collapse = this.collapse.bind(this);
        this.renderMultipleParents = this.renderMultipleParents.bind(this);
    }
    collapse() {
        this.setState({
            open: !this.state.open
        });
    }
    renderMultipleParents() {
        const drawnArray = [];
        for (let i = 1; i < this.props.parents.length; i++) {
            const currentValue = this.props.parents[i];
            drawnArray.push(
                <a
                    className="recipient-overview__multiparents"
                    key={currentValue.parent_duns}
                    href={`#/recipient/${currentValue.parent_id}`}>
                    {currentValue.parent_name}
                    {currentValue.parent_duns ? `(${currentValue.parent_duns})` : ''}
                </a>
            );
        }
        return drawnArray;
    }

    // TODO: Swap the "show" button to hide when dropdown is open

    render() {
        const isSingleParent = this.props.parents.length < 2;
        const initialParent = this.props.parents[0];
        let initialDuns = '';
        if (initialParent.parent_duns) {
            initialDuns = `(${initialParent.parent_duns})`;
        }
        return (
            <div className="recipient-overview__parent">
                {
                    isSingleParent ?
                        <span>
                            This recipient is a child of &nbsp;
                        </span> :
                        <div>
                            This recipient is associated with multiple parents in the dataset:
                            <InfoCircle /> &nbsp;
                        </div>

                }
                {
                    isSingleParent ?
                        <a
                            className="recipient-overview__parent-link"
                            href={`#/recipient/${initialParent.parent_id}`}>
                            {initialParent.parent_name} {initialDuns}
                        </a> :
                        <div>
                            <a
                                key={initialDuns}
                                className="recipient-overview__multiparents"
                                href={`#/recipient/${initialParent.parent_id}`}>
                                {initialParent.parent_name} {initialDuns}
                            </a>
                            <div className={this.state.open ? '' : 'hide'}>
                                {this.renderMultipleParents()}
                            </div>
                        </div>
                }
                {
                    isSingleParent ?
                        '' :
                        <button
                            className="usa-button-link"
                            onClick={this.collapse}>Show {this.props.parents.length - 1} more
                        </button>
                }
            </div>
        );
    }
}
RecipientMultiParentCollapse.propTypes = propTypes;
