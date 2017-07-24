/**
 * ItemDefinition.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import MoreResources from './MoreResources';
import SmartLink from './SmartLink';

const propTypes = {
    type: PropTypes.string,
    term: PropTypes.string,
    data_act_term: PropTypes.string,
    resources: PropTypes.string
};

export default class ItemDefinition extends React.Component {
    render() {
        let resources = null;
        if (this.props.resources && this.props.resources !== '') {
            resources = (<MoreResources
                resources={this.props.resources}
                transformLink={this.transformLink} />);
        }

        let term = this.props.term;
        if (this.props.type === 'official' && this.props.data_act_term !== '') {
            term = this.props.data_act_term;
        }

        return (
            <div className="definition-wrapper">
                <h2 className="term">
                    {term}
                </h2>

                <div className="definition-content">
                    <ReactMarkdown
                        source={this.props[this.props.type]}
                        renderers={Object.assign({}, ReactMarkdown.renderers, {
                            Link: SmartLink
                        })} />
                </div>

                {resources}
            </div>
        );
    }
}

ItemDefinition.propTypes = propTypes;
