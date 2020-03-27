import React from 'react';
import PropTypes from 'prop-types';

import { cleanTasData } from 'helpers/checkboxTreeHelper';
import { fetchTas } from 'helpers/searchHelper';
import CheckboxTree from 'components/sharedComponents/CheckboxTree';

const propTypes = {};

export default class TASCheckboxTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            expanded: [],
            nodes: [],
            isLoading: true
        };
        this.fetchTas = null;
    }

    componentDidMount() {
        this.fetchTas = fetchTas('', 0);
        return this.fetchTas.promise
            .then(({ data }) => {
                const nodes = cleanTasData(data.results);
                this.setState({ nodes, isLoading: false });
            });
    }

    onExpand = () => console.log("expand")

    onCheck = () => console.log("check")

    onUncheck = () => console.log("uncheck")

    render() {
        const {
            nodes,
            checked,
            expanded,
            isLoading
        } = this.state;
        return (
            <CheckboxTree
                isLoading={isLoading}
                data={nodes}
                checked={checked}
                expanded={expanded}
                onUncheck={this.onUncheck}
                onCheck={this.onCheck}
                onExpand={this.onExpand} />
        );
    }
}
