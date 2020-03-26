import React from 'react';
import PropTypes from 'prop-types';

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
                console.log("data", data);
                this.setState({ nodes: data.results });
            });
    }

    render() {
        return (
            // <CheckboxTree />
            "YO"
        );
    }
}
