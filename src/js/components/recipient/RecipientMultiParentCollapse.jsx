/**
 * RecipientMultiParentCollapse.jsx
 * Created by Kwadwo Opoku-Debrah 12/21/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { InfoCircle, AngleDown } from 'components/sharedComponents/icons/Icons';

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
                        // Render only top level parent if there's only 1 parent
                        <div className="recipient-overview__parent">
                            This recipient is a child of &nbsp;
                            <a
                                className="recipient-overview__parent-link"
                                href={`#/recipient/${initialParent.parent_id}`}>
                                {initialParent.parent_name} {initialDuns}
                            </a>
                        </div>
                        :
                        // Render top level parent, then allow hide/show of other parents
                        <div className="recipient-overview__parent">
                            This recipient is associated with multiple parents in the dataset:
                            <span className="tooltip-popover-container">
                                <InfoCircle />
                                <span className="tooltip-popover above">
                                    <div>
                                        <InfoCircle />
                                    </div>
                                    <div>
                                        <p className="title">Explanation of Multiple Parents</p>
                                        <p className="title">
                                            This recipient is associated with multiple parents in the dataset.
                                            Among other cases, this could result from:
                                        </p>

                                        <p>
                                            1) A legal entity was bought or sold to another legal entity
                                        </p>
                                        <p>
                                            2) An internal restructuring of a large company caused a legal entity
                                            to list another parent
                                        </p>
                                        <p>
                                            3) A new entity was created to be used solely as the parent legal
                                            entity for a large organization
                                        </p>
                                        <p>
                                            4) Data entry errors of parent information in SAM.gov or Dun and
                                            Bradstreet that were not immediately corrected
                                        </p>
                                    </div>
                                </span>
                            </span> &nbsp;
                            <a
                                key={initialDuns}
                                className="recipient-overview__multiparents"
                                href={`#/recipient/${initialParent.parent_id}`}>
                                {initialParent.parent_name} {initialDuns}
                            </a>
                            <div className={this.state.open ? '' : 'hide'}>
                                {this.renderMultipleParents()}
                            </div>
                            <button className="usa-button-link" onClick={this.collapse}>
                                {
                                    this.state.open ?
                                        <span>Hide <AngleDown /></span> :
                                        <span>Show {this.props.parents.length - 1} more</span>
                                }
                            </button>
                        </div>
                }
            </div>
        );
    }
}
RecipientMultiParentCollapse.propTypes = propTypes;
