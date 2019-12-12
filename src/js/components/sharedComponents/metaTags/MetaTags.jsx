/**
 * MetaTags.jsx
 * Created by michaelbray on 5/25/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const propTypes = {
    og_url: PropTypes.string,
    og_title: PropTypes.string,
    og_description: PropTypes.string,
    og_site_name: PropTypes.string,
    og_image: PropTypes.string
};

const defaultProps = {
    og_url: 'https://usaspending.gov/',
    og_title: 'USAspending.gov',
    og_description: 'USAspending.gov is the new official source of accessible, searchable and reliable spending data for the U.S. Government.',
    og_site_name: 'USAspending.gov',
    og_image: 'https://usaspending.gov/img/FacebookOG.png'
};

export default class MetaTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        };
    }

    componentDidMount() {
        this.generateTags();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.generateTags();
        }
    }

    generateTags() {
        const tags = [];

        if (this.props.og_url !== '') {
            tags.push(<meta
                property="og:url"
                content={this.props.og_url}
                key="og_url" />);
        }
        if (this.props.og_title !== '') {
            tags.push(<meta
                property="og:title"
                content={this.props.og_title}
                key="og_title" />);
            tags.push(<title>{this.props.og_title}</title>);
        }
        if (this.props.og_description !== '') {
            tags.push(<meta
                name="description"
                property="og:description"
                content={this.props.og_description}
                key="og_description" />);
        }
        if (this.props.og_site_name !== '') {
            tags.push(<meta
                property="og:site_name"
                content={this.props.og_site_name}
                key="og_site_name" />);
        }
        if (this.props.og_image !== '') {
            tags.push(<meta
                property="og:image"
                content={this.props.og_image}
                key="og_image" />);
        }

        this.setState({
            tags
        });
    }

    render() {
        return (
            <Helmet>
                {this.state.tags}
            </Helmet>
        );
    }
}

MetaTags.propTypes = propTypes;
MetaTags.defaultProps = defaultProps;
