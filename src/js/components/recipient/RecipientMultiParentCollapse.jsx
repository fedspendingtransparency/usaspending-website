/**
 * RecipientMultiParentCollapse.jsx
 * Created by Kwadwo Opoku-Debrah 12/21/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { InfoCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    topLink: PropTypes.string,
    topName: PropTypes.string,
    topDuns: PropTypes.string,
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
        // {this.props.parents}
        // TODO: Refactor out inline style
        const drawnArray = [];
        this.props.parents.forEach((value) => {
            drawnArray.push(
                <a
                    style={{ display: 'block' }}
                    key={value.parent_duns}
                    href={`#/recipient/${value.parent_id}`}>
                    {value.parent_name} {value.parent_duns}
                </a>
            );
        });
        return drawnArray;
    }


    render() {
        const isSingleParent = this.props.parents.length < 2;
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
                            href={this.props.topLink}>
                            {this.props.topName} {this.props.topDuns}
                        </a> :
                        <div className={this.state.open ? '' : 'hide'}>
                            {this.renderMultipleParents()}
                        </div>
                }
                {
                    isSingleParent ?
                        '' :
                        <button
                            className="usa-button-link"
                            onClick={this.collapse}>Show {this.props.parents.length} more
                        </button>
                }
            </div>
        );
    }
}
RecipientMultiParentCollapse.propTypes = propTypes;
