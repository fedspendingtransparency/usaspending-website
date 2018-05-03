/**
 * StateOverview.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import StateMetadata from './StateMetadata';

const propTypes = {
    stateProfile: PropTypes.object
};

export default class StateOverview extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hideFlag: true,
            flag: ''
        };
    }

    componentDidMount() {
        this.prepareOverview(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.stateProfile.id !== this.props.stateProfile.id) {
            this.prepareOverview(nextProps);
        }
    }

    prepareOverview(props) {
        let flag = null;
        let hideFlag = 'hide';
        if (props.stateProfile.flag !== '') {
            hideFlag = '';
            flag = (<img
                src={`graphics/state/${props.stateProfile.flag}`}
                alt={props.stateProfile.name} />);
        }

        this.setState({
            flag,
            hideFlag
        });
    }

    render() {
        return (
            <div
                className="state-overview"
                id="state-overview">
                <div className="state-overview__title-wrapper">
                    <div className={`state-overview__flag ${this.state.hideFlag}`}>
                        {this.state.flag}
                    </div>
                    <h3 className="state-overview__title">{this.props.stateProfile.name}</h3>
                </div>
                <hr className="results-divider" />
                <div className="state-overview__content">
                    <StateMetadata
                        stateProfile={this.props.stateProfile} />
                </div>
            </div>
        );
    }
}

StateOverview.propTypes = propTypes;
