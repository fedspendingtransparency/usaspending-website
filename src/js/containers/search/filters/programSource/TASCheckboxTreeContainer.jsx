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
            nodes: []
        };
        this.fetchTas = null;
    }

    componentDidMount() {
        this.fetchTas = fetchTas('', 0);
        return this.fetchTas.promise
            .then(({ data }) => {
                const nodes = cleanTasData(data.results);
                console.log("nodes", nodes);
                this.setState({ nodes });
            });
    }

    onExpand = () => console.log("expand")

    onCheck = () => console.log("check")

    onUncheck = () => console.log("uncheck")

    render() {
        const {
            nodes,
            checked,
            expanded
        } = this.state;
        return (
            <CheckboxTree
                onUncheck={this.onUncheck}
                onCheck={this.onCheck}
                onExpand={this.onExpand}
                data={nodes}
                checked={checked}
                expanded={expanded} />
        );
    }
}
