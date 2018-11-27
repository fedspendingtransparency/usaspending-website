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
    og_image: PropTypes.string,
    twitter_title: PropTypes.string,
    twitter_description: PropTypes.string,
    twitter_image: PropTypes.string,
    twitter_url: PropTypes.string,
    twitter_label1: PropTypes.string,
    twitter_data1: PropTypes.string,
    twitter_label2: PropTypes.string,
    twitter_data2: PropTypes.string
};

const defaultProps = {
    og_url: "",
    og_title: "",
    og_description: "",
    og_site_name: "",
    og_image: "",
    twitter_title: "",
    twitter_description: "",
    twitter_image: "",
    twitter_url: "",
    twitter_label1: "",
    twitter_data1: "",
    twitter_label2: "",
    twitter_data2: ""
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

        if (this.props.og_url !== "") {
            tags.push(<meta
                property="og:url"
                content={this.props.og_url}
                key="og_url" />);
        }
        if (this.props.og_title !== "") {
            tags.push(<meta
                property="og:title"
                content={this.props.og_title}
                key="og_title" />);
        }
        if (this.props.og_description !== "") {
            tags.push(<meta
                property="og:description"
                content={this.props.og_description}
                key="og_description" />);
        }
        if (this.props.og_site_name !== "") {
            tags.push(<meta
                property="og:site_name"
                content={this.props.og_site_name}
                key="og_site_name" />);
        }
        if (this.props.og_image !== "") {
            tags.push(<meta
                property="og:image"
                content={this.props.og_image}
                key="og_image" />);
        }
        if (this.props.twitter_title !== "") {
            tags.push(<meta
                name="twitter:title"
                value={this.props.twitter_title}
                key="twitter_title" />);
        }
        if (this.props.twitter_description !== "") {
            tags.push(<meta
                name="twitter:description"
                value={this.props.twitter_description}
                key="twitter_description" />);
        }
        if (this.props.twitter_image !== "") {
            tags.push(<meta
                name="twitter:image"
                content={this.props.twitter_image}
                key="twitter_image" />);
        }
        if (this.props.twitter_url !== "") {
            tags.push(<meta
                name="twitter:url"
                value={this.props.twitter_url}
                key="twitter_url" />);
        }
        if (this.props.twitter_label1 !== "") {
            tags.push(<meta
                name="twitter:label1"
                value={this.props.twitter_label1}
                key="twitter_label1" />);
        }
        if (this.props.twitter_data1 !== "") {
            tags.push(<meta
                name="twitter:data1"
                value={this.props.twitter_data1}
                key="twitter_data1" />);
        }
        if (this.props.twitter_label2 !== "") {
            tags.push(<meta
                name="twitter:label2"
                value={this.props.twitter_label2}
                key="twitter_label2" />);
        }
        if (this.props.twitter_data2 !== "") {
            tags.push(<meta
                name="twitter:data2"
                value={this.props.twitter_data2}
                key="twitter_data2" />);
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
